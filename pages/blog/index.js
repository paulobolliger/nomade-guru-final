import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Blog({ posts }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtrar posts baseado na busca
  const filteredPosts = posts.filter(post => 
    post.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para extrair resumo do conteúdo Rich Text
  const extractResumo = (conteudo) => {
    if (!conteudo || !Array.isArray(conteudo)) return 'Leia mais sobre este tópico...';
    
    // Pegar o primeiro parágrafo com texto
    for (let block of conteudo) {
      if (block.type === 'paragraph' && block.children) {
        const text = block.children
          .filter(child => child.text)
          .map(child => child.text)
          .join('');
        
        if (text && text.trim()) {
          return text.slice(0, 200) + (text.length > 200 ? '...' : '');
        }
      }
    }
    return 'Leia mais sobre este tópico...';
  };

  return (
    <>
      <Head>
        <title>Blog - Nomade Guru</title>
        <meta name="description" content="Dicas, roteiros e inspiração para sua próxima viagem" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" />
      </Head>

      <header className="header-blog">
        <div className="container">
          <div className="logo">
            <Link href="/">
              <img src="https://res.cloudinary.com/dhqvjxgue/image/upload/v1744736403/logo_nomade_guru_iskhl8.png" alt="Logo Nomade Guru" />
            </Link>
          </div>
          <nav>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/destinos">Destinos</Link></li>
              <li><Link href="/blog" className="active">Blog</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="blog-main">
        {/* Hero do Blog */}
        <section className="blog-hero">
          <div className="container">
            <h1>Blog Nomade Guru</h1>
            <p>Inspiração e dicas para transformar suas viagens em experiências inesquecíveis</p>
          </div>
        </section>

        {/* Barra de Busca */}
        <section className="blog-filters">
          <div className="container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Buscar posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search"></i>
            </div>
          </div>
        </section>

        {/* Grid de Posts */}
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
                {posts.length === 0 
                  ? <p>Nenhum post publicado ainda.</p>
                  : <p>Nenhum post encontrado com o termo "{searchTerm}".</p>
                }
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="blog-footer">
        <div className="container">
          <p>© 2025 Nomade Guru. Todos os direitos reservados.</p>
        </div>
      </footer>

      <style jsx>{`
        .header-blog {
          position: fixed;
          top: 0;
          width: 100%;
          background: rgba(30, 41, 59, 0.95);
          backdrop-filter: blur(10px);
          padding: 15px 0;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .header-blog .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-blog .logo img {
          height: 50px;
        }

        .header-blog nav ul {
          display: flex;
          list-style: none;
          gap: 30px;
          margin: 0;
          padding: 0;
        }

        .header-blog nav a {
          color: #e5e7eb;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
        }

        .header-blog nav a:hover,
        .header-blog nav a.active {
          color: #6366f1;
        }

        .blog-main {
          padding-top: 80px;
          min-height: 100vh;
          background: #0f172a;
        }

        .blog-hero {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          padding: 80px 0;
          text-align: center;
        }

        .blog-hero h1 {
          color: white;
          font-size: 3em;
          margin-bottom: 20px;
        }

        .blog-hero p {
          color: rgba(255,255,255,0.9);
          font-size: 1.2em;
        }

        .blog-filters {
          padding: 40px 0;
          background: #1e293b;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .search-box {
          position: relative;
          max-width: 500px;
          margin: 0 auto;
        }

        .search-box input {
          width: 100%;
          padding: 12px 45px 12px 15px;
          background: rgba(255,255,255,0.05);
          const data = await res.json();
          const data = await res.json();
          const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://magical-wonder-720aa86724.strapiapp.com';
          console.log('===== RESPOSTA DA API STRAPI =====');
          console.log('Status:', res.status);
          console.log('URL chamada:', strapiUrl + '/api/post-de-blogs?populate=*&sort=createdAt:desc');
          console.log('Total de posts:', data.data?.length || 0);
          console.log('Primeiro post:', data.data?.[0] || 'Nenhum post encontrado');
          console.log('==================================');
          border: 2px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: white;
          font-size: 1em;
          transition: all 0.3s;
        }

        .search-box input:focus {
          outline: none;
          border-color: #6366f1;
          background: rgba(255,255,255,0.08);
        }

        .search-box i {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }

        .blog-grid {
          padding: 60px 0;
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
          cursor: pointer;
        }

        .post-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .post-card a {
          text-decoration: none;
          color: inherit;
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
          color: #6366f1;
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

        .blog-footer {
          padding: 30px 0;
          background: #0f172a;
          text-align: center;
          color: #94a3b8;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        @media (max-width: 768px) {
          .blog-hero h1 {
            font-size: 2em;
          }

          .posts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}

// Função auxiliar para formatar data
function formatDate(dateString) {
  if (!dateString) return 'Data não disponível';
  
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('pt-BR', options);
}

// Buscar posts do Strapi
export async function getServerSideProps() {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  if (!apiUrl) {
    return {
      props: {
        posts: []
      }
    };
  }

  try {
    // Usando o endpoint correto: post-de-blogs
    const res = await fetch(`${apiUrl}/api/post-de-blogs?populate=*&sort=createdAt:desc`);
    
    if (!res.ok) {
      console.error('Erro na API:', res.status);
      throw new Error('Erro ao buscar posts');
    }

    const data = await res.json();

    // Mapear os dados do Strapi
    const posts = data.data.map(item => {
      // Extrair URL da imagem
      let imagemUrl = 'https://placehold.co/600x400/5053c4/FFF?text=Blog+Post';
      
      if (item.ImagemCapa?.url) {
        imagemUrl = item.ImagemCapa.url;
      } else if (item.ImagemCapa?.formats?.medium?.url) {
        imagemUrl = item.ImagemCapa.formats.medium.url;
      }

      // Extrair resumo do conteúdo
      let resumo = '';
      if (item.Conteudo && Array.isArray(item.Conteudo)) {
        for (let block of item.Conteudo) {
          if (block.type === 'paragraph' && block.children) {
            const text = block.children
              .filter(child => child.text)
              .map(child => child.text)
              .join('');
            
            if (text && text.trim() && text !== item.Titulo) {
              resumo = text.slice(0, 200) + (text.length > 200 ? '...' : '');
              break;
            }
          }
        }
      }

      return {
        id: item.id,
        documentId: item.documentId,
        titulo: item.Titulo,
        conteudo: item.Conteudo,
        resumo: resumo || 'Clique para ler o artigo completo.',
        dataPublicacao: item.publishedAt || item.createdAt,
        imagemUrl: imagemUrl
      };
    });

    return {
      props: {
        posts
      }
    };
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return {
      props: {
        posts: []
      }
    };
  }
}