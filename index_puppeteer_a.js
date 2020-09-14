const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.petz.com.br/cachorro');
    
  const imgList = await page.evaluate(() => {
      
    //   const nodeList = document.querySelectorAll('li.liProduct:nth-child(1) > div:nth-child(2) > a:nth-child(2) > img:nth-child(1)')
      
         
      const nodeList = document.querySelectorAll('li.liProduct')
      console.log(nodeList)
         
    
    // 1ª imagem
    //   child(1) imagem | child(2) não identificado | child(2) texto nome | child(2) não identif | 
    //   li.liProduct: nth - child(1) > div: nth - child(2) > a: nth - child(2) > img: nth - child(1)
    //   li.liProduct: nth - child(1) > div: nth - child(2) > a: nth - child(3) > h3: nth - child(1)
      
    // 2ª imagem
    //   child(1) imagem | child(2) não identificado | child(2) texto nome | child(2) não identif | 
    //   li.liProduct: nth - child(2) > div: nth - child(2) > a: nth - child(2) > img: nth - child(1)
    //   li.liProduct:nth-child(4) > div:nth-child(2) > a:nth-child(2) > img:nth-child(1)
    
      
      
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


//   await browser.close();

})();
