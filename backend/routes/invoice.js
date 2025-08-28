import express from "express";
import { getAllInvoices, downloadInvoice, parseInvoice } from "../controllers/invoiceController.js";

const router = express.Router();
router.get("/", getAllInvoices);
router.post("/download/:id", downloadInvoice);
router.post("/parse/:id", parseInvoice); // 👈 Add this

export default router;