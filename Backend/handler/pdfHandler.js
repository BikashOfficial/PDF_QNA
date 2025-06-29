const pdfParse = require('pdf-parse');
const fs = require('fs');

// Temporary storage for last uploaded PDF
let lastPdfText = "";

async function handlePdfUpload(req, res) {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);
    // Limit text to avoid hitting model context limits
    lastPdfText = pdfData.text.slice(0, 30000); // Increased limit for newer models
    // Clean up the uploaded file after processing
    fs.unlinkSync(req.file.path);
    res.json({ message: '✅ PDF uploaded and ready!' });
  } catch (err) {
    console.error('PDF upload error:', err);
    res.status(500).json({
      error: 'PDF processing failed',
      details: err.message,
    });
  }
}

function getLastPdfText() {
  return lastPdfText;
}

module.exports = { handlePdfUpload, getLastPdfText };
