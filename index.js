const puppeteer = require('puppeteer');

(async () => {
  // Open a browser
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true
  });

  const delay = (time) => {
    return new Promise((resolve) => {
      setTimeout(resolve, time)
    });
  };

  try {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(120000);

    // Go to website
    await page.goto('https://popcat.click/');
    await page.waitForSelector('.cat-img', { visible: true });

    let i;
    while (true) {
      const popcat = await page.$('div.cat-img');
      await popcat.click({ clickCount: 1, delay: 100 });
      i++;
      if (i % 100 === 0) {
        await delay(500 + (Math.floor(Math.random() * 100)));
      }
    }
  } catch (err) {
    console.error(err);
    // Close the browser
    await browser.close();
  }
})();
