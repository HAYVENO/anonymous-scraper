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

// FINGERPRINT.COM TEST
const fingerprintProTest = async browser => {
  try {
    const page = await browser.newPage();

    // Navigate to the Fingerprint website
    await page.goto('https://fingerprint.com', {
      waitUntil: 'networkidle2',
    });

    await delay(10000);
    try {
      // Confirm cookies to access page
      await page.waitForSelector('#hs-eu-confirmation-button', { visible: true, timeout: 5000 });
      await page.click('#hs-eu-confirmation-button');
      console.log('Accept button clicked.');
    } catch (error) {
      // Check if the error is a TimeoutError
      if (error.name === 'TimeoutError') {
        console.log(
          'Accept button not found within the specified timeout. Continuing without clicking.'
        );
      } else {
        // Handle other potential errors
        console.error('An unexpected error occurred:', error);
      }
    }

    // Take a screenshot of the page
    await page.screenshot({ path: 'fingerprint-test.png', fullPage: true });

    console.log('>>> Screenshot of Fingerprint page saved as "fingerprint-test.png" 📸 <<<');

    await page.close();
  } catch (error) {
    console.error('Error during Fingerprint test ->', error);
  }
};

const runFingerprintProTest = async () => {
  const browser = await startIncogniton({ profileId: incognitonProfileId });
  await fingerprintProTest(browser);
  browser.close();
};

runFingerprintProTest();
