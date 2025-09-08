const express = require("express");
const serverless = require("serverless-http");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload endpoint
app.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileBuffer = req.file.buffer;
    let extractedText = "";

    if (req.file.mimetype === "application/pdf") {
      const data = await pdfParse(fileBuffer);
      extractedText = data.text;
    } else if (
      req.file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      extractedText = result.value;
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    res.json({
      message: "File processed successfully",
      filename: req.file.originalname,
      textPreview: extractedText.slice(0, 500),
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Export wrapped app
module.exports.handler = serverless(app);
