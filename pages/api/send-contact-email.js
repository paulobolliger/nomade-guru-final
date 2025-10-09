// Local: pages/api/send-contact-email.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  console.log('BACKEND: Rota /api/send-contact-email foi chamada!'); // <-- Detetive 4

  if (req.method === 'POST') {
    const { nome, email, assunto, mensagem } = req.body;

    try {
      const { data, error } = await resend.emails.send({
        from: 'Contato Nomade Guru <contato@nomade.guru>',
        to: ['guru@nomade.guru'],
        reply_to: email,
        subject: `Nova mensagem de ${nome}: ${assunto}`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.6;">
            <h2>Nova Mensagem do Site</h2>
            <p>Você recebeu uma nova mensagem através do formulário de contato.</p>
            <hr>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Assunto:</strong> ${assunto}</p>
            <p><strong>Mensagem:</strong></p>
            <p>${mensagem.replace(/\n/g, '<br>')}</p>
          </div>
        `,
      });

      if (error) {
        console.error('Erro do Resend:', error);
        return res.status(400).json({ error: 'Erro ao enviar e-mail.' });
      }

      res.status(200).json({ message: 'E-mail enviado com sucesso!', data });
    } catch (error) {
      console.error('Erro no servidor:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}