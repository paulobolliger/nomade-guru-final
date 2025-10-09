// Local: pages/termos-de-uso.js

import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermosDeUso() {
  const router = useRouter();

  const handleCrieRoteiroClick = () => {
    router.push('/#contato');
  };

  return (
    <>
      <Head>
        <title>Termos de Uso - Nomade Guru</title>
        <meta name="description" content="Leia os Termos de Uso que regem a utilização do site e dos serviços da Nomade Guru." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header onCrieRoteiroClick={handleCrieRoteiroClick} />

      <main className="terms-page">
        <div className="page-header" style={{ background: '#7b68ee', color: '#ffffff', border: 'none' }}>
          <h1>Termos de Uso</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Última atualização: 08/10/2025
          </p>
        </div>

        <section className="terms-content">
          <div className="container">
            <p className="intro">Bem-vindo ao site Nomade Guru (“nós”, “nosso” ou “empresa”). Ao acessar ou utilizar nosso site nomade.guru, você concorda com estes Termos de Uso e com nossa Política de Privacidade. Caso não concorde com qualquer parte destes termos, pedimos que não utilize nosso site.</p>
            
            <h2>1. Uso do Site</h2>
            <p>Você concorda em utilizar o site apenas para fins legais e de acordo com estes Termos de Uso.</p>
            <ul>
              <li>É proibido utilizar o site para qualquer atividade que viole leis locais, nacionais ou internacionais.</li>
              <li>O usuário se compromete a fornecer informações corretas, atualizadas e verdadeiras ao se cadastrar ou reservar serviços.</li>
            </ul>

            <h2>2. Propriedade Intelectual</h2>
            <p>Todo o conteúdo do site, incluindo textos, imagens, logotipos, vídeos, design, códigos e materiais digitais, é propriedade da Nomade Guru ou de seus parceiros.</p>
            <p>É proibida a reprodução, distribuição ou uso comercial de qualquer conteúdo sem autorização prévia e por escrito da Nomade Guru.</p>

            <h2>3. Reservas e Serviços</h2>
            <ul>
              <li>Os serviços de viagem oferecidos pelo site são regidos por contratos específicos de reserva, roteiro e pagamento.</li>
              <li>As informações sobre roteiros, preços e disponibilidade podem sofrer alterações sem aviso prévio, mas faremos o possível para manter os dados atualizados.</li>
              <li>A Nomade Guru atua como intermediária entre o cliente e fornecedores de viagem (hotéis, transportadoras, atividades), não se responsabilizando por falhas desses fornecedores, exceto quando houver comprovada culpa da empresa.</li>
            </ul>

            <h2>4. Pagamentos e Cancelamentos</h2>
            <ul>
              <li>Os pagamentos realizados no site estão sujeitos às condições apresentadas no momento da reserva.</li>
              <li>Cancelamentos e reembolsos seguem a Política de Cancelamento divulgada no site.</li>
              <li>A empresa não se responsabiliza por atrasos, falhas técnicas ou problemas de processamento causados por terceiros ou meios de pagamento.</li>
            </ul>

            <h2>5. Limitação de Responsabilidade</h2>
            <ul>
              <li>O uso do site é por sua conta e risco.</li>
              <li>A Nomade Guru não garante que o site esteja livre de erros, vírus ou interrupções.</li>
              <li>Não nos responsabilizamos por danos diretos, indiretos, incidentais ou consequenciais decorrentes do uso ou impossibilidade de uso do site ou dos serviços.</li>
            </ul>
            
            <h2>6. Privacidade e Proteção de Dados</h2>
            <p>O uso do site está sujeito à nossa Política de Privacidade, que detalha como coletamos, armazenamos e utilizamos seus dados pessoais.</p>
            <p>Ao utilizar o site, você consente com o tratamento de seus dados de acordo com a LGPD (Lei Geral de Proteção de Dados - Lei nº 13.709/2018).</p>

            <h2>7. Links e Conteúdo de Terceiros</h2>
            <ul>
                <li>O site pode conter links para sites de terceiros.</li>
                <li>Não nos responsabilizamos por conteúdos, práticas de privacidade ou termos de uso de sites externos.</li>
                <li>A inclusão de links não implica endosso ou recomendação da empresa.</li>
            </ul>

            <h2>8. Alterações nos Termos</h2>
            <p>Podemos atualizar estes Termos de Uso a qualquer momento, mediante aviso no site ou atualização da data de vigência.</p>
            <p>O uso continuado do site após alterações constitui aceitação das novas condições.</p>
            
            <h2>9. Legislação e Jurisdição</h2>
            <p>Estes Termos de Uso são regidos pelas leis brasileiras.</p>
            <p>Qualquer disputa relacionada ao site ou aos serviços deverá ser resolvida no foro da comarca de São Paulo/SP, Brasil, salvo disposição legal em contrário.</p>

            <h2>10. Contato</h2>
            <p>Para dúvidas sobre estes Termos de Uso ou sobre o site:</p>
            <p><strong>Nomade Guru</strong></p>
            <p>E-mail: <a href="mailto:contato@nomade.guru">contato@nomade.guru</a></p>
            <p>Telefone: <a href="tel:+5511947745710">+55 11 94774-5710</a></p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}