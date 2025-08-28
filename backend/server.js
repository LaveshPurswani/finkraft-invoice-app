import express, { json } from "express";
import cors from "cors";
import invoiceRoutes from "./routes/invoice.js"; // 👈 import your routes

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use("/api/invoices", invoiceRoutes); // 👈 mount the invoice routes

// Test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Start server
const PORT = 3000;
console.log("Server starting...");
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));