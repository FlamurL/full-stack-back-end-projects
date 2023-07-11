const puppeteer = require("puppeteer");
const Company = require('./models/Company.js');

const scrapeCompanies = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://biznismreza.mk/Marketing/All-ads?grad=53&gradName=%D0%A1%D0%BA%D0%BE%D0%BF%D1%98%D0%B5");

    let companyCount = 0;
    let pageNum = 1;

    while (companyCount < 10) {
      const grabBusinesses = await page.evaluate(() => {
        const businessElements = document.querySelectorAll(".bm-ad-item-body");
        const businessArr = [];

        businessElements.forEach((businessTag) => {
          const busTitle = businessTag.querySelector(".bm-ad-item-title").textContent;
          const busCity = businessTag.querySelector(".bm-ad-item-info a").textContent;

          businessArr.push({
            name: busTitle,
            city: busCity,
          });
        });

        return businessArr;
      });

      for (const business of grabBusinesses) {
        try {
          await Company.create({
            name: business.name,
            city: business.city
          });
          console.log('Data saved:', business);
          companyCount++;
        } catch (error) {
          console.error('Error saving data:', error);
        }
      }

      if (companyCount < 10) {
        pageNum++;
        const nextPageLink = await page.$(`.bm-paging-list a:nth-child(${pageNum})`);
        if (nextPageLink) {
          await nextPageLink.click();
          await page.waitForNavigation({ waitUntil: 'networkidle0' });
        } else {
          break;
        }
      }
    }

    await browser.close();

    console.log("Scraping completed successfully!");
  } catch (error) {
    console.error('Error during scraping:', error);
  }
};

scrapeCompanies();
