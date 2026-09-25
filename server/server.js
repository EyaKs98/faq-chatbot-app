// server.js — API Node/Express qui alimente un chatbot FAQ via l'API Groq
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const faqContent = require('./faq-data');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Groq propose une API gratuite compatible avec le SDK OpenAI
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

if (!process.env.GROQ_API_KEY) {
  console.warn('⚠️  GROQ_API_KEY manquante — crée un fichier .env à partir de .env.example');
}

// Le prompt système embarque toute la FAQ : c'est la version "light" du RAG
const systemPrompt = `Tu es un assistant virtuel qui répond aux questions des clients en te basant UNIQUEMENT sur les informations suivantes :

${faqContent}

Règles :
- Réponds en français, de façon courte et claire.
- Si la question ne concerne pas ces informations, dis poliment que tu ne peux répondre qu'aux questions liées à TechStore.
- Ne invente jamais d'information qui n'est pas dans le texte ci-dessus.`;

/**
 * POST /api/chat
 * body: { message: string, history?: {role: 'user'|'assistant', content: string}[] }
 * réponse: { reply: string }
 */
app.post('/api/chat', async (req, res) => {
  const { message, history = [] } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Le champ "message" est requis.' });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: [
        { role: 'system', content: systemPrompt },
        ...history,
        { role: 'user', content: message },
      ],
      temperature: 0.4,
    });

    const reply = completion.choices[0].message.content.trim();
    res.json({ reply });
  } catch (err) {
    console.error('Erreur Groq :', err.status || '', err.message);
    res.status(500).json({ error: "Erreur lors de l'appel à l'API Groq." });
  }
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`✅ Serveur backend démarré sur http://localhost:${PORT}`);
});
