// import fs from "fs";
// import pkg from "pdf-parse";

// const pdf = pkg;

// export async function parsePDF(filePath) {
//   try {
//     const buffer = fs.readFileSync(filePath);
//     const data = await pdf(buffer);
//     const text = data.text;

//     // Super simple extraction - just find any patterns
//     return {
//       invoiceNumber: text.match(/\b[A-Z0-9]{6,}\b/)?.[0] || "INV001",
//       date: text.match(/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/)?.[0] || "01/01/2024",
//       airline: "Sample Airlines", // Hardcode for demo
//       amount: text.match(/\d+\.?\d*/g)?.[0] || "1000",
//       gstin: text.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}/)?.[0] || "N/A"
//     };
//   } catch (err) {
//     // Return dummy data if parsing fails
//     return {
//       invoiceNumber: "INV001",
//       date: "01/01/2024", 
//       airline: "Demo Airlines",
//       amount: "1500",
//       gstin: "N/A"
//     };
//   }
// }

export async function parsePDF(filePath) {
  // Mock data for hackathon - bypass pdf-parse completely
  const airlines = ["IndiGo", "Air India", "SpiceJet", "Vistara"];
  const randomAirline = airlines[Math.floor(Math.random() * airlines.length)];
  
  return {
    invoiceNumber: `INV${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    date: "2024-08-28",
    airline: randomAirline,
    amount: (Math.floor(Math.random() * 50000) + 1000).toString(),
    gstin: "22AAAAA0000A1Z5"
  };
}
