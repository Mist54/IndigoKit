/* ============================================================
   IndigoKit — Framework interactions
   ------------------------------------------------------------
   1. Desktop sidebar collapse/expand (Task 008) — state
      persists across page loads (localStorage, Task 055B
      follow-up); expanding re-reconciles the nested groups
      with Bootstrap Collapse.
   2. Mobile sidebar drawer/offcanvas (Task 009).
   3. Bootstrap tooltip + popover initialization (Tasks 016/038)
      — both require explicit JS init; IndigoKit centralizes it
      here, guarded so pages without the Bootstrap bundle still
      work.
   4. Sidebar nested navigation (Task 055A) — group toggles use
      Bootstrap's own Collapse data API; IndigoKit only opens the
      group containing the active link on load (a small
      integration layer — Bootstrap cannot know which parent to
      open).

   JavaScript manages state + accessibility only; every visual
   lives in CSS (src/scss/...). Bootstrap's own JS (collapse,
   dropdowns, tooltips, ...) is used as-is — IndigoKit never
   reimplements it.

   Distributed as a standalone file (dist/js/indigokit.js) — a
   plain copy, no bundler, no modules, no dependencies. Optional
   integrations (Lucide icon swap, Bootstrap tooltips/popovers,
   Bootstrap Collapse) are guarded, so the framework works even
   when those libraries are not loaded.
   ============================================================ */

