/* eslint-disable no-undef */

// STATIC DATA SCRAPING USING CHEERIO AND USER-AGENT ROTATION

import * as cheerio from 'cheerio';
import UserAgent from 'user-agents';

const fetchStaticData = async () => {
  try {
    const PAGE_URL = 'https://books.toscrape.com/';

    // Create a new User-Agent instance
    const userAgent = new UserAgent();
    const randomUserAgent = userAgent.random().toString();

    // Send GET request with a random user-agent
    const response = await fetch(PAGE_URL, {
      headers: {
        'User-Agent': randomUserAgent,
      },
    });

    const html = await response.text();

    // Load the HTML into Cheerio for parsing
    const $ = cheerio.load(html);
    const selectors = { name: 'article > h3 > a', price: 'p.price_color' };

    // Extract all product data from the first page
    const productElement = $('.product_pod');
    const products = [];
    productElement.each(function() {
      const name = $(this)
        .find(selectors.name)
        .text()
        .trim();
      const price = $(this)
        .find(selectors.price)
        .text()
        .trim();

      products.push({ name, price });
    });

    console.log('products ->', products);
  } catch (error) {
    // Handle errors
    console.error('Error scraping Data -->', error);
  }
};

// Run the scraper function
fetchStaticData();
