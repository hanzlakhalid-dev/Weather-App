const SavedTheme = localStorage.getItem('theme');
const osPreferLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const theme = SavedTheme || (osPreferLight ? 'light' : 'dark');
document.documentElement.setAttribute('data-theme', theme)
function svgColorInvert(theme){
    document.querySelectorAll('[data-light][data-dark]').forEach(img => {
    img.src = theme === 'dark' ? img.dataset.dark : img.dataset.light;
  });
}
svgColorInvert(theme)