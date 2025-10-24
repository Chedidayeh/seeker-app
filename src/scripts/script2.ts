/* eslint-disable no-console */
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import fetch from "node-fetch"; // Needed for image download

// 🏙️ List of Tunisian governorates
const governorates = [
  "Tunis","Ariana","Sfax","Sousse","Ben Arous","Manouba","Monastir",
  "Nabeul","Beja","Zaghouan","Mahdia","Sidi Bouzid","Jendouba",
  "Kasserine","Kairouan","Tozeur","Gabes","Gafsa","Tataouine","Bizerte",
  "Mednine","Kebili","Seliana","Kef"
];

// 📁 Folder to store downloaded images
const imageDir = path.join(process.cwd(), "public", "uploads", "lawyers");

// Ensure folder exists
fs.mkdirSync(imageDir, { recursive: true });

/**
 * Downloads an image from a URL and saves it locally.
 * Returns the relative path to be used as the image URL.
 */
async function downloadImage(imageUrl, fileName) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error(`Failed to fetch ${imageUrl}`);
    const buffer = await response.arrayBuffer();
    const filePath = path.join(imageDir, fileName);
    fs.writeFileSync(filePath, Buffer.from(buffer));
    return `/uploads/lawyers/${fileName}`;
  } catch (err) {
    console.error(`⚠️ Error downloading image ${imageUrl}:`, err.message);
    return null;
  }
}

async function fetchJusticeProfessionals() {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(30000);

  const allProfessionals = [];

  for (const gov of governorates) {
    const govUrl = `https://www.allojustice.tn/avocats.php?gov=${encodeURIComponent(gov)}`;
    console.log(`\n🌐 Scraping governorate: ${gov}`);

    await page.goto(govUrl, { waitUntil: "networkidle2" });

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

    console.log(`📋 Found ${profileLinks.length} profiles in ${gov}`);

    for (const [index, link] of profileLinks.entries()) {
      try {
        console.log(`🔍 [${gov}] Visiting ${index + 1}/${profileLinks.length}: ${link}`);
        await page.goto(link, { waitUntil: "networkidle2", timeout: 30000 });

        const professional = await page.evaluate((govName) => {
          const getText = (sel) => (document.querySelector(sel)?.innerText.trim() || "");

          // 🖼️ Extract image
          let image = null;
          const imageEl = document.querySelector('img[width="200"][height="200"]');
          if (imageEl) {
            const src = imageEl.getAttribute("src");
            image = src?.startsWith("http")
              ? src
              : src
              ? `https://www.allojustice.tn${src}`
              : null;
          } else {
            image =
              Array.from(document.querySelectorAll("img"))
                .map((img) => img.src)
                .find((src) => /\/client\/images\//.test(src)) || null;
          }

          const name = getText("h3");
          const title = getText("b");

          // 📍 Extract address
          let address = "";
          const pinImg = document.querySelector('img[width="14"]');
          if (pinImg) {
            let next = pinImg.nextSibling;
            while (next && next.nodeType !== Node.TEXT_NODE) {
              next = next.nextSibling;
            }
            address = next?.textContent?.replace(/\u00a0/g, " ").trim() || "";
          }

          const phone =
            document.querySelector('a[href^="tel:"]')?.innerText.replace(/\D+/g, "") || "";
          const whatsapp =
            document.querySelector('a[href^="https://wa.me"]')?.href || null;

          return {
            full_name: name || "N/A",
            headline: title || "N/A",
            domain_name: "Justice",
            image_url: image,
            address: address || "N/A",
            phone,
            whatsapp,
            available: "true",
            city: govName,
          };
        }, gov);

        // 🖼️ Download image locally if available
        let localImageUrl = null;
        if (professional.image_url) {
          const imageExt = path.extname(professional.image_url).split("?")[0] || ".jpg";
          const safeName = professional.full_name.replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
          const fileName = `${safeName}-${Date.now()}${imageExt}`;
          localImageUrl = await downloadImage(professional.image_url, fileName);
        }

        allProfessionals.push({
          governorate: gov,
          ...professional,
          image_url: localImageUrl || professional.image_url,
        });

        console.log(
          `✅ Scraped: ${professional.full_name} (${professional.phone || "No phone"})`
        );

        await new Promise((res) => setTimeout(res, 500)); // short delay
      } catch (error) {
        console.error(`❌ Error scraping ${link}:`, error.message);
      }
    }
  }

  // 💾 Save results to file
  const fileName = `justice_professionals_${Date.now()}.json`;
  fs.writeFileSync(fileName, JSON.stringify(allProfessionals, null, 2));

  console.log(`\n🎉 Saved ${allProfessionals.length} professionals to ${fileName}`);
  await browser.close();
}

fetchJusticeProfessionals();
