const express = require('express');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();

const { handlePdfUpload, getLastPdfText } = require('./handler/pdfHandler');
const { handleAsk } = require('./handler/geminiHandler');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// 📄 Upload PDF and extract text
app.post('/upload', upload.single('pdf'), handlePdfUpload);

// 💬 Ask questions based on uploaded PDF
app.post('/ask', (req, res) => {
  handleAsk(req, res, getLastPdfText());
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});