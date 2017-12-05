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
       price: result.querySelector('.ch-price').textContent,
       name: result.querySelector('a').textContent,
       year: result.querySelector('.destaque > strong:nth-child(1)').textContent,
       kms: result.querySelector('.destaque > strong:nth-child(3)').textContent
     }
   });
  return results
 });

 console.log(cars)

 browser.close()

}

run()

