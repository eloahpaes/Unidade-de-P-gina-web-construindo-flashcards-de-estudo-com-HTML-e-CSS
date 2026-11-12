const form = document.getElementById('flashcard-form');
const cardsContainer = document.getElementById('cards-container');

// Cartões iniciais caso o usuário ainda não tenha criado nenhum
const cartoesIniciais = [
    {
        pergunta: "O que significa HTML?",
        resposta: "HyperText Markup Language (Linguagem de Marcação de Hipertexto)"
    },
    {
        pergunta: "Para que serve o CSS?",
        resposta: "Para estilizar e definir o layout de páginas web."
    },
    {
        pergunta: "Qual a função do JavaScript na web?",
        resposta: "Adicionar interatividade e dinamismo às páginas."
    }
];

// Carrega os cartões salvos no navegador ou usa os iniciais
let flashcards = JSON.parse(localStorage.getItem('meusFlashcards')) || cartoesIniciais;

// Função para salvar no localStorage
function salvarCartoes() {
    localStorage.setItem('meusFlashcards', JSON.stringify(flashcards));
}

// Função para renderizar os cartões na tela
function renderizarCartoes() {
    cardsContainer.innerHTML = '';

    flashcards.forEach((cartao, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('flashcard');

        cardElement.innerHTML = `
            <div class="flashcard-inner">
                <div class="flashcard-front">
                    <button class="delete-btn" title="Excluir cartão" onclick="excluirCartao(event, ${index})">X</button>
                    <span>Pergunta</span>
                    <h3>${cartao.pergunta}</h3>
                </div>
                <div class="flashcard-back">
                    <span>Resposta</span>
                    <p>${cartao.resposta}</p>
                </div>
            </div>
        `;

        // Evento de clique para virar o cartão
        cardElement.addEventListener('click', () => {
            cardElement.classList.toggle('virado');
        });

        cardsContainer.appendChild(cardElement);
    });
}

// Função para adicionar um novo cartão
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const perguntaInput = document.getElementById('pergunta');
    const respostaInput = document.getElementById('resposta');

    const novoCartao = {
        pergunta: perguntaInput.value.trim(),
        resposta: respostaInput.value.trim()
    };

    if (novoCartao.pergunta && novoCartao.resposta) {
        flashcards.push(novoCartao);
        salvarCartoes();
        renderizarCartoes();
        form.reset();
    }
});

// Função para excluir um cartão
function excluirCartao(event, index) {
    event.stopPropagation(); // Evita que o cartão vire ao clicar no botão de excluir
    flashcards.splice(index, 1);
    salvarCartoes();
    renderizarCartoes();
}

// Inicializa a tela com os cartões
renderizarCartoes();