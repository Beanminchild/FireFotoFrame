
(function() {
  const urls = [
    "https://www.icloud.com/sharedalbum/#B1z53qWtHqA2mdx",
    "https://youtube.com",
    "https://duckduckgo.com"
  ];
  const delayMs = 3000; // 30 seconds

  function redirectRandom() {
    const choice = urls[Math.floor(Math.random() * urls.length)];
    window.location.href = choice;
  }

  // Start timer
  setTimeout(redirectRandom, delayMs);
})();

