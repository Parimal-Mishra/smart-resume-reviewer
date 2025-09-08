const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

const app = express();

// ✅ Use in-memory storage (safe for Vercel)
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/api/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileBuffer = req.file.buffer;
    let extractedText = "";

    // Handle PDF
    if (req.file.mimetype === "application/pdf") {
      const data = await pdfParse(fileBuffer);
      extractedText = data.text;
    }
    // Handle DOCX
    else if (
      req.file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      extractedText = result.value;
    }
    // Unsupported
    else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    res.json({
      message: "File processed successfully",
      filename: req.file.originalname,
      textPreview: extractedText.slice(0, 500), // first 500 chars
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Export Express app as Vercel function
module.exports = app;
