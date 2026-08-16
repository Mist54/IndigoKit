/* ============================================================
   IndigoKit — Select2 integration (OPTIONAL, isolated)
   ------------------------------------------------------------
   THE ONLY FILE IN INDIGOKIT ALLOWED TO USE JQUERY.

   Select2 4.1 requires a global jQuery at runtime. This wrapper
   keeps that dependency fully contained: it is loaded ONLY on
   pages that opt into Select2, it guards on the presence of the
   page-supplied globals, and `window.jQuery` is referenced
   exactly here — never in indigokit.js or anywhere else.

   Usage (page opts in):
     <select class="form-select" data-mu-select2>
     <select class="form-select" data-mu-select2 multiple>
     <select class="form-select" data-mu-select2 data-mu-select2-tags="true">

   NOTE on the attribute name: it MUST NOT be `data-select2`.
   jQuery's .data() auto-reads data-* attributes into its cache,
   and Select2 stores its instance under the `select2` key — a
   bare data-select2 attribute would put an empty string there,
   making Select2's constructor call destroy() on a string
   (TypeError: ...destroy is not a function). data-mu-select2
   avoids that collision entirely.

   The wrapper initializes every [data-mu-select2] element:
   - `multiple` attribute     -> multi-select
   - data-mu-select2-tags     -> free tagging
   - `placeholder` attr       -> placeholder (needs an empty option)

   Native <select class="form-select"> without [data-mu-select2]
   stays untouched — Select2 never replaces the default control.
   ============================================================ */
(function () {
  'use strict';

  function init() {
    var $ = window.jQuery;
    if (!$ || !$.fn || typeof $.fn.select2 !== 'function') {
      // jQuery or Select2 not present on the page — the native
      // Bootstrap select remains the control. No error: this is
      // the OPTIONAL degradation path.
      return;
    }

    $('[data-mu-select2]').each(function () {
      var $el = $(this);

      // Never double-initialize (Select2 stores its instance under
      // the `select2` jQuery data key once initialized).
      if ($el.data('select2')) {
        return;
      }

      var opts = {};

      if ($el.attr('multiple')) {
        opts.multiple = true;
      }

      if ($el.attr('data-mu-select2-tags') === 'true') {
        opts.tags = true;
      }

      if ($el.attr('placeholder')) {
        opts.placeholder = $el.attr('placeholder');
      }

      $el.select2(opts);

      // Select2 hardcodes the combobox's aria-labelledby to its own
      // container span (selection/single.js), so the control names
      // itself after the placeholder/selected text instead of its
      // real <label>. Restore the accessible name from the label
      // (or an explicit aria-label on the select) so screen readers
      // announce "Assign owner", not "Search a team member…".
      var label = $el.attr('aria-label') || (function () {
        var id = $el.attr('id');
        if (!id) return '';
        var l = document.querySelector('label[for="' + id + '"]');
        return l ? l.textContent.replace(/\s+/g, ' ').trim() : '';
      })();
      if (label) {
        var selection = $el[0].nextElementSibling &&
          $el[0].nextElementSibling.querySelector('.select2-selection');
        if (selection) {
          // Drop Select2's self-referencing aria-labelledby: when
          // both are present, labelledby wins over aria-label, so
          // the combobox would keep naming itself after the
          // placeholder/selected text.
          selection.removeAttribute('aria-labelledby');
          selection.setAttribute('aria-label', label);
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
