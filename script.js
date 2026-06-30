let pageid = "home";
let highscore;
function getRandomX() {
    return (Math.ceil(Math.random() * 10) * 10);
}

function homepage() {
    highscore = 0;
    let body = document.querySelector("body");
    body.innerHTML = `<div class="homepage">
        <div class="name">
            <h1>Balloon Popper
        </div>
        <div class="enter name">
            <input type="text" name="name" id="name" placeholder="Enter your name" required>
        </div>
        <select class="sel" name="age" id="age" required>
            <option value>Select Birth Year</option>
        </select>
        <div class="next">
            <button>Next</button>
        </div>
    </div>
    <script src="script.js"></script>`
    console.log(body.innerHTML);
    let cont = document.querySelector(".homepage");
    let sel = cont.querySelector("select");
    for (let i = 1900; i < new Date().getFullYear(); i++) {
        let x = `<option>${i}</option>`;
        sel.innerHTML += x;
    }
    const name = document.getElementById("name").nodeValue
    let btn = document.querySelector(".next button");
    btn.addEventListener("click", () => {
        const name = document.getElementById("name").value.trim();
        const year = document.getElementById("age").value;

        if (!name || !year) {
            alert("Please fill in all fields.");
            return;
        }

        startpage(name, highscore);
    });
}

function startpage(name, highscore) {
    let body = document.querySelector("body");
    body.innerHTML = `<div class="homepage">
        <div class="name">
            <h1>Balloon Popper
        </div>
        <p>Welcome to the game ${name} !!!!</p>
        <div class="next">
            <button>Start the game</button>
        </div>
    </div>
    <script src="script.js"></script>`

    let btn = document.querySelector(".next button");
    btn.addEventListener("click", () => {
        playing(name, highscore);
    });
}

function playing(name, highscore) {
    let currscore = 0;
    let timer = 30;
    let body = document.querySelector("body");

    body.innerHTML = `
        <div class="gamepage">
            <div class="nav">
                <div class="timer">
                    Clock is ticking ${name} : <span id="time-left">${timer}</span>s
                </div>
                <div class="hiscore">
                    <div>Highscore : ${highscore}</div>
                    <div>Current Score : <span id="curr-score">${currscore}</span></div>
                </div>
            </div>
            <div id="balloon-container" style="position: relative; width: 100vw; height: 100vh; overflow: hidden;"></div>
        </div>
    `;

    const container = document.getElementById("balloon-container");
    const timeDisplay = document.getElementById("time-left");
    const scoreDisplay = document.getElementById("curr-score");

    let countdown = setInterval(() => {
        timer--;
        timeDisplay.innerText = timer;

        if (timer <= 0) {
            clearInterval(countdown);
            clearInterval(spawner);

            if (currscore > highscore) {
                highscore = currscore;
            }

            gameover(name, highscore, currscore);
        }
    }, 1000);

    let spawner = setInterval(() => {
        let newBalloon = document.createElement("div");
        newBalloon.classList.add("balloon");

        const SVG = `
        <svg viewBox="0 0 100 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <path d="M 50 100 Q 40 125 50 150 T 50 180" stroke="white" stroke-width="3" fill="none"/>
            <polygon points="45,95 55,95 50,110" fill="#ff4d4d"/>
            <ellipse cx="50" cy="50" rx="40" ry="50" fill="#ff4d4d"/>
            <ellipse cx="35" cy="30" rx="10" ry="15" fill="white" opacity="0.4" transform="rotate(-30 35 30)"/>
        </svg>
        `;

        newBalloon.innerHTML = SVG;

        let randomX = Math.floor(Math.random() * 80) + 10;

        newBalloon.style.cssText = `
            position: absolute;
            bottom: -150px; 
            left: ${randomX}vw;
            width: 80px; 
            height: 140px; 
            transition: bottom 5s linear; 
        `;

        newBalloon.addEventListener("click", () => {
            newBalloon.remove();
            currscore += 20;
            scoreDisplay.innerText = currscore;
        });

        container.appendChild(newBalloon);

        setTimeout(() => {
            newBalloon.style.bottom = "120vh";
        }, 50);

        setTimeout(() => {
            if (newBalloon.parentElement) {
                newBalloon.remove();
            }
        }, 4000);

    }, 1000);
}

function gameover(name, highscore, finalscore) {
    let body = document.querySelector("body");
    body.innerHTML = `
        <div class="homepage">
        <h1>Game Over, ${name}!</h1>
        <h3>Final Score: ${finalscore}</h3>
        <h3>Highscore: ${highscore}</h3>
        <div class="next">
            <button id="restart-btn">Play Again</button>
        </div>
    </div>

    <script src="script.js"></script>
    `;

    document.getElementById("restart-btn").addEventListener("click", () => {
        playing(name, highscore);
    });
}

function main() {
    if (pageid == "home") {
        homepage();
    }
    else if (pageid == "start") {
        startpage("Abhay");
    }
    else if (pageid == "playing") {
        playing(1200);
    }
    else if (pageid == "gameover") {
    }
}
main()
