const board = document.getElementsByClassName("playground")[0];
let inputDir = { x: 0, y: 0 };
let speed = 5, lastTime = 0;
let snakeArr = [{ x: 13, y: 15 }]
let food = {
    x: 10, y: 4
}
let score = 0;
document.getElementsByClassName("score")[0].innerHTML =  "SCORE:"+score;;

function main(ctime) {
    window.requestAnimationFrame(main);

    if ((ctime - lastTime) / 1000 < 1 / speed) {
        return
    }
    lastTime = ctime

    gameEngine();


}


function gameEngine() {
    // updating snake array
    if (isCollide(snakeArr)) {
        alert("Game is over ")
        inputDir = { x: 0, y: 0 }
        snakeArr = [{ x: 13, y: 15 }];
        speed = 5;
        score = 0;
        document.getElementsByClassName("score")[0].innerHTML = "SCORE:"+score;
    }

    //if snake eat food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        score++;
        document.getElementsByClassName("score")[0].innerHTML =  "SCORE:"+score;;
        speed += 0.3;
        let a = 2;
        let b = 16;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    //moving snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    //displaying the snake
    board.innerHTML = ""
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement("div");
        if (index === 0) {
            snakeElement.classList.add("head");
        }
        else {
            snakeElement.classList.add("snake");
        }
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.style.gridRowStart = e.y;
        board.append(snakeElement);
    });
    //displaying food
    let foodElement = document.createElement("div");
    foodElement.classList.add("food");
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    board.append(foodElement);



}

window.requestAnimationFrame(main);

//event handling started from here
window.addEventListener('keydown', (e) => {
    inputDir = { x: 0, y: 1 }

    switch (e.key) {
        case "ArrowUp":
            inputDir = { x: 0, y: -1 }
            break;

        case "ArrowDown":
            inputDir = { x: 0, y: 1 }
            break;
        case "ArrowLeft":
            inputDir = { x: -1, y: 0 }
            break;
        case "ArrowRight":
            inputDir = { x: 1, y: 0 }
            break;

        default:
            break;
    }
});

function isCollide(Arr) {
    //if snake touch itseft
    for (let i = 1; i < Arr.length; i++) {
        if (Arr[i].x === Arr[0].x && Arr[i].y === Arr[0].y) {
            return true;
        }
    }
    if (Arr[0].x >= 25 || Arr[0].x <= 0 || Arr[0].y >= 25 || Arr[0].y <= 0) {
        return true

    }

    return false;

}