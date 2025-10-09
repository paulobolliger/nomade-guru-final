// Local: pages/index.js

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/header'; // <-- 1. IMPORTAMOS O HEADER
import Footer from '../components/footer'; // <-- 2. IMPORTAMOS O FOOTER

export default function Home({ destinosDestaque }) {
  // A LÓGICA DO HEADER (isMenuOpen, scrolled, useEffect) FOI REMOVIDA DAQUI
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    destino: '',
    duracao: '',
    interesses: ''
  });

  // AS FUNÇÕES DA PÁGINA CONTINUAM IGUAIS
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

      {/* 3. SUBSTITUÍMOS O HEADER ANTIGO PELO COMPONENTE */}
      <Header onCrieRoteiroClick={() => setShowPopup(true)} />

      <main>
        {/* O CONTEÚDO DA PÁGINA CONTINUA O MESMO */}
        <section className="hero" style={{ backgroundImage: "url('https://res.cloudinary.com/dhqvjxgue/image/upload/v1744155476/imagem-impactante_1_nv98cg.png')" }}>
          <div className="hero-content">
            <h1>Viaje com propósito, viva com liberdade</h1>
            <p>Crie seu roteiro personalizado e descubra novas fronteiras com nossa tecnologia de IA e curadoria humana.</p>
            <button onClick={() => setShowPopup(true)} className="btn">
              Experimente Agora ✨
            </button>
          </div>
        </section>

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

        <section className="cta-section" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ textAlign: 'center', width: '100%' }}>Pronto para sua próxima aventura?</h2>
          <p style={{ textAlign: 'center', width: '100%', maxWidth: '800px' }}>Crie seu roteiro personalizado agora mesmo com nossa IA</p>
          <button onClick={() => setShowPopup(true)} className="btn-large" style={{ display: 'inline-block', margin: '0 auto' }}>
            Começar Agora ✨
          </button>
        </section>
      </main>

      {/* A LÓGICA DO POPUP CONTINUA A MESMA */}
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
                    <label className="servico-item"><input type="checkbox" checked={formData.interesses.includes('Passagem Aérea')} onChange={() => handleServiceToggle('Passagem Aérea')} /><div className="servico-content"><i className="fas fa-plane"></i><span>Passagem Aérea</span></div></label>
                    <label className="servico-item"><input type="checkbox" checked={formData.interesses.includes('Hotel')} onChange={() => handleServiceToggle('Hotel')} /><div className="servico-content"><i className="fas fa-hotel"></i><span>Hotel</span></div></label>
                    <label className="servico-item"><input type="checkbox" checked={formData.interesses.includes('Aluguel de Temporada')} onChange={() => handleServiceToggle('Aluguel de Temporada')} /><div className="servico-content"><i className="fas fa-home"></i><span>Aluguel Temporada</span></div></label>
                    <label className="servico-item"><input type="checkbox" checked={formData.interesses.includes('Passeios')} onChange={() => handleServiceToggle('Passeios')} /><div className="servico-content"><i className="fas fa-map-marked-alt"></i><span>Passeios</span></div></label>
                    <label className="servico-item"><input type="checkbox" checked={formData.interesses.includes('Seguro Viagem')} onChange={() => handleServiceToggle('Seguro Viagem')} /><div className="servico-content"><i className="fas fa-shield-alt"></i><span>Seguro Viagem</span></div></label>
                    <label className="servico-item"><input type="checkbox" checked={formData.interesses.includes('Aluguel de Carro')} onChange={() => handleServiceToggle('Aluguel de Carro')} /><div className="servico-content"><i className="fas fa-car"></i><span>Aluguel de Carro</span></div></label>
                    <label className="servico-item"><input type="checkbox" checked={formData.interesses.includes('Transfer')} onChange={() => handleServiceToggle('Transfer')} /><div className="servico-content"><i className="fas fa-bus"></i><span>Transfer</span></div></label>
                    <label className="servico-item"><input type="checkbox" checked={formData.interesses.includes('Outros')} onChange={() => handleServiceToggle('Outros')} /><div className="servico-content"><i className="fas fa-ellipsis-h"></i><span>Outros</span></div></label>
                  </div>
                  {formData.interesses && (<p className="servicos-selecionados">Selecionados: {formData.interesses}</p>)}
                  <div className="botoes-navegacao">
                    <button type="button" onClick={voltarEtapa} className="btn-voltar">← Voltar</button>
                    <button type="submit" disabled={loading || !formData.interesses} className="btn-gerar">{loading ? '✨ Gerando magia...' : '✨ Gerar Roteiro'}</button>
                  </div>
                </div>
              )}
              {etapaAtual === 6 && resultado && (
                <div className="etapa resultado-etapa">
                  <h3>🎉 Seu roteiro está pronto!</h3>
                  <div className="resultado-popup" dangerouslySetInnerHTML={{ __html: resultado }} />
                  <button type="button" onClick={() => { setShowPopup(false); setEtapaAtual(1); setFormData({ nome: '', email: '', destino: '', duracao: '', interesses: '' }); setResultado(''); }}>Fechar</button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* 4. SUBSTITUÍMOS O FOOTER ANTIGO PELO COMPONENTE */}
      <Footer />

      {/* 5. O BLOCO <style jsx> FOI COMPLETAMENTE REMOVIDO */}
    </>
  );
}

// O getServerSideProps CONTINUA O MESMO
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