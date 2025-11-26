
(function() {
  const urls = [
    "https://example.com",
    "https://example.org",
    "https://duckduckgo.com"
  ];
  const delayMs = 30000; // 30 seconds

  function redirectRandom() {
    const choice = urls[Math.floor(Math.random() * urls.length)];
    window.location.href = choice;
  }

  // Start timer
  setTimeout(redirectRandom, delayMs);
})();

