(() => {
  const root = document.documentElement;
  const storageKey = 'opencure-theme';

  function ensureFavicon() {
    const href = '/favicon.svg?v=2';
    let icon = document.querySelector('link[rel="icon"]');
    if (!icon) {
      icon = document.createElement('link');
      icon.rel = 'icon';
      document.head.appendChild(icon);
    }
    icon.type = 'image/svg+xml';
    icon.href = href;

    let shortcut = document.querySelector('link[rel="shortcut icon"]');
    if (!shortcut) {
      shortcut = document.createElement('link');
      shortcut.rel = 'shortcut icon';
      document.head.appendChild(shortcut);
    }
    shortcut.href = href;
  }

  function getSavedTheme() {
    try { return localStorage.getItem(storageKey); } catch (_) { return null; }
  }

  function saveTheme(theme) {
    try { localStorage.setItem(storageKey, theme); } catch (_) {}
  }

  function preferredTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      const next = theme === 'dark' ? 'light' : 'dark';
      button.setAttribute('aria-label', `Switch to ${next} mode`);
      button.setAttribute('title', `Switch to ${next} mode`);
      const icon = button.querySelector('[data-theme-icon]');
      const label = button.querySelector('[data-theme-label]');
      if (icon) icon.textContent = theme === 'dark' ? '☀' : '☾';
      if (label) label.textContent = theme === 'dark' ? 'Light' : 'Dark';
    });
  }

  ensureFavicon();
  applyTheme(getSavedTheme() || root.dataset.theme || preferredTheme());

  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-theme-toggle]');
    if (!button) return;
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    saveTheme(next);
    applyTheme(next);
  });
})();