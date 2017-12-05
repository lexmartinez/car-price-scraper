'use strict'

const puppeteer = require('puppeteer')

async function run() {

 const browser = await puppeteer.launch({headless: false})
 const page = await browser.newPage()

 await page.goto('https://www.tucarro.com.co/')
 await page.waitForSelector('.nav-search-submit')
 await page.click('button[type=submit]')

 browser.close()

}

run()

