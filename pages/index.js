import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResultado('');

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/gerar-roteiro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Falha na resposta do servidor');
      }

      const result = await response.json();
      setResultado(result.roteiro);

    } catch (error) {
      setResultado('<p style="color: red;">Ocorreu um erro ao gerar seu roteiro. Por favor, tente novamente mais tarde.</p>');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Nomade Guru - Agência de Viagens Inteligente</title>
        <meta name="description" content="Roteiros de viagem personalizados com inteligência artificial e curadoria humana." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className="hero" style={{ backgroundImage: "url('https://res.cloudinary.com/dhqvjxgue/image/upload/v1744155476/imagem-impactante_1_nv98cg.png')" }}>
          <div className="hero-content">
            <h1>Viaje com propósito, viva com liberdade</h1>
            <p>Crie seu roteiro personalizado e descubra novas fronteiras com nossa tecnologia de IA e curadoria humana.</p>
            <a href="#contato" className="btn">Crie seu roteiro personalizado</a>
          </div>
        </section>

        {/* Aqui você pode adicionar as outras seções do seu site (Diferenciais, Como Funciona, etc.), lembrando de trocar 'class=' por 'className=' */}

        <section className="contato-roteiro" id="contato">
          <h2>Crie seu Roteiro Personalizado Instantaneamente</h2>
          <p>Preencha os campos abaixo e deixe nossa IA criar uma primeira versão do seu roteiro dos sonhos!</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group"><label htmlFor="nome">Seu nome:</label><input type="text" id="nome" name="nome" placeholder="Como podemos te chamar?" required /></div>
            <div className="form-group"><label htmlFor="email">Seu e-mail:</label><input type="email" id="email" name="email" placeholder="Para onde enviaremos seu roteiro" required /></div>
            <div className="form-group"><label htmlFor="destino">Destino dos Sonhos:</label><input type="text" id="destino" name="destino" placeholder="Ex: Roma, Itália" required /></div>
            <div className="form-group"><label htmlFor="duracao">Duração da Viagem (em dias):</label><input type="number" id="duracao" name="duracao" placeholder="Ex: 7" required /></div>
            <div className="form-group"><label htmlFor="interesses">Quais são seus interesses?</label><textarea id="interesses" name="interesses" rows="3" placeholder="Gastronomia, história, arte..."></textarea></div>
            <button type="submit" className="btn-gerar" disabled={loading}>
              {loading ? 'Gerando...' : 'Gerar Roteiro Mágico ✨'}
            </button>
          </form>
          {loading && <div style={{ textAlign: 'center', marginTop: '20px' }}><p>Criando sua viagem... ✈️</p></div>}
          <div className="resultado-container" dangerouslySetInnerHTML={{ __html: resultado }} />
        </section>
      </main>
    </>
  );
}