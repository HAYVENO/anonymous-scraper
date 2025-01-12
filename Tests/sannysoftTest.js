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

// SANNYSOFT BOT DETECTION TEST
const sannysoftTest = async browser => {
  try {
    const page = await browser.newPage();

    // Navigate to the Anti-bot test site
    await page.goto('https://bot.sannysoft.com/', {
      waitUntil: 'networkidle0',
    });

    await delay(10000);

    // Take a screenshot of the page
    await page.screenshot({ path: 'sannysoft-test.png', fullPage: true });

    console.log('>>> Screenshot of sannysoft bot test page saved as "sannysoft-test.png" 📸 <<<');

    await page.close();
  } catch (error) {
    console.error('Error during sannysoft bot test ->', error);
  }
};

const runSannySoftTest = async () => {
  const browser = await startIncogniton({ profileId: incognitonProfileId });
  await sannysoftTest(browser);
  browser.close();
};

runSannySoftTest();
