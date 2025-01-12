/* eslint-disable import/extensions */
/* eslint-disable no-undef */

// SCRAPE DYNAMICALLY-LOADED PAGES WITH THE INCOGNITON-PUPPETEER API NON-HEADLESS

import puppeteer from 'puppeteer-core';
import { exportToCSV } from './exportData.js';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const incognitonProfileId = '5b89263e-a6d5-450c-9b93-730d1ceb7279';

const startIncogniton = async ({ profileId }) => {
  try {
    // non-headless mode
    const launchUrl = `http://localhost:35000/automation/launch/puppeteer`;

    const requestBody = {
      profileID: profileId,
    };

    // Make a POST request with body data
    const response = await fetch(launchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    console.log('🚀 ~ startIncogniton ~ data:', data);
    const { puppeteerUrl } = data;

    // Wait for the browser to launch
    console.log('The Incogniton browser is launching... 🐌 🐌 🐌');
    await delay(30000); // ms

    // Connect Puppeteer to the launched browser
    const browser = await puppeteer.connect({
      browserURL: puppeteerUrl,
      acceptInsecureCerts: true,
    });
    console.log('🚀 ~ startIncogniton ~ browser:', browser);
    // browser.close();
    return browser;
  } catch (error) {
    console.error('Error starting Incogniton session ->', error);
    throw error;
  }
};

// SCRAPING DYNAMIC CONTENT
const scrapeRecursively = async ({ browser, givenPage, scrapeUrl, allData }) => {
  try {
    // Start Incogniton browser
    const page = givenPage;
    await page.goto(scrapeUrl, { waitUntil: 'networkidle0' });

    const quotes = await page.$$eval('.quote', elements =>
      elements.map(el => ({
        text: el.querySelector('.text').innerText.trim(),
        author: el.querySelector('.author').innerText.trim(),
      }))
    );

    allData.push(quotes);

    const nextLink = await page.$('li.next a');

    if (nextLink) {
      const href = await nextLink.evaluate(el => el.href);
      const nextUrl = new URL(href);
      console.log('🚀 ~ scrapeRecursively ~ nextUrl:', nextUrl);

      await scrapeRecursively({
        givenPage: page,
        profileId: incognitonProfileId,
        scrapeUrl: nextUrl.href,
        allData,
      });
    }

    //
    return {
      data: allData,
    };
  } catch (error) {
    console.error('Error scraping dynamically loaded content ->', error);
    throw error;
  }
};

const scrapeAllPages = async profileId => {
  try {
    const browser = await startIncogniton({ profileId });
    const page = await browser.newPage();
    console.log('🚀 ~ scrapeAllPages ~ page:', page);
    const allData = [];

    await scrapeRecursively({
      browser,
      givenPage: page,
      scrapeUrl: 'https://quotes.toscrape.com/js/',
      allData,
    });

    console.log('ALL SCRAPED DATA ->', allData);

    // EXPORT DATA TO CSV
    await exportToCSV(allData);

    browser.close();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// RUN TO SCRAPE ALL PAGES USING THE COMMAND `node anon-scraper-non-headless.js`
const { data } = scrapeAllPages(incognitonProfileId);
console.log(data);

// Run the scraping function
