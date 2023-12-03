'use client';

import { useState, useRef } from 'react';
import { scrapeProduct } from '@/lib/scraper';
import CustomButton from './CustomButton'
import Image from 'next/image';
import Clipboard from "./Clipboard";

import { startScrape } from '@/lib/actions';


const Main = () => {
    const [pids, setPids] = useState([]);
    const [loading, setLoading] = useState(false);
    const [scrapedResult, setScrapedResult] = useState([]);
    const scrape = async () => {
        const res = await fetch("/api/scraper", {
            // cache: "no-store",
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: "hello",
                pids
            })
        });
        const response = await res.json();
        console.log(response)
    }
    const handleScrape = async () => {
        try {
            console.log(pids)
            setLoading(true);
            // const res = await scrapeProduct(pids);
            const res = await startScrape(pids)
            setScrapedResult(res)
            setLoading(false);
            console.log(res);
        } catch (e) {
            console.error(e)
        }
    }
    return (
        <div className="hero">
            <div className="flex-1 pt-36 padding-x">
                <h1 className="hero__title">
                    Post Pids Line By Line
                </h1>
                <p className="hero__subtitle">
                    Then Click On Scrape Image
                </p>
                <div className="flex justify-between gap-10">
                    <div className="flex flex-col w-[50%]">
                        <textarea
                            onChange={e => {
                                let newPids: any = e.target.value.split('\n');
                                setPids(newPids)
                            }}
                        />
                        {loading && <div>New LOADING...</div>}
                        <CustomButton
                            title="Scrape Babe"
                            containerStyles="bg-primary-blue text-white rounded-full mt-10"
                            handleClick={scrape}
                        />
                    </div>
                    {/* <div className="flex flex-col w-[50%]">
                        {scrapedResult && scrapedResult?.map((img, index) => (
                            <div key={index}>{img}</div>
                        ))}
                    </div> */}
                    <Clipboard urls={scrapedResult} />
                </div>
            </div>
            {/* <div className="hero__image-container">
                <div className="hero__image">

                    <Image src="/hero.png" alt="hero" fill className="object-contain" />
                    <div className="hero__image-overlay"></div>
                </div>
            </div> */}
        </div>
    )
}

export default Main