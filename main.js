
(function() {
  const urls = [

    "https://beanminchild.github.io/FireFotoFrame/christmasClock",
    "https://duckduckgo.com/?q=weather+in+plum+pa&atb=v481-1&ia=web",
    "https://www.icloud.com/sharedalbum/#B1z53qWtHqA2mdx;838712E6-32BA-4E77-8DDD-788F7B8DCC6E", //DGR3
    "https://www.icloud.com/sharedalbum/#B1z53qWtHqA2mdx;8A7A530D-5F4B-4087-9A62-9A628764E16B", //DGR3
    "https://www.icloud.com/sharedalbum/#B1z59UlCqrHT7vf;155BA3C5-80F4-4208-9BF8-927FFC284689", //CCR
    "https://www.icloud.com/sharedalbum/#B2HG4TcsmGRbn4W;1759FBD5-37FD-4436-9497-B5F516BFB245", //bestofgorlie
    "https://www.icloud.com/sharedalbum/#B1zGfnH8tqM1vul;85F12A9F-94FC-4BFD-B970-DF4174D986B1", //Deepcreek2025
    "https://www.icloud.com/sharedalbum/#B1zGrq0zwqrpHfU;C4BB296F-AA12-441D-BCA5-917636068EBA", //Digital repo part II
    "https://www.icloud.com/sharedalbum/#B1zGqkRUiqraMoC;42AB7D37-9CF3-4476-BF69-819F47768A49", //Boston Trip
    "https://www.icloud.com/sharedalbum/#B1z5ON9t3rYEe9K;E72C81DD-B9DC-41B9-B8AF-F45E1496C4E0", //lake trip
    "https://www.icloud.com/sharedalbum/#B1zJ0DiRHPTdtH7;433CC241-1FCC-4D87-B23F-E338FA2CB231", // ohiopile
    "https://www.icloud.com/sharedalbum/#B1zG4TcsmqOoZFQ;ADF0FA87-0483-4D40-B13C-9E927DF1E440", //DGR1
    "https://www.icloud.com/sharedalbum/#B1x5M7GFPJRnk4P;90AAD6BE-1D1E-4C7A-BC93-E086E71588F2", //WHO




    



    
  ];
  const delayMs = 30000; // 30 seconds

  function redirectRandom() {
    const choice = urls[Math.floor(Math.random() * urls.length)];
    window.location.href = choice;
  }

  // Start timer
  setTimeout(redirectRandom, delayMs);
})();

