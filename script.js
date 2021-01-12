let c = document.getElementById("mycanvas");
let ctx = c.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, c.width, c.height);

// STORAGE GET
let previousscore = window.localStorage.getItem('Highscore');
let convertedscore = JSON.parse(previousscore);
document.querySelector('#first').innerHTML = convertedscore;

document.querySelector('button').addEventListener('click', function() {
    document.querySelector('#first').innerHTML = 0;
    window.localStorage.clear();
        window.localStorage.setItem('Highscore', JSON.stringify(document.querySelector('#first').innerHTML));
});


const block = 20;
let x;
let y;
let w;
let h;
let velocity = "up";
let score = 0;
let gameover = false;


let food = [Math.ceil((Math.random() * 400 - block) / 20) * 20, Math.ceil((Math.random() * 400 - block) / 20) * 20, block, block];

function drawfood() {
        ctx.fillStyle = "red";
        ctx.fillRect(food[0], food[1], food[2], food[3]);
}

function cleanfood() {
        food[0] = Math.ceil((Math.random() * 400 - block) / 20) * 20;
        food[1] = Math.ceil((Math.random() * 400 - block) / 20) * 20;
        for (i = 0; i < snake.length; i++) {
            if (food[0] == snake[i][0] && food[1] == snake[i][1]) {
                cleanfood();
            }
        }
}

function drawscore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(score, 10, 25);
}

document.querySelector('#up').addEventListener('click', function() {
    if (velocity == "down") {
        return;
    } else {
        setTimeout(function(){velocity = "up";}, 1000/6);
    }
});

document.querySelector('#left').addEventListener('click', function() {
    if (velocity == "right") {
        return;
    } else {
        setTimeout(function(){velocity = "left";}, 1000/6);
    }
});

document.querySelector('#right').addEventListener('click', function() {
    if (velocity == "left") {
        return;
    } else {
        setTimeout(function(){velocity = "right";}, 1000/6);
    }
});

document.querySelector('#down').addEventListener('click', function() {
    if (velocity == "up") {
        return;
    } else {
        setTimeout(function(){velocity = "down";}, 1000/6);
    }
});


document.addEventListener('keydown', function(e) {
    if (e.key == 'ArrowUp') {
        e.preventDefault();
        if (velocity == "down") {
            return;
        } else {
            setTimeout(function(){velocity = "up";}, 1000/6);
        }
    } else if (e.key == 'ArrowDown') {
        e.preventDefault();
        if (velocity == "up") {
            return;
        } else {
            setTimeout(function(){velocity = "down";}, 1000/6);
        }
    } else if (e.key == 'ArrowLeft') {
        e.preventDefault();
        if (velocity == "right") {
            return;
        } else {
            setTimeout(function(){velocity = "left";}, 1000/6);
        }
    } else if (e.key == 'ArrowRight') {
        e.preventDefault();
        if (velocity == "left") {
            return;
        } else {
            setTimeout(function(){velocity = "right";}, 1000/6);
        }
    }
});


let snakeBlock0 = [9*block, 9*block, block, block];
let snakeBlock1 = [9*block, 10*block, block, block];
let snakeBlock2 = [9*block, 11*block, block, block];
let snakeBlock3 = [9*block, 12*block, block, block];
let snake = [snakeBlock0, snakeBlock1, snakeBlock2, snakeBlock3];

function drawSnake() {
    ctx.fillStyle = "green";
    for (i = 0; i < snake.length; i++) {
        x = snake[i][0];
        y = snake[i][1];
        w = snake[i][2];
        h = snake[i][3];
        ctx.fillRect(x, y, w, h);
    }
}
setInterval(animate, 1000/6);

