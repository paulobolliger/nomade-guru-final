// INSTALE: npm install resend

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { nome, email, destino, duracao, interesses } = req.body;
    
    // ============================================
    // 1. LOG DO LEAD
    // ============================================
    const timestamp = new Date().toISOString();
    console.log('✨ NOVO LEAD RECEBIDO:', {
      timestamp,
      nome,
      email,
      destino,
      duracao,
      interesses
    });

    // ============================================
    // 2. VALIDAÇÃO
    // ============================================
    if (!nome || !email || !destino || !duracao) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    // ============================================
    // 3. GERAR ROTEIRO COM OPENAI
    // ============================================
    const API_KEY = process.env.OPENAI_API_KEY;
    
    if (!API_KEY) {
      throw new Error('OpenAI API Key não configurada');
    }

    // PROMPT BASEADO NO SEU DOCUMENTO
    const systemPrompt = `Você é o "Nomade Guru", um especialista em criar roteiros de viagem detalhados e envolventes para uma agência de viagens premium.

FORMATO OBRIGATÓRIO:
1. Comece com introdução poética usando ✨
2. Use emojis para dias: 🗓 (Dia 1), 🍇 (Dia 2), 🧱 (Dia 3), 🌻 (Dia 4), 🍷 (Dia 5), 🧀 (Dia 6), ☀️ (Dia 7)
3. Use emojis especiais: 🍝 (comida), 🌅 (hospedagem), 🏡 (atividades)
4. Termine com "💫 Dicas de Ouro do Guru"
5. Formate em HTML limpo (h2 para título, h3 para dias, p para descrições)
6. NÃO use tags html, head ou body
7. Use <strong> para destacar palavras-chave

ESTRUTURA:
- Introdução poética
- Cada dia com: título, atividades (manhã/tarde/noite), restaurante, hospedagem
- Dicas finais de época, transporte e curiosidades`;

    const userPrompt = `Crie um roteiro COMPLETO de ${duracao} dias para ${destino}.

INFORMAÇÕES:
- Viajante: ${nome}
- Interesses: ${interesses || 'experiências autênticas e cultura local'}

REQUISITOS:
- Seja específico com lugares, restaurantes e atrações REAIS
- Inclua detalhes sensoriais
- Tom envolvente e inspirador
- Linguagem acessível mas conhecedora`;

    console.log('🤖 Gerando roteiro com OpenAI...');

    const apiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.8,
        max_tokens: 2500,
      }),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      console.error("❌ Erro OpenAI:", errorData);
      throw new Error('Erro ao gerar roteiro');
    }

    const responseData = await apiResponse.json();
    const roteiroCompleto = responseData.choices[0].message.content;
    
    // Criar versão RESUMIDA para mostrar no site (teaser)
    const roteiroResumo = gerarResumo(roteiroCompleto, nome, destino, duracao);

    console.log('✅ Roteiro gerado!');

    // ============================================
    // 4. ENVIAR EMAIL COM ROTEIRO COMPLETO
    // ============================================
    try {
      await resend.emails.send({
        from: 'Nomade Guru <contato@nomade.guru>', // Se configurou domínio próprio
        to: email,
        subject: `✨ Seu Roteiro Mágico para ${destino} está pronto!`,
        html: gerarEmailHTML(nome, destino, duracao, roteiroCompleto)
      });
      console.log('📧 Email enviado para:', email);
    } catch (emailError) {
      console.error('❌ Erro ao enviar email:', emailError);
      // Não falha a requisição se o email falhar
    }

    // ============================================
    // 5. SALVAR LEAD NO GOOGLE SHEETS
    // ============================================
    try {
      await salvarLeadGoogleSheets({
        timestamp,
        nome,
        email,
        destino,
        duracao,
        interesses: interesses || 'Não informado'
      });
      console.log('📊 Lead salvo no Google Sheets');
    } catch (sheetError) {
      console.error('❌ Erro ao salvar no Google Sheets:', sheetError);
    }

    // ============================================
    // 6. NOTIFICAR VIA TELEGRAM
    // ============================================
    try {
      await notificarTelegram({
        nome,
        email,
        destino,
        duracao
      });
      console.log('📱 Notificação enviada via Telegram');
    } catch (telegramError) {
      console.error('❌ Erro ao notificar Telegram:', telegramError);
    }

    // ============================================
    // 7. RETORNAR RESUMO PARA O SITE
    // ============================================
    res.status(200).json({ 
      roteiro: roteiroResumo,
      mensagem: `🎉 Perfeito, ${nome.split(' ')[0]}! Enviamos seu roteiro completo para ${email}. Confira sua caixa de entrada!`
    });

  } catch (error) {
    console.error("❌ ERRO:", error.message);
    res.status(500).json({ 
      error: 'Ops! Algo deu errado. Tente novamente em instantes.'
    });
  }
}

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

function gerarResumo(roteiroCompleto, nome, destino, duracao) {
  // Extrai apenas os primeiros 3 dias do roteiro
  const linhas = roteiroCompleto.split('\n');
  const primeiros3Dias = linhas.slice(0, 20).join('\n');
  
  return `
    <h2>✨ Olá ${nome.split(' ')[0]}! Aqui está um preview do seu roteiro para ${destino}</h2>
    <p><strong>Duração:</strong> ${duracao} dias</p>
    <div style="background: #12152c; padding: 20px; border-radius: 12px; margin: 20px 0;">
      ${primeiros3Dias}
      <p style="text-align: center; margin-top: 30px; font-size: 1.2em;">
        <strong>📧 O roteiro COMPLETO foi enviado para seu email!</strong>
      </p>
    </div>
  `;
}

function gerarEmailHTML(nome, destino, duracao, roteiro) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Arial', sans-serif; background: #f9fafb; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        h1 { color: #5053c4; }
        .roteiro { background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 0.9em; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>✨ Seu Roteiro Mágico para ${destino}</h1>
        <p>Olá <strong>${nome}</strong>!</p>
        <p>Preparamos com muito carinho um roteiro completo de <strong>${duracao} dias</strong> para sua viagem dos sonhos!</p>
        
        <div class="roteiro">
          ${roteiro}
        </div>

        <p style="text-align: center; margin-top: 30px;">
          <a href="https://seusite.com" style="background: #5053c4; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block;">
            Fale com um Especialista
          </a>
        </p>

        <div class="footer">
          <p><strong>Nomade Guru</strong><br/>
          Rua Comendador Torlogo Dauntre, 74 – Sala 1207<br/>
          Cambuí – Campinas – SP<br/>
          📧 contato@nomadeguru.com.br | 📱 (19) 99999-9999</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

async function salvarLeadGoogleSheets(lead) {
  const GOOGLE_SHEETS_WEBHOOK = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  
  if (!GOOGLE_SHEETS_WEBHOOK) {
    console.warn('⚠️ Google Sheets webhook não configurado');
    return;
  }

  await fetch(GOOGLE_SHEETS_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead)
  });
}

async function notificarTelegram(lead) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('⚠️ Telegram não configurado');
    return;
  }

  const mensagem = `
🎉 *NOVO LEAD!*

👤 *Nome:* ${lead.nome}
📧 *Email:* ${lead.email}
🌍 *Destino:* ${lead.destino}
📅 *Duração:* ${lead.duracao} dias

_Via Nomade Guru Website_
  `;

  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: mensagem,
      parse_mode: 'Markdown'
    })
  });
}