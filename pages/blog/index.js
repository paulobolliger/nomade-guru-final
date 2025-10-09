// Local: pages/blog/index.js

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../../components/header';
import Footer from '../../components/footer';

export default function Blog({ posts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleCrieRoteiroClick = () => {
    router.push('/#contato');
  };
  
  const filteredPosts = posts ? posts.filter(post => 
    post.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <>
      <Head>
        <title>Blog - Nomade Guru</title>
        <meta name="description" content="Dicas, roteiros e inspiração para sua próxima viagem" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" />
      </Head>

      <Header onCrieRoteiroClick={handleCrieRoteiroClick} />

      <main className="blog-main">
        {/* Usamos o page-header para o título, com a cor que você gostou */}
        <div className="page-header" style={{ background: '#7b68ee', color: '#ffffff', border: 'none' }}>
            <h1>Blog Nomade Guru</h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Inspiração e dicas para transformar suas viagens em experiências inesquecíveis
            </p>
        </div>

        <section className="blog-grid">
          <div className="container">
            {filteredPosts.length > 0 ? (
              <div className="posts-grid">
                {filteredPosts.map(post => (
                  <article key={post.id} className="post-card">
                    <Link href={`/blog/${post.documentId}`}>
                      <div className="post-image">
                        <img 
                          src={post.imagemUrl} 
                          alt={post.titulo}
                        />
                      </div>
                      <div className="post-content">
                        <div className="post-meta">
                          <span className="post-date">
                            <i className="fas fa-calendar"></i> {formatDate(post.dataPublicacao)}
                          </span>
                        </div>
                        <h2>{post.titulo}</h2>
                        <p>{post.resumo}</p>
                        <span className="read-more">
                          Ler artigo completo <i className="fas fa-arrow-right"></i>
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="no-posts">
                {posts && posts.length === 0 
                  ? <p>Nenhum post publicado ainda.</p>
                  : <p>Nenhum post encontrado com o termo "{searchTerm}".</p>
                }
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* O ESTILO .page-header FOI REMOVIDO DAQUI */}
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .blog-main {
          padding-top: 80px; 
          min-height: 100vh;
        }
        
        .blog-grid {
          padding: 60px 0;
          background: #0f172a;
        }

        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
        }

        .post-card {
          background: #1e293b;
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .post-card:hover {
          transform: translateY(--10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .post-card a {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .post-image {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .post-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }

        .post-card:hover .post-image img {
          transform: scale(1.1);
        }

        .post-content {
          padding: 25px;
        }

        .post-meta {
          margin-bottom: 15px;
          color: #94a3b8;
          font-size: 0.9em;
        }

        .post-meta i {
          margin-right: 5px;
        }

        .post-content h2 {
          color: white;
          margin-bottom: 15px;
          font-size: 1.4em;
          line-height: 1.3;
        }

        .post-content p {
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .read-more {
          color: #8b5cf6;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          transition: gap 0.3s;
        }

        .post-card:hover .read-more {
          gap: 10px;
        }

        .no-posts {
          text-align: center;
          padding: 60px 0;
          color: #94a3b8;
          font-size: 1.2em;
        }

        @media (max-width: 768px) {
          .posts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}


function formatDate(dateString) {
  if (!dateString) return 'Data não disponível';
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('pt-BR', options);
}

export async function getServerSideProps() {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  if (!apiUrl) return { props: { posts: [] } };

  try {
    const res = await fetch(`${apiUrl}/api/blogs?populate=*&sort=createdAt:desc`);
    if (!res.ok) throw new Error('Erro ao buscar posts');
    const data = await res.json();
    const posts = data.data.map(item => {
      let imagemUrl = 'https://placehold.co/600x400/5053c4/FFF?text=Blog+Post';
      if (item.ImagemCapa?.url) imagemUrl = item.ImagemCapa.url;
      else if (item.ImagemCapa?.formats?.medium?.url) imagemUrl = item.ImagemCapa.formats.medium.url;
      return {
        id: item.id,
        documentId: item.documentId,
        titulo: item.Titulo,
        resumo: item.Resumo || 'Clique para ler o artigo completo.',
        dataPublicacao: item.publishedAt || item.createdAt,
        imagemUrl: imagemUrl
      };
    });
    return { props: { posts } };
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return { props: { posts: [] } };
  }
}