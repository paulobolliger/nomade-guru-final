import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function BlogPost({ post, recentPosts }) {
  const router = useRouter();

  // Se a página está sendo gerada estaticamente
  if (router.isFallback) {
    return (
      <div style={{ padding: '100px', textAlign: 'center', color: 'white' }}>
        Carregando...
      </div>
    );
  }

  // Se não encontrou o post
  if (!post) {
    return (
      <div style={{ padding: '100px', textAlign: 'center', color: 'white' }}>
        <h1>Post não encontrado</h1>
        <Link href="/blog">Voltar ao Blog</Link>
      </div>
    );
  }

  // Função para renderizar o conteúdo Rich Text
  const renderContent = (content) => {
    if (!content || !Array.isArray(content)) return null;

    return content.map((block, blockIndex) => {
      if (block.type === 'paragraph') {
        const text = block.children?.map((child, childIndex) => {
          if (child.text) {
            // Verificar formatação
            if (child.bold) return <strong key={childIndex}>{child.text}</strong>;
            if (child.italic) return <em key={childIndex}>{child.text}</em>;
            if (child.underline) return <u key={childIndex}>{child.text}</u>;
            return child.text;
          }
          return null;
        });

        // Não renderizar parágrafos vazios
        const hasContent = text && text.some(t => t && t !== '');
        if (!hasContent) return null;

        return <p key={blockIndex}>{text}</p>;
      }

      if (block.type === 'heading') {
        const level = block.level || 2;
        const text = block.children?.map(child => child.text).join('');
        const HeadingTag = `h${level}`;
        return <HeadingTag key={blockIndex}>{text}</HeadingTag>;
      }

      if (block.type === 'list') {
        const items = block.children?.map((item, itemIndex) => (
          <li key={itemIndex}>
            {item.children?.map(child => child.text).join('')}
          </li>
        ));
        
        if (block.format === 'ordered') {
          return <ol key={blockIndex}>{items}</ol>;
        }
        return <ul key={blockIndex}>{items}</ul>;
      }

      if (block.type === 'quote') {
        const text = block.children?.map(child => child.text).join('');
        return <blockquote key={blockIndex}>{text}</blockquote>;
      }

      return null;
    });
  };

  return (
    <>
      <Head>
        <title>{post.titulo} - Blog Nomade Guru</title>
        <meta name="description" content={post.resumo} />
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
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="post-main">
        {/* Hero com imagem */}
        <section className="post-hero" style={{ backgroundImage: `url(${post.imagemUrl})` }}>
          <div className="hero-overlay">
            <div className="container">
              <div className="breadcrumb">
                <Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / {post.titulo}
              </div>
              <h1>{post.titulo}</h1>
              <div className="post-meta">
                <span><i className="fas fa-calendar"></i> {formatDate(post.dataPublicacao)}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Conteúdo do Post */}
        <article className="post-article">
          <div className="container">
            <div className="post-content">
              {renderContent(post.conteudo)}
              
              {/* CTA no final do post */}
              <div className="post-cta">
                <h3>Pronto para sua próxima aventura?</h3>
                <p>Crie seu roteiro personalizado com a Nomade Guru</p>
                <Link href="/" className="cta-button">
                  Criar Meu Roteiro
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="post-sidebar">
              <div className="sidebar-widget">
                <h3>Posts Recentes</h3>
                <ul className="recent-posts">
                  {recentPosts.map(recentPost => (
                    <li key={recentPost.id}>
                      <Link href={`/blog/${recentPost.documentId}`}>
                        <div className="recent-post-item">
                          <img src={recentPost.imagemUrl} alt={recentPost.titulo} />
                          <div>
                            <h4>{recentPost.titulo}</h4>
                            <span>{formatDate(recentPost.dataPublicacao)}</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </article>

        {/* Voltar ao Blog */}
        <section className="back-to-blog">
          <div className="container">
            <Link href="/blog" className="back-link">
              <i className="fas fa-arrow-left"></i> Voltar ao Blog
            </Link>
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

        .header-blog nav a:hover {
          color: #6366f1;
        }

        .post-main {
          padding-top: 80px;
          min-height: 100vh;
          background: #0f172a;
        }

        .post-hero {
          height: 400px;
          background-size: cover;
          background-position: center;
          position: relative;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8));
          display: flex;
          align-items: flex-end;
        }

        .hero-overlay .container {
          padding-bottom: 40px;
        }

        .breadcrumb {
          color: #94a3b8;
          margin-bottom: 20px;
        }

        .breadcrumb a {
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.3s;
        }

        .breadcrumb a:hover {
          color: #6366f1;
        }

        .post-hero h1 {
          color: white;
          font-size: 2.5em;
          margin-bottom: 20px;
        }

        .post-meta {
          color: #e5e7eb;
        }

        .post-meta i {
          margin-right: 5px;
        }

        .post-article {
          padding: 60px 0;
        }

        .post-article .container {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 40px;
        }

        .post-content {
          color: #e5e7eb;
          line-height: 1.8;
        }

        .post-content p {
          margin-bottom: 20px;
          font-size: 1.1em;
        }

        .post-content h2 {
          color: white;
          margin: 40px 0 20px;
          font-size: 1.8em;
        }

        .post-content h3 {
          color: white;
          margin: 30px 0 15px;
          font-size: 1.5em;
        }

        .post-content ul,
        .post-content ol {
          margin: 20px 0;
          padding-left: 30px;
        }

        .post-content li {
          margin-bottom: 10px;
        }

        .post-content blockquote {
          border-left: 4px solid #6366f1;
          padding-left: 20px;
          margin: 30px 0;
          font-style: italic;
          color: #94a3b8;
        }

        .post-cta {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          padding: 40px;
          border-radius: 16px;
          text-align: center;
          margin-top: 60px;
        }

        .post-cta h3 {
          color: white;
          margin-bottom: 10px;
        }

        .post-cta p {
          color: rgba(255,255,255,0.9);
          margin-bottom: 20px;
        }

        .cta-button {
          display: inline-block;
          background: white;
          color: #6366f1;
          padding: 15px 30px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 600;
          transition: transform 0.3s;
        }

        .cta-button:hover {
          transform: scale(1.05);
        }

        .post-sidebar {
          position: sticky;
          top: 100px;
        }

        .sidebar-widget {
          background: #1e293b;
          padding: 30px;
          border-radius: 16px;
        }

        .sidebar-widget h3 {
          color: white;
          margin-bottom: 20px;
        }

        .recent-posts {
          list-style: none;
          padding: 0;
        }

        .recent-posts li {
          margin-bottom: 20px;
        }

        .recent-post-item {
          display: flex;
          gap: 15px;
          transition: opacity 0.3s;
        }

        .recent-post-item:hover {
          opacity: 0.8;
        }

        .recent-post-item img {
          width: 80px;
          height: 60px;
          object-fit: cover;
          border-radius: 8px;
        }

        .recent-post-item h4 {
          color: white;
          font-size: 0.9em;
          margin-bottom: 5px;
        }

        .recent-post-item span {
          color: #94a3b8;
          font-size: 0.8em;
        }

        .back-to-blog {
          padding: 40px 0;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .back-link {
          color: #6366f1;
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: gap 0.3s;
        }

        .back-link:hover {
          gap: 15px;
        }

        .blog-footer {
          padding: 30px 0;
          background: #0f172a;
          text-align: center;
          color: #94a3b8;
        }

        @media (max-width: 768px) {
          .post-article .container {
            grid-template-columns: 1fr;
          }

          .post-sidebar {
            position: relative;
            top: 0;
          }

          .post-hero h1 {
            font-size: 1.8em;
          }
        }
      `}</style>
    </>
  );
}

// Função auxiliar para formatar data
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('pt-BR', options);
}

// Buscar post específico e posts recentes
export async function getServerSideProps(context) {
  const { id } = context.params;
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  if (!apiUrl) {
    return {
      props: {
        post: null,
        recentPosts: []
      }
    };
  }

  try {
    // Buscar o post específico
    const postRes = await fetch(
      `${apiUrl}/api/post-de-blogs?filters[documentId][$eq]=${id}&populate=*`
    );
    
    if (!postRes.ok) {
      throw new Error('Post não encontrado');
    }

    const postData = await postRes.json();
    
    if (!postData.data || postData.data.length === 0) {
      return {
        props: {
          post: null,
          recentPosts: []
        }
      };
    }

    const item = postData.data[0];

    // Extrair URL da imagem
    let imagemUrl = 'https://placehold.co/1200x600/5053c4/FFF?text=Blog+Post';
    if (item.ImagemCapa?.url) {
      imagemUrl = item.ImagemCapa.url;
    }

    // Extrair resumo
    let resumo = '';
    if (item.Conteudo && Array.isArray(item.Conteudo)) {
      for (let block of item.Conteudo) {
        if (block.type === 'paragraph' && block.children) {
          const text = block.children
            .filter(child => child.text)
            .map(child => child.text)
            .join('');
          
          if (text && text.trim() && text !== item.Titulo) {
            resumo = text.slice(0, 160) + '...';
            break;
          }
        }
      }
    }

    const post = {
      id: item.id,
      documentId: item.documentId,
      titulo: item.Titulo,
      conteudo: item.Conteudo,
      resumo: resumo,
      dataPublicacao: item.publishedAt || item.createdAt,
      imagemUrl: imagemUrl
    };

    // Buscar posts recentes (exceto o atual)
    const recentRes = await fetch(
      `${apiUrl}/api/post-de-blogs?populate=*&sort=createdAt:desc&pagination[limit]=3&filters[documentId][$ne]=${id}`
    );

    let recentPosts = [];
    
    if (recentRes.ok) {
      const recentData = await recentRes.json();
      recentPosts = recentData.data.map(item => {
        let imagemUrl = 'https://placehold.co/600x400/5053c4/FFF?text=Blog+Post';
        if (item.ImagemCapa?.url) {
          imagemUrl = item.ImagemCapa.url;
        }

        return {
          id: item.id,
          documentId: item.documentId,
          titulo: item.Titulo,
          dataPublicacao: item.publishedAt || item.createdAt,
          imagemUrl: imagemUrl
        };
      });
    }

    return {
      props: {
        post,
        recentPosts
      }
    };

  } catch (error) {
    console.error('Erro ao buscar post:', error);
    return {
      props: {
        post: null,
        recentPosts: []
      }
    };
  }
}