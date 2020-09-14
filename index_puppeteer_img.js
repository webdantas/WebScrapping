const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.petz.com.br/cachorro');

    
  const imgList = await page.evaluate(() => {

    const [e1] = page.$x('/html/body/div[9]/div[2]/div[2]/div[2]/ul/li[1]/div/a[3]/h3');
    const text = e1.getProperty('textContent');
    const name = text.jsonValue();

    const [e12] = page.$x('/html/body/div[9]/div[2]/div[2]/div[2]/ul/li[1]/div/a[2]/img/src');
    const src = e12.getProperty('src');
    const avatarURL = src.jsonValue();

    console.log(imgList)

    return imgList
        
  });

  // fs.writeFile('results_img.json', JSON.stringify(imgList, null, 2), err => {
  //   if (err) throw new Error('Algo deu errado')
    
  //   console.log('Deu tudo certo')
  // })


  await browser.close();

})();
