module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },
  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (element) => element.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },
  selectSeat: async function (page, row, seatNumber) {
    try {
      const seatSelector = `div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${seatNumber})`;
      await clickElement(page, seatSelector);
    } catch (error) {
      throw new Error(`Error selecting seat in row ${row} and seat number ${seatNumber}`);
    }
  },
};