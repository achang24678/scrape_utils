"use server"

// import { scrapeProduct } from "../newScraper"
import { scrapeProduct } from "../scraper"



export async function startScrape(productUrls: string[]) {
    console.log('here in startScrape');
    console.log(productUrls);

    const scrapedProducts = await scrapeProduct(productUrls);
    return scrapedProducts;
}