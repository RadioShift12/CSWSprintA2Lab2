const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#startButton');
let lastHole;
let timeUp = false;
let score = 0;

const randTime = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

const randHole = () => {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    if (hole === lastHole) {
        return randHole();
    }
    lastHole = hole;
    return hole;
}

const peep = () => {
    const time = randTime(200, 1000);
    const hole = randHole();
    hole.classList.add('up');

    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) {
            peep();
        }
    }, time);
}

const bonk = (e) => {
    if (!e.isTrusted) return; // cheater!
    score++;
    e.target.classList.remove('up');
    scoreBoard.textContent = score;
}

const startGame = () => {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;

    peep();
    setTimeout(() => {
        timeUp = true;
    }, 10000);
}

startButton.addEventListener('click', startGame);

moles.forEach(mole => mole.addEventListener('click', bonk));