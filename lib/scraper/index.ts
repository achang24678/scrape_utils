"use server";

// const puppeteer = require("puppeteer");
// const chromium = require("chrome-aws-lambda") // using chrome-aws-lambda so puppeteer can work on vercel deployment
const chromium = require('@sparticuz/chromium-min');
const puppeteer = require('puppeteer-core');
let _page;

async function getBrowser() {
    // local development is broken for this 👇
    // but it works in vercel so I'm not gonna touch it
    return puppeteer.launch({
        args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(
            `https://github.com/Sparticuz/chromium/releases/download/v116.0.0/chromium-v116.0.0-pack.tar`
        ),
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
    });
}

async function getPage() {
    if (_page) return _page;

    const browser = await getBrowser();
    _page = await browser.newPage();
    return _page;
}

function delay(time: number) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

export async function scrapeProduct(productIds: string[]) {
    // const browser = await puppeteer.launch({ headless: "new", slowMo: 10 });
    // const browser = await chromium.puppeteer.launch({
    //     args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    //     defaultViewport: chromium.defaultViewport,
    //     executablePath: await chromium.executablePath,
    //     headless: true,
    //     ignoreHTTPSErrors: true,
    // })
    // const page = await browser.newPage();
    const page = await getPage();

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

    // console.log(`FINISHED SCRAPING, YOU SCRAPED TOTAL OF ${usersArray.length} Profiles`)
    // await browser.close();
}