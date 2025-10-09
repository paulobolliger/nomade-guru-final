// Local: pages/privacidade.js

import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PoliticaDePrivacidade() {
  const router = useRouter();

  const handleCrieRoteiroClick = () => {
    router.push('/#contato');
  };

  return (
    <>
      <Head>
        <title>Política de Privacidade - Nomade Guru</title>
        <meta name="description" content="Entenda como a Nomade Guru coleta, usa e protege seus dados pessoais." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header onCrieRoteiroClick={handleCrieRoteiroClick} />

      <main className="privacy-page">
        <div className="page-header" style={{ background: '#7b68ee', color: '#ffffff', border: 'none' }}>
          <h1>Política de Privacidade</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Última atualização: 08/10/2025
          </p>
        </div>

        <section className="privacy-content">
          <div className="container">
            <p className="intro">A Nomade Guru (“nós”, “nosso” ou “empresa”) valoriza a sua privacidade e está comprometida em proteger os dados pessoais de todos os visitantes do nosso site nomade.guru e dos nossos serviços relacionados. Esta Política de Privacidade explica como coletamos, usamos, compartilhamos e protegemos suas informações pessoais, além de informar seus direitos em relação a esses dados.</p>
            
            <h2>1. Informações que Coletamos</h2>
            <p>Podemos coletar diferentes tipos de informações quando você visita nosso site, utiliza nossos serviços ou interage conosco:</p>
            
            <h3>1.1 Informações fornecidas por você</h3>
            <ul>
              <li>Nome, sobrenome, e-mail, telefone, endereço;</li>
              <li>Informações de pagamento (cartão de crédito, dados bancários, PayPal);</li>
              <li>Preferências de viagem, destinos e informações pessoais relacionadas à reserva.</li>
            </ul>

            <h3>1.2 Informações coletadas automaticamente</h3>
            <ul>
              <li>Dados de navegação, como endereço IP, tipo de navegador, páginas visitadas, tempo de permanência no site e cliques;</li>
              <li>Cookies e tecnologias semelhantes para melhorar a experiência do usuário e fins de análise.</li>
            </ul>

            <h3>1.3 Informações de terceiros</h3>
            <p>Quando você interage com nossos parceiros (hotéis, companhias aéreas, fornecedores de atividades), podemos receber informações adicionais necessárias para processar sua reserva.</p>

            <h2>2. Como Usamos suas Informações</h2>
            <p>Usamos suas informações para:</p>
            <ul>
              <li>Processar reservas e pagamentos;</li>
              <li>Personalizar e melhorar sua experiência em nossos roteiros;</li>
              <li>Enviar informações sobre nossos serviços, promoções e novidades (com seu consentimento);</li>
              <li>Cumprir obrigações legais ou regulatórias;</li>
              <li>Proteger nossos direitos, segurança e propriedades;</li>
              <li>Analisar dados para melhorar nossos serviços e funcionalidades do site.</li>
            </ul>

            <h2>3. Compartilhamento de Informações</h2>
            <p>Podemos compartilhar suas informações com:</p>
            <ul>
                <li><strong>Fornecedores e parceiros de viagem:</strong> hotéis, companhias aéreas, seguradoras e transportadoras, apenas o necessário para realizar a sua viagem;</li>
                <li><strong>Prestadores de serviços:</strong> processadores de pagamento, plataformas de e-mail marketing e ferramentas de análise;</li>
                <li><strong>Autoridades legais:</strong> quando exigido por lei, regulamentos ou ordens judiciais;</li>
                <li><strong>Aquisições ou fusões:</strong> caso a Nomade Guru seja adquirida ou se fundir, suas informações podem ser transferidas como parte da operação.</li>
            </ul>
            <p>Nós não vendemos, alugamos ou negociamos seus dados pessoais com terceiros para fins de marketing.</p>

            <h2>4. Cookies e Tecnologias Semelhantes</h2>
            <p>Utilizamos cookies e ferramentas de rastreamento para:</p>
            <ul>
                <li>Facilitar a navegação e manter preferências salvas;</li>
                <li>Medir desempenho do site e entender o comportamento do usuário;</li>
                <li>Personalizar publicidade, sempre respeitando seu consentimento.</li>
            </ul>
            <p>Você pode configurar seu navegador para recusar cookies, mas algumas funcionalidades do site podem ser afetadas.</p>

            <h2>5. Segurança dos Dados</h2>
            <p>Implementamos medidas técnicas e administrativas para proteger seus dados pessoais contra perda, uso indevido, acesso não autorizado, alteração ou divulgação. No entanto, nenhum método de transmissão ou armazenamento eletrônico é 100% seguro.</p>
            <p>Recomendamos que você use senhas fortes e nunca compartilhe suas credenciais de acesso.</p>

            <h2>6. Seus Direitos</h2>
            <p>Você possui direitos relacionados aos seus dados pessoais, incluindo:</p>
            <ul>
                <li>Acesso, correção ou exclusão de suas informações;</li>
                <li>Retirar consentimento para marketing a qualquer momento;</li>
                <li>Solicitar portabilidade de dados;</li>
                <li>Obter informações sobre com quem seus dados foram compartilhados;</li>
                <li>Entrar em contato com nosso Encarregado de Proteção de Dados.</li>
            </ul>
            <p>Para exercer seus direitos, entre em contato pelo e-mail: <a href="mailto:privacidade@nomade.guru">privacidade@nomade.guru</a>.</p>

            <h2>7. Retenção de Dados</h2>
            <p>Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir os fins descritos nesta política, respeitando obrigações legais e fiscais. Após esse período, os dados são excluídos ou anonimizados.</p>

            <h2>8. Links Externos</h2>
            <p>Nosso site pode conter links para sites de terceiros. Não nos responsabilizamos pelas práticas de privacidade de sites externos. Recomendamos ler a política de privacidade de cada site visitado.</p>

            <h2>9. Alterações nesta Política</h2>
            <p>Podemos atualizar esta política periodicamente para refletir mudanças legais ou operacionais. Sempre que houver alterações significativas, informaremos no site ou por e-mail.</p>

            <h2>10. Contato</h2>
            <p>Se você tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento de seus dados, entre em contato:</p>
            <p><strong>Nomade Guru</strong></p>
            <p>E-mail: <a href="mailto:privacidade@nomade.guru">privacidade@nomade.guru</a></p>
            <p>Telefone: <a href="tel:+5511947745710">+55 (11) 94774-5710</a></p>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}