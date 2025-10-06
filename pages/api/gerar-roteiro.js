// Esta versão NÃO usa a biblioteca @google/generative-ai
// Ela faz uma chamada direta para a REST API do Gemini

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { nome, email, destino, duracao, interesses } = req.body;
    console.log(`✅ NOVO LEAD (Fetch Direto): ${nome} (${email}) | Destino: ${destino}`);
    
    // Montando a URL da API diretamente com sua chave
    const API_KEY = process.env.GEMINI_API_KEY;
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${API_KEY}`;

    const prompt = `
        Você é o "Nomade Guru", um especialista de viagens amigável e criativo.
        Crie um roteiro de viagem de ${duracao} dias para ${destino} para ${nome}, com foco em ${interesses}.
        Formate a resposta OBRIGATORIAMENTE em HTML, usando <h2> para o título, <h3> para cada dia e <p> para as descrições com <strong>Manhã:</strong>, <strong>Tarde:</strong> e <strong>Noite:</strong> em negrito.
        Não inclua as tags <html>, <head>, ou <body>.
    `;

    // Montando o corpo da requisição no formato que a REST API espera
    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    };

    // Fazendo a chamada com fetch
    const apiResponse = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!apiResponse.ok) {
      // Se a API do Google retornar um erro, vamos capturá-lo
      const errorData = await apiResponse.json();
      console.error("ERRO DA API DO GOOGLE:", errorData);
      throw new Error('A API do Google retornou um erro.');
    }

    const responseData = await apiResponse.json();
    
    // Extraindo o texto da resposta da API REST
    const roteiroHtml = responseData.candidates[0].content.parts[0].text;
    
    res.status(200).json({ roteiro: roteiroHtml });

  } catch (error) {
    console.error("ERRO DETALHADO (Fetch Direto):", error);
    res.status(500).json({ error: 'Desculpe, o guru está meditando e não conseguiu gerar seu roteiro agora.' });
  }
}