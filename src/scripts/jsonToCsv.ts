import fs from "fs";

const inputFile = "./justice_professionals_all.json"; // your raw JSON file
const outputFile = "./professionals_ready.json"; // the corrected JSON file

// 1️⃣ Read the JSON
const jsonData = JSON.parse(fs.readFileSync(inputFile, "utf8"));

// 2️⃣ Map to the correct structure
const mappedData = jsonData.map((item) => ({
  full_name: item.name?.trim() || "",
  headline: item.title?.trim() || "",
  bio: item.specialties?.trim() || "",
  domain_name: "Justice", // required
  email: "",
  phone: item.phone?.trim() || "",
  linkedin_url: "",
  instagram_url: "",
  city: item.governorate?.trim() || "",
  country: "Tunisia",
  image_url: item.image?.trim() || "",
  available: "false",
}));

// 3️⃣ Save the new JSON file
fs.writeFileSync(outputFile, JSON.stringify(mappedData, null, 2), "utf8");

console.log(`✅ Created "${outputFile}" with ${mappedData.length} professionals.`);
