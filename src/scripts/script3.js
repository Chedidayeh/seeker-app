import fs from "fs";
import puppeteer from "puppeteer";

async function fetchJusticeProfessionals() {
  const mainUrl = "https://www.allojustice.tn/avocats.php?gov=Tunis";

  const browser = await puppeteer.launch({
    headless: false, // set false to debug visually
    defaultViewport: null,
    slowMo: 100, // slow down by 100ms
  });

  const page = await browser.newPage();
  await page.goto(mainUrl, { waitUntil: "networkidle2" });

  console.log("✅ Loaded main list page.");

  // 🔹 Extract profile URLs from button onclick attributes
  const profileLinks = await page.$$eval("button[onclick*='avocat.php?id=']", (buttons) =>
    buttons
      .map((btn) => {
        const onclick = btn.getAttribute("onclick");
        const match = onclick?.match(/'([^']+)'/); // extract 'avocat.php?id=274'
        return match ? `https://www.allojustice.tn/${match[1]}` : null;
      })
      .filter(Boolean)
  );

  console.log(`📄 Found ${profileLinks.length} professional profile links.`);

  const professionals = [];

  // 🔹 Loop through each professional’s page
  for (const [index, link] of profileLinks.entries()) {
    try {
      console.log(`🔍 Visiting ${index + 1}/${profileLinks.length}: ${link}`);
      await page.goto(link, { waitUntil: "networkidle2", timeout: 30000 });

      const professional = await page.evaluate(() => {
        const getText = (sel) => document.querySelector(sel)?.innerText.trim() || "";

        const image = document.querySelector("img")?.src || null;
        const name = getText("h3");
        const title = document.querySelector("b")?.innerText.trim() || "";
        const specialties =
          document.querySelectorAll("b")[1]?.innerText.trim() || "Généraliste";
        const address =
          document
            .querySelector('img[width="14"]')
            ?.parentElement.innerText.replace("\u00a0", "")
            .trim() || "";
        const phone =
          document.querySelector('a[href^="tel:"]')?.innerText.trim() || "";
        const whatsapp =
          document.querySelector('a[href^="https://wa.me"]')?.href || null;

        return {
          name,
          title,
          specialties,
          image: image?.startsWith("http")
            ? image
            : `https://www.allojustice.tn${image}`,
          address,
          phone,
          whatsapp,
          profileUrl: window.location.href,
        };
      });

      professionals.push(professional);
      console.log(`✅ Scraped: ${professional.name} (${professional.phone})`);

      // Optional: wait between requests to avoid being blocked
      await new Promise((res) => setTimeout(res, 500));
    } catch (error) {
      console.error(`❌ Error scraping ${link}:`, error.message);
    }
  }

  // 🔹 Save results to JSON
  fs.writeFileSync(
    "justice_professionals.json",
    JSON.stringify(professionals, null, 2)
  );

  console.log(`🎉 Saved ${professionals.length} professionals to JSON file.`);

  await browser.close();
}

fetchJusticeProfessionals();
