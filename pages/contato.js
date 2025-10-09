// Local: pages/contato.js

import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/header';
import Footer from '../components/footer';
import { useState } from 'react';

export default function Contato() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: '',
  });
  const [status, setStatus] = useState('');

  const handleCrieRoteiroClick = () => {
    router.push('/#contato');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('enviando');
    console.log('FRONTEND: Enviando dados para a API...', formData); // <-- Detetive 1

    try {
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('FRONTEND: Resposta recebida da API:', result); // <-- Detetive 2

      if (!response.ok) {
        throw new Error(result.error || 'Falha no envio do lado do servidor.');
      }

      setStatus('sucesso');
      setFormData({ nome: '', email: '', assunto: '', mensagem: '' });
      setTimeout(() => setStatus(''), 4000);

    } catch (error) {
      console.error('FRONTEND: Erro ao tentar se comunicar com a API:', error); // <-- Detetive 3
      setStatus('erro');
      setTimeout(() => setStatus(''), 4000);
    }
  };

  // O resto do arquivo continua igual...
  return (
    <>
      <Head>
        <title>Contato - Nomade Guru</title>
        <meta name="description" content="Entre em contato com a Nomade Guru." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" />
      </Head>

      <Header onCrieRoteiroClick={handleCrieRoteiroClick} />

      <main className="contato-page">
        <div className="page-header" style={{ background: '#7b68ee', color: '#ffffff', border: 'none' }}>
          <h1>Fale Conosco</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Tem alguma dúvida ou sugestão? Preencha o formulário abaixo ou entre em contato por um de nossos canais.
          </p>
        </div>

        <section className="contato-conteudo">
          <div className="container">
            <div className="contato-grid">
              <div className="form-container">
                <h2>Envie sua mensagem</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="assunto">Assunto</label>
                    <input type="text" id="assunto" name="assunto" value={formData.assunto} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mensagem">Mensagem</label>
                    <textarea id="mensagem" name="mensagem" rows="6" value={formData.mensagem} onChange={handleChange} required></textarea>
                  </div>
                  <button type="submit" className="btn-enviar" disabled={status === 'enviando'}>
                    {status === 'enviando' ? 'Enviando...' : 'Enviar Mensagem'}
                  </button>
                  {status === 'sucesso' && <p className="status-sucesso">Mensagem enviada com sucesso! Agradecemos o contato.</p>}
                  {status === 'erro' && <p className="status-erro">Ocorreu um erro. Por favor, tente novamente.</p>}
                </form>
              </div>

              <div className="info-container">
                <h2>Informações de Contato</h2>
                <p>Estamos à disposição para ajudar a planejar a viagem dos seus sonhos.</p>
                <ul className="info-list">
                  <li><i className="fas fa-map-marker-alt"></i><div><strong>Endereço</strong><p>Rua Comendador Torlogo Dauntre, 74 – Sala 1207, Cambuí – Campinas – SP, Brasil – CEP 13025-270</p></div></li>
                  <li><i className="fas fa-envelope"></i><div><strong>E-mail</strong><p><a href="mailto:guru@nomade.guru">guru@nomade.guru</a></p></div></li>
                  <li><i className="fab fa-whatsapp"></i><div><strong>WhatsApp</strong><p><a href="https://wa.me/5511947745710" target="_blank" rel="noopener noreferrer">+55 11 94774-5710</a></p></div></li>
                  <li><i className="fas fa-clock"></i><div><strong>Horário de Atendimento</strong><p>Segunda a Sexta: 9h às 19h<br/>Sábados: 9h às 12h</p></div></li>
                </ul>
                <div className="redes-sociais-contato"><h3>Nossas Redes</h3><ul className="box-redes-sociais"><li><a href="https://www.facebook.com/nomadeguru" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f icon"></i></a></li><li><a href="https://www.instagram.com/nomade.guru/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram icon"></i></a></li><li><a href="https://www.youtube.com/@NomadeGuru" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube icon"></i></a></li><li><a href="#" target="_blank" rel="noopener noreferrer" aria-label="Spotify"><i className="fab fa-spotify icon"></i></a></li></ul></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      <style jsx>{`
        .contato-page{padding-top:80px;background:#0f172a}.container{max-width:1200px;margin:0 auto;padding:0 20px}.contato-conteudo{padding:60px 0}.contato-grid{display:grid;grid-template-columns:2fr 1fr;gap:50px;align-items:start}.form-container,.info-container{background:#1e293b;padding:40px;border-radius:16px}h2{color:white;margin-bottom:30px;font-size:1.8em}.form-group{margin-bottom:20px}.form-group label{display:block;color:#94a3b8;margin-bottom:8px}.form-group input,.form-group textarea{width:100%;padding:12px;background:rgba(255,255,255,0.05);border:2px solid rgba(255,255,255,0.1);border-radius:8px;color:white;font-size:1em;transition:border-color .3s}.form-group input:focus,.form-group textarea:focus{outline:none;border-color:#6366f1}.btn-enviar{display:inline-block;padding:15px 35px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;border:none;border-radius:30px;font-weight:600;cursor:pointer;transition:all .3s}.btn-enviar:hover:not(:disabled){transform:translateY(-3px);box-shadow:0 10px 20px rgba(0,0,0,0.2)}.btn-enviar:disabled{opacity:.7;cursor:not-allowed}.status-sucesso{color:#10b981;margin-top:15px;font-weight:500}.status-erro{color:#ef4444;margin-top:15px;font-weight:500}.info-container p{color:#94a3b8;line-height:1.7;margin-bottom:30px}.info-list{list-style:none;padding:0}.info-list li{display:flex;align-items:flex-start;gap:20px;margin-bottom:25px}.info-list i{color:#6366f1;font-size:1.5em;margin-top:5px;width:25px;text-align:center}.info-list strong{display:block;color:white;margin-bottom:5px}.info-list p{margin:0;color:#94a3b8}.info-list a{color:#94a3b8;text-decoration:none;transition:color .3s}.info-list a:hover{color:#6366f1}.redes-sociais-contato{border-top:1px solid rgba(255,255,255,0.1);padding-top:30px;margin-top:30px}.redes-sociais-contato h3{color:white;margin-bottom:20px}.box-redes-sociais{display:flex;gap:15px;padding:0;list-style:none}@media (max-width:900px){.contato-grid{grid-template-columns:1fr}}
      `}</style>
    </>
  );
}