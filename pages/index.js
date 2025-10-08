import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home({ destinosDestaque }) {
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    destino: '',
    duracao: '',
    interesses: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResultado('');
    
    try {
      // 1. Primeiro envia para o submit-lead (salva no Google Sheets, Telegram, Email)
      try {
        const submitResponse = await fetch('/api/submit-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        
        if (submitResponse.ok) {
          const submitResult = await submitResponse.json();
          console.log('Lead salvo com sucesso:', submitResult);
        }
      } catch (submitError) {
        console.error('Erro ao salvar lead:', submitError);
        // Não bloqueia o fluxo se falhar
      }

      // 2. Depois gera o roteiro com IA
      const response = await fetch('/api/gerar-roteiro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Falha na resposta do servidor');
      }
      
      setResultado(result.roteiro);
      setEtapaAtual(6); // Vai para tela de resultado
      
    } catch (error) {
      setResultado(`<p style="color: red;">${error.message}</p>`);
    } finally {
      setLoading(false);
    }
  };

  const avancarEtapa = () => {
    if (etapaAtual < 5) setEtapaAtual(etapaAtual + 1);
  };

  const voltarEtapa = () => {
    if (etapaAtual > 1) setEtapaAtual(etapaAtual - 1);
  };

  const handleServiceToggle = (serviceName) => {
    const currentInteresses = formData.interesses ? formData.interesses.split(', ') : [];
    const index = currentInteresses.indexOf(serviceName);
    
    if (index > -1) {
      currentInteresses.splice(index, 1);
    } else {
      currentInteresses.push(serviceName);
    }
    
    setFormData({...formData, interesses: currentInteresses.join(', ')});
  };

  return (
    <>
      <Head>
        <title>Nomade Guru - Agência de Viagens Inteligente</title>
        <meta name="description" content="Roteiros de viagem personalizados com inteligência artificial e curadoria humana." />
        <link rel="icon" href="https://res.cloudinary.com/dhqvjxgue/image/upload/v1759922097/favicon-32x32_pbzjqt.png" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossOrigin="anonymous" />
      </Head>

      {/* Header com efeito scroll */}
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="container">
          <div className="logo">
            <Link href="/">
              <img 
                src={scrolled 
                  ? "https://res.cloudinary.com/dhqvjxgue/image/upload/c_crop,ar_4:3/v1744736404/logo_branco_sem_fundo_rucnug.png"
                  : "https://res.cloudinary.com/dhqvjxgue/image/upload/v1744736403/logo_nomade_guru_iskhl8.png"
                }
                alt="Logo Nomade Guru" 
              />
            </Link>
          </div>
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
          <nav>
            <ul className={isMenuOpen ? 'show' : ''} onClick={() => setIsMenuOpen(false)}>
              <li><Link href="/destinos">Destinos</Link></li>
              <li><a href="#">Loja Online</a></li>
              <li><Link href="/blog">Blog</Link></li>
              <li>
                <button 
                  onClick={() => setShowPopup(true)} 
                  className="header-btn"
                >
                  Crie Seu Roteiro
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero" style={{ backgroundImage: "url('https://res.cloudinary.com/dhqvjxgue/image/upload/v1744155476/imagem-impactante_1_nv98cg.png')" }}>
          <div className="hero-content">
            <h1>Viaje com propósito, viva com liberdade</h1>
            <p>Crie seu roteiro personalizado e descubra novas fronteiras com nossa tecnologia de IA e curadoria humana.</p>
            <button onClick={() => setShowPopup(true)} className="btn">
              Experimente Agora ✨
            </button>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="diferenciais" id="diferenciais">
          <h2>Diferenciais</h2>
          <div className="items">
            <div className="diferencial-item">
              <img loading="lazy" src="https://res.cloudinary.com/dhqvjxgue/image/upload/v1744155474/icone-tecnologia_2_qnuxdh.png" alt="Tecnologia com propósito" />
              <h3>Tecnologia com propósito</h3>
              <p>IA avançada para criar roteiros únicos em segundos</p>
            </div>
            <div className="diferencial-item">
              <img loading="lazy" src="https://res.cloudinary.com/dhqvjxgue/image/upload/v1744155472/icone-curadoria_2_nttjeq.png" alt="Curadoria humana especializada" />
              <h3>Curadoria humana</h3>
              <p>Especialistas refinam cada detalhe da sua jornada</p>
            </div>
            <div className="diferencial-item">
              <img loading="lazy" src="https://res.cloudinary.com/dhqvjxgue/image/upload/v1744155474/icone-roteiros_pdyi68.png" alt="Roteiros autênticos e exclusivos" />
              <h3>Experiências autênticas</h3>
              <p>Roteiros exclusivos que vão além do óbvio</p>
            </div>
          </div>
        </section>

        {/* Como Funciona */}
        <section className="como-funciona" id="como-funciona">
          <h2>Como Funciona</h2>
          <div className="passos">
            <div className="passo">
              <div className="passo-numero">1</div>
              <img loading="lazy" src="https://res.cloudinary.com/dhqvjxgue/image/upload/v1744155474/icone-quiz_vqbtlt.png" alt="Descreva sua viagem" />
              <h3>Descreva sua viagem</h3>
              <p>Conte seus sonhos e preferências</p>
            </div>
            <div className="passo">
              <div className="passo-numero">2</div>
              <img loading="lazy" src="https://res.cloudinary.com/dhqvjxgue/image/upload/v1744155474/icone-ia_k89u8u.png" alt="Receba um roteiro com IA" />
              <h3>IA cria seu roteiro</h3>
              <p>Instantâneo e personalizado</p>
            </div>
            <div className="passo">
              <div className="passo-numero">3</div>
              <img loading="lazy" src="https://res.cloudinary.com/dhqvjxgue/image/upload/v1744155474/icone-especialista_ev6aa7.png" alt="Converse com um especialista" />
              <h3>Refinamento expert</h3>
              <p>Nossos especialistas aperfeiçoam</p>
            </div>
          </div>
        </section>
        
        {/* Destinos em Destaque - DINÂMICO */}
        <section className="destinos-destaque" id="destinos">
          <h2>Destinos em Destaque</h2>
          <p className="subtitulo">Explore nossos roteiros mais populares</p>
          <div className="destinos-grid">
            {destinosDestaque && destinosDestaque.length > 0 ? (
              destinosDestaque.map((roteiro) => (
                <Link href={`/roteiro/${roteiro.documentId}`} key={roteiro.id} className="destino-card">
                  <div className="destino-imagem">
                    <img 
                      src={roteiro.imagemUrl} 
                      alt={roteiro.Titulo}
                      loading="lazy"
                    />
                    <div className="destino-overlay">
                      <span className="ver-mais">Ver Roteiro →</span>
                    </div>
                  </div>
                  <div className="destino-info">
                    <h3>{roteiro.Titulo}</h3>
                    <p className="duracao">📅 {roteiro.Duracao}</p>
                    <p className="preco">A partir de US$ {(roteiro.Preco / 100).toFixed(2).replace('.', ',')}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
                Carregando destinos...
              </p>
            )}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/destinos" className="btn-secondary">
              Ver Todos os Destinos
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ textAlign: 'center', width: '100%' }}>Pronto para sua próxima aventura?</h2>
          <p style={{ textAlign: 'center', width: '100%', maxWidth: '800px' }}>Crie seu roteiro personalizado agora mesmo com nossa IA</p>
          <button onClick={() => setShowPopup(true)} className="btn-large" style={{ display: 'inline-block', margin: '0 auto' }}>
            Começar Agora ✨
          </button>
        </section>
      </main>

      {/* POPUP CHATBOT STYLE */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-container" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowPopup(false)}>✕</button>
            
            <div className="popup-header">
              <h2>✨ Criar Roteiro Mágico</h2>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(etapaAtual / 5) * 100}%` }}></div>
              </div>
              <p className="etapa-info">Etapa {etapaAtual} de 5</p>
            </div>

            <form onSubmit={handleSubmit} className="popup-form">
              {etapaAtual === 1 && (
                <div className="etapa">
                  <h3>👋 Como você se chama?</h3>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    placeholder="Digite seu nome..."
                    required
                    autoFocus
                  />
                  <button type="button" onClick={avancarEtapa} disabled={!formData.nome}>
                    Continuar →
                  </button>
                </div>
              )}

              {etapaAtual === 2 && (
                <div className="etapa">
                  <h3>📧 Qual seu melhor e-mail?</h3>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="seu@email.com"
                    required
                    autoFocus
                  />
                  <div className="botoes-navegacao">
                    <button type="button" onClick={voltarEtapa} className="btn-voltar">
                      ← Voltar
                    </button>
                    <button type="button" onClick={avancarEtapa} disabled={!formData.email}>
                      Continuar →
                    </button>
                  </div>
                </div>
              )}

              {etapaAtual === 3 && (
                <div className="etapa">
                  <h3>🌍 Para onde você quer ir?</h3>
                  <input
                    type="text"
                    value={formData.destino}
                    onChange={(e) => setFormData({...formData, destino: e.target.value})}
                    placeholder="Ex: Japão, Paris, Patagônia..."
                    required
                    autoFocus
                  />
                  <div className="botoes-navegacao">
                    <button type="button" onClick={voltarEtapa} className="btn-voltar">
                      ← Voltar
                    </button>
                    <button type="button" onClick={avancarEtapa} disabled={!formData.destino}>
                      Continuar →
                    </button>
                  </div>
                </div>
              )}

              {etapaAtual === 4 && (
                <div className="etapa">
                  <h3>📅 Quantos dias de viagem?</h3>
                  <input
                    type="number"
                    value={formData.duracao}
                    onChange={(e) => setFormData({...formData, duracao: e.target.value})}
                    placeholder="Ex: 7"
                    min="1"
                    required
                    autoFocus
                  />
                  <div className="botoes-navegacao">
                    <button type="button" onClick={voltarEtapa} className="btn-voltar">
                      ← Voltar
                    </button>
                    <button type="button" onClick={avancarEtapa} disabled={!formData.duracao}>
                      Continuar →
                    </button>
                  </div>
                </div>
              )}

                        {etapaAtual === 5 && (
                <div className="etapa">
                  <h3>🎯 Quais serviços você precisa?</h3>
                  
                  <div className="servicos-grid">
                    <label className="servico-item">
                      <input
                        type="checkbox"
                        checked={formData.interesses.includes('Passagem Aérea')}
                        onChange={() => handleServiceToggle('Passagem Aérea')}
                      />
                      <div className="servico-content">
                        <i className="fas fa-plane"></i>
                        <span>Passagem Aérea</span>
                      </div>
                    </label>

                    <label className="servico-item">
                      <input
                        type="checkbox"
                        checked={formData.interesses.includes('Hotel')}
                        onChange={() => handleServiceToggle('Hotel')}
                      />
                      <div className="servico-content">
                        <i className="fas fa-hotel"></i>
                        <span>Hotel</span>
                      </div>
                    </label>

                    <label className="servico-item">
                      <input
                        type="checkbox"
                        checked={formData.interesses.includes('Aluguel de Temporada')}
                        onChange={() => handleServiceToggle('Aluguel de Temporada')}
                      />
                      <div className="servico-content">
                        <i className="fas fa-home"></i>
                        <span>Aluguel Temporada</span>
                      </div>
                    </label>

                    <label className="servico-item">
                      <input
                        type="checkbox"
                        checked={formData.interesses.includes('Passeios')}
                        onChange={() => handleServiceToggle('Passeios')}
                      />
                      <div className="servico-content">
                        <i className="fas fa-map-marked-alt"></i>
                        <span>Passeios</span>
                      </div>
                    </label>

                    <label className="servico-item">
                      <input
                        type="checkbox"
                        checked={formData.interesses.includes('Seguro Viagem')}
                        onChange={() => handleServiceToggle('Seguro Viagem')}
                      />
                      <div className="servico-content">
                        <i className="fas fa-shield-alt"></i>
                        <span>Seguro Viagem</span>
                      </div>
                    </label>

                    <label className="servico-item">
                      <input
                        type="checkbox"
                        checked={formData.interesses.includes('Aluguel de Carro')}
                        onChange={() => handleServiceToggle('Aluguel de Carro')}
                      />
                      <div className="servico-content">
                        <i className="fas fa-car"></i>
                        <span>Aluguel de Carro</span>
                      </div>
                    </label>

                    <label className="servico-item">
                      <input
                        type="checkbox"
                        checked={formData.interesses.includes('Transfer')}
                        onChange={() => handleServiceToggle('Transfer')}
                      />
                      <div className="servico-content">
                        <i className="fas fa-bus"></i>
                        <span>Transfer</span>
                      </div>
                    </label>

                    <label className="servico-item">
                      <input
                        type="checkbox"
                        checked={formData.interesses.includes('Outros')}
                        onChange={() => handleServiceToggle('Outros')}
                      />
                      <div className="servico-content">
                        <i className="fas fa-ellipsis-h"></i>
                        <span>Outros</span>
                      </div>
                    </label>
                  </div>

                  {formData.interesses && (
                    <p className="servicos-selecionados">
                      Selecionados: {formData.interesses}
                    </p>
                  )}
                  
                  <div className="botoes-navegacao">
                    <button type="button" onClick={voltarEtapa} className="btn-voltar">
                      ← Voltar
                    </button>
                    <button type="submit" disabled={loading || !formData.interesses} className="btn-gerar">
                      {loading ? '✨ Gerando magia...' : '✨ Gerar Roteiro'}
                    </button>
                  </div>
                </div>
              )}

              {etapaAtual === 6 && resultado && (
                <div className="etapa resultado-etapa">
                  <h3>🎉 Seu roteiro está pronto!</h3>
                  <div className="resultado-popup" dangerouslySetInnerHTML={{ __html: resultado }} />
                  <button type="button" onClick={() => {
                    setShowPopup(false);
                    setEtapaAtual(1);
                    setFormData({ nome: '', email: '', destino: '', duracao: '', interesses: '' });
                    setResultado('');
                  }}>
                    Fechar
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      <footer>
        <div className="footer-container">
          <div className="footer-info">
            <p><strong>Sede:</strong><br/>Rua Comendador Torlogo Dauntre, 74 – Sala 1207<br/>Cambuí – Campinas – SP - Brasil – CEP 13025-270</p>
            <p>NOMADE GURU TAC LTDA - CNPJ 11.111.227/0001-20</p>
            <p>© 2009–2025 Nomade Guru TAC Ltda. Todos os direitos reservados.</p>
          </div>
          <div className="footer-links">
            <p><strong>Canais Oficiais</strong></p>
            <ul className="box-redes-sociais">
              <li><a href="https://www.facebook.com/nomadeguru" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f icon"></i></a></li>
              <li><a href="https://www.instagram.com/nomade.guru/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram icon"></i></a></li>
              <li><a href="https://www.youtube.com/@NomadeGuru" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube icon"></i></a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer" aria-label="Spotify"><i className="fab fa-spotify icon"></i></a></li>
            </ul>
          </div>
        </div>
      </footer>

      <style jsx>{`
        /* Header com transição */
        header {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          transition: all 0.3s ease;
          background: transparent;
          padding: 20px 0;
        }

        header.scrolled {
          background: rgba(30, 41, 59, 0.95);
          backdrop-filter: blur(10px);
          padding: 10px 0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        header .logo img {
          height: 60px;
          transition: all 0.3s ease;
        }

        header.scrolled .logo img {
          height: 50px;
        }

        /* Popup Overlay */
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .popup-container {
          background: #1e293b;
          border-radius: 20px;
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          animation: slideUp 0.4s ease;
        }

        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .popup-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255,255,255,0.1);
          border: none;
          color: white;
          font-size: 24px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s;
        }

        .popup-close:hover {
          background: rgba(255,255,255,0.2);
          transform: rotate(90deg);
        }

        .popup-header {
          padding: 40px 40px 20px;
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .popup-header h2 {
          color: white;
          margin-bottom: 20px;
          font-size: 1.8em;
        }

        .progress-bar {
          width: 100%;
          height: 6px;
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 10px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          transition: width 0.4s ease;
        }

        .etapa-info {
          color: #94a3b8;
          font-size: 0.9em;
        }

        .popup-form {
          padding: 40px;
        }

        .etapa {
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .etapa h3 {
          color: white;
          margin-bottom: 20px;
          font-size: 1.3em;
        }

        .etapa input,
        .etapa textarea {
          width: 100%;
          padding: 15px 20px;
          border: 2px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          color: white;
          border-radius: 12px;
          font-size: 1.1em;
          margin-bottom: 20px;
          transition: all 0.3s;
        }

        .etapa input:focus,
        .etapa textarea:focus {
          outline: none;
          border-color: #6366f1;
          background: rgba(255,255,255,0.08);
        }

        .etapa button {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1.1em;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .etapa button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
        }

        .etapa button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .botoes-navegacao {
          display: flex;
          gap: 10px;
        }

        .btn-voltar {
          background: rgba(255,255,255,0.1) !important;
          flex: 1;
        }

        .botoes-navegacao button:last-child {
          flex: 2;
        }

        /* Grid de Serviços */
        .servicos-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }

        .servico-item {
          position: relative;
          display: block;
          cursor: pointer;
          background: rgba(255,255,255,0.05);
          border: 2px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 15px;
          transition: all 0.3s;
        }

        .servico-item:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(99, 102, 241, 0.3);
        }

        .servico-item input[type="checkbox"] {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }

        .servico-item input[type="checkbox"]:checked ~ ..servico-item input[type="checkbox"]:checked ~ .servico-content {
          color: #6366f1;
        }

        .servico-item input[type="checkbox"]:checked ~ .servico-content::before {
          content: '✓';
          position: absolute;
          top: -8px;
          right: -8px;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
          font-weight: bold;
        }

        .servico-item:has(input[type="checkbox"]:checked) {
          background: rgba(99, 102, 241, 0.1);
          border-color: #6366f1;
        }

        .servico-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: #94a3b8;
          transition: all 0.3s;
        }

        .servico-content i {
          font-size: 24px;
        }

        .servico-content span {
          font-size: 0.9em;
          text-align: center;
        }

        .servicos-selecionados {
          color: #6366f1;
          font-size: 0.9em;
          text-align: center;
          margin: 15px 0;
          padding: 10px;
          background: rgba(99, 102, 241, 0.1);
          border-radius: 8px;
        }

        /* Para mobile */
        @media (max-width: 480px) {
          .servicos-grid {
            grid-template-columns: 1fr;
          }
        }

        .resultado-popup {
          max-height: 400px;
          overflow-y: auto;
          background: rgba(0,0,0,0.3);
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 20px;
          color: #e5e7eb;
        }

        /* Destinos Grid */
        .destinos-destaque {
          padding: 80px 20px;
        }

        .destinos-destaque .subtitulo {
          text-align: center;
          color: #94a3b8;
          font-size: 1.2em;
          margin-bottom: 60px;
        }

        .destinos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .destino-card {
          background: #1e293b;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s;
          text-decoration: none;
          color: inherit;
        }

        .destino-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .destino-imagem {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .destino-imagem img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }

        .destino-card:hover .destino-imagem img {
          transform: scale(1.1);
        }

        .destino-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          display: flex;
          align-items: flex-end;
          padding: 20px;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .destino-card:hover .destino-overlay {
          opacity: 1;
        }

        .ver-mais {
          color: white;
          font-weight: 600;
        }

        .destino-info {
          padding: 25px;
        }

        .destino-info h3 {
          color: white;
          margin-bottom: 10px;
          font-size: 1.3em;
        }

        .destino-info .duracao {
          color: #94a3b8;
          margin-bottom: 10px;
        }

        .destino-info .preco {
          color: #6366f1;
          font-weight: 600;
          font-size: 1.2em;
        }

        /* CTA Section */
        .cta-section {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          padding: 80px 20px;
          text-align: center;
          margin: 60px 0;
        }

        .cta-content h2 {
          color: white;
          font-size: 2.5em;
          margin-bottom: 20px;
        }

        .cta-content p {
          color: rgba(255,255,255,0.9);
          font-size: 1.2em;
          margin-bottom: 40px;
        }

        .btn-large {
          padding: 20px 50px;
          font-size: 1.3em;
          background: white;
          color: #6366f1;
          border: none;
          border-radius: 50px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .btn-large:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.3);
        }

        .btn-secondary {
          display: inline-block;
          padding: 15px 40px;
          background: transparent;
          color: #6366f1;
          border: 2px solid #6366f1;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s;
        }

        .btn-secondary:hover {
          background: #6366f1;
          color: white;
        }

        /* Melhorias nos Diferenciais */
        .diferenciais .items {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          max-width: 1200px;
          margin: 60px auto 0;
        }

        .diferencial-item {
          text-align: center;
          padding: 40px 30px;
          background: rgba(255,255,255,0.02);
          border-radius: 16px;
          transition: all 0.3s;
        }

        .diferencial-item:hover {
          transform: translateY(-10px);
          background: rgba(255,255,255,0.05);
        }

        .diferencial-item img {
          height: 80px;
          margin-bottom: 20px;
        }

        .diferencial-item h3 {
          color: white;
          margin-bottom: 15px;
          font-size: 1.3em;
        }

        .diferencial-item p {
          color: #94a3b8;
          line-height: 1.6;
        }

        /* Melhorias Como Funciona */
        .como-funciona .passos {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          max-width: 1200px;
          margin: 60px auto 0;
        }

        .passo {
          position: relative;
          text-align: center;
          padding: 40px 30px;
          background: rgba(255,255,255,0.02);
          border-radius: 16px;
          transition: all 0.3s;
        }

        .passo:hover {
          transform: translateY(-10px);
          background: rgba(255,255,255,0.05);
        }

        .passo-numero {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 1.2em;
        }

        .passo img {
          height: 80px;
          margin-bottom: 20px;
        }

        .passo h3 {
          color: white;
          margin-bottom: 15px;
          font-size: 1.3em;
        }

        .passo p {
          color: #94a3b8;
          line-height: 1.6;
        }

        /* Responsivo */
        @media (max-width: 768px) {
          .popup-container {
            width: 95%;
            margin: 20px;
          }

          .popup-header,
          .popup-form {
            padding: 30px 20px;
          }

          .cta-content h2 {
            font-size: 1.8em;
          }

          header .logo img {
            height: 50px;
          }

          header.scrolled .logo img {
            height: 40px;
          }
        }
      `}</style>
    </>
  );
}

// Buscar destinos em destaque do Strapi
export async function getServerSideProps() {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  if (!apiUrl) {
    return {
      props: {
        destinosDestaque: []
      }
    };
  }

  try {
    const res = await fetch(`${apiUrl}/api/roteiros?populate=*&pagination[limit]=6`);
    
    if (!res.ok) {
      throw new Error('Erro ao buscar destinos');
    }

    const data = await res.json();

    const destinosSimplificados = data.data.map(item => {
      let imagemUrl = 'https://placehold.co/600x400/232452/FFF?text=Sem+Imagem';
      
      if (item.GaleriaDeFotos && Array.isArray(item.GaleriaDeFotos) && item.GaleriaDeFotos.length > 0) {
        imagemUrl = item.GaleriaDeFotos[0].formats?.medium?.url || item.GaleriaDeFotos[0].url;
      }

      return {
        id: item.id,
        documentId: item.documentId,
        Titulo: item.Titulo,
        Duracao: item.Duracao,
        Preco: item.Preco,
        imagemUrl: imagemUrl
      };
    });

    return {
      props: {
        destinosDestaque: destinosSimplificados
      }
    };
  } catch (error) {
    console.error('Erro ao buscar destinos em destaque:', error);
    return {
      props: {
        destinosDestaque: []
      }
    };
  }
}