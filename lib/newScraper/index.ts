import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeProduct(productIds: string[]) {

    console.log('here in new scrape')

    // BrightData proxy configuration
    const username = String(process.env.BRIGHT_DATA_USERNAME)
    const password = String(process.env.BRIGHT_DATA_PASSWORD)
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;
    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false
    }
    // console.log(options)
    try {
        for (const pid of productIds) {
            const response = await axios.get(`https://shop.tiktok.com/view/product/${pid}?region=US&locale=en`, options);
            // const response = await axios.get(pid, options);

            // console.log(response.data)
            const $ = cheerio.load(response.data);
            // const imageUrls = [];
            // $('.index-item--XKK77 img[src]').each((i, elem) => {
            //     const src = $(elem).attr('src');
            //     if (src) {
            //         imageUrls.push(src);
            //     }
            // });
            const title = $('#root .index-title--AnTxK').text().trim();
            // const title = $('#productTitle').text().trim();

            // const imgUrl = $('.index-item--XKK77 img[src]').text().trim();
            console.log(title)
        }

    } catch (error: any) {
        throw new Error('Failed to scrape product: ', error)
    }

}