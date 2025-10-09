// Local: pages/roteiro/[id].js

import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header'; // <-- IMPORTADO
import Footer from '../../components/Footer'; // <-- IMPORTADO

export default function RoteiroDetalhes({ roteiro, error }) {
  // A lógica do header (isMenuOpen, scrolled) foi REMOVIDA
  const [imagemAtual, setImagemAtual] = useState(0);
  const router = useRouter();

  const handleCrieRoteiroClick = () => {
    router.push('/#contato');
  };

  if (error) {
    return (
      <>
        <Head>
          <title>Erro - Nomade Guru</title>
        </Head>
        {/* Adicionamos o Header e Footer também na página de erro para manter o layout */}
        <Header onCrieRoteiroClick={handleCrieRoteiroClick} />
        <div style={{ padding: '120px 40px', textAlign: 'center', minHeight: '60vh' }}>
          <h1>Roteiro não encontrado</h1>
          <p>{error}</p>
          <Link href="/destinos" style={{ color: '#6366f1' }}>← Voltar para Destinos</Link>
        </div>
        <Footer />
      </>
    );
  }

  if (!roteiro) {
    return (
      // Adicionado Header e Footer na tela de carregamento
      <>
        <Header onCrieRoteiroClick={handleCrieRoteiroClick} />
        <div style={{ padding: '120px 40px', textAlign: 'center', minHeight: '60vh' }}>
          <p>Carregando...</p>
        </div>
        <Footer />
      </>
    );
  }

  const galeriaFotos = roteiro.GaleriaDeFotos || [];

  return (
    <>
      <Head>
        <title>{roteiro.Titulo} - Nomade Guru</title>
        <meta name="description" content={`Explore o roteiro ${roteiro.Titulo}`} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" />
      </Head>

      {/* SUBSTITUÍMOS o header antigo pelo componente padrão */}
      <Header onCrieRoteiroClick={handleCrieRoteiroClick} />

      <main className="roteiro-detalhes-page" style={{ paddingTop: '120px' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
          
          <div style={{ marginBottom: '20px' }}>
            <Link href="/destinos" style={{ color: '#6366f1', textDecoration: 'none' }}>
              ← Voltar para Destinos
            </Link>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2.5em', marginBottom: '20px' }}>{roteiro.Titulo}</h1>
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
              <div>
                <strong>Duração:</strong> {roteiro.Duracao || 'Consulte-nos'}
              </div>
              <div>
                <strong>Preço:</strong> {roteiro.Preco && roteiro.Preco > 0 ? `US$ ${(roteiro.Preco / 100).toFixed(2).replace('.', ',')}` : 'Sob consulta'}
              </div>
            </div>
          </div>

          {galeriaFotos.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <div style={{ 
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '20px'
              }}>
                <img 
                  src={galeriaFotos[imagemAtual]?.url || galeriaFotos[imagemAtual]?.formats?.large?.url}
                  alt={`${roteiro.Titulo} - Foto ${imagemAtual + 1}`}
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    maxHeight: '600px',
                    objectFit: 'cover'
                  }}
                />
                
                {galeriaFotos.length > 1 && (
                  <>
                    <button
                      onClick={() => setImagemAtual(imagemAtual > 0 ? imagemAtual - 1 : galeriaFotos.length - 1)}
                      style={{
                        position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)',
                        background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%',
                        width: '50px', height: '50px', fontSize: '24px', cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                      }}
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => setImagemAtual(imagemAtual < galeriaFotos.length - 1 ? imagemAtual + 1 : 0)}
                      style={{
                        position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
                        background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%',
                        width: '50px', height: '50px', fontSize: '24px', cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                      }}
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {galeriaFotos.length > 1 && (
                <div style={{ 
                  display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px'
                }}>
                  {galeriaFotos.map((foto, index) => (
                    <img
                      key={index}
                      src={foto.formats?.thumbnail?.url || foto.url}
                      alt={`Miniatura ${index + 1}`}
                      onClick={() => setImagemAtual(index)}
                      style={{
                        width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px',
                        cursor: 'pointer', border: imagemAtual === index ? '3px solid #6366f1' : '3px solid transparent',
                        transition: 'all 0.3s'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {roteiro.Introducao && (
            <div style={{ 
              lineHeight: '1.8', fontSize: '1.1em', marginBottom: '40px',
              padding: '30px', backgroundColor: '#1e293b', borderRadius: '12px', color: '#e5e7eb'
            }}>
              <p>{roteiro.Introducao}</p>
            </div>
          )}

          {roteiro.PlanoDiario && roteiro.PlanoDiario.length > 0 && (
            <div style={{ marginBottom: '60px' }}>
              <h2 style={{ fontSize: '2em', marginBottom: '30px', color: '#6366f1' }}>
                📅 Roteiro Dia a Dia
              </h2>
              {roteiro.PlanoDiario.map((dia, index) => (
                <div key={index} style={{
                  padding: '30px', marginBottom: '20px', backgroundColor: '#1e293b',
                  borderRadius: '12px', borderLeft: '4px solid #6366f1'
                }}>
                  <div style={{
                    display: 'inline-block', background: '#6366f1', color: 'white',
                    padding: '8px 20px', borderRadius: '20px', fontWeight: 'bold', marginBottom: '15px'
                  }}>
                    Dia {dia.Numero_do_Dia}
                  </div>
                  <h3 style={{ fontSize: '1.5em', marginBottom: '15px', color: 'white' }}>
                    {dia.Titulo_do_Dia}
                  </h3>
                  <p style={{ lineHeight: '1.8', color: '#e5e7eb' }}>
                    {dia.Descricao_do_Dia}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div style={{ 
            textAlign: 'center', padding: '40px 20px',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            borderRadius: '12px', color: 'white'
          }}>
            <h2 style={{ marginBottom: '20px' }}>Pronto para essa aventura?</h2>
            <p style={{ marginBottom: '30px', fontSize: '1.1em' }}>
              Entre em contato conosco para personalizar este roteiro
            </p>
            <Link 
              href="/#contato" 
              style={{
                display: 'inline-block', padding: '15px 40px', background: 'white',
                color: '#6366f1', borderRadius: '30px', textDecoration: 'none',
                fontWeight: 'bold', fontSize: '1.1em', transition: 'transform 0.3s'
              }}
            >
              Fale Conosco
            </Link>
          </div>
        </div>
      </main>

      {/* SUBSTITUÍMOS o footer antigo pelo componente padrão */}
      <Footer />
    </>
  );
}

// A função getServerSideProps continua a mesma
export async function getServerSideProps({ params }) {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const roteiroId = params.id;

  if (!apiUrl) {
    return { props: { roteiro: null, error: 'Configuração do servidor incompleta.' } };
  }

  try {
    const res = await fetch(`${apiUrl}/api/roteiros?filters[documentId][$eq]=${roteiroId}&populate=*`);

    if (!res.ok) {
      throw new Error(`Erro HTTP ${res.status}`);
    }

    const data = await res.json();

    if (!data.data || data.data.length === 0) {
      return { props: { roteiro: null, error: 'Roteiro não encontrado.' } };
    }

    const roteiro = data.data[0];

    return {
      props: {
        roteiro: {
          id: roteiro.id,
          documentId: roteiro.documentId,
          Titulo: roteiro.Titulo,
          Introducao: roteiro.Introducao,
          Duracao: roteiro.Duracao,
          Preco: roteiro.Preco,
          GaleriaDeFotos: roteiro.GaleriaDeFotos || [],
          PlanoDiario: roteiro.PlanoDiario || []
        },
        error: null
      }
    };
  } catch (error) {
    console.error('Erro ao buscar roteiro:', error);
    return { props: { roteiro: null, error: 'Não foi possível carregar o roteiro.' } };
  }
}