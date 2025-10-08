import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Log para debug
    console.log('=== NOVO LEAD RECEBIDO ===');
    console.log('Dados:', body);
    
    const results = {
      googleSheets: false,
      telegram: false,
      email: false
    };
    
    // 1. Enviar para o Google Sheets
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      console.log('Tentando enviar para Google Sheets...');
      try {
        const googleResponse = await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify({
            nome: body.nome || '',
            email: body.email || '',
            destino: body.destino || '',
            duracao: body.duracao || '',
            interesses: body.interesses || ''
          }),
        });
        
        const responseText = await googleResponse.text();
        console.log('Resposta do Google Sheets:', responseText);
        
        if (googleResponse.ok) {
          results.googleSheets = true;
          console.log('✓ Google Sheets: Sucesso');
        } else {
          console.error('✗ Google Sheets: Erro', googleResponse.status);
        }
      } catch (error) {
        console.error('✗ Google Sheets: Erro na conexão:', error);
      }
    } else {
      console.log('⚠ Google Sheets: URL não configurada');
    }
    
    // 2. Enviar para Telegram
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      console.log('Tentando enviar para Telegram...');
      try {
        const message = `
🎯 *Novo Lead Recebido!*

👤 *Nome:* ${body.nome || 'Não informado'}
📧 *Email:* ${body.email || 'Não informado'}
🌍 *Destino:* ${body.destino || 'Não informado'}
📅 *Duração:* ${body.duracao || 'Não informada'}
💫 *Interesses:* ${body.interesses || 'Não informados'}

📅 *Data:* ${new Date().toLocaleString('pt-BR')}
        `.trim();
        
        const telegramResponse = await fetch(
          `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: process.env.TELEGRAM_CHAT_ID,
              text: message,
              parse_mode: 'Markdown',
            }),
          }
        );
        
        if (telegramResponse.ok) {
          results.telegram = true;
          console.log('✓ Telegram: Sucesso');
        } else {
          const errorData = await telegramResponse.json();
          console.error('✗ Telegram: Erro', errorData);
        }
      } catch (error) {
        console.error('✗ Telegram: Erro na conexão:', error);
      }
    } else {
      console.log('⚠ Telegram: Credenciais não configuradas');
    }
    
    // 3. Enviar email via Resend
    if (process.env.RESEND_API_KEY) {
      console.log('Tentando enviar email...');
      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'onboarding@resend.dev',
            to: body.email,
            subject: 'Obrigado pelo seu interesse - Nomade Guru',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Olá ${body.nome}!</h2>
                <p style="color: #666;">Obrigado pelo seu interesse em viajar para <strong>${body.destino}</strong>.</p>
                <p style="color: #666;">Recebemos as seguintes informações:</p>
                <ul style="color: #666;">
                  <li><strong>Destino:</strong> ${body.destino}</li>
                  <li><strong>Duração:</strong> ${body.duracao}</li>
                  <li><strong>Interesses:</strong> ${body.interesses}</li>
                </ul>
                <p style="color: #666;">Em breve nossa equipe entrará em contato com você para ajudar a planejar sua viagem perfeita!</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                <p style="color: #999; font-size: 14px;">
                  Atenciosamente,<br>
                  Equipe Nomade Guru
                </p>
              </div>
            `,
          }),
        });
        
        if (emailResponse.ok) {
          results.email = true;
          console.log('✓ Email: Sucesso');
        } else {
          const errorData = await emailResponse.json();
          console.error('✗ Email: Erro', errorData);
        }
      } catch (error) {
        console.error('✗ Email: Erro na conexão:', error);
      }
    } else {
      console.log('⚠ Email: API Key não configurada');
    }
    
    // Resumo dos resultados
    console.log('=== RESUMO DO ENVIO ===');
    console.log('Google Sheets:', results.googleSheets ? '✓' : '✗');
    console.log('Telegram:', results.telegram ? '✓' : '✗');
    console.log('Email:', results.email ? '✓' : '✗');
    console.log('========================');
    
    // Retornar sucesso se pelo menos um serviço funcionou
    const anySuccess = results.googleSheets || results.telegram || results.email;
    
    if (anySuccess) {
      return NextResponse.json({ 
        success: true,
        message: 'Lead cadastrado com sucesso!',
        results
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Nenhum serviço conseguiu processar o lead',
          results
        },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('Erro geral na API:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao processar requisição',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

// Método GET para teste
export async function GET() {
  return NextResponse.json({ 
    status: 'OK',
    message: 'API de submit-lead funcionando',
    services: {
      googleSheets: !!process.env.GOOGLE_SHEETS_WEBHOOK_URL,
      telegram: !!process.env.TELEGRAM_BOT_TOKEN && !!process.env.TELEGRAM_CHAT_ID,
      email: !!process.env.RESEND_API_KEY
    }
  });
}