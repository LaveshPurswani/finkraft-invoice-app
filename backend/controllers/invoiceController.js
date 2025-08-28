import { downloadPDF } from "../utils/pdfDownloader.js";
// import passengers from '../data/passengers.json' assert { type: "json" };
import { loadPassengers } from "../utils/loadPassenger.js";

import path from "path";
import fs from "fs";
import { parsePDF } from "../utils/pdfParser.js";

let passengers = [];
(async () => {
  passengers = await loadPassengers();
})();

export const getAllInvoices = (req, res) => {
  res.json(passengers);
};

export const downloadInvoice = async (req, res) => {
  const { id } = req.params;
  const passenger = passengers.find((p) => p.id === id);

  if (!passenger) return res.status(404).json({ error: "Passenger not found" });

  try {
    const filePath = await downloadPDF(passenger);
    passenger.downloadStatus = "Success";
    res.json({ message: "Invoice downloaded", filePath });
  } catch (err) {
    passenger.downloadStatus = "Not Found";
    res.status(500).json({ error: err.message });
  }
};

// Parse invoice
export const parseInvoice = async (req, res) => {
  const { id } = req.params;
  const passenger = passengers.find((p) => p.id === id);

  if (!passenger) {
    return res.status(404).json({ error: "Passenger not found" });
  }

  // Define the file path first
  const filePath = path.join(
    process.cwd(),
    "backend",
    "invoices",
    `${passenger.ticketNumber}.pdf`
  );

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    passenger.parseStatus = "Error";
    return res.status(404).json({ error: `PDF not found at ${filePath}` });
  }

  try {
    console.log("PDF path being used:", filePath);

    const parsedData = await parsePDF(filePath);

    passenger.parseStatus = "Success";
    passenger.invoiceData = parsedData;

    res.json({
      message: "Invoice parsed successfully",
      parsedData,
    });
  } catch (error) {
    passenger.parseStatus = "Error";
    res.status(500).json({
      error: "Failed to parse PDF",
      details: error.message,
    });
  }
};