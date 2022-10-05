const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.offsetWidth;
const canvasHeight = canvas.offsetHeight;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

const backgroundLayer1 = new Image();
backgroundLayer1.src = "images/bg.png";

const backgroundLayer2 = new Image();
backgroundLayer2.src = "images/bg.png";

let groundY = 0.812 * canvasHeight;

let playerXPos = Math.floor(0.13 * canvasWidth);

const finishLine = new Image();
finishLine.src = "images/finishLine.png";

let x = 0;
let playerX = playerXPos;
let playerWidth = 100;
let playerHeight = 100;
let enemyWidth = 100;
let enemyHeight = 100;
let defaultPlayerY = groundY - playerHeight;
let playerY = defaultPlayerY;

const player = new Image();
player.src = "images/player1.png";

let isPlayerDirectionRight = true;

let background1X = 0;
let background2X = canvasWidth;

const enemies = new Image();
enemies.src = "images/enemies.png";

let winPosX = 6*canvasWidth;

class Enemy{
    constructor(height, width, xPos,xPosStart, xPosEnd, yPos, xPosInImage, yPosInImage, xPosInFlippedImage){
        this.height = height;
        this.width = width;
        this.xPos = xPos;
        this.xPosStart = xPosStart;
        this.xPosEnd = xPosEnd;
        this.yPos = yPos;
        this.xPosInImage = xPosInImage;
        this.yPosInImage = yPosInImage;
        this.xPosInFlippedImage = xPosInFlippedImage;
        this.isMovingLeft = true;
        this.alive = true;
    }

    update(){
        if(this.isMovingLeft){
            if(this.xPos <= this.xPosStart){
                this.isMovingLeft = false;
                this.xPos = this.xPosStart;
                enemies.src = "images/enemiesf.png";
            }
            else{
                this.xPos-=2;
            }
        }
        else{
            if(this.xPos >= this.xPosEnd){
                this.isMovingLeft = true;
                this.xPos = this.xPosEnd;
                enemies.src = "images/enemies.png";
            }
            else{
                this.xPos+=2;
            }
        }
    }

    draw(){
        if(this.isMovingLeft){
            ctx.drawImage(enemies, this.xPosInImage + Math.floor((x/8)) * this.width, this.yPosInImage, this.width, this.height, this.xPos - playerX, this.yPos, enemyWidth, enemyHeight);
        }
        else{
            ctx.drawImage(enemies, this.xPosInFlippedImage + Math.floor((x/8)) * this.width, this.yPosInImage, this.width, this.height, this.xPos - playerX, this.yPos, enemyWidth, enemyHeight);
        }
    }

    checkAlive(){
        if(((playerX + playerXPos <= this.xPos && playerX + playerXPos + playerWidth > this.xPos) || (this.xPos <= playerX + playerXPos && this.xPos + enemyWidth > playerX + playerXPos)) &&  (playerY + playerHeight == this.yPos)){
            this.alive = false;
        }

        if(((playerX + playerXPos <= this.xPos && playerX + playerXPos + playerWidth > this.xPos) || (this.xPos <= playerX + playerXPos && this.xPos + enemyWidth > playerX + playerXPos)) &&  (playerY == this.yPos)){
            isPlayerAlive = false;
        }
    }
}

isPlayerAlive =true;


let enemy1 = new Enemy(194, 183, canvasWidth * 2.25, canvasWidth * 1.5, canvasWidth * 2.25, groundY - enemyHeight, 231, 223, 38);
let enemy2 = new Enemy(194, 183, canvasWidth * 3.75, canvasWidth * 3, canvasWidth * 3.75, groundY - enemyHeight, 231, 223, 38);
let enemy3 = new Enemy(194, 183, canvasWidth * 5.25, canvasWidth * 4.5, canvasWidth * 5.25, groundY - enemyHeight, 231, 223, 38);

let animatePlyr = 3;
function animatePlayer(){

    if(isPlayerDirectionRight){
        if(Math.floor(animatePlyr++/3) == 1){
            player.src = "images/player1.png";
        }
        else if(Math.floor(animatePlyr++/3) == 2){
            player.src = "images/player2.png";
        }
        else if(Math.floor(animatePlyr++/3) == 3){
            player.src = "images/player3.png";
        }
        else if(Math.floor(animatePlyr++/3) == 4){
            player.src = "images/player4.png";
        }
        else if(Math.floor(animatePlyr++/3) == 5){
            player.src = "images/player5.png";
        }
        else if(Math.floor(animatePlyr++/3) == 6){
            player.src = "images/player6.png";
        }
        else if(Math.floor(animatePlyr++/3) == 7){
            player.src = "images/player7.png";
        }
        else if(Math.floor(animatePlyr++/3) == 8){
            player.src = "images/player8.png";   
        }
        else{
            animatePlyr = 3;
        }
    }
    else{
        if(Math.floor(animatePlyr++/3) == 1){
            player.src = "images/player1f.png";
        }
        else if(Math.floor(animatePlyr++/3) == 2){
            player.src = "images/player2f.png";
        }
        else if(Math.floor(animatePlyr++/3) == 3){
            player.src = "images/player3f.png";
        }
        else if(Math.floor(animatePlyr++/3) == 4){
            player.src = "images/player4f.png";
        }
        else if(Math.floor(animatePlyr++/3) == 5){
            player.src = "images/player5f.png";
        }
        else if(Math.floor(animatePlyr++/3) == 6){
            player.src = "images/player6f.png";
        }
        else if(Math.floor(animatePlyr++/3) == 7){
            player.src = "images/player7f.png";
        }
        else if(Math.floor(animatePlyr++/3) == 8){
            player.src = "images/player8f.png";   
        }
        else{
            animatePlyr = 3;
        }
    }
}

