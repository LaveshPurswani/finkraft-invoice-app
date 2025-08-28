import { chromium } from "playwright";
import { fileURLToPath } from "url";
import path, { join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AIRLINE_URL =
  "https://thaiair.thaiairways.com/ETAXPrint/pages/passengerPages/passengerHomePage.jsp";

export async function downloadPDF(passenger) {
  const browser = await chromium.launch({ headless: false, slowMo: 200 });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // 1. Go to airline portal
    await page.goto(AIRLINE_URL);

    // 2. Fill ticket number, first name, last name
    await page.fill("#ticketNo", passenger.ticketNumber.toString());
    const [firstName, ...lastParts] = passenger.name.split(" ");
    await page.fill("#firstName", firstName);
    await page.fill("#lastName", lastParts.join(" "));

    // 3. Search
    await page.click('button[onclick="search()"]');
    await page.waitForSelector("#searchResults");

    // 4. Select passenger record
    await page.click("#selectAllCheckbox");

    // 5. Click View
    await page.click(".view-button");

    // 6. Wait for invoice container
    await page.waitForSelector("#divprint");

    // 7. Save page as PDF (no download event required)
    const filePath = join(
      __dirname,
      `../invoices/${passenger.ticketNumber}.pdf`
    );
    await page.pdf({ path: filePath, format: "A4", printBackground: true });

    await browser.close();
    return filePath;
  } catch (error) {
    await browser.close();
    throw new Error(
      `Failed to download for ${passenger.name}: ${error.message}`
    );
  }
}