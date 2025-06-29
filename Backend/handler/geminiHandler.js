// geminiHandler.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

function getGeminiModel() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  // 'gemini-1.5-flash' is the recommended modern choice.
  return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
}

async function handleAsk(req, res, lastPdfText) {
  try {
    const question = req.body.question;
    if (!lastPdfText) {
      return res.status(400).json({ error: 'No PDF uploaded yet.' });
    }
    const prompt = `Based *only* on the content from the PDF provided below, answer the following question u can also use emojies if that required. If the answer cannot be found in the text, say 'The answer is not available in this document.'\n\n---PDF Content---\n${lastPdfText}\n\n---Question---\n${question}`;
    const model = getGeminiModel();
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();
    res.json({ answer });
  } catch (err) {
    console.error('Gemini error:', err);
    res.status(500).json({
      error: 'Failed to get answer',
      details: err.message,
    });
  }
}

module.exports = { handleAsk };
