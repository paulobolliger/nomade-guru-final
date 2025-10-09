// Local: pages/faq.js --- VERSÃO SEM ESTILOS LOCAIS

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <span className={`faq-icon ${isOpen ? 'open' : ''}`}>+</span>
      </button>
      <div 
        ref={contentRef}
        className="faq-answer-wrapper"
        style={{ maxHeight: isOpen ? `${contentRef.current.scrollHeight}px` : '0px' }}
      >
        <div className="faq-answer-content">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const router = useRouter();

  const handleCrieRoteiroClick = () => {
    router.push('/#contato');
  };

  const faqCategories = [
    { category: "Reservas e Roteiros", items: [ { question: "Como faço uma reserva com a Nomade Guru?", answer: "Você pode reservar diretamente pelo nosso site, escolhendo o roteiro desejado, ou entrando em contato com nosso time de consultores via WhatsApp ou e-mail. Após a confirmação, você receberá um voucher com todos os detalhes da viagem." }, { question: "Posso personalizar meu roteiro?", answer: "Sim! Todos os roteiros podem ser adaptados ao seu estilo, tempo disponível e preferências pessoais. Entre em contato com nosso time de especialistas e faremos um roteiro exclusivo para você." }, { question: "Qual é o prazo para reservas?", answer: "Recomendamos reservar com pelo menos 30 dias de antecedência, mas cada roteiro tem disponibilidade própria. Roteiros sazonais, como auroras boreais ou festivais, devem ser reservados com mais antecedência." }, { question: "Como recebo meu roteiro e vouchers?", answer: "Após a confirmação da reserva, você receberá um e-mail com o roteiro detalhado, vouchers de hospedagem e atividades, além de um guia digital com dicas de viagem." } ] },
    { category: "Pagamentos e Formas de Pagamento", items: [ { question: "Quais formas de pagamento são aceitas?", answer: "Aceitamos cartão de crédito, boleto bancário e transferência. Para reservas internacionais, podemos aceitar PayPal ou transferência internacional." }, { question: "Posso parcelar minha viagem?", answer: "Sim, em até 12x no cartão de crédito dependendo do valor e do roteiro escolhido. Consulte condições específicas no momento da reserva." }, { question: "Existe taxa de serviço ou juros no parcelamento?", answer: "O parcelamento no cartão pode incluir juros, enquanto pagamentos à vista ou via boleto não possuem taxas adicionais." } ] },
    { category: "Cancelamentos e Reembolsos", items: [ { question: "Qual é a política de cancelamento?", answer: "Cancelamentos até 30 dias antes da viagem têm reembolso total, menos taxa administrativa de R$100. Entre 15 e 30 dias, reembolso de 50%. Menos de 15 dias antes da viagem, não há reembolso. Para eventos excepcionais (como pandemias ou desastres naturais), aplicamos políticas especiais." }, { question: "Posso transferir minha viagem para outra pessoa?", answer: "Sim, mediante aviso prévio e aceitação do nosso time, com possível taxa administrativa de transferência." }, { question: "E se houver imprevistos durante a viagem?", answer: "Temos suporte 24/7 durante todos os roteiros para resolver qualquer situação inesperada, desde mudanças climáticas a questões médicas." } ] },
    { category: "Segurança e Seguro Viagem", items: [ { question: "As viagens da Nomade Guru incluem seguro?", answer: "Sim! Todos os roteiros incluem seguro básico contra acidentes, mas recomendamos seguro de saúde adicional dependendo do destino." }, { question: "Como a Nomade Guru garante a segurança dos viajantes?", answer: "Trabalhamos apenas com fornecedores confiáveis e locais que seguem normas internacionais de segurança. Além disso, todos os roteiros são acompanhados por especialistas locais quando necessário." }, { question: "E em casos de emergências médicas?", answer: "Temos protocolos de emergência e suporte local. Para destinos remotos, indicamos também contratação de seguro complementar." } ] },
    { category: "Preparativos e Informações de Viagem", items: [ { question: "Preciso de visto ou vacinas para viajar?", answer: "Isso depende do destino. No momento da reserva, fornecemos todas as informações de documentação, vacinas e exigências legais." }, { question: "Como funciona o transporte nos roteiros?", answer: "Incluímos transporte terrestre e aéreo interno quando necessário. Para transporte opcional, informamos detalhes e custos no roteiro." }, { question: "Posso levar crianças ou animais de estimação?", answer: "Alguns roteiros são family-friendly; outros são exclusivos para adultos. Animais de estimação não são permitidos nos roteiros, mas podemos indicar alternativas locais." } ] },
    { category: "Contato e Suporte", items: [ { question: "Como posso entrar em contato com a Nomade Guru?", answer: "Nosso time de atendimento está disponível por WhatsApp, e-mail ou formulário de contato no site. Também oferecemos suporte 24/7 para viajantes durante os roteiros." }, { question: "Há atendimento em outros idiomas?", answer: "Sim, nosso suporte atende em português, inglês e espanhol." } ] }
  ];

  return (
    <>
      <Head>
        <title>FAQ - Perguntas Frequentes - Nomade Guru</title>
        <meta name="description" content="Tire suas dúvidas sobre como planejamos sua viagem dos sonhos." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header onCrieRoteiroClick={handleCrieRoteiroClick} />

      <main className="faq-page">
        <div className="page-header" style={{ background: '#7b68ee', color: '#ffffff', border: 'none' }}>
          <h1>Perguntas Frequentes</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Encontre aqui as respostas para as dúvidas mais comuns sobre nossos serviços.
          </p>
        </div>

        <section className="faq-content">
          <div className="container">
            {faqCategories.map((category, catIndex) => (
              <div key={catIndex} className="faq-category-section">
                <h2 className="faq-category-title">{category.category}</h2>
                {category.items.map((item, itemIndex) => (
                  <FaqItem key={itemIndex} question={item.question} answer={item.answer} />
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* NENHUM ESTILO AQUI */}
    </>
  );
}