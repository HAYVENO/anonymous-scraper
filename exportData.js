import fs from 'fs/promises';
import { json2csv } from 'json-2-csv';

// EXPORT DATA to JSON
export const exportToJSON = async (data, filename = 'scraped-data.json') => {
  try {
    // prettified JSON output
    await fs.writeFile(filename, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Data exported successfully to ${filename}`);
  } catch (err) {
    console.error(err);
  }
};

export const exportToCSV = async (data, filePath = 'scraped-data.csv') => {
  try {
    // Convert JSON data to CSV format
    const csvData = json2csv(data);

    // Write the CSV data to a file
    await fs.writeFile(filePath, csvData);

    console.log(`Data successfully exported to ${filePath} ✅`);
  } catch (error) {
    console.error('Error exporting data to CSV ->', error);
  }
};

export default exportToCSV;
