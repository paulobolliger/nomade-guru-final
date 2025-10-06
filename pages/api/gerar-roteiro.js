export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { nome, email, destino, duracao, interesses } = req.body;
    console.log(`✅ NOVO LEAD (OpenAI): ${nome} (${email}) | Destino: ${destino}`);
    
    const API_KEY = process.env.OPENAI_API_KEY;
    const API_URL = "https://api.openai.com/v1/chat/completions";

    const systemPrompt = `Você é o "Nomade Guru", um especialista de viagens amigável e criativo. Sua tarefa é criar roteiros de viagem inspiradores. Formate a resposta OBRIGATORIAMENTE em HTML, usando <h2> para o título, <h3> para cada dia e <p> para as descrições com <strong>Manhã:</strong>, <strong>Tarde:</strong> e <strong>Noite:</strong> em negrito. Não inclua as tags <html>, <head>, ou <body>.`;
    
    const userPrompt = `Crie um roteiro de viagem de ${duracao} dias para ${destino} para ${nome}, com foco em ${interesses}.`;

    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": systemPrompt
        },
        {
          "role": "user",
          "content": userPrompt
        }
      ]
    };

    const apiResponse = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(requestBody),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      console.error("ERRO DA API DA OPENAI:", errorData);
      throw new Error('A API da OpenAI retornou um erro.');
    }

    const responseData = await apiResponse.json();
    const roteiroHtml = responseData.choices[0].message.content;
    
    res.status(200).json({ roteiro: roteiroHtml });

  } catch (error) {
    console.error("ERRO DETALHADO (OpenAI):", error);
    res.status(500).json({ error: 'Desculpe, o guru está meditando e não conseguiu gerar seu roteiro agora.' });
  }
}