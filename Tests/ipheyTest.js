import puppeteer from 'puppeteer-core';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const incognitonProfileId = 'b0a59905-d9ac-473d-b772-05e04af77b85';

const startIncogniton = async ({ profileId }) => {
  try {
    // Configuration variables
    const launchUrl = `http://localhost:35000/automation/launch/puppeteer`;

    const requestBody = {
      profileID: profileId,
      customArgs: '--headless=new', // Default to headless mode
    };

    // Make a POST request with body data
    // eslint-disable-next-line no-undef
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

// IPHEY TRUSTWORTHINESS TEST
const ipheyTest = async browser => {
  try {
    const page = await browser.newPage();

    // Navigate to the IP test site and wait till no network requests
    await page.goto('https://iphey.com/', { waitUntil: 'networkidle0' });

    // Take a screenshot
    await page.screenshot({ path: 'iphey-result.png', fullPage: true });

    // Checks for 'trustworthy' status in the DOM
    const ipResult = await page.$eval('.trustworthy-status:not(.hide)', elt =>
      elt ? elt.innerText.trim() : ''
    );

    console.log(`>>> Your fingerprint is ${ipResult}. See iphey-result screenshot 📸 <<<`); // expected output: 'Trustworthy'

    await page.close();
  } catch (error) {
    console.error('Error during IPHEY test ->', error);
  }
};

const runIpheyTest = async () => {
  const browser = await startIncogniton({ profileId: incognitonProfileId });
  await ipheyTest(browser);
  browser.close();
};

runIpheyTest();
