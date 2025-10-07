import Head from 'next/head';
import Link from 'next/link'; // Importa o componente de Link do Next.js

export default function Destinos({ roteiros, error }) {
  return (
    <>
      <Head>
        <title>Nossos Roteiros - Nomade Guru</title>
      </Head>

      <header>
        <div className="container">
          <div className="logo">
            <Link href="/">
              <img src="https://res.cloudinary.com/dhqvjxgue/image/upload/c_crop,ar_4:3/v1744736404/logo_branco_sem_fundo_rucnug.png" alt="Logo Nomade Guru" />
            </Link>
          </div>
          <nav>
            <ul>
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
        
        {/* Se houver um erro, exibe a mensagem de erro */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Se não houver erro, mas a lista de roteiros estiver vazia */}
        {!error && (!roteiros || roteiros.length === 0) && (
            <p>Nenhum roteiro encontrado. Cadastre seu primeiro roteiro no painel do Strapi!</p>
        )}

        <div className="roteiros-grid">
          {/* Mapeia e exibe cada roteiro se a lista não estiver vazia */}
          {roteiros && roteiros.map((roteiro) => (
            <div key={roteiro.id} className="roteiro-card">
              {/* Código mais seguro para evitar erro se não houver imagem */}
              <img 
                src={roteiro.attributes.GaleriaDeFotos?.data?.[0]?.attributes?.url || 'https://placehold.co/600x400/232452/FFF?text=Sem+Imagem'} 
                alt={roteiro.attributes.Titulo} 
              />
              <div className="roteiro-info">
                <h2>{roteiro.attributes.Titulo}</h2>
                <p className="duracao">{roteiro.attributes.Duracao || 'Duração não informada'}</p>
                {/* Código mais seguro para evitar erro se não houver preço */}
                <p className="preco">R$ {roteiro.attributes.Preco?.toFixed(2).replace('.', ',') || 'Sob consulta'}</p>
                <a href="#" className="btn-comprar">Ver Detalhes</a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

// Usando getServerSideProps para garantir que o build da Vercel não falhe
export async function getServerSideProps() {
  const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/roteiros?populate=*`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      // Se a resposta não for OK, lança um erro para ser apanhado pelo catch
      throw new Error(`Falha ao buscar dados do Strapi. Status: ${res.status}`);
    }

    const roteirosData = await res.json();
    
    // Se a resposta da API for um erro do Strapi (ex: Forbidden)
    if (roteirosData.error) {
      throw new Error(roteirosData.error.message);
    }

    return {
      props: {
        roteiros: roteirosData.data || [],
        error: null,
      },
    };
  } catch (error) {
    console.error('Erro em getServerSideProps para /destinos:', error.message);
    // Retorna a mensagem de erro para ser exibida na página
    return { 
      props: { 
        roteiros: [], 
        error: "Desculpe, não foi possível carregar os roteiros no momento. Verifique se o servidor do Strapi está online e as permissões estão corretas." 
      } 
    };
  }
}