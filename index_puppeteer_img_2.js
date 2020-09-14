const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapChannel(url) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [e1] = await page.$x('/html/body/div[9]/div[2]/div[2]/div[2]/ul/li[1]/div/a[3]/h3');
    const text = await e1.getProperty('textContent');
    const name = await text.jsonValue();

    const [e12] = await page.$x('/html/body/div[9]/div[2]/div[2]/div[2]/ul/li[1]/div/a[2]/img/src');
    const src = await e12.getProperty('src');
    const avatarURL = await src.jsonValue();

    browser.close();

    console.log({name, avatarURL})

    return { name, avatarURL }
    
        
  }(

  fs.writeFile('results_img.json', JSON.stringify([name, avatarURL], null, 2), err => {
    if (err) throw new Error('Algo deu errado')
    
    console.log('Deu tudo certo')
  })
  )



scrapChannel('1https://www.petz.com.br/cachorro')