let isJumping = false;


function animate(){

    if(isPlayerAlive){
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(backgroundLayer1, background1X, 0, canvasWidth, canvasHeight);
        ctx.drawImage(backgroundLayer2, background2X, 0, canvasWidth, canvasHeight);
        ctx.drawImage(player, playerXPos, playerY, playerWidth, playerHeight);
        ctx.drawImage(finishLine, winPosX - playerX, groundY-200, 300, 200);
    
        if(enemy1.alive){
            enemy1.draw();
            enemy1.checkAlive();
            enemy1.update();
        }
        if(enemy2.alive){
            enemy2.draw();
            enemy2.checkAlive();
            enemy2.update();
        }
        if(enemy3.alive){
            enemy3.draw();
            enemy3.checkAlive();
            enemy3.update();
        }
        if(++x==32){
            x=0;
        }
        if(playerX >= winPosX){
            ctx.font = "72px Calibri";
            ctx.fillStyle = "white";
            ctx.fillText("You won!", 10, 60);
        }
    }
    else{
        ctx.font = "72px Calibri";
        ctx.fillStyle = "white";
        ctx.fillText("Game Over!", 10, 60);
    }
    requestAnimationFrame(animate);
}


animate();

function moveRight(){
    isPlayerDirectionRight = true;
    background1X -= 10;
    background2X -= 10;
    playerX += 10;   
    if(background1X < -canvasWidth){
        background1X = background2X + canvasWidth;
    }
    if(background2X < -canvasWidth){
        background2X = background1X + canvasWidth;
    }
    if(!isJumping){
        animatePlayer();
    }
}

function moveLeft(){
    isPlayerDirectionRight = false;
    background1X += 10;
    background2X += 10;
    playerX -= 10;
    if(background1X > canvasWidth){
        background1X = background2X - canvasWidth;
    }
    if(background2X > canvasWidth){
        background2X = background1X - canvasWidth;
    }
    if(!isJumping){
        animatePlayer();
    }
}

let jumpDirection = "up";
let moveRightEvent;
let isMovingRight = false;
let moveLeftEvent;
let isMovingLeft = false;

let jumpEvent;

function jump(){
    if(jumpDirection == "up"){
        playerY -= 10;
    }
    else{
        playerY += 10;
    }
    if(playerY >= defaultPlayerY){
        clearInterval(jumpEvent);
        playerY = defaultPlayerY;
        isJumping = false;
    }
    if(playerY <= defaultPlayerY - 150){
        jumpDirection = "down";
        playerY = defaultPlayerY - 150;
    }
}

document.addEventListener("keydown", (event) => {
    if(event.key == "ArrowRight" && !isMovingRight){
        moveRightEvent = setInterval(moveRight, 40);
        isMovingRight = true;   
        isMovingLeft = false;
        clearInterval(moveLeftEvent);
    }
    if(event.key == "ArrowLeft" && !isMovingLeft){
        moveLeftEvent = setInterval(moveLeft, 40);
        isMovingLeft = true;
        isMovingRight = false;
        clearInterval(moveRightEvent);
    }
    if(event.shiftKey && !isJumping){
        jumpEvent = setInterval(jump, 20);
        jumpDirection = "up";;
        isJumping = true;
        if(isMovingRight){
            player.src = "images/player1.png"
        }
        else if(isMovingLeft){
            player.src = "images/player1f.png";
        }
        else if(isPlayerDirectionRight){
            player.src = "images/player4.png";
        }
        else{
            player.src = "images/player4f.png";
        }
    }
});


document.addEventListener("keyup", (event) => {
    if(event.key == "ArrowRight"){
        clearInterval(moveRightEvent);
        isMovingRight = false;
    }
    if(event.key == "ArrowLeft"){
        clearInterval(moveLeftEvent);
        isMovingLeft = false;
    }
});

// document.querySelector("#right").addEventListener("click", (event) => {
//     moveRight();
//     isMovingLeft = false;
// });

// document.querySelector("#left").addEventListener("click", (event) => {
//     moveLeft();
//     isMovingLeft = true;
// });

// document.querySelector("#jump").addEventListener("click", (event) => {
//     jumpEvent = setInterval(jump, 20);
//     isJumping = true;
// });