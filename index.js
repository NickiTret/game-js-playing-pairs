(() => {

    // const cardArrayNumber = [{ number: 1, isOpen: false }, { number: 1, isOpen: false }, { number: 2, isOpen: false }, { number: 2, isOpen: false }, { number: 3, isOpen: false }, { number: 3, isOpen: false }, { number: 4, isOpen: false }, { number: 4, isOpen: false }, { number: 5, isOpen: false }, { number: 5, isOpen: false }, { number: 6, isOpen: false }, { number: 6, isOpen: false }, { number: 7, isOpen: false }, { number: 7, isOpen: false }, { number: 8, isOpen: false }, { number: 8, isOpen: false }];
    const cardArrayNumber = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    const cardList = document.createElement('ul');
    const startButton = document.createElement('button');
    const textTitle = document.createElement('h2');
    const textDescriptions = document.createElement('p');
    const container = document.createElement('div');
    const container2 = document.createElement('div');
    const container3 = document.createElement('div');
    const timerContainer = document.createElement('div');

    document.addEventListener('DOMContentLoaded', function() {

        document.body.append(container);
        container.classList.add('wrapper-game');
        container.classList.add('container');
        container.append(container2);
        container2.classList.add('text-descriptions');
        container2.append(textTitle);
        textTitle.textContent = 'Добро пожаловать в игру - Пары.';
        container2.append(textDescriptions);
        textDescriptions.textContent = 'Для начала нажми кнопку "Start game", у вас есть 60 секунд что бы открыть все карточки, удачи!';
        container2.append(startButton);
        startButton.classList.add('btn');
        startButton.classList.add('btn-warning');
        startButton.textContent = 'Start game';
        container.append(container3);
        container3.classList.add('container');
        container3.classList.add('wrapper-game__container');
        container3.id = 'app';
        document.body.append(timerContainer);
        timerContainer.id = 'timer';
        const APP = document.querySelector('#app');

        function shuffle(array) {
            let currentIndex = array.length,
                temporaryValue, randomIndex;

            while (0 !== currentIndex) {

                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        document.querySelector('.btn-warning').addEventListener('click', () => {

            let timeMinut = 59;
            timerContainer.style.display = 'block';
            let timer = setInterval(function() {
                let seconds = timeMinut % 60;


                if (timeMinut <= 10) {
                    timerContainer.classList.add('alert')
                }

                if (timeMinut <= 0) {
                    clearInterval(timer);
                    alert("Game over, попробуйте еще раз!");
                    location.reload();
                } else {
                    let strTimer = `${seconds}`;
                    timerContainer.innerHTML = strTimer;
                }
                --timeMinut;
            }, 1000);

            document.querySelector('.text-descriptions').style.display = 'none';
            APP.append(cardList);
            APP.style.display = 'block';
            cardList.className = 'alert';
            shuffle(cardArrayNumber);
            for (let i = 0; i < cardArrayNumber.length; i++) {
                const card = document.createElement('li');
                const number = document.createElement('p');
                card.className = 'card';
                card.id = i;
                number.innerHTML = cardArrayNumber[i];
                cardList.appendChild(card);
                card.appendChild(number);
            }
            const cards = document.querySelectorAll('.card');


            let rotateCard = false;
            let firstCard, secondCard;
            let lockBoard = false;

            function openCard() {
                if (lockBoard) return;
                this.classList.add('rotate');

                if (!rotateCard) {
                    rotateCard = true;
                    firstCard = this;
                    return;
                }
                secondCard = this;
                rotateCard = false;
                checkForMatch();
            }

            function checkForMatch() {
                if (firstCard.textContent === secondCard.textContent && firstCard.id !== secondCard.id) {
                    firstCard.removeEventListener('click', openCard);
                    secondCard.removeEventListener('click', openCard);
                    firstCard.classList.add('open')
                    secondCard.classList.add('open')
                    let winArray = [];
                    cards.forEach(function(card) {
                        if (card.classList.contains('open')) {
                            winArray.push(card);
                        }
                    });
                    if (winArray.length === cards.length) {
                        clearInterval(timer)
                        const resetButton = startButton;
                        document.body.append(resetButton);
                        resetButton.classList.add('btn-warning');
                        resetButton.classList.add('button-reset');
                        resetButton.id = 'reset';
                        resetButton.textContent = 'Вернуться в начало';
                        document.querySelector('#reset').addEventListener('click', () => {
                            location.reload();
                        });
                    }
                    return;
                }
                lockBoard = true;
                setTimeout(() => {
                    firstCard.classList.remove('rotate');
                    secondCard.classList.remove('rotate');
                    lockBoard = false;
                }, 300);
            }
            cards.forEach(card => card.addEventListener('click', openCard));
        });
    });
})();