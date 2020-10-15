const cards = document.querySelectorAll('.card');
let hasFlippedCard = false; // aqui começa em falso pois o usuario precisa virar para ser true
let firstCard, secondCard; // primeira carta virada e a segunda
let LockBoard = false; // tranca o tabuleiro

// função para virar a carta (confirmar se esta virada ou nao)
function flipCard() {
    if (LockBoard) return;

    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;

    checkForMatch();
}

// função para checar se a primeira carta é igual a segunda clicada
function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }
    unflipCards();
}

// função para retirar o addEventListener e cancelar o click
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard(); //
}

// função para desvirar as cartas em um tempo depois de clicar
function unflipCards() {
    LockBoard = true; // 'bloqueia' o tabuleiro. Quando abre a segunda carta e 
    // nao combina, ao clicar em outra carta,as cartas viradas, retornam de face virada
    // e tem que ser nesta função

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard(); // 
    }, 1200); // tempo de virada das cartas
}

//
function resetBoard() {
    [hasFlippedCard, LockBoard] = [false, false]; // o indice 0 e 1 serao falsos
    [firstCard, secondCard] = [null, null]; // o indice 0 e 1 serao nulos
}

// embaralhar as cartas
// immediately invoked function função que é renderizada sempre que é chamada
(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12); // sorteia num de 0 a 1
        card.style.order = ramdomPosition;
    })
})(); // a função é chamada nestes () por ultimo

// clique nas cartas e ocorre o flip da carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});

