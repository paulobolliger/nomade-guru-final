// Espera todo o conteúdo da página carregar para começar a funcionar
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica para o efeito de scroll do header e logo ---
    // (Mantivemos seu código original que já funcionava)
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const logo = document.querySelector('.logo img');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            logo.style.height = '50px';
        } else {
            header.classList.remove('scrolled');
            logo.style.height = '80px';
        }
    });

    // --- Nova lógica para o formulário do gerador de roteiros ---

    // Encontra os elementos importantes na página e guarda em variáveis
    const form = document.getElementById('roteiro-form');
    const loadingDiv = document.getElementById('loading');
    const resultadoDiv = document.getElementById('resultado-roteiro');

    // Verifica se o formulário realmente existe na página antes de continuar
    if (form) {
        // Adiciona um "ouvinte" para o evento de "submit" (envio) do formulário
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Impede que a página recarregue, que é o comportamento padrão

            // Mostra a mensagem "Criando sua viagem..."
            loadingDiv.style.display = 'block';
            // Limpa qualquer roteiro que já estivesse na tela
            resultadoDiv.innerHTML = '';
            // Rola a página para que o usuário veja a área de loading/resultado
            resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });


            // Coleta todos os dados que o usuário preencheu no formulário
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                // Envia os dados para o nosso "cérebro" no backend (que vamos criar na pasta /api)
                // O 'fetch' é a maneira moderna do JavaScript de fazer requisições a um servidor
                const response = await fetch('/api/gerar-roteiro', {
                    method: 'POST', // Estamos enviando dados, então usamos o método POST
                    headers: {
                        'Content-Type': 'application/json', // Avisamos que os dados estão no formato JSON
                    },
                    body: JSON.stringify(data), // Converte nossos dados para o formato JSON
                });

                // Se a resposta do servidor não for de sucesso (ex: erro 500), nós geramos um erro
                if (!response.ok) {
                    throw new Error('Falha na resposta do servidor. Código: ' + response.status);
                }

                // Pega a resposta do servidor (que será o roteiro) e a converte de JSON
                const result = await response.json();

                // Coloca o roteiro (que veio em HTML) dentro da div de resultado
                resultadoDiv.innerHTML = result.roteiro;

            } catch (error) {
                // Se qualquer passo acima der errado, mostra uma mensagem de erro para o usuário
                resultadoDiv.innerHTML = `<p style="color: #ff6b6b; font-weight: bold;">Ocorreu um erro ao gerar seu roteiro. Por favor, tente novamente mais tarde.</p>`;
                console.error('Erro detalhado:', error); // Mostra o erro no console do navegador para nos ajudar a depurar
            } finally {
                // Independentemente de ter dado certo ou errado, esconde a mensagem "Criando sua viagem..."
                loadingDiv.style.display = 'none';
            }
        });
    }
});