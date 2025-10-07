import Head from 'next/head';

    export default function Destinos({ roteiros }) {
      return (
        <>
          <Head>
            <title>Nossos Roteiros - Nomade Guru</title>
          </Head>

          <header> {/* Copiamos o header para manter a navegação */}
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
            
            <div className="roteiros-grid">
              {roteiros.map((roteiro) => (
                <div key={roteiro.id} className="roteiro-card">
                  {/* A API do Strapi v4 retorna a URL da imagem em um formato aninhado */}
                  <img 
                    src={roteiro.attributes.GaleriaDeFotos.data[0].attributes.url} 
                    alt={roteiro.attributes.Titulo} 
                  />
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
      // Busca os dados do Strapi
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/roteiros?populate=*`);
      const roteirosData = await res.json();

      return {
        props: {
          roteiros: roteirosData.data,
        },
        revalidate: 60, // Atualiza os dados a cada 60 segundos
      };
    }
    
