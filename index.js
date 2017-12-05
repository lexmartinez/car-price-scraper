'use strict'

const puppeteer = require('puppeteer')

async function run() {

 const browser = await puppeteer.launch()
 const page = await browser.newPage()

 await page.goto('https://www.tucarro.com.co/')
 await page.waitForSelector('.nav-search-submit')
 await page.click('button[type=submit]')
 await page.waitForSelector('#id_category > dd:nth-child(2) > h3 > a')
 await page.click('#id_category > dd:nth-child(2) > h3 > a');
 await page.waitForSelector('.ch-pagination')
 const cars = await page.evaluate(() => {
  const results = Array.from(document.querySelectorAll('li.results-item'));
  return results.map(result => {
     return {
       link: result.querySelector('a').href,
       price: Number((result.querySelector('.ch-price').textContent).replace(/[^0-9-]+/g,"")),
       name: result.querySelector('a').textContent,
       year: Number(result.querySelector('.destaque > strong:nth-child(1)').textContent),
       kms: Number((result.querySelector('.destaque > strong:nth-child(3)').textContent).replace(/[^0-9-]+/g,""))
     }
   });
  return results
 });


 let car = {score: 0}
 for (let i = 0; i < cars.length; i++) {
    cars[i].score = (4 * (1/(cars[i].price/1000000))) + (3 * (cars[i].year/1000)) + (3 * (1/(cars[i].kms/1000)))
    if(cars[i].score > car.score){
      car = cars[i]
    }
 }
 console.log(car)

 await page.goto(car.link)
 await page.waitForSelector('.gallery__thumbnail')
 await page.screenshot({path: 'result.png', fullPage: true});

 browser.close()

}

run()

