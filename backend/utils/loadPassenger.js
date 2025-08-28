import csv from "csvtojson";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadPassengers() {
  const csvPath = path.join(__dirname, "../data/data.csv");
  const jsonArray = await csv().fromFile(csvPath);

  return jsonArray
    .filter(p => p["Ticket Number"]) // remove empty rows
    .map((p, index) => ({
      id: (index + 1).toString(),
      ticketNumber: p["Ticket Number"].toString().replace(/\..*$/, ""), // remove decimals
      firstName: p["First Name"].trim(),
      lastName: p["Last Name"].trim(),
      name: `${p["First Name"].trim()} ${p["Last Name"].trim()}`,
      downloadStatus: "Pending",
      parseStatus: "Pending"
    }));
}