function animate() {
    if (gameover) {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.fillStyle = "white";
        ctx.fillText("Your Score:" + "" + score, 5*block, 5*block);
        ctx.fillText('Press Enter to Replay', 8*block, 8*block);
        if (score > document.querySelector('#first').innerHTML) {
            document.querySelector('#first').innerHTML = score;
        }
        window.localStorage.clear();
        window.localStorage.setItem('Highscore', JSON.stringify(document.querySelector('#first').innerHTML));
        document.querySelector('#replay').addEventListener('click', function() {
            gameover = false;
            velocity = "up";
            score = 0;
            gameover = false;
            snakeBlock0 = [9*block, 9*block, block, block];
            snakeBlock1 = [9*block, 10*block, block, block];
            snakeBlock2 = [9*block, 11*block, block, block];
            snakeBlock3 = [9*block, 12*block, block, block];
            snake = [snakeBlock0, snakeBlock1, snakeBlock2, snakeBlock3];
        });
        document.addEventListener('keydown', function(e) {
            if (e.key == "Enter") {
            gameover = false;
            velocity = "up";
            score = 0;
            gameover = false;
            snakeBlock0 = [9*block, 9*block, block, block];
            snakeBlock1 = [9*block, 10*block, block, block];
            snakeBlock2 = [9*block, 11*block, block, block];
            snakeBlock3 = [9*block, 12*block, block, block];
            snake = [snakeBlock0, snakeBlock1, snakeBlock2, snakeBlock3];
            }
        });
    } else {
    gameOver();
    clear();
    update();
    draw();
    }
}


function clear() {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, c.width, c.height);
}

function gameOver() {
    for(i = 1; i < snake.length; i++) {
        if (snake[0][0] == snake[i][0] && snake[0][1] == snake[i][1]) {
            gameover = true;
            };
            
        }
    }

function update() {


    // check if eat food
    if (snake[0][0] == food[0] && snake[0][1] == food[1]) {
        if (velocity == "up") {
            let newHead = [snake[0][0], snake[0][1] - block, snake[0][2], snake[0][3]]
            snake.unshift(newHead);
            for (i = 0; i < snake.length; i++) {
                if (snake[i][1] == 0 - block) {
                    snake[i][1] = c.height - block;
                }
        }
    }
        if (velocity == "down") {
            let newHead = [snake[0][0], snake[0][1] + block, snake[0][2], snake[0][3]]
            snake.unshift(newHead);
            for (i = 0; i < snake.length; i++) {
                if (snake[i][1] == c.height) {
                    snake[i][1] = 0;
                }
        }
    }
        if (velocity == "right") {
            let newHead = [snake[0][0] + block, snake[0][1], snake[0][2], snake[0][3]]
            snake.unshift(newHead);
            for (i = 0; i < snake.length; i++) {
                if (snake[i][0] == c.width) {
                    snake[i][0] = 0;
                }
        }
    }
        if (velocity == "left") {
            let newHead = [snake[0][0] - block, snake[0][1], snake[0][2], snake[0][3]]
            snake.unshift(newHead);
            for (i = 0; i < snake.length; i++) {
                if (snake[i][0] == 0 - block) {
                    snake[i][0] = c.width - block;
                }
        }
    }
        cleanfood();
        score++;
    } else {
        // NORMAL MOVEMENTS
    if (velocity == "up") {
        snake.splice(snake.length - 1, 1);
        let newHead = [snake[0][0], snake[0][1] - block, snake[0][2], snake[0][3]]
        snake.unshift(newHead);
        for (i = 0; i < snake.length; i++) {
            if (snake[i][1] == 0 - block) {
                snake[i][1] = c.height - block;
            }
        }
    }

    if (velocity == "down") {
        snake.splice(snake.length - 1, 1);
        let newHead = [snake[0][0], snake[0][1] + block, snake[0][2], snake[0][3]]
        snake.unshift(newHead);
        for (i = 0; i < snake.length; i++) {
            if (snake[i][1] == c.height) {
                snake[i][1] = 0;
            }
        }

    }

    if (velocity == "left") {
        snake.splice(snake.length - 1, 1);
        let newHead = [snake[0][0] - block, snake[0][1], snake[0][2], snake[0][3]]
        snake.unshift(newHead);
        for (i = 0; i < snake.length; i++) {
            if (snake[i][0] == 0 - block) {
                snake[i][0] = c.width - block;
            }
        }

    }

    if (velocity == "right") {
        snake.splice(snake.length - 1, 1);
        let newHead = [snake[0][0] + block, snake[0][1], snake[0][2], snake[0][3]]
        snake.unshift(newHead);
        for (i = 0; i < snake.length; i++) {
            if (snake[i][0] == c.width) {
                snake[i][0] = 0;
            }
        }
    }
}   
}


function draw() {
    drawfood();
    drawSnake();
    drawscore();
}



