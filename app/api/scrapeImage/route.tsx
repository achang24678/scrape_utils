// import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import * as fs from 'fs';
// import { productIds } from "../../../pid"

function delay(time: number) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

export async function GET() {
    const browser = await puppeteer.launch({ headless: false, slowMo: 10 });
    const page = await browser.newPage();

    let results: any = [];

    for (const pid of []) {
        // const userUrl = `https://shop.tiktok.com/view/product/${pid}?region=US&locale=en`;
        const userUrl = pid;

        await page.goto(userUrl);

        const imgs = await page.$$eval('.index-item--XKK77 img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        if (imgs.length) {
            results.push(imgs[0])
            fs.writeFileSync("productImgUrl.json", JSON.stringify(results, null, 2));
        }
        // delay 5 - 10 secs
        const randomDelayTime = Math.floor(Math.random() * (6000 - 5000 + 1)) + 5000;
        // console.log(`Done scraping user: ${username}, waiting ${randomDelayTime} seconds...`)
        await delay(randomDelayTime)
    }

    // console.log(`FINISHED SCRAPING, YOU SCRAPED TOTAL OF ${usersArray.length} Profiles`)
    // await browser.close();
}