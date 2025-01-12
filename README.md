## Project Overview

The `anonymous-scraper` repository provides code examples for anonymous web scraping using Node.js. It covers two tiers of scraping techniques:

- **Tier 1**: Scraping static websites with Cheerio and user-agent rotation.

- **Tier 2**: Scraping dynamic websites with Puppeteer and Incogniton, including pagination handling.

It also includes Incogniton fingerprint trustworthiness tests using tools like [IPHey](https://iphey.com/), [FingerprintPro](https://fingerprint.com/), and [SannySoft](https://bot.sannysoft.com/), as well as a non-headless browser file so you can see how the automation process in action.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository**:

``` bash
   git clone https://github.com/HAYVENO/anonymous-scraper.git
```

2. **Navigate to the project directory**:

``` bash
   cd anonymous-scraper
```

3. **Install the necessary dependencies**:

   Ensure you have [Node.js](https://nodejs.org/) installed. Then, run:

``` bash
   npm install
```

4. **Run the scraper files**:

   Each scraper file can be executed using Node.js. For example, to run `anon-scraper2.js`, use:

``` bash
   node anon-scraper2.js
```

For files located inside a folder, such as the Tests, navigate to the `tests` directory and run the desired test file using Node.js. For example, to run `test-file.js`, use:

``` bash
   cd tests
   node test-file.js
```

Or you can run the test file directly from the root folder:
```bash
   node tests/test-file.js
```

>Replace `test-file.js` or `anon-scraper2.js` with the specific file name you wish to execute.

**Note**: Before running the scripts, review the code and any associated configuration files to ensure they are set up correctly for your target websites and comply with their terms of service.

### Fingerprint Trustworthiness Tests

| Test        | Description                                                                                   |
|-------------|-----------------------------------------------------------------------------------------------|
| **IPHey**   | Analyzes your browser's digital identity to determine its trustworthiness.  |
| **FingerprintPro** | Provides browser fingerprinting demo to identify users even when you using Incognito mode.  |
| **SannySoft**   | Evaluates whether a browser is being controlled by automation tools like Puppeteer or Selenium. |

For more information and guidance, refer to the [original article](https://hayven.dev/blog/x-scrape) associated with this repository.
