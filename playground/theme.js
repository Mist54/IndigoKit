/* ============================================================
   IndigoKit Playground — theme persistence (Task 047)
   ------------------------------------------------------------
   PLAYGROUND-ONLY utility. NOT a IndigoKit component or API:
   the framework theme mechanism stays Bootstrap's native
   [data-bs-theme] attribute, and IndigoKit ships no theme
   JavaScript. This file only makes the demo environment
   remember the visitor's choice across pages.

   Behavior
   - Modes: light | dark | system  (default: system).
   - Loaded synchronously in <head>, so the stored preference is
     applied BEFORE first paint (no flash of the wrong theme).
   - Persists in localStorage under the key "indigokit-theme";
     values are validated against an allowlist before use.
   - Invalid stored values fall back to "system" safely.
   - Blocked/unavailable storage degrades to session-only
     theming (switching still works for the current page).
   - System mode follows prefers-color-scheme via matchMedia()
     and reacts to OS changes (no polling).

   Security: values are allowlisted, never evaluated, and no
   markup is generated (no innerHTML).
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'indigokit-theme';
  var ALLOWED = ['light', 'dark', 'system'];
  var DEFAULT_MODE = 'system';

  // matchMedia may be absent in odd embedded contexts — guard it.
  var mql = window.matchMedia
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;

  // Read + validate the stored mode. Returns null when unset,
  // invalid, or when storage is unavailable/throws.
  function storedMode() {
    try {
      var value = window.localStorage.getItem(KEY);
      return ALLOWED.indexOf(value) !== -1 ? value : null;
    } catch (e) {
      return null; // storage blocked — session-only theming
    }
  }

  // Resolve a mode to the concrete Bootstrap theme value.
  function resolveTheme(mode) {
    if (mode === 'light' || mode === 'dark') return mode;
    return mql && mql.matches ? 'dark' : 'light'; // system
  }

  // Apply the theme to <html> and return what was applied.
  function apply(mode) {
    var theme = resolveTheme(mode);
    document.documentElement.setAttribute('data-bs-theme', theme);
    return theme;
  }

  // Follow OS preference changes while the visitor is in system mode.
  if (mql && mql.addEventListener) {
    mql.addEventListener('change', function () {
      if ((storedMode() || DEFAULT_MODE) === 'system') {
        apply('system');
      }
    });
  }

  // --- Early apply (runs in <head>, before first paint) ---
  apply(storedMode() || DEFAULT_MODE);

  // --- Tiny playground API for the switcher control ---
  window.playgroundTheme = {
    get: function () { return storedMode() || DEFAULT_MODE; },
    set: function (mode) {
      if (ALLOWED.indexOf(mode) === -1) return null;
      try {
        window.localStorage.setItem(KEY, mode);
      } catch (e) {
        // storage blocked — apply for the session only
      }
      return apply(mode);
    }
  };

  // --- Auto-bind any theme switcher <select data-theme-switch> ---
  // Shared playground infrastructure (Task 055): example pages just
  // include the select markup and this wires it up — no per-page JS.
  function bindSwitchers() {
    var selects = document.querySelectorAll('select[data-theme-switch]');
    Array.prototype.forEach.call(selects, function (select) {
      var mode = storedMode() || DEFAULT_MODE;
      if (select.value !== mode) select.value = mode;
      select.addEventListener('change', function () {
        window.playgroundTheme.set(select.value);
      });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindSwitchers);
  } else {
    bindSwitchers();
  }
})();
