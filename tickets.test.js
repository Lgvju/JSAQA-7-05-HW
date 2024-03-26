const { clickElement, getText, selectSeat } = require('./lib/commands.js');
const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch();
});

afterAll(async () => {
    await browser.close();
});

beforeEach(async () => {
    page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto('http://qamid.tmweb.ru/client/index.php');
});

afterEach(async () => {
    await page.close();
});

describe('Ticket booking tests', () => {
    test('Should successfully book one ticket', async () => {
        await clickElement(page, '.page-nav > a:nth-child(5)');
        await clickElement(page, 'a.movie-seances__time');
        await selectSeat(page, 2, 1);
        await clickElement(page, 'button.acceptin-button');
        await clickElement(page, 'button.acceptin-button');
        const actual = await getText(page, 'p.ticket__hint');
        expect(actual).toContain('Покажите QR-код нашему контроллеру для подтверждения бронирования.');
    });

    test('Should successfully book two tickets', async () => {
        await clickElement(page, '.page-nav > a:nth-child(5)');
        await clickElement(page, 'a.movie-seances__time');
        await selectSeat(page, 2, 2);
        await selectSeat(page, 2, 3);
        await clickElement(page, 'button.acceptin-button');
        await clickElement(page, 'button.acceptin-button');
        const actual = await getText(page, 'p.ticket__hint');
        expect(actual).toContain('Покажите QR-код нашему контроллеру для подтверждения бронирования.');
    });

    test('Should unsuccessfully book already booked ticket', async () => {
        await clickElement(page, '.page-nav > a:nth-child(5)');
        await clickElement(page, 'a.movie-seances__time');
        await selectSeat(page, 2, 1);
        expect(String(await page.$eval("button", (button) => {
	    return button.disabled;}))).toContain("true");
	});
});