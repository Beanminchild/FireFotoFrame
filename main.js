
(function() {
  const urls = [

    "https://beanminchild.github.io/FireFotoFrame/regularClock",
    "https://duckduckgo.com/?q=weather+in+plum+pa&atb=v481-1&ia=web",
    "https://www.icloud.com/sharedalbum/#B1z53qWtHqA2mdx;838712E6-32BA-4E77-8DDD-788F7B8DCC6E", //DGR3
    "https://www.icloud.com/sharedalbum/#B1z53qWtHqA2mdx;8C2DB22B-831E-49C3-9D4B-EDD717193EE4", //DGR3
    "https://www.icloud.com/sharedalbum/#B1z59UlCqrHT7vf;155BA3C5-80F4-4208-9BF8-927FFC284689", //CCR
    "https://www.icloud.com/sharedalbum/#B2HG4TcsmGRbn4W;1759FBD5-37FD-4436-9497-B5F516BFB245", //bestofgorlie
    "https://www.icloud.com/sharedalbum/#B1zGfnH8tqM1vul;85F12A9F-94FC-4BFD-B970-DF4174D986B1", //Deepcreek2025
    "https://www.icloud.com/sharedalbum/#B1zGrq0zwqrpHfU;C4BB296F-AA12-441D-BCA5-917636068EBA", //Digital repo part II
    "https://www.icloud.com/sharedalbum/#B1zGqkRUiqraMoC;42AB7D37-9CF3-4476-BF69-819F47768A49", //Boston Trip
    "https://www.icloud.com/sharedalbum/#B1z5ON9t3rYEe9K;E72C81DD-B9DC-41B9-B8AF-F45E1496C4E0", //lake trip
   
    
    "https://www.icloud.com/sharedalbum/#B1zG4TcsmqOoZFQ;ADF0FA87-0483-4D40-B13C-9E927DF1E440", //DGR1
    "https://www.icloud.com/sharedalbum/#B1x5M7GFPJRnk4P;90AAD6BE-1D1E-4C7A-BC93-E086E71588F2", //WHO
    "https://www.icloud.com/sharedalbum/#B1z5qXGF1r4LPMn;64CA806E-65A0-4065-9559-29733E1F7F27", //end family thanksgiving part II
    "https://www.icloud.com/sharedalbum/#B1z5nhQSTrRUltf;BDD03EA0-7FC7-4864-A069-59D7E510F299", //bidges baptims
    
    "https://www.icloud.com/sharedalbum/#B1zGWZuqDqPg0LW;8DE426BD-C27F-462C-ABB2-B3F015D6AC4D", //the gang attempts a family vacation
    "https://www.icloud.com/sharedalbum/#B1zGY8gBYq8xewJ;7E00DE24-A3E6-4488-98AD-FA74F7DDC71E", // bidges adoption zacgs version
    




    



    
  ];
  const delayMs = 10000; // 30 seconds

  function redirectRandom() {
    const choice = urls[Math.floor(Math.random() * urls.length)];
    window.location.href = choice;
  }

  // Start timer
  setTimeout(redirectRandom, delayMs);
})();

