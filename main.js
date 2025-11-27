
(function() {
  const urls = [
    "https://www.icloud.com/sharedalbum/#B1z53qWtHqA2mdx;E79A6A02-A0A5-4D5B-BEED-E466B2290865",
    "https://www.icloud.com/sharedalbum/#B1z59UlCqrHT7vf;B03A76C0-A83E-4BF6-A556-4816F61E0FAE",
    
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

