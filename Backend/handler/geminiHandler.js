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
    const prompt = `You are a knowledgeable and friendly AI assistant. Your task is to analyze the provided PDF content and answer questions about it.

Instructions:
1. For PDF-related questions:
   - Analyze the content carefully and provide accurate, detailed answers
   - If information is not in the PDF, respond with "I apologize, but this information is not available in the provided document. Would you like to ask something else about the content?"
   - Use bullet points or numbered lists for complex explanations
   - Include relevant quotes from the PDF to support your answers when appropriate

2. For general questions:
   - if user ask that not related to book ignore this

Style Guidelines:
- Use a friendly, professional tone
- Add appropriate emojis to make responses engaging 📚
- Format responses for readability (paragraphs, lists)
- Highlight key points or important terms when relevant
- If uncertain about any detail, acknowledge the uncertainty

---PDF Content---
${lastPdfText}

---Question---
${question}

Remember: Prioritize accuracy and clarity in your responses while maintaining an engaging conversation style.`;
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
