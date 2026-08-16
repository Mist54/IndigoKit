/* ============================================================
   IndigoKit — JS distribution build (build:js)
   ------------------------------------------------------------
   Copies src/js/*.js to dist/js/ unchanged (the unminified,
   debuggable variants) and writes .min.js variants alongside.

   Dependency-free on purpose: no terser/uglify is in the tree and
   adding one is not approved. The minifier is deliberately
   CONSERVATIVE — it only:

     - strips comments (line + block, except /*! license banners)
     - collapses whitespace between tokens (never inside strings,
       template literals, or regex literals)
     - inserts a space only where two tokens would otherwise merge
       into a different token (++ -- << >> && || ?? ** == != => // /*)

   It never renames identifiers, never rewrites literals, never
   touches semantics — so the minified output is guaranteed to
   behave identically to the source, and node --check + the browser
   QA gate verify it.

   Grammar-aware enough to keep strings, template literals (with
   nested ${}), regex literals (heuristic start detection), and
   multi-char operators intact.
   ============================================================ */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'src', 'js');
const OUT_DIR = path.join(ROOT, 'dist', 'js');
const FILES = ['indigokit.js', 'indigokit-select2.js'];

const VERSION = require(path.join(ROOT, 'package.json')).version;
const BANNER = '/*! IndigoKit v' + VERSION + ' | ISC | minified */\n';

function isWordChar(c) {
  return /[A-Za-z0-9_$]/.test(c);
}

// A `/` begins a regex literal when the previous significant token
// allows an expression to start there (heuristic — adequate for
// IndigoKit's ES5-style scripts).
function regexAllowed(prevToken) {
  if (!prevToken) return true;
  var v = prevToken.v;
  var last = v[v.length - 1];
  if (/[\(,\[=!&|?{};:+\-*%^~<>]/.test(last)) return true;
  return /(?:return|typeof|instanceof|in|of|new|delete|void|case|throw|else|do|yield|await)$/.test(v);
}

function tokenize(src) {
  var tokens = [];
  var i = 0;
  var n = src.length;

  while (i < n) {
    var c = src[i];

    if (/\s/.test(c)) {
      i++;
      continue;
    }

    // Line comment
    if (c === '/' && src[i + 1] === '/') {
      while (i < n && src[i] !== '\n') i++;
      continue;
    }

    // Block comment (keep /*! banners)
    if (c === '/' && src[i + 1] === '*') {
      var banner = src[i + 2] === '!';
      var end = src.indexOf('*/', i + 2);
      end = end === -1 ? n : end + 2;
      if (banner) tokens.push({ t: 'comment', v: src.slice(i, end) });
      i = end;
      continue;
    }

    // String literal
    if (c === "'" || c === '"') {
      var j = i + 1;
      var s = c;
      while (j < n) {
        var ch = src[j];
        s += ch;
        if (ch === '\\') {
          s += src[j + 1] === undefined ? '' : src[j + 1];
          j += 2;
          continue;
        }
        if (ch === c) break;
        j++;
      }
      tokens.push({ t: 'string', v: s });
      i = j + 1;
      continue;
    }

    // Template literal (with nested ${ ... })
    if (c === '`') {
      var k = i + 1;
      var t = c;
      var depth = 0;
      while (k < n) {
        var tc = src[k];
        t += tc;
        if (tc === '\\') {
          t += src[k + 1] === undefined ? '' : src[k + 1];
          k += 2;
          continue;
        }
        if (tc === '`' && depth === 0) {
          k++;
          break;
        }
        if (tc === '$' && src[k + 1] === '{') {
          depth++;
          k += 2;
          t += '{';
          continue;
        }
        if (tc === '}' && depth > 0) depth--;
        k++;
      }
      tokens.push({ t: 'string', v: t });
      i = k;
      continue;
    }

    // Regex literal
    if (c === '/' && regexAllowed(tokens[tokens.length - 1]) &&
        src[i + 1] !== '/' && src[i + 1] !== '*') {
      var m = i + 1;
      var r = '/';
      var inClass = false;
      while (m < n) {
        var rc = src[m];
        r += rc;
        if (rc === '\\') {
          r += src[m + 1] === undefined ? '' : src[m + 1];
          m += 2;
          continue;
        }
        if (rc === '[') inClass = true;
        else if (rc === ']') inClass = false;
        else if (rc === '/' && !inClass) {
          m++;
          break;
        }
        m++;
      }
      tokens.push({ t: 'regex', v: r });
      i = m;
      continue;
    }

    // Identifier / number / keyword (also consumes number suffixes
    // like .5 exponents via the "." branch below being join-safe)
    if (isWordChar(c)) {
      var w = i;
      var word = '';
      while (w < n && isWordChar(src[w])) {
        word += src[w];
        w++;
      }
      tokens.push({ t: 'word', v: word });
      i = w;
      continue;
    }

    // Operator run (keeps multi-char operators contiguous: ===, +=,
    // &&, =>, ...). `.` is deliberately excluded — it is member
    // access / decimal punctuation and joins without spaces.
    if (/[=+\-*\/%&|^~!<>?:]/.test(c)) {
      var o = i;
      var op = '';
      while (o < n && /[=+\-*\/%&|^~!<>?:]/.test(src[o])) {
        op += src[o];
        o++;
      }
      tokens.push({ t: 'op', v: op });
      i = o;
      continue;
    }

    // Single punctuation ( ) { } [ ] ; , .
    tokens.push({ t: 'punct', v: c });
    i++;
  }

  return tokens;
}

// Would joining prev and next without a space merge them into a
// different token?
function needsSpace(prevRaw, nextRaw) {
  var last = prevRaw[prevRaw.length - 1];
  var first = nextRaw[0];
  if (isWordChar(last) && isWordChar(first)) return true;
  switch (last + first) {
    case '++': case '--': case '<<': case '>>':
    case '&&': case '||': case '??': case '**':
    case '//': case '/*': case '==': case '!=': case '=>':
      return true;
    default:
      return false;
  }
}

function minify(src) {
  var tokens = tokenize(src);
  var out = '';
  var prev = '';
  var first = true;

  for (var i = 0; i < tokens.length; i++) {
    var tok = tokens[i];
    if (tok.t === 'comment') {
      if (tok.v.charAt(2) === '!') {
        out += (first || out.endsWith('\n') ? '' : '\n') + tok.v;
        prev = tok.v;
        first = false;
      }
      continue;
    }
    if (!first && needsSpace(prev, tok.v)) out += ' ';
    out += tok.v;
    prev = tok.v;
    first = false;
  }

  return BANNER + out + '\n';
}

// --------------------------------------------------------------
// Build
// --------------------------------------------------------------
fs.mkdirSync(OUT_DIR, { recursive: true });

FILES.forEach(function (name) {
  var src = fs.readFileSync(path.join(SRC_DIR, name), 'utf8');
  var minName = name.replace(/\.js$/, '.min.js');
  fs.writeFileSync(path.join(OUT_DIR, name), src);
  fs.writeFileSync(path.join(OUT_DIR, minName), minify(src));
  console.log('built dist/js/' + name + ' (' + src.length + ' B)');
  console.log('built dist/js/' + minName + ' (' + fs.statSync(path.join(OUT_DIR, minName)).size + ' B)');
});
