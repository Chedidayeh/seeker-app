// fetchWaterfall.js
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import fs from "fs";

const url = "https://m.bonnes-adresses.tn/categories"; // Replace with your target URL

async function fetchWaterfall() {
  try {
    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);
console.log($.html());

    const items = [];
    $("#waterfall li").each((index, element) => {
      const item = $(element).text().trim();
      items.push({ id: index + 1, content: item });
    });

    fs.writeFileSync("waterfall.json", JSON.stringify(items, null, 2));
    console.log("JSON file created successfully!");
  } catch (err) {
    console.error("Error fetching or parsing the page:", err);
  }
}

fetchWaterfall();
