(() => {
  'use strict';
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('menu-principal');
  const privacy = document.getElementById('privacy-dialog');
  const privacyOpen = document.getElementById('privacy-open');
  const floatContact = document.querySelector('.float-contact');
  const contactPanel = document.querySelector('.contact-main');
  const footer = document.querySelector('.site-footer');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const menuMedia = window.matchMedia('(max-width: 860px)');
  let scrollTimer;
  let scrollFrame;
  let navigationFrame = null;
  let userNavigated = false;

  root.classList.add('js');
  root.dataset.scrolling = 'false';
  menuButton.hidden = false;
  privacyOpen.hidden = false;
  document.getElementById('copyright-year').textContent = String(new Date().getFullYear());

  const headerHeight = () => Math.ceil(header.getBoundingClientRect().height);
  const updateHeader = () => root.style.setProperty('--header-height', headerHeight() + 'px');
  updateHeader();
  if ('ResizeObserver' in window) new ResizeObserver(updateHeader).observe(header);
  else window.addEventListener('resize', updateHeader, {passive: true});

  function setMenu(open, restoreFocus = false) {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    navigation.classList.toggle('is-open', open);
    if (restoreFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('click', event => {
    if (!header.contains(event.target)) setMenu(false);
  });
  header.addEventListener('focusout', () => {
    window.setTimeout(() => { if (!header.contains(document.activeElement)) setMenu(false); }, 0);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  });
  menuMedia.addEventListener('change', () => setMenu(false));

  function getTarget(hash) {
    if (!hash || hash === '#') return null;
    try { return document.getElementById(decodeURIComponent(hash.slice(1))); }
    catch { return null; }
  }
  function setCurrentLink() {
    const threshold = headerHeight() + 50;
    let current = '';
    for (const id of ['atuacao', 'sobre', 'atendimento', 'contato']) {
      const target = document.getElementById(id);
      if (target.getBoundingClientRect().top <= threshold) current = '#' + id;
    }
    if (document.getElementById('duvidas').getBoundingClientRect().top <= threshold &&
        document.getElementById('contato').getBoundingClientRect().top > threshold) current = '';
    navigation.querySelectorAll('a').forEach(link => {
      if (link.getAttribute('href') === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function markScrollSettled() {
    window.clearTimeout(scrollTimer);
    if (navigationFrame !== null) return;
    scrollTimer = window.setTimeout(() => {
      root.dataset.scrolling = 'false';
      setCurrentLink();
      syncFloatContact();
    }, 130);
  }
  function cancelNavigation() {
    if (navigationFrame === null) return;
    window.cancelAnimationFrame(navigationFrame);
    navigationFrame = null;
    root.dataset.scrolling = 'false';
    setCurrentLink();
  }
  function scrollToPosition(top, smooth) {
    cancelNavigation();
    window.clearTimeout(scrollTimer);
    const maximum = Math.max(0, document.documentElement.scrollHeight - document.documentElement.clientHeight);
    const destination = Math.min(top, maximum);
    const origin = window.scrollY;
    const distance = destination - origin;
    root.dataset.scrolling = 'true';
    if (!smooth || reducedMotion.matches || Math.abs(distance) < 2) {
      window.scrollTo({top: destination, behavior: 'auto'});
      root.dataset.scrolling = 'false';
      setCurrentLink();
      syncFloatContact();
      return;
    }
    const started = performance.now();
    const duration = Math.min(420, Math.max(260, Math.abs(distance) * .16));
    const step = now => {
      const progress = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      window.scrollTo({top: origin + distance * eased, behavior: 'auto'});
      if (progress < 1) navigationFrame = window.requestAnimationFrame(step);
      else {
        navigationFrame = null;
        root.dataset.scrolling = 'false';
        setCurrentLink();
        syncFloatContact();
      }
    };
    navigationFrame = window.requestAnimationFrame(step);
  }
  function navigate(hash, options = {}) {
    const target = getTarget(hash);
    if (!target) return false;
    setMenu(false);
    updateHeader();
    if (target.tagName === 'DETAILS') target.open = true;
    const gap = parseFloat(getComputedStyle(root).getPropertyValue('--anchor-gap')) || 24;
    const top = ['#inicio', '#conteudo'].includes(hash) ? 0 :
      Math.max(0, Math.round(target.getBoundingClientRect().top + window.scrollY - headerHeight() - gap));
    if (options.history && window.location.hash !== hash) {
      try { window.history.pushState(null, '', hash); }
      catch { window.location.hash = hash; }
    }
    if (options.focus) {
      const focusTarget = target.tagName === 'DETAILS' ? target.querySelector('summary') : target;
      if (!focusTarget.hasAttribute('tabindex') && focusTarget.tagName !== 'SUMMARY') focusTarget.setAttribute('tabindex', '-1');
      focusTarget.focus({preventScroll: true});
    }
    scrollToPosition(top, options.smooth);
    return true;
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (navigate(link.getAttribute('href'), {smooth: true, history: true, focus: true})) {
      event.preventDefault();
      userNavigated = true;
    }
  });
  window.addEventListener('hashchange', () => {
    if (window.location.hash) navigate(window.location.hash);
    else window.scrollTo({top: 0, behavior: 'auto'});
  });
  window.addEventListener('scroll', () => {
    markScrollSettled();
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(() => {
      scrollFrame = null;
      setCurrentLink();
      syncFloatContact();
    });
  }, {passive: true});
  window.addEventListener('wheel', cancelNavigation, {passive: true});
  window.addEventListener('touchstart', cancelNavigation, {passive: true});
  window.addEventListener('keydown', event => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) cancelNavigation();
  });

  const initialHash = window.location.hash;
  const alignInitialHash = () => {
    updateHeader();
    if (initialHash && !userNavigated && window.location.hash === initialHash) navigate(initialHash);
    setCurrentLink();
  };
  window.addEventListener('load', alignInitialHash, {once: true});
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(alignInitialHash);

  privacyOpen.addEventListener('click', () => {
    setMenu(false);
    if (typeof privacy.showModal === 'function') privacy.showModal();
    else privacy.setAttribute('open', '');
    syncFloatContact();
  });
  function closePrivacy() {
    if (typeof privacy.close === 'function') privacy.close();
    else privacy.removeAttribute('open');
    privacyOpen.focus({preventScroll: true});
    syncFloatContact();
  }
  document.getElementById('privacy-close').addEventListener('click', closePrivacy);
  privacy.addEventListener('close', syncFloatContact);
  privacy.addEventListener('click', event => {
    if (event.target !== privacy) return;
    const bounds = privacy.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closePrivacy();
  });

  function syncFloatContact() {
    const viewportHeight = document.documentElement.clientHeight;
    const contactVisible = [contactPanel, footer].some(element => {
      const bounds = element.getBoundingClientRect();
      return bounds.top < viewportHeight && bounds.bottom > headerHeight();
    });
    const hide = privacy.open || contactVisible;
    floatContact.classList.toggle('is-suppressed', hide);
    floatContact.setAttribute('aria-hidden', String(hide));
    if (hide) floatContact.setAttribute('tabindex', '-1');
    else floatContact.removeAttribute('tabindex');
  }
  window.addEventListener('resize', syncFloatContact, {passive: true});
  syncFloatContact();
  setCurrentLink();
})();
