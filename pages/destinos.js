import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Destinos({ roteiros, error }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Nossos Roteiros - Nomade Guru</title>
        <meta name="description" content="Explore nossos roteiros exclusivos" />
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

      <main className="destinos-page">
        <h1>Nossos Roteiros</h1>
        <p>Explore os roteiros pré-definidos e encontre sua próxima grande aventura.</p>
        
        {error && (
          <div style={{ 
            padding: '20px', 
            backgroundColor: '#fee', 
            border: '1px solid #fcc',
            borderRadius: '8px',
            margin: '20px 0'
          }}>
            <p style={{ color: '#c00', margin: 0 }}>
              <strong>Erro:</strong> {error}
            </p>
          </div>
        )}

        {!error && (!roteiros || roteiros.length === 0) && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Nenhum roteiro encontrado. Cadastre seu primeiro roteiro no painel do Strapi!</p>
          </div>
        )}

        <div className="roteiros-grid">
          {roteiros && roteiros.length > 0 && roteiros.map((roteiro) => {
            const titulo = roteiro.Titulo || 'Roteiro sem título';
            const duracao = roteiro.Duracao || 'Duração não informada';
            const preco = roteiro.Preco;
            
            // A galeria vem como array direto, não dentro de .data
            let imagemUrl = 'https://placehold.co/600x400/232452/FFF?text=Sem+Imagem';
            
            if (roteiro.GaleriaDeFotos && 
                Array.isArray(roteiro.GaleriaDeFotos) && 
                roteiro.GaleriaDeFotos.length > 0) {
              // Pega a URL diretamente do primeiro item
              imagemUrl = roteiro.GaleriaDeFotos[0].url || imagemUrl;
            }
            
            return (
              <div key={roteiro.id} className="roteiro-card">
                <img 
                  src={imagemUrl}
                  alt={titulo}
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/600x400/232452/FFF?text=Erro+ao+Carregar';
                  }}
                />
                <div className="roteiro-info">
                  <h2>{titulo}</h2>
                  <p className="duracao">{duracao}</p>
                  <p className="preco">
                    {preco ? `US$ ${(preco / 100).toFixed(2).replace('.', ',')}` : 'Sob consulta'}
                  </p>
                  <Link href={`/roteiro/${roteiro.documentId}`} className="btn-comprar">
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            );
          })}
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

export async function getServerSideProps() {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  
  if (!apiUrl) {
    console.error('❌ ERRO: NEXT_PUBLIC_STRAPI_API_URL não está configurada');
    return {
      props: {
        roteiros: [],
        error: 'Configuração do servidor incompleta.'
      }
    };
  }

  const fullUrl = `${apiUrl}/api/roteiros?populate=*`;
  console.log('🔍 Buscando dados de:', fullUrl);

  try {
    const res = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📊 Status da resposta:', res.status);

    if (!res.ok) {
      throw new Error(`Erro HTTP ${res.status}: ${res.statusText}`);
    }

    const roteirosData = await res.json();
    
    if (roteirosData.error) {
      throw new Error(roteirosData.error.message || 'Erro desconhecido do Strapi');
    }

    console.log('✅ Roteiros carregados:', roteirosData.data?.length || 0);

    // Transforma os dados para simplificar o acesso no componente
    const roteirosSimplificados = roteirosData.data.map(item => ({
      id: item.id,
      documentId: item.documentId,
      Titulo: item.Titulo,
      Duracao: item.Duracao,
      Preco: item.Preco,
      GaleriaDeFotos: item.GaleriaDeFotos || [],
      DescricaoDetalhada: item.DescricaoDetalhada
    }));

    return {
      props: {
        roteiros: roteirosSimplificados,
        error: null,
      },
    };
  } catch (error) {
    console.error('❌ Erro ao buscar roteiros:', error.message);
    return {
      props: {
        roteiros: [],
        error: `Não foi possível conectar ao servidor: ${error.message}`
      }
    };
  }
}