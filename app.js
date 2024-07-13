let gameSeq = [];
let userSeq = [];

let btns = ["red", "green", "yellow", "blue"];

let started = false;
let level = 0;
let highScore = 0;

let h1 = document.querySelector("h1");
let h3 = document.querySelector("h3");

const sounds = {
    red: new Audio('Sound Track/sounds_red.mp3'),
    green: new Audio('Sound Track/sounds_green.mp3'),
    yellow: new Audio('Sound Track/sounds_yellow.mp3'),
    blue: new Audio('Sound Track/sounds_blue.mp3'),
    wrong: new Audio('Sound Track/sounds_end.mp3'),
};

document.addEventListener("keypress", function() {
    console.log("You pressed a key");
    if (!started) {
        started = true;
        levelUp();
    }
});

function levelUp() {
    userSeq = [];  // Reset user sequence for the new level
    level++;
    h3.innerText = `Level ${level}`;

    let randIndx = Math.floor(Math.random() * 4);
    let randColor = btns[randIndx];
    gameSeq.push(randColor);
    console.log(gameSeq);

    btnFlash(document.getElementById(randColor));
}

function btnFlash(btn) {
    const color = btn.id;
    btn.classList.add("flash");
    sounds[color].play();
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function btnPress() {
    let btn = this;
    let userColor = btn.id; // Get the button's ID
    userSeq.push(userColor);
    btnFlash(btn);
    console.log(userSeq);

    checkUserSeq(userSeq.length - 1);
}

function checkUserSeq(currentLevel) {
    if (userSeq[currentLevel] === gameSeq[currentLevel]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(function() {
                levelUp();
            }, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    console.log("Game Over");
    h3.innerText = `Game Over, Press Any Key to Restart`;
    if (level > highScore) {
        highScore = level - 1;
        h1.innerText = `Simon Game - High Score: ${highScore}`;
    }
    sounds.wrong.play();
    started = false;
    gameSeq = [];
    level = 0;
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
