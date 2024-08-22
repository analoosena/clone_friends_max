document.addEventListener('DOMContentLoaded', function() {

    const tryButton = document.querySelector('.button_itens');
    const nameButton = document.querySelector('.button_itens-name');
    const tabButtonContainer = document.querySelector('.tab_button');
    const tabButtons = document.querySelectorAll('.tab_button--option');
    const tabPanes = document.querySelectorAll('.episodes__list');

    // Inicializa o menu dropdown como escondido
    tabButtonContainer.style.display = 'none';

    // Função para atualizar a posição do tabButtonContainer
    const updateTabButtonPosition = () => {
        const buttonRect = tryButton.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const tabButtonHeight = tabButtonContainer.offsetHeight;

        if (buttonRect.bottom + tabButtonHeight > windowHeight) {
            // Se o menu dropdown ultrapassar o fundo da janela, mostre acima do botão
            tabButtonContainer.style.top = `${buttonRect.top - tabButtonHeight}px`;
            tabButtonContainer.style.bottom = 'auto';
        } else {
            // Caso contrário, mostre abaixo do botão
            tabButtonContainer.style.top = `${buttonRect.bottom}px`;
            tabButtonContainer.style.bottom = `auto`;
        }
    };

    window.addEventListener('scroll', () => {
        if (tabButtonContainer.style.display === 'flex') {
            updateTabButtonPosition();
        }
    });


    

    // Alterna a exibição do menu dropdown ao clicar no botão
    tryButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Impede que o clique se propague para o documento
        tabButtonContainer.style.display = tabButtonContainer.style.display === 'flex' ? 'none' : 'flex';
        updateTabButtonPosition();
    });

    // Fecha o menu dropdown ao clicar fora dele
    document.addEventListener('click', (event) => {
        if (!tabButtonContainer.contains(event.target) && !tryButton.contains(event.target)) {
            tabButtonContainer.style.display = 'none';
        }
    });

    // Adiciona eventos de clique aos botões de temporada
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = button.getAttribute('data-tab');
            const buttonText = button.textContent;

            // Remove a classe 'active' de todos os botões e painéis
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
            });

            // Adiciona a classe 'active' ao botão e painel clicados
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');

            nameButton.textContent = buttonText;

            tabButtonContainer.style.display = 'none';
        });
    });

    const hamburgerButton = document.querySelector('.hamburger-button');
    const headerMenu = document.querySelector('.header__options');

    hamburgerButton.addEventListener('click', function() {
        headerMenu.classList.toggle('active');
    });

});