// Local: pages/sitemap.xml.js

const EXTERNAL_DATA_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const YOUR_SITE_URL = 'https://www.nomade.guru'; // Substitua pelo seu domínio final

// Função para gerar o XML do sitemap
function generateSiteMap(staticPages, roteiros, blogPosts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${staticPages.map((url) => {
       return `
       <url>
           <loc>${`${YOUR_SITE_URL}${url}`}</loc>
           <priority>${url === '/' ? '1.0' : '0.8'}</priority>
       </url>
     `;
     }).join('')}

     ${roteiros.map(({ documentId }) => {
       return `
       <url>
           <loc>${`${YOUR_SITE_URL}/roteiro/${documentId}`}</loc>
           <priority>0.9</priority>
       </url>
     `;
     }).join('')}

     ${blogPosts.map(({ documentId }) => {
       return `
       <url>
           <loc>${`${YOUR_SITE_URL}/blog/${documentId}`}</loc>
           <priority>0.7</priority>
       </url>
     `;
     }).join('')}
   </urlset>
 `;
}

// Componente React vazio, pois esta página só precisa do lado do servidor
function SiteMap() {}

export async function getServerSideProps({ res }) {
  // Lista de páginas estáticas do seu site
  const staticPages = [
    '/',
    '/destinos',
    '/blog',
    '/contato',
    '/faq',
    '/privacidade',
    '/termos-de-uso',
    '/sobre',
    '/depoimentos',
    // Adicione '/loja' quando a página for criada
  ];

  // Busca todos os roteiros no Strapi para pegar os IDs
  const roteirosRes = await fetch(`${EXTERNAL_DATA_URL}/api/roteiros`);
  const roteirosData = await roteirosRes.json();
  const roteiros = roteirosData.data || [];

  // Busca todos os posts do blog no Strapi para pegar os IDs
  const blogRes = await fetch(`${EXTERNAL_DATA_URL}/api/blogs`);
  const blogData = await blogRes.json();
  const blogPosts = blogData.data || [];

  // Gera o XML do sitemap
  const sitemap = generateSiteMap(staticPages, roteiros, blogPosts);

  // Configura a resposta do servidor
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;