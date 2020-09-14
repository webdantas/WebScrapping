const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.petz.com.br/cachorro');
    
  const imgList = await page.evaluate(() => {
      
    const nodeList = document.querySelectorAll('li.liProduct:nth-child(1) > div:nth-child(2) > a:nth-child(2) > img:nth-child(1)')
    
    const imgArray = [...nodeList]

    const imgList = imgArray.map(({ src }) => ({
      src
    }))

    return imgList
        
  });

  fs.writeFile('results.json', JSON.stringify(imgList, null, 2), err => {
    if (err) throw new Error('Algo deu errado')
    
    console.log('Deu tudo certo')
  })


  await browser.close();

})();
