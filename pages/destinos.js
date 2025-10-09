// Local: pages/destinos.js

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'; // <-- Adicionado para navegação
import Header from '../components/header'; // <-- Importado
import Footer from '../components/footer'; // <-- Importado

export default function Destinos({ roteiros, error }) {
  // A lógica do Header (useState e useEffect) foi REMOVIDA daqui
  const router = useRouter();

  // Função para o botão do Header navegar para a seção #contato da home
  const handleCrieRoteiroClick = () => {
    router.push('/#contato');
  };

  return (
    <>
      <Head>
        <title>Nossos Roteiros - Nomade Guru</title>
        <meta name="description" content="Explore nossos roteiros exclusivos" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" />
      </Head>

      {/* Usamos o componente Header e passamos a função de navegação */}
      <Header onCrieRoteiroClick={handleCrieRoteiroClick} />

      <main className="destinos-page">
        <div className="page-header" style={{ background: '#7b68ee', color: '#ffffff', border: 'none' }}>
          <h1>Nossos Roteiros</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Explore os roteiros pré-definidos e encontre sua próxima grande aventura.</p>
        </div>
        
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
            
            let imagemUrl = 'https://placehold.co/600x400/232452/FFF?text=Sem+Imagem';
            
            if (roteiro.GaleriaDeFotos && 
                Array.isArray(roteiro.GaleriaDeFotos) && 
                roteiro.GaleriaDeFotos.length > 0) {
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

      {/* Usamos o componente Footer */}
      <Footer />
    </>
  );
}

// A função getServerSideProps continua exatamente a mesma
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

    const roteirosSimplificados = roteirosData.data.map(item => ({
      id: item.id,
      documentId: item.documentId,
      Titulo: item.Titulo,
      Introducao: item.Introducao,
      Duracao: item.Duracao,
      Preco: item.Preco,
      Destino: item.Destino,
      Estilo_de_Viagem: item.Estilo_de_Viagem,
      Dificuldade: item.Dificuldade,
      MelhorEpoca: item.MelhorEpoca,
      Destaque: item.Destaque,
      Tags: item.Tags,
      GaleriaDeFotos: item.GaleriaDeFotos || []
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