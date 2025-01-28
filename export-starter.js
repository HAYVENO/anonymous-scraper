/* eslint-disable import/extensions */

import fetchStaticData from './anon-scraper1.js'; // Import the scraper function
import { exportToJSON } from './exportData.js';

const exportData = async () => {
  try {
    // Get the data from the scraper
    const scrapedData = await fetchStaticData();
    console.log('🚀 ~ exportData ~ scrapedData:', scrapedData);

    // WRITE EXPORT LOGIC HERE ↓
    await exportToJSON(scrapedData);
    //
  } catch (error) {
    console.error('Error exporting data ->', error);
  }
};

// Run the export function
exportData();
