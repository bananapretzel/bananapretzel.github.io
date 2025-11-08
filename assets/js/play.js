document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('playNow');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const url = btn.dataset.url;
    if (!url) return;

    // Validate the URL to prevent open redirect vulnerabilities
    if (!url.startsWith('https://github.com/')) return;

    // Let the browser handle the download (GitHub Releases sets attachment headers)
    window.location.assign(url);
  });
});