(function () {
  'use strict';

  // Bootstrap's md breakpoint: below = mobile drawer mode,
  // md and up = desktop shell mode. Kept in sync with the CSS
  // (media-breakpoint-down(md) / media-breakpoint-up(md)).
  var DESKTOP_QUERY = '(min-width: 768px)';
  var mql = window.matchMedia(DESKTOP_QUERY);
  var isDesktop = function () {
    return mql.matches;
  };

  // ------------------------------------------------------------
  // 1. Desktop collapse / expand
  // ------------------------------------------------------------
  // The collapsed state persists (localStorage key
  // indigokit-sidebar-collapsed), so the user's choice survives page
  // navigation: the shell restores it on load and saves it on
  // every toggle. Storage access is wrapped so private-mode or
  // disabled-storage browsers degrade to the default expanded
  // sidebar. The class itself is md+-scoped in CSS, so restoring
  // it on mobile is a harmless no-op for the drawer.
  var STORAGE_KEY = 'indigokit-sidebar-collapsed';

  function loadCollapsedState() {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function saveCollapsedState(collapsed) {
    try {
      localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0');
    } catch (e) {
      /* storage unavailable — session-only behavior */
    }
  }

  // Re-sync a toggle's ARIA state and icon from the sidebar's
  // class. Returns the controlled sidebar, or null if it cannot
  // be found.
  function syncToggle(toggle) {
    var sidebar = document.getElementById(toggle.getAttribute('aria-controls'));
    if (!sidebar) {
      return null;
    }

    var collapsed = sidebar.classList.contains('is-collapsed');
    toggle.setAttribute('aria-expanded', String(!collapsed));
    toggle.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');

    // Swap the icon glyph (panel-left-close ↔ panel-left-open).
    // lucide.createIcons({ root }) re-renders only the [data-lucide]
    // elements found inside the given root — here, the button that
    // contains the icon.
    var icon = toggle.querySelector('[data-lucide]');
    if (icon && window.lucide) {
      icon.setAttribute('data-lucide', collapsed ? 'panel-left-open' : 'panel-left-close');
      // Drop the previous icon's class before re-rendering, or the
      // old lucide-<name> class would linger on the new glyph.
      icon.removeAttribute('class');
      window.lucide.createIcons({ root: toggle });
    }

    return sidebar;
  }

  function initDesktopCollapse() {
    var toggles = document.querySelectorAll('[data-mu-sidebar-toggle]');

    // Restore the persisted state before the first sync: the rail
    // class is md+-scoped in CSS (a no-op inside the mobile
    // drawer), and syncToggle below reads the class to pick the
    // correct icon and aria-label.
    if (loadCollapsedState()) {
      var persistedSidebar = document.querySelector('.mu-sidebar');
      if (persistedSidebar) {
        persistedSidebar.classList.add('is-collapsed');
      }
    }

    Array.prototype.forEach.call(toggles, function (toggle) {
      // Sync the initial state (safe even if the markup starts
      // collapsed) and skip controls with no target.
      if (!syncToggle(toggle)) {
        return;
      }

      toggle.addEventListener('click', function () {
        var sidebar = document.getElementById(toggle.getAttribute('aria-controls'));
        if (!sidebar) {
          return;
        }
        var nowCollapsed = !sidebar.classList.contains('is-collapsed');
        sidebar.classList.toggle('is-collapsed');
        saveCollapsedState(nowCollapsed);
        syncToggle(toggle);

        if (nowCollapsed) {
          // Entering the rail: the flyout layer takes over the
          // group toggles (its click/key handlers stop Bootstrap's
          // hidden Collapse from firing). Nothing to reconcile —
          // only the flyout-open group reads as pressed.
          return;
        }

        // Leaving the rail: remember which group's flyout is open
        // so the reconcile below expands it, remove the panel, and
        // hand the group toggles back to Bootstrap Collapse.
        var flyoutGroup = flyout.button;
        closeCollapsedFlyout(false);
        if (flyoutGroup) {
          flyoutGroup.setAttribute('aria-expanded', 'true');
        }
        reconcileGroupStates(sidebar);
      });
    });
  }

  // Hand the group toggles back to Bootstrap Collapse, reconciled
  // to what the rail last showed. The flyout layer and Bootstrap
  // share each toggle's aria-expanded, so on expand every group
  // is set to match it: a group whose flyout was open (or that was
  // open before collapsing) comes back expanded; everything else
  // collapses. Without this, a region hidden in the rail could
  // re-open unexpectedly on expand — pushing the navigation below
  // it down — while its toggle claimed to be collapsed.
  function reconcileGroupStates(sidebar) {
    if (!window.bootstrap || !window.bootstrap.Collapse) {
      return;
    }

    var toggles = sidebar.querySelectorAll('.mu-sidebar-link[data-bs-toggle="collapse"]');
    Array.prototype.forEach.call(toggles, function (toggle) {
      var region = document.querySelector(toggle.getAttribute('data-bs-target'));
      if (!region) {
        return;
      }
      // Capture the rail's intent BEFORE creating the instance:
      // Bootstrap's Collapse constructor re-syncs the toggle's
      // aria-expanded to the region's current state, which would
      // clobber the rail-set value before we read it.
      var shouldShow = toggle.getAttribute('aria-expanded') === 'true';
      var instance = window.bootstrap.Collapse.getOrCreateInstance(region, {
        toggle: false
      });
      if (shouldShow) {
        instance.show();
      } else {
        instance.hide(); // no-op when already hidden
      }
    });
  }

  // ------------------------------------------------------------
  // 2. Mobile drawer / offcanvas
  // ------------------------------------------------------------
  function initMobileDrawer() {
    var aside = document.querySelector('.mu-app-side');
    if (!aside) {
      return;
    }
    var sidebar = aside.querySelector('.mu-sidebar');
    var backdrop = document.querySelector('.mu-app-backdrop');
    var toggles = document.querySelectorAll('[data-mu-mobile-toggle]');
    var closeButtons = document.querySelectorAll('[data-mu-sidebar-close]');
    var lastFocus = null;

    function isOpen() {
      return aside.classList.contains('is-open');
    }

    function setToggleState(expanded) {
      Array.prototype.forEach.call(toggles, function (toggle) {
        toggle.setAttribute('aria-expanded', String(expanded));
      });
    }

    function openDrawer() {
      if (isDesktop() || isOpen()) {
        return; // the drawer only exists below md
      }
      lastFocus = document.activeElement;
      aside.classList.add('is-open');
      aside.removeAttribute('inert');
      setToggleState(true);
      // Move focus to a logical element inside the drawer.
      var firstLink = sidebar && sidebar.querySelector('.mu-sidebar-link');
      if (firstLink) {
        firstLink.focus();
      }
    }

    function closeDrawer(restoreFocus) {
      if (!isOpen()) {
        return;
      }
      aside.classList.remove('is-open');
      aside.setAttribute('inert', '');
      setToggleState(false);
      // Keyboard users must not lose their place: return focus to
      // the control that opened the drawer.
      if (restoreFocus && lastFocus && lastFocus.focus) {
        lastFocus.focus();
      }
    }

    // Triggers: mobile toggle, close button, backdrop, Escape.
    Array.prototype.forEach.call(toggles, function (toggle) {
      toggle.addEventListener('click', function () {
        if (isOpen()) {
          closeDrawer(true);
        } else {
          openDrawer();
        }
      });
    });

    Array.prototype.forEach.call(closeButtons, function (button) {
      button.addEventListener('click', function () {
        closeDrawer(true);
      });
    });

    if (backdrop) {
      backdrop.addEventListener('click', function () {
        closeDrawer(true);
      });
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen()) {
        closeDrawer(true);
        return;
      }

      // Keep keyboard focus inside the open drawer — a simple Tab
      // wrap between the first and last focusable controls, so
      // focus never disappears behind the backdrop (Task 010).
      if (event.key === 'Tab' && isOpen()) {
        var focusables = aside.querySelectorAll('a[href], button:not([disabled])');
        if (focusables.length === 0) {
          return;
        }
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    // Breakpoint crossing: leaving mobile closes the drawer and
    // un-inerts the sidebar (desktop shell); entering mobile
    // re-inerts it (drawer closed by default). matchMedia change
    // events fire only on crossings — no polling, no resize spam.
    if (mql.addEventListener) {
      mql.addEventListener('change', function (event) {
        if (event.matches) {
          aside.classList.remove('is-open');
          aside.removeAttribute('inert');
          setToggleState(false);
        } else {
          aside.setAttribute('inert', '');
        }
      });
    }

    // Initial state: on mobile the drawer starts closed, and the
    // hidden navigation must not be focusable or exposed to
    // assistive technology.
    if (!isDesktop()) {
      aside.setAttribute('inert', '');
    }
  }

  // ------------------------------------------------------------
  // 5. Collapsed-rail flyout — reach nested groups in the rail
  // ------------------------------------------------------------
  // When the sidebar is collapsed (md+, .is-collapsed), CSS hides
  // the collapse regions, so a group toggle cannot reach its
  // children. This integration layer opens a compact flyout panel
  // beside the rail containing the group's links — cloned from
  // the collapse target, never duplicated markup.
  //
  // Click toggles; hover-capable pointer devices also open on
  // pointer-enter (so the icon rail feels interactive, not dead).
  // In rail mode this layer owns the toggle entirely: it stops
  // propagation so Bootstrap's hidden collapse never flips
  // aria-expanded behind its back, and it sets the attribute
  // itself. In expanded mode it does nothing — Bootstrap Collapse
  // keeps owning the groups.
  var flyout = {
    panel: null,
    button: null,
    hoverOk: false
  };
  var flyoutOpenTimer = null;
  var flyoutCloseTimer = null;

  function scheduleFlyoutClose() {
    if (flyoutCloseTimer) {
      clearTimeout(flyoutCloseTimer);
    }
    flyoutCloseTimer = setTimeout(function () {
      closeCollapsedFlyout(false);
    }, 250); // grace to let the pointer cross into the panel
  }

  function cancelFlyoutClose() {
    if (flyoutCloseTimer) {
      clearTimeout(flyoutCloseTimer);
      flyoutCloseTimer = null;
    }
  }

  function closeCollapsedFlyout(restoreFocus) {
    if (flyout.panel) {
      flyout.panel.remove();
      flyout.panel = null;
    }
    if (flyout.button) {
      flyout.button.setAttribute('aria-expanded', 'false');
      if (restoreFocus && flyout.button.focus) {
        flyout.button.focus();
      }
      flyout.button = null;
    }
  }

  function openCollapsedFlyout(button) {
    var target = document.querySelector(button.getAttribute('data-bs-target'));
    var nested = target && target.querySelector('.mu-sidebar-nested');
    if (!nested) {
      return;
    }

    // A different group is open: swap panels without focus churn.
    if (flyout.panel && flyout.button !== button) {
      closeCollapsedFlyout(false);
    }
    if (flyout.panel) {
      return; // already open for this button
    }

    // Belt and braces: never allow a second panel to accumulate
    // (duplicate elements would also duplicate their ids).
    var stale = document.querySelector('.mu-sidebar-flyout');
    if (stale) {
      stale.remove();
    }

    // Only the open flyout reads as pressed in the rail: reset the
    // sibling group toggles so a group left open by expanded-mode
    // Bootstrap Collapse cannot show a pressed box without a
    // flyout — and the expand-time reconcile stays consistent with
    // what the rail actually showed.
    var rail = button.closest('.mu-sidebar');
    if (rail) {
      var groupToggles = rail.querySelectorAll('.mu-sidebar-link[data-bs-toggle="collapse"]');
      Array.prototype.forEach.call(groupToggles, function (other) {
        if (other !== button) {
          other.setAttribute('aria-expanded', 'false');
        }
      });
    }

    var rect = button.getBoundingClientRect();

    var panel = document.createElement('div');
    panel.className = 'mu-sidebar-flyout';

    var label = document.createElement('div');
    label.className = 'mu-sidebar-flyout-label';
    var labelText = button.querySelector('.mu-sidebar-link-text');
    label.textContent = labelText ? labelText.textContent.trim() : '';
    panel.appendChild(label);

    panel.appendChild(nested.cloneNode(true));

    if (flyout.hoverOk) {
      panel.addEventListener('mouseenter', cancelFlyoutClose);
      panel.addEventListener('mouseleave', scheduleFlyoutClose);
    }

    // Position beside the rail, aligned to the toggle; flip to the
    // left when there is no room on the right, clamp vertically.
    // The sidebar clips absolutely positioned children (overflow-x:
    // hidden), so the panel is fixed + computed at open time — the
    // two style writes are runtime geometry, not authored styling.
    document.body.appendChild(panel);
    var left = rect.right + 8;
    var width = panel.offsetWidth;
    if (left + width > window.innerWidth - 8 && rect.left - width - 8 > 0) {
      left = rect.left - width - 8;
    }
    var top = rect.top;
    var height = panel.offsetHeight;
    if (top + height > window.innerHeight - 8) {
      top = Math.max(8, window.innerHeight - height - 8);
    }
    panel.style.left = Math.round(left) + 'px';
    panel.style.top = Math.round(top) + 'px';

    flyout.panel = panel;
    flyout.button = button;
    button.setAttribute('aria-expanded', 'true');
  }

  function initCollapsedFlyout() {
    var sidebar = document.querySelector('.mu-sidebar');
    if (!sidebar) {
      return;
    }

    flyout.hoverOk = window.matchMedia && window.matchMedia('(hover: hover)').matches;

    // Rail mode is desktop-only: the class may also sit on the
    // element from a persisted desktop session, but the mobile
    // drawer always renders expanded and Bootstrap Collapse must
    // keep owning its group toggles there.
    function isRailMode() {
      return isDesktop() && sidebar.classList.contains('is-collapsed');
    }

    var buttons = sidebar.querySelectorAll('.mu-sidebar-link[data-bs-toggle="collapse"]');
    Array.prototype.forEach.call(buttons, function (button) {
      // Keyboard: Enter/Space opens the flyout and moves focus into
      // it (a plain click would leave focus on the toggle, and Tab
      // order would then skip the body-appended panel).
      button.addEventListener('keydown', function (event) {
        if (!isRailMode()) {
          return;
        }
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault(); // stops the synthesized click
          if (flyout.panel && flyout.button === button) {
            closeCollapsedFlyout(true);
          } else {
            openCollapsedFlyout(button);
            if (flyout.panel) {
              var first = flyout.panel.querySelector('a[href], button:not([disabled])');
              if (first) {
                first.focus();
              }
            }
          }
        }
      });

      button.addEventListener('click', function (event) {
        if (!isRailMode()) {
          return; // expanded/mobile: Bootstrap Collapse owns the group
        }
        // Rail mode: this layer owns the toggle. Stopping
        // propagation keeps the hidden collapse from flipping
        // aria-expanded behind our back.
        event.preventDefault();
        event.stopPropagation();
        if (flyout.panel && flyout.button === button) {
          closeCollapsedFlyout(false);
        } else {
          openCollapsedFlyout(button);
        }
      });

      // Hover (pointer devices only): open on enter, close after a
      // grace period on leave so the pointer can cross into the
      // panel. Touch never triggers this path (no hover media).
      if (flyout.hoverOk) {
        button.addEventListener('mouseenter', function () {
          if (!isRailMode()) {
            return;
          }
          if (flyoutOpenTimer) {
            clearTimeout(flyoutOpenTimer);
          }
          cancelFlyoutClose();
          flyoutOpenTimer = setTimeout(function () {
            flyoutOpenTimer = null;
            if (!flyout.panel) {
              openCollapsedFlyout(button);
            }
          }, 120);
        });

        button.addEventListener('mouseleave', function () {
          if (flyoutOpenTimer) {
            clearTimeout(flyoutOpenTimer);
            flyoutOpenTimer = null;
          }
          if (flyout.button === button) {
            scheduleFlyoutClose();
          }
        });
      }
    });

    // Close on outside pointer, Escape, sidebar scroll, resize, and
    // breakpoint crossing — the panel is fixed and context-bound.
    document.addEventListener('click', function (event) {
      if (!flyout.panel) {
        return;
      }
      if (flyout.panel.contains(event.target) || event.target === flyout.button) {
        return;
      }
      closeCollapsedFlyout(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && flyout.panel) {
        closeCollapsedFlyout(true);
      }
    });

    sidebar.addEventListener('scroll', function () {
      if (flyout.panel) {
        closeCollapsedFlyout(false);
      }
    });

    window.addEventListener('resize', function () {
      if (flyout.panel) {
        closeCollapsedFlyout(false);
      }
    });

    if (mql.addEventListener) {
      mql.addEventListener('change', function () {
        if (flyout.panel) {
          closeCollapsedFlyout(false);
        }
      });
    }
  }

  // ------------------------------------------------------------
  // 3. Bootstrap tooltips (Task 016) and popovers (Task 038)
  // ------------------------------------------------------------
  // Bootstrap tooltips and popovers require explicit JavaScript
  // initialization (unlike dropdowns, which the bundle's data API
  // wires up automatically). IndigoKit centralizes both here: every
  // [data-bs-toggle="tooltip"] element becomes a Bootstrap Tooltip,
  // and every [data-bs-toggle="popover"] element becomes a Bootstrap
  // Popover, when the Bootstrap bundle is loaded. Guarded, so pages
  // that don't load the bundle (e.g. shell pages) are unaffected.
  // Popovers reuse Bootstrap's own positioning/dismissal machinery —
  // no custom engine.
  function initTooltips() {
    if (!window.bootstrap || !window.bootstrap.Tooltip) {
      return;
    }

    var triggers = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    Array.prototype.forEach.call(triggers, function (el) {
      // eslint-disable-next-line no-new -- instance is managed by
      // Bootstrap; retrieved later via Tooltip.getInstance(el).
      new window.bootstrap.Tooltip(el);
    });
  }

  function initPopovers() {
    if (!window.bootstrap || !window.bootstrap.Popover) {
      return;
    }

    var triggers = document.querySelectorAll('[data-bs-toggle="popover"]');
    Array.prototype.forEach.call(triggers, function (el) {
      // eslint-disable-next-line no-new -- instance is managed by
      // Bootstrap; retrieved later via Popover.getInstance(el).
      new window.bootstrap.Popover(el);
    });
  }

  // ------------------------------------------------------------
  // 4. Nested navigation — open the group of the active link
  // ------------------------------------------------------------
  // Sidebar group toggles are Bootstrap Collapse (data-bs-toggle=
  // "collapse"), so expanding/collapsing is Bootstrap's own data
  // API. The one thing Bootstrap cannot do without JS is decide
  // which group should start open: when a page marks a link
  // .active, its parent group opens automatically (Task 055A).
  //
  // Guarded on the Bootstrap bundle and idempotent: getOrCreate-
  // Instance reuses any existing instance, and show() on an
  // already-open group is a no-op (pages may also pre-mark the
  // group with .show in markup to avoid any load-time animation).
  function initActiveParentCollapse() {
    if (!window.bootstrap || !window.bootstrap.Collapse) {
      return;
    }

    var active = document.querySelector('.mu-sidebar-link.active');
    if (!active) {
      return;
    }

    var group = active.closest('.collapse');
    if (!group) {
      return;
    }

    var collapse = window.bootstrap.Collapse.getOrCreateInstance(group, {
      toggle: false
    });
    collapse.show();
  }

  function init() {
    initDesktopCollapse();
    initMobileDrawer();
    initTooltips();
    initPopovers();
    initActiveParentCollapse();
    initCollapsedFlyout();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
