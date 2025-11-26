
(function() {
  const urls = [
    "https://www.icloud.com/sharedalbum/#B1z53qWtHqA2mdx",
    
    "https://duckduckgo.com/?q=weather+in+plum+pa&atb=v481-1&ia=web"
  ];
  const delayMs = 5000; // 30 seconds

  function redirectRandom() {
    const choice = urls[Math.floor(Math.random() * urls.length)];
    window.location.href = choice;
  }

  // Start timer
  setTimeout(redirectRandom, delayMs);
})();

