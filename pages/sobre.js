// Local: pages/sobre.js

import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/header';
import Footer from '../components/footer';

export default function SobreNos() {
  const router = useRouter();

  const handleCrieRoteiroClick = () => {
    router.push('/#contato');
  };

  return (
    <>
      <Head>
        <title>Sobre Nós - Nomade Guru</title>
        <meta name="description" content="Conheça a história e a filosofia por trás da Nomade Guru." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header onCrieRoteiroClick={handleCrieRoteiroClick} />

      <main className="about-page">
        <div className="page-header" style={{ background: '#7b68ee', color: '#ffffff', border: 'none' }}>
          <h1>Nossa Jornada</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Descubra a paixão e o propósito que movem a Nomade Guru.
          </p>
        </div>

        <section className="about-content">
          <div className="container">
            <div className="about-section">
              <img src="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Nascer do sol nas montanhas" className="about-image" />
              <div className="about-text">
                <h2>Nossa Filosofia de Viagem</h2>
                <p>Na Nomade Guru, acreditamos que viajar é muito mais do que conhecer lugares: é viver experiências transformadoras, criar memórias inesquecíveis e se conectar profundamente com culturas e pessoas ao redor do mundo.</p>
                <p>Somos especialistas em viagens personalizadas e roteiros exclusivos, combinando aventura, conforto e autenticidade.</p>
              </div>
            </div>

            <div className="about-section mission-section">
              <div className="about-text">
                <h2>Planejado nos Mínimos Detalhes</h2>
                <p>Cada viagem que criamos é planejada com atenção aos mínimos detalhes: desde a escolha dos hotéis, transporte e passeios, até dicas locais que só quem realmente conhece o destino pode oferecer.</p>
                <p>Nosso objetivo é tornar o sonho da viagem perfeita uma realidade. Não importa se você deseja explorar fiordes noruegueses, relaxar em praias paradisíacas ou mergulhar na cultura de grandes cidades: a Nomade Guru transforma suas ideias em roteiros sob medida.</p>
              </div>
               <img src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Pessoa olhando mapa em uma cidade histórica" className="about-image" />
            </div>
            
            <div className="about-section">
               <img src="https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Bússola e mapa em uma mesa de madeira" className="about-image" />
              <div className="about-text">
                <h2>Por que escolher a Nomade Guru?</h2>
                <ul>
                  <li><strong>Expertise local e global:</strong> trabalhamos com parceiros de confiança em todo o mundo.</li>
                  <li><strong>Suporte completo:</strong> atendimento antes, durante e depois da viagem, para que você viaje tranquilo.</li>
                  <li><strong>Personalização total:</strong> cada roteiro é único, pensado especialmente para você.</li>
                  <li><strong>Segurança e transparência:</strong> seguimos rigorosamente normas de segurança e práticas éticas em todas as etapas.</li>
                </ul>
                <p>Viajar com a Nomade Guru é embarcar em uma experiência feita para viver, sentir e lembrar para sempre. Mais do que destinos, entregamos histórias e memórias que você vai contar por toda a vida.</p>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}