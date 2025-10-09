// Local: pages/_error.js

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ErrorPage({ statusCode }) {
  const router = useRouter();

  const handleCrieRoteiroClick = () => {
    router.push('/#contato');
  };

  const title = statusCode
    ? `Ocorreu um erro no servidor (${statusCode})`
    : 'Ocorreu um erro';

  const description = statusCode
    ? `Desculpe, tivemos um problema no servidor. Nossa equipe já foi notificada.`
    : 'Desculpe, algo deu errado. Por favor, tente novamente mais tarde.';

  return (
    <>
      <Head>
        <title>{title} - Nomade Guru</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header onCrieRoteiroClick={handleCrieRoteiroClick} />

      <main className="error-page">
        <div className="container">
          <div className="error-content">
            <h1 className="error-code">{statusCode || 'Erro'}</h1>
            <h2 className="error-title">{title}</h2>
            <p className="error-description">
              {description}
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

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;