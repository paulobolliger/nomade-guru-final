import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function RoteiroDetalhes({ roteiro, error }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imagemAtual, setImagemAtual] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (error) {
    return (
      <>
        <Head>
          <title>Erro - Nomade Guru</title>
        </Head>
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h1>Roteiro não encontrado</h1>
          <p>{error}</p>
          <Link href="/destinos" style={{ color: '#6366f1' }}>← Voltar para Destinos</Link>
        </div>
      </>
    );
  }

  if (!roteiro) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>Carregando...</p>
      </div>
    );
  }

  const galeriaFotos = roteiro.GaleriaDeFotos || [];

  // Função para renderizar o conteúdo Rich Text do Strapi
  const renderDescricao = (blocos) => {
    if (!blocos || !Array.isArray(blocos)) return null;

    return blocos.map((bloco, index) => {
      if (bloco.type === 'paragraph') {
        const texto = bloco.children?.map(child => child.text).join('') || '';
        
        // Se for um parágrafo vazio, adiciona espaçamento
        if (texto.trim() === '') {
          return <div key={index} style={{ height: '10px' }} />;
        }

        // Se começar com emoji de dia (🗓, 🍇, 🧱, 🌻, 🍷, 🧀, ☀️, 💫)
        if (texto.match(/^[🗓🍇🧱🌻🍷🧀☀️💫]/)) {
          return (
            <h3 key={index} style={{ 
              marginTop: '40px', 
              marginBottom: '20px',
              color: '#6366f1',
              fontSize: '1.5em',
              fontWeight: 'bold',
              paddingBottom: '10px',
              borderBottom: '2px solid #e5e7eb'
            }}>
              {texto}
            </h3>
          );
        }

        // Se começar com emoji de comida/atividade (🍝, 🌅, 🏡)
        if (texto.match(/^[🍝🌅🏡🍷]/)) {
          return (
            <p key={index} style={{
              marginTop: '15px',
              marginBottom: '10px',
              padding: '12px 20px',
              backgroundColor: '#f3f4f6',
              borderLeft: '4px solid #6366f1',
              borderRadius: '4px',
              fontSize: '1.05em'
            }}>
              {texto}
            </p>
          );
        }

        // Parágrafo normal
        return (
          <p key={index} style={{
            marginBottom: '12px',
            lineHeight: '1.8',
            color: '#e5e7eb'
          }}>
            {texto}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <>
      <Head>
        <title>{roteiro.Titulo} - Nomade Guru</title>
        <meta name="description" content={`Explore o roteiro ${roteiro.Titulo}`} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" />
      </Head>

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
              <li><a href="#">Blog</a></li>
              <li><Link href="/#contato" className="header-btn">Crie Seu Roteiro</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="roteiro-detalhes-page" style={{ paddingTop: '120px' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
          
          {/* Breadcrumb */}
          <div style={{ marginBottom: '20px' }}>
            <Link href="/destinos" style={{ color: '#6366f1', textDecoration: 'none' }}>
              ← Voltar para Destinos
            </Link>
          </div>

          {/* Título e informações principais */}
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2.5em', marginBottom: '20px' }}>{roteiro.Titulo}</h1>
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
              <div>
                <strong>Duração:</strong> {roteiro.Duracao || 'Consulte-nos'}
              </div>
              <div>
                <strong>Preço:</strong> {roteiro.Preco ? `US$ ${(roteiro.Preco / 100).toFixed(2).replace('.', ',')}` : 'Sob consulta'}
              </div>
            </div>
          </div>

          {/* Galeria de fotos */}
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
                
                {/* Navegação da galeria */}
                {galeriaFotos.length > 1 && (
                  <>
                    <button
                      onClick={() => setImagemAtual(imagemAtual > 0 ? imagemAtual - 1 : galeriaFotos.length - 1)}
                      style={{
                        position: 'absolute',
                        left: '20px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255,255,255,0.9)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        fontSize: '24px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                      }}
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => setImagemAtual(imagemAtual < galeriaFotos.length - 1 ? imagemAtual + 1 : 0)}
                      style={{
                        position: 'absolute',
                        right: '20px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255,255,255,0.9)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        fontSize: '24px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                      }}
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {/* Miniaturas */}
              {galeriaFotos.length > 1 && (
                <div style={{ 
                  display: 'flex', 
                  gap: '10px', 
                  overflowX: 'auto',
                  paddingBottom: '10px'
                }}>
                  {galeriaFotos.map((foto, index) => (
                    <img
                      key={index}
                      src={foto.formats?.thumbnail?.url || foto.url}
                      alt={`Miniatura ${index + 1}`}
                      onClick={() => setImagemAtual(index)}
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        border: imagemAtual === index ? '3px solid #6366f1' : '3px solid transparent',
                        transition: 'all 0.3s'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Descrição detalhada */}
          <div style={{ 
            lineHeight: '1.8',
            fontSize: '1.05em',
            marginBottom: '60px',
            padding: '40px',
            backgroundColor: '#1e293b',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            {renderDescricao(roteiro.DescricaoDetalhada)}
          </div>

          {/* Call to Action */}
          <div style={{ 
            textAlign: 'center',
            padding: '40px 20px',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            borderRadius: '12px',
            color: 'white'
          }}>
            <h2 style={{ marginBottom: '20px' }}>Pronto para essa aventura?</h2>
            <p style={{ marginBottom: '30px', fontSize: '1.1em' }}>
              Entre em contato conosco para personalizar este roteiro
            </p>
            <Link 
              href="/#contato" 
              style={{
                display: 'inline-block',
                padding: '15px 40px',
                background: 'white',
                color: '#6366f1',
                borderRadius: '30px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1.1em',
                transition: 'transform 0.3s'
              }}
            >
              Fale Conosco
            </Link>
          </div>

        </div>
      </main>

      <footer>
        <div className="footer-container">
          <div className="footer-info">
            <p><strong>Sede:</strong><br/>
            Rua Comendador Torlogo Dauntre, 74 – Sala 1207<br/>
            Cambuí – Campinas – SP - Brasil – CEP 13025-270</p>
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
    </>
  );
}

export async function getServerSideProps({ params }) {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const roteiroId = params.id;

  if (!apiUrl) {
    return {
      props: {
        roteiro: null,
        error: 'Configuração do servidor incompleta.'
      }
    };
  }

  try {
    // Buscar roteiro específico pelo documentId
    const res = await fetch(`${apiUrl}/api/roteiros?filters[documentId][$eq]=${roteiroId}&populate=*`);

    if (!res.ok) {
      throw new Error(`Erro HTTP ${res.status}`);
    }

    const data = await res.json();

    if (!data.data || data.data.length === 0) {
      return {
        props: {
          roteiro: null,
          error: 'Roteiro não encontrado.'
        }
      };
    }

    const roteiro = data.data[0];

    return {
      props: {
        roteiro: {
          id: roteiro.id,
          documentId: roteiro.documentId,
          Titulo: roteiro.Titulo,
          Duracao: roteiro.Duracao,
          Preco: roteiro.Preco,
          GaleriaDeFotos: roteiro.GaleriaDeFotos || [],
          DescricaoDetalhada: roteiro.DescricaoDetalhada || []
        },
        error: null
      }
    };
  } catch (error) {
    console.error('Erro ao buscar roteiro:', error);
    return {
      props: {
        roteiro: null,
        error: 'Não foi possível carregar o roteiro.'
      }
    };
  }
}