const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: process.cwd() + '/.env' });

const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/server', async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    try {
        const { nome, email, destino, duracao, interesses } = req.body;
        console.log(`✅ NOVO LEAD CAPTURADO: ${nome} (${email}) | Destino: ${destino} por ${duracao} dias.`);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });
        const prompt = `
            Você é o "Nomade Guru", um especialista de viagens amigável e criativo que cria roteiros inesquecíveis.
            Crie um roteiro de viagem de ${duracao} dias para ${destino}.
            O viajante se chama ${nome} e seus principais interesses são: ${interesses}.
            O roteiro deve ser inspirador, com sugestões práticas de atividades para cada dia (manhã, tarde e noite).
            Formate a resposta OBRIGATORIAMENTE em HTML, seguindo esta estrutura:
            - Comece com uma saudação calorosa para ${nome}, usando uma tag <h2>. Ex: "<h2>Olá, ${nome}! Prepare-se para uma aventura incrível em ${destino}!</h2>".
            - Para cada dia, use uma tag <h3>. Ex: "<h3>Dia 1: Chegada e Primeiras Impressões</h3>".
            - Para as sugestões de atividades, use parágrafos <p> com <strong>Manhã:</strong>, <strong>Tarde:</strong> e <strong>Noite:</strong> em negrito.
            - Finalize com uma frase de despedida amigável usando uma tag <p>.
            - Não inclua as tags <html>, <head>, ou <body> na sua resposta. Apenas o conteúdo do roteiro.
        `;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const roteiroHtml = response.text();
        res.json({ roteiro: roteiroHtml });
    } catch (error) {
        console.error("ERRO DETALHADO:", error);
        res.status(500).json({ error: 'Desculpe, o guru está meditando e não conseguiu gerar seu roteiro agora. Tente novamente em alguns instantes.' });
    }
});

module.exports = app;