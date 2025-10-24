import fs from "fs";
import puppeteer from "puppeteer";

// List of governorates
const governorates = [
  "Tunis","Ariana","Sfax","Sousse","Ben Arous","Manouba","Monastir",
  "Nabeul","Beja","Zaghouan","Mahdia","Sidi Bouzid","Jendouba",
  "Kasserine","Kairouan","Tozeur","Gabes","Gafsa","Tataouine","Bizerte",
  "Mednine","Kebili","Seliana","Kef"
];

async function fetchJusticeProfessionals() {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null , slowMo: 50});
  const page = await browser.newPage();

  const allProfessionals = [];

  for (const gov of governorates) {
    const govUrl = `https://www.allojustice.tn/avocats.php?gov=${encodeURIComponent(gov)}`;
    console.log(`\n🌐 Scraping governorate: ${gov}`);
    await page.goto(govUrl, { waitUntil: "networkidle2" });

    // Extract profile links from buttons
    const profileLinks = await page.$$eval(
      "button[onclick*='avocat.php?id=']",
      (buttons) =>
        buttons
          .map((btn) => {
            const match = btn.getAttribute("onclick")?.match(/'([^']+)'/);
            return match ? `https://www.allojustice.tn/${match[1]}` : null;
          })
          .filter(Boolean)
    );

    console.log(`📄 Found ${profileLinks.length} profiles in ${gov}`);

    // Loop through each profile page
    for (const [index, link] of profileLinks.entries()) {
      try {
        console.log(`🔍 [${gov}] Visiting ${index + 1}/${profileLinks.length}: ${link}`);
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

        allProfessionals.push({ governorate: gov, ...professional });
        console.log(`✅ Scraped: ${professional.name} (${professional.phone})`);

        // Optional delay to avoid being blocked
        await new Promise((res) => setTimeout(res, 500));
      } catch (error) {
        console.error(`❌ Error scraping ${link}:`, error.message);
      }
    }
  }

  // Save to JSON
  fs.writeFileSync(
    "justice_professionals_all.json",
    JSON.stringify(allProfessionals, null, 2)
  );

  console.log(`\n🎉 Saved ${allProfessionals.length} professionals to justice_professionals_all.json`);

  await browser.close();
}

fetchJusticeProfessionals();
