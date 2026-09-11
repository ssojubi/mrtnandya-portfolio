const themeBtn = document.getElementById('themeBtn');
const html = document.documentElement;
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
let savedTheme;
try { savedTheme = localStorage.getItem('portfolio-theme'); } catch { /* Storage may be unavailable. */ }
const applyTheme = (dark) => {
  html.dataset.theme = dark ? 'dark' : 'light';
  themeBtn.textContent = dark ? '☀️' : '🌙';
  const label = `Switch to ${dark ? 'light' : 'dark'} theme`;
  themeBtn.setAttribute('aria-label', label);
  themeBtn.title = label;
};
applyTheme(savedTheme ? savedTheme === 'dark' : systemTheme.matches);
themeBtn.addEventListener('click', () => {
  applyTheme(html.dataset.theme !== 'dark');
  savedTheme = html.dataset.theme;
  try { localStorage.setItem('portfolio-theme', savedTheme); } catch { /* Theme still works without storage. */ }
});
systemTheme.addEventListener('change', (event) => {
  if (!savedTheme) applyTheme(event.matches);
});
