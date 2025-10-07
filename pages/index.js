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
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" xintegrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossOrigin="anonymous" />
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
            {/* ... seções do meio ... */}
        </section>

        <section className="como-funciona" id="como-funciona">
            {/* ... seções do meio ... */}
        </section>
        
        <section className="destinos" id="destinos">
            {/* ... seções do meio ... */}
        </section>
        
        <section className="contato-roteiro" id="contato">
          <h2>Crie seu Roteiro Personalizado Instantaneamente</h2>
          <p>Preencha os campos abaixo e deixe nossa IA criar uma primeira versão do seu roteiro dos sonhos!</p>
          
          {/* === NOVO FORMULÁRIO (SUGESTÃO DO CHATGPT) === */}
          <form id="roteiro-form" onSubmit={handleSubmit}>
            <div className="md-field">
              <input type="text" id="nome" name="nome" required placeholder=" " />
              <label htmlFor="nome">Seu nome</label>
            </div>

            <div className="md-field">
              <input type="email" id="email" name="email" required placeholder=" " />
              <label htmlFor="email">Seu e-mail</label>
            </div>

            <div className="md-field">
              <input type="text" id="destino" name="destino" required placeholder=" " />
              <label htmlFor="destino">Destino dos sonhos</label>
            </div>

            <div className="md-field">
              <input type="number" id="duracao" name="duracao" required placeholder=" " />
              <label htmlFor="duracao">Duração da viagem (em dias)</label>
            </div>

            <div className="md-field textarea">
              <textarea id="interesses" name="interesses" rows="3" placeholder=" "></textarea>
              <label htmlFor="interesses">Quais são seus interesses?</label>
            </div>

            <button type="submit" className="md-btn" disabled={loading}>
              {loading ? 'Gerando...' : 'Gerar Roteiro Mágico ✨'}
            </button>
          </form>
          {/* === FIM DO NOVO FORMULÁRIO === */}

          {loading && <div style={{ textAlign: 'center', marginTop: '40px' }}><p>Criando sua viagem... ✈️</p></div>}
          {resultado && <div className="resultado-container" dangerouslySetInnerHTML={{ __html: resultado }} />}
        </section>
      </main>

      <footer>
        {/* ... seu rodapé ... */}
      </footer>

      <style jsx>{`
        /* ... seus estilos jsx ... */
      `}</style>
    </>
  );
}