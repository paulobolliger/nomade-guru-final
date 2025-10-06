import '../styles/style.css';
import { Poppins } from 'next/font/google';

// Configuração da fonte Poppins
const poppins = Poppins({
  weight: ['300', '500', '700'],
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }) {
  return (
    <div className={poppins.className}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;