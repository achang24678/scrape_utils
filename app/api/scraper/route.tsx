import { NextResponse, NextRequest } from 'next/server';
import puppeteer from 'puppeteer';
// import * as fs from 'fs';

// let obj = {
//     productName,
//     vendorName: "Sugo Shop",
//     price,
//     influencerComission: "20%",
//     productLink: pid,
//     imageUrl: imgs.length > 0 && imgs[0]
// }

// function converToCsv(results) {
//     let csvContent = "Product Name,Vendor Name,Price,Influencer Commission,Product Link,Image Url\n"; // Column headers
//     results.forEach(res => {
//         const { productName, vendorName, price, influencerComission, productLink, imageUrl } = res;
//         const row = `${productName},${vendorName},${price},${influencerComission},${productLink},${imageUrl}\n`;
//         csvContent += row;
//     });
//     // Write the CSV content to a file
//     fs.writeFile('products.csv', csvContent, (err) => {
//         if (err) {
//             console.error('Error writing CSV file', err);
//         } else {
//             console.log('CSV file saved as users.csv');
//         }
//     });
// }

function delay(time: number) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

export async function POST(request: NextRequest) {
    const res = await request.json() // contains body
    console.log(res);
    const { pids } = res;
    try {
        // proxy way --------
        // const browser = await puppeteer.connect({
        //     browserWSEndpoint: "wss://brd-customer-hl_6e783edd-zone-scraping_browser1:i1x25utp5yig@brd.superproxy.io:9222"
        // });

        // default way --------
        const browser = await puppeteer.launch({ headless: true, slowMo: 10 });
        const page = await browser.newPage();

        let results: any = [];

        console.log(`Start Constructing ${pids.length} items`)

        for (const pid of pids) {
            // given pids only ------
            const url = `https://shop.tiktok.com/view/product/${pid}?region=US&locale=en`;
            // given whole url ------
            // const url = pid;

            await page.goto(url);

            const imgs = await page.$$eval('.index-item--XKK77 img[src]', imgs => imgs.map(img => img.getAttribute('src')));

            const productName: any = await page.evaluate((selector) => {
                const element = document.querySelector(selector);
                return element ? element.textContent : '';
            }, '.index-title--AnTxK');

            const price: any = await page.evaluate((selector) => {
                const element = document.querySelector(selector);
                return element ? element.textContent : '';
            }, '.index-price--hHzq8');

            let obj = {
                productName,
                vendorName: "Sugu Shop",
                price,
                influencerComission: "20%",
                productLink: pid,
                imageUrl: imgs.length > 0 && imgs[0]
            }
            results.push(obj)
            // fs.writeFileSync("productImgUrl.json", JSON.stringify(results, null, 2));
            // delay 5 - 10 secs
            const randomDelayTime = Math.floor(Math.random() * (1000 + 1)) + 1000;
            // console.log(`Done scraping user: ${username}, waiting ${randomDelayTime} seconds...`)
            await delay(randomDelayTime)
        }
        console.log(`FINISHED SCRAPING, YOU SCRAPED TOTAL OF ${results.length} Items`)
        await browser.close();
        return NextResponse.json({ results })
    } catch (error) {
        console.log(error)
    }
    // converToCsv(results)
}