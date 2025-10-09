// Local: pages/404.js

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Custom404() {
  const router = useRouter();

  const handleCrieRoteiroClick = () => {
    router.push('/#contato');
  };

  return (
    <>
      <Head>
        <title>Página Não Encontrada (404) - Nomade Guru</title>
        <meta name="description" content="A página que você procurava não foi encontrada." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header onCrieRoteiroClick={handleCrieRoteiroClick} />

      <main className="error-page">
        <div className="container">
          <div className="error-content">
            <h1 className="error-code">404</h1>
            <h2 className="error-title">Página Não Encontrada</h2>
            <p className="error-description">
              Oops! A página que você está tentando acessar não existe, foi movida ou está temporariamente indisponível.
            </p>
            <Link href="/" className="error-button">
              Voltar para a Página Inicial
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}