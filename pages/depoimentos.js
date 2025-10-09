// Local: pages/depoimentos.js

import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/header';
import Footer from '../components/footer';

export default function Depoimentos() {
  const router = useRouter();

  const handleCrieRoteiroClick = () => {
    router.push('/#contato');
  };

  // Seus depoimentos, organizados em uma lista
  const testimonialsData = [
    {
      text: "Viajar com a Nomade Guru foi uma experiência inesquecível! Cada detalhe do roteiro parecia feito especialmente para nós. Desde a escolha dos hotéis até os passeios secretos, sentimos que alguém realmente entendia nossos sonhos. Já estou planejando a próxima viagem!",
      author: "Carolina M.",
      location: "São Paulo/SP",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80"
    },
    {
      text: "Nunca imaginei que uma viagem pudesse ser tão perfeita. A Nomade Guru cuidou de tudo: transporte, alimentação, atividades… e ainda nos deu dicas locais incríveis que fizeram toda a diferença. Foi como ter um guia e amigo ao mesmo tempo!",
      author: "Lucas R.",
      location: "Rio de Janeiro/RJ",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80"
    },
    {
      text: "Foi a nossa primeira viagem em família com crianças pequenas, e eu estava preocupada com toda a logística. A Nomade Guru tornou tudo simples e seguro, e ainda conseguimos momentos de diversão que vamos lembrar para sempre. Super recomendo!",
      author: "Mariana S.",
      location: "Curitiba/PR",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
    },
    {
      text: "A atenção ao detalhe da Nomade Guru é inacreditável. Cada dia do roteiro tinha algo único, que nem imaginávamos existir. É impossível não se apaixonar pelo jeito como eles transformam viagens em experiências inesquecíveis.",
      author: "Fernando L.",
      location: "Belo Horizonte/MG",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
    },
    {
      text: "Eu pensei que já tinha viajado muito, mas a Nomade Guru me mostrou que há um mundo de experiências que só quem conhece de verdade consegue proporcionar. Foi uma viagem mágica, sem stress e cheia de surpresas boas.",
      author: "Isabela C.",
      location: "Porto Alegre/RS",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    }
  ];

  return (
    <>
      <Head>
        <title>Depoimentos - O que nossos viajantes dizem - Nomade Guru</title>
        <meta name="description" content="Veja as avaliações e experiências de clientes que viajaram com a Nomade Guru." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header onCrieRoteiroClick={handleCrieRoteiroClick} />

      <main className="testimonials-page">
        <div className="page-header" style={{ background: '#7b68ee', color: '#ffffff', border: 'none' }}>
          <h1>Nossos Viajantes</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Histórias e memórias de quem viajou com a gente.
          </p>
        </div>

        <section className="testimonials-content">
          <div className="container">
            <div className="testimonials-grid">
              {testimonialsData.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <div className="testimonial-header">
                    <img src={testimonial.imageUrl} alt={`Foto de ${testimonial.author}`} className="author-image" />
                    <div className="author-info">
                      <div className="rating">
                        {'★'.repeat(testimonial.rating)}
                        {'☆'.repeat(5 - testimonial.rating)}
                      </div>
                      <p className="author-name">{testimonial.author}</p>
                      <p className="author-location">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action no final */}
        <section className="cta-section">
          <h2>Quer viver sua própria experiência?</h2>
          <p>Fale com a Nomade Guru e comece a planejar a viagem que vai virar história.</p>
          <button onClick={handleCrieRoteiroClick} className="btn-large">
            Começar Agora ✨
          </button>
        </section>

      </main>

      <Footer />
    </>
  );
}