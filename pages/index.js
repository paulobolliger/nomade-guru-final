import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResultado('');
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    try {
      const response = await fetch('/api/gerar-roteiro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Falha na resposta do servidor');
      }
      setResultado(result.roteiro);
    } catch (error) {
      setResultado(`<p style="color: red;">${error.message}</p>`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Nomade Guru - Agência de Viagens Inteligente</title>
        <meta name="description" content="Roteiros de viagem personalizados com inteligência artificial e curadoria humana." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossOrigin="anonymous" />
      </Head>

      <header>
        <div className="container">
            <div className="logo">
                <a href="#"><img src="https://res.cloudinary.com/dhqvjxgue/image/upload/c_crop,ar_4:3/v1744736404/logo_branco_sem_fundo_rucnug.png" alt="Logo Nomade Guru" /></a>
            </div>
            <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
            <nav>
                <ul className={isMenuOpen ? 'show' : ''} onClick={() => setIsMenuOpen(false)}>
                    <li><a href="#">Destinos</a></li>
                    <li><a href="#">Loja Online</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#contato" className="header-btn">Crie Seu Roteiro</a></li>
                </ul>
            </nav>
        </div>
      </header>

      <main>
        <section className="hero" style={{ backgroundImage: "url('https://res.cloudinary.com/dhqvjxgue/image/upload/v1744155476/imagem-impactante_1_nv98cg.png')" }}>
          <div className="hero-content">
            <h1>Viaje com propósito, viva com liberdade</h1>
            <p>Crie seu roteiro personalizado e descubra novas fronteiras com nossa tecnologia de IA e curadoria humana.</p>
            <a href="#contato" className="btn">Experimente Agora</a>
          </div>
        </section>

        <section className="diferenciais" id="diferenciais">
            <h2>Diferenciais</h2>
            <div className="items">
                <div className="diferencial-item">
                    <img loading="lazy" src="https://res.cloudinary.com/dhqvjxgue/image/upload/v1744155474/icone-tecnologia_2_qnuxdh.png" alt="Tecnologia com propósito" />
                    <p>Tecnologia com propósito</p>
                </div>
                <div className="diferencial-item">
                    <img loading="lazy" src="https://res.cloudinary.com/dhqvjxgue/image/upload/v1744155472/icone-curadoria_2_nttjeq.png" alt="Curadoria humana especializada" />
                    <p>Curadoria humana especializada</p>
                </div>
                <div className="diferencial-item">
                    <img loading="lazy" src="https://res.cloudinary.com/dhqvjxgue/image/upload/v1744155474/icone-roteiros_pdyi68.png" alt="Roteiros autênticos e exclusivos" />
                    <p>Roteiros autênticos e exclusivos</p>
                </div>
            </div>
        </section>

        <section className="como-funciona" id="como-funciona">
            <h2>Como Funciona</h2>
            <div className="passos">
                <div className="passo">
                    <img loading="lazy" src="https://res.cloudinary.com/dhqvjxgue/image/upload/v1744155474/icone-quiz_vqbtlt.png" alt="Descreva sua viagem" />
                    <p>Passo 1: Descreva sua viagem dos sonhos</p>
                </div>
                <div className="passo">
                    <img loading="lazy" src="https://res.cloudinary.com/dhqvjxgue/image/upload/v1744155474/icone-ia_k89u8u.png" alt="Receba um roteiro com IA" />
                    <p>Passo 2: Receba um roteiro instantâneo com IA</p>
                </div>
                <div className="passo">
                    <img loading="lazy" src="https://res.cloudinary.com/dhqvjxgue/image/upload/v1744155474/icone-especialista_ev6aa7.png" alt="Converse com um especialista" />
                    <p>Passo 3: Refine os detalhes com um especialista</p>
                </div>
            </div>
        </section>
        
        <section className="destinos" id="destinos">
            <h2>Destinos em Destaque</h2>
            <div className="carousel">
                <div className="destino-item"><img loading="lazy" src="https://res.cloudinary.com/dhqvjxgue/image/upload/v1744155476/laponia-papai-noel_ex4yss.png" alt="Vila do Papai Noel na Lapônia" /><p>Lapônia</p></div>
                <div className="destino-item"><img loading="lazy" src="https://res.cloudinary.com/dhqvjxgue/image/upload/v1744155473/gramado-natal-luz_mm3c3c.png" alt="Natal Luz em Gramado" /><p>Gramado</p></div>
                <div className="destino-item"><img loading="lazy" src="https://res.cloudinary.com/dhqvjxgue/image/upload/v1744155472/disney-magic-kingdom_bl1w3h.png" alt="Magic Kingdom na Disney" /><p>Disney</p></div>
            </div>
        </section>
        
        <section className="contato-roteiro" id="contato">
          <h2>Crie seu Roteiro Personalizado Instantaneamente</h2>
          <p>Preencha os campos abaixo e deixe nossa IA criar uma primeira versão do seu roteiro dos sonhos!</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group"><label htmlFor="nome">Seu nome:</label><input type="text" id="nome" name="nome" placeholder="Como podemos te chamar?" required /></div>
            <div className="form-group"><label htmlFor="email">Seu e-mail:</label><input type="email" id="email" name="email" placeholder="Para onde enviaremos seu roteiro" required /></div>
            <div className="form-group"><label htmlFor="destino">Destino dos Sonhos:</label><input type="text" id="destino" name="destino" placeholder="Ex: Roma, Itália" required /></div>
            <div className="form-group"><label htmlFor="duracao">Duração da Viagem (em dias):</label><input type="number" id="duracao" name="duracao" placeholder="Ex: 7" required /></div>
            <div className="form-group"><label htmlFor="interesses">Quais são seus interesses?</label><textarea id="interesses" name="interesses" rows="3" placeholder="Gastronomia, história, arte..."></textarea></div>
            <button type="submit" className="btn-gerar" disabled={loading}>
              {loading ? 'Gerando...' : 'Gerar Roteiro Mágico ✨'}
            </button>
          </form>
          {loading && <div style={{ textAlign: 'center', marginTop: '20px' }}><p>Criando sua viagem... ✈️</p></div>}
          {resultado && <div className="resultado-container" dangerouslySetInnerHTML={{ __html: resultado }} />}
        </section>
      </main>

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
        .diferenciais, .como-funciona, .destinos, .curadoria { padding: 60px 20px; text-align: center; }
        .diferenciais h2, .como-funciona h2, .destinos h2, .curadoria h2 { font-size: 2em; margin-bottom: 40px; }
        .items, .passos { max-width: 1200px; margin: auto; display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px; }
        .diferencial-item, .passo { flex: 1; min-width: 200px; max-width: 250px; }
        .diferencial-item img, .passo img { height: 80px; margin-bottom: 15px; }
        .destinos { background-color: var(--secondary1); }
        .carousel { display: flex; overflow-x: auto; gap: 20px; padding-bottom: 20px; max-width: 1200px; margin: auto; scrollbar-width: thin; scrollbar-color: var(--primary) var(--secondary2); }
        .destino-item { flex: 0 0 220px; }
        .destino-item img { width: 100%; height: auto; border-radius: 8px; margin-bottom: 10px; }
      `}</style>
    </>
  );
}