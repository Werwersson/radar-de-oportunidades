/*
 * Arquivo: /public/js/main.js
 * Contém scripts globais para TODAS as páginas (Menu e Modal de Dúvidas).
*/

// Garante que o script só execute após o carregamento completo do HTML.
document.addEventListener('DOMContentLoaded', () => {

    console.log("DOM carregado. Scripts de main.js iniciarão.");

    /**
     * FUNCIONALIDADE 1: MENU HAMBÚRGUER (GLOBAL)
     * Controla o menu de navegação em telas menores.
     */
    const inicializarMenuHamburguer = () => {
        const menuButton = document.getElementById('menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (menuButton && mobileMenu) {
            menuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    };

    /**
     * FUNCIONALIDADE 2: MODAL DE DÚVIDAS COM IA (GLOBAL)
     * Controla o ícone flutuante e a janela modal.
     */
    const inicializarModalDuvidas = () => {
        // Seleciona todos os elementos necessários pelos seus IDs exatos.
        const openBtn = document.getElementById('open-duvidas-btn');
        const closeBtn = document.getElementById('close-duvidas-btn');
        const modal = document.getElementById('duvidas-modal');
        const overlay = document.getElementById('modal-overlay');

        // Se algum destes elementos não for encontrado no HTML, a função para e avisa no console.
        if (!modal || !openBtn || !closeBtn || !overlay) {
            console.error('ERRO CRÍTICO: Um ou mais elementos do modal (botão de abrir/fechar, overlay ou o próprio modal) não foram encontrados no HTML. A funcionalidade de dúvidas não funcionará.');
            return;
        }

        console.log("Elementos do modal encontrados com sucesso. Adicionando eventos de clique.");

        // Funções para mostrar e esconder o modal.
        const openModal = () => modal.classList.remove('modal-hidden');
        const closeModal = () => modal.classList.add('modal-hidden');

        // Adiciona os "ouvintes" de evento de clique.
        openBtn.addEventListener('click', openModal);
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);

        // --- Lógica da API da Gemini ---
        const duvidasInput = document.getElementById('modal-duvidas-input');
        const duvidasButton = document.getElementById('modal-duvidas-button');
        const duvidasRespostaDiv = document.getElementById('modal-duvidas-resposta');

        if (duvidasInput && duvidasButton && duvidasRespostaDiv) {
            duvidasButton.addEventListener('click', async () => {
                const pergunta = duvidasInput.value;
                if (!pergunta.trim()) {
                    duvidasRespostaDiv.innerText = "Por favor, digite uma pergunta.";
                    return;
                }

                duvidasRespostaDiv.innerText = "Buscando a melhor resposta...";
                duvidasButton.disabled = true;
                duvidasButton.classList.add('opacity-50', 'cursor-not-allowed');

                try {
                    const response = await fetch('/api/ask-gemini', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ question: pergunta }),
                    });

                    if (!response.ok) throw new Error('O servidor respondeu com um erro.');
                    
                    const data = await response.json();
                    duvidasRespostaDiv.innerText = data.answer;

                } catch (error) {
                    console.error("Erro ao processar a pergunta:", error);
                    duvidasRespostaDiv.innerText = "Desculpe, ocorreu um erro ao buscar sua resposta. Por favor, tente novamente mais tarde.";
                } finally {
                    duvidasButton.disabled = false;
                    duvidasButton.classList.remove('opacity-50', 'cursor-not-allowed');
                }
            });
        }
    };

    // --- INICIALIZAÇÃO DE TODAS AS FUNÇÕES GLOBAIS ---
    inicializarMenuHamburguer();
    inicializarModalDuvidas();
});