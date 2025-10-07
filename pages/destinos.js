import Head from 'next/head';

export default function Destinos({ roteiros, error }) {
  return (
    <>
      <Head>
        <title>Nossos Roteiros - Nomade Guru</title>
      </Head>

      <header>
        <div className="container">
            <div className="logo">
                <a href="/"><img src="https://res.cloudinary.com/dhqvjxgue/image/upload/c_crop,ar_4:3/v1744736404/logo_branco_sem_fundo_rucnug.png" alt="Logo Nomade Guru" /></a>
            </div>
            <nav>
                <ul>
                    <li><a href="/destinos">Destinos</a></li>
                    <li><a href="#">Loja Online</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="/#contato" className="header-btn">Crie Seu Roteiro</a></li>
                </ul>
            </nav>
        </div>
      </header>

      <main className="destinos-page">
        <h1>Nossos Roteiros</h1>
        <p>Explore os roteiros pré-definidos e encontre sua próxima grande aventura.</p>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="roteiros-grid">
          {roteiros && roteiros.map((roteiro) => (
            <div key={roteiro.id} className="roteiro-card">
              {/* Verifica se a imagem existe antes de tentar renderizar */}
              {roteiro.attributes.GaleriaDeFotos.data && roteiro.attributes.GaleriaDeFotos.data.length > 0 && (
                 <img 
                    src={roteiro.attributes.GaleriaDeFotos.data[0].attributes.url} 
                    alt={roteiro.attributes.Titulo} 
                  />
              )}
              <div className="roteiro-info">
                <h2>{roteiro.attributes.Titulo}</h2>
                <p className="duracao">{roteiro.attributes.Duracao}</p>
                <p className="preco">R$ {roteiro.attributes.Preco.toFixed(2).replace('.', ',')}</p>
                <a href="#" className="btn-comprar">Ver Detalhes</a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  // Garante que a variável de ambiente existe
  if (!process.env.NEXT_PUBLIC_STRAPI_API_URL) {
    console.error("ERRO: A variável de ambiente NEXT_PUBLIC_STRAPI_API_URL não está configurada.");
    return { props: { roteiros: [], error: "A conexão com o servidor de conteúdo não está configurada." } };
  }
  
  const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/roteiros?populate=*`;

  try {
    const res = await fetch(apiUrl);

    if (!res.ok) {
      console.error(`Erro ao buscar do Strapi: ${res.status} ${res.statusText}`);
      throw new Error('Não foi possível carregar os roteiros do nosso servidor.');
    }

    const roteirosData = await res.json();

    return {
      props: {
        roteiros: roteirosData.data || [],
        error: null,
      },
      revalidate: 60, // Atualiza os dados a cada 60 segundos
    };
  } catch (error) {
    console.error('Erro de build em getStaticProps:', error.message);
    // Retorna props vazias para não quebrar o build, mas passa a mensagem de erro
    return { 
      props: { 
        roteiros: [], 
        error: "Desculpe, não foi possível carregar os roteiros no momento. Tente novamente mais tarde." 
      } 
    };
  }
}