
(function() {
  const urls = [
    "https://www.icloud.com/sharedalbum/#B1z53qWtHqA2mdx;E79A6A02-A0A5-4D5B-BEED-E466B2290865",
    "https://www.icloud.com/sharedalbum/#B1z59UlCqrHT7vf;B03A76C0-A83E-4BF6-A556-4816F61E0FAE",
    "https://www.icloud.com/sharedalbum/#B1z53qWtHqA2mdx;ECB02A21-237B-42C3-AA1F-55A85FCB5364",
    "https://www.icloud.com/sharedalbum/#B1z53qWtHqA2mdx;D648FB96-72DD-48C8-B117-764E9BEBF74D",
    "https://www.icloud.com/sharedalbum/#B1zG4TcsmqOoZFQ;8466AF58-15BE-48F9-9F78-5E460F44522D",
    "https://www.icloud.com/sharedalbum/#B1zG4TcsmqOoZFQ;466E890E-C9EF-4352-8398-33856093337E",
    "https://www.icloud.com/sharedalbum/#B1z5qXGF1r4LPMn;4AEA6C3A-2CDA-4159-B38B-DC1848CD3966",
    "https://www.icloud.com/sharedalbum/#B1zG4TcsmqOoZFQ;1B17276D-3239-4340-9FF7-CB19115B104D",
    'https://www.icloud.com/sharedalbum/#B1zGfnH8tqM1vul;B84879FC-40C2-4AB7-AEEB-265F840FBBE3',
    'https://www.icloud.com/sharedalbum/#B1zGfnH8tqM1vul;8598FF63-F82C-46B9-8E5B-4837D6D36768',
    'https://www.icloud.com/sharedalbum/#B1zGrq0zwqrpHfU;4B99F8C2-4CA1-4FB7-8BBC-D4D7B26E2622',
    'https://www.icloud.com/sharedalbum/#B1zGrq0zwqrpHfU;780E8127-8BEE-4967-A772-758E08BBD083',
    'https://www.icloud.com/sharedalbum/#B1z59UlCqrHT7vf;FE5A2DD5-745B-4060-9976-088C05255F3B',
    'https://www.icloud.com/sharedalbum/#B1zGrq0zwqrpHfU;B99281AA-6230-49E6-A36D-2562F408E6E3',
    'https://uva.theopenscholar.com/abebayehu-lab',
    
    "https://duckduckgo.com/?q=weather+in+plum+pa&atb=v481-1&ia=web",

    
  ];
  const delayMs = 30000; // 30 seconds

  function redirectRandom() {
    const choice = urls[Math.floor(Math.random() * urls.length)];
    window.location.href = choice;
  }

  // Start timer
  setTimeout(redirectRandom, delayMs);
})();

