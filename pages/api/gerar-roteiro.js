import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { nome, email, destino, duracao, interesses } = req.body;
    console.log(`✅ NOVO LEAD (Next.js): ${nome} (${email}) | Destino: ${destino}`);
    
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });
    const prompt = `
        Você é o "Nomade Guru", um especialista de viagens amigável e criativo.
        Crie um roteiro de viagem de ${duracao} dias para ${destino} para ${nome}, com foco em ${interesses}.
        Formate a resposta OBRIGATORIAMLENTE em HTML, usando <h2> para o título, <h3> para cada dia e <p> para as descrições com <strong>Manhã:</strong>, <strong>Tarde:</strong> e <strong>Noite:</strong> em negrito.
        Não inclua as tags <html>, <head>, ou <body>.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const roteiroHtml = response.text();
    
    res.status(200).json({ roteiro: roteiroHtml });

  } catch (error) {
    console.error("ERRO DETALHADO (Next.js):", error);
    res.status(500).json({ error: 'Desculpe, o guru está meditando e não conseguiu gerar seu roteiro agora.' });
  }
}