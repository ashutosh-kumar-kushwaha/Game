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

let playerY = 0.812 * canvasHeight;

const player = new Image();
player.src = "images/player1.png";

let isPlayerDirectionRight = true;

let background1X = 0;
let background2X = canvasWidth;

const enemies = new Image();
enemies.src = "images/enemies.png";

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
}

let enemy1 = new Enemy(194, 183, canvasWidth * 1.5, canvasWidth * 1.5, canvasWidth * 2.25, playerY, 231, 223, 38);

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

let x = 0;
let jumpDistance = 0;
let playerX = 175;
let playerWidth = 100;
let playerHeight = 100;
let enemyWidth = 100;
let enemyHeight = 100;

function animate(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(backgroundLayer1, background1X, 0, canvasWidth, canvasHeight);
    ctx.drawImage(backgroundLayer2, background2X, 0, canvasWidth, canvasHeight);
    ctx.drawImage(player, 175, playerY - playerHeight - jumpDistance, playerWidth, playerHeight);
    
    if(enemy1.isMovingLeft){
        ctx.drawImage(enemies, enemy1.xPosInImage + Math.floor((x++/8)) * enemy1.width, enemy1.yPosInImage, enemy1.width, enemy1.height, enemy1.xPos - playerX, enemy1.yPos - enemyWidth, enemyWidth, enemyHeight);
    }
    else{
        ctx.drawImage(enemies, enemy1.xPosInFlippedImage + Math.floor((x++/8)) * enemy1.width, enemy1.yPosInImage, enemy1.width, enemy1.height, enemy1.xPos - playerX, enemy1.yPos - enemyWidth, enemyWidth, enemyHeight);
    }
    enemy1.update();

    if(((playerX + 175 <= enemy1.xPos && playerX + 175 + playerWidth > enemy1.xPos) || (enemy1.xPos <= playerX + 175 && enemy1.xPos + enemyWidth > playerX + 175)) &&  (playerY - jumpDistance == enemy1.yPos - enemyHeight)){
        console.log("Enemy Dead");
    }

    if(((playerX + 175 <= enemy1.xPos && playerX + 175 + playerWidth > enemy1.xPos) || (enemy1.xPos <= playerX + 175 && enemy1.xPos + enemyWidth > playerX + 175)) &&  (playerY - jumpDistance == enemy1.yPos)){
        console.log("Player Dead");
    }


    
    if(x==32){
        x=0;
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

let jump;

function jump2(){
    if(jumpDirection == "up"){
        jumpDistance += 10;
    }
    else{
        jumpDistance -= 10;
    }
    if(jumpDistance <= 0){
        clearInterval(jump);
        jumpDistance = 0;
        isJumping = false;
    }
    if(jumpDistance >= 150){
        jumpDirection = "down";
        jumpDistance = 150;
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
        jump = setInterval(jump2, 20);
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
    if(event.key == "A"){
        console.log(playerX, enemy1.xPos);
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