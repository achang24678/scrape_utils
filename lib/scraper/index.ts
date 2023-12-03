"use server";

const puppeteer = require("puppeteer");
// const chromium = require("chrome-aws-lambda") // using chrome-aws-lambda so puppeteer can work on vercel deployment
// const chromium = require('@sparticuz/chromium-min');
// const chromium = require('@sparticuz/chromium');
// const puppeteer = require('puppeteer-core');

function delay(time: number) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

export async function scrapeProduct(productIds: string[]) {
    const browser = await puppeteer.launch({ headless: "new", slowMo: 10 });
    // console.log(process.env.SBR_WS_ENDPOINT)
    // const browser = await puppeteer.connect({
    //     browserWSEndpoint: "wss://brd-customer-hl_6e783edd-zone-scraping_browser1:i1x25utp5yig@brd.superproxy.io:9222"
    // });
    // const browser = await chromium.puppeteer.launch({
    //     args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    //     defaultViewport: chromium.defaultViewport,
    //     executablePath: await chromium.executablePath,
    //     headless: true,
    //     ignoreHTTPSErrors: true,
    // })
    // const browser = await puppeteer.launch({
    //     args: chromium.args,
    //     defaultViewport: chromium.defaultViewport,
    //     executablePath: await chromium.executablePath(),
    //     headless: chromium.headless,
    //     ignoreHTTPSErrors: true,
    // });

    const page = await browser.newPage();
    // const page = await getPage();

    let results: any = [];

    for (const pid of productIds) {
        const userUrl = `https://shop.tiktok.com/view/product/${pid}?region=US&locale=en`;
        // const userUrl = pid;

        await page.goto(userUrl, {
            waitUntil: 'domcontentloaded'
        });

        await page.setViewport({
            width: 1000,
            height: 600,
        });

        // test
        await page.waitForSelector('.index-item--XKK77 img[src]', { timeout: 5 * 60 * 1000 });


        const imgs = await page.$$eval('.index-item--XKK77 img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        if (imgs.length) {
            results.push(imgs[0])
            // fs.writeFileSync("productImgUrl.json", JSON.stringify(results, null, 2));
        }
        // delay 5 - 10 secs
        const randomDelayTime = Math.floor(Math.random() * (1000 + 1)) + 3000;
        // console.log(`Done scraping user: ${username}, waiting ${randomDelayTime} seconds...`)
        await delay(randomDelayTime)
    }

    console.log(results);
    await browser.close();
    return results;

    console.log(`FINISHED SCRAPING, YOU SCRAPED TOTAL OF ${usersArray.length} Profiles`)
    await browser.close();
}