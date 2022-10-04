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

let background1X = 0;
let background2X = canvasWidth;

let animatePlyr = 2;
function animatePlayer(){
    if(animatePlyr++/2 == 1){
        player.src = "images/player1.png";
    }
    else if(animatePlyr++/2 == 2){
        player.src = "images/player2.png";
    }
    else if(animatePlyr++/2 == 3){
        player.src = "images/player3.png";
    }
    else if(animatePlyr++/2 == 4){
        player.src = "images/player4.png";
    }
    else if(animatePlyr++/2 == 5){
        player.src = "images/player5.png";
    }
    else if(animatePlyr++/2 == 6){
        player.src = "images/player6.png";
    }
    else if(animatePlyr++/2 == 7){
        player.src = "images/player7.png";
    }
    else if(animatePlyr++/2 == 8){
        player.src = "images/player8.png";   
    }
    else{
        animatePlyr = 2;
    }
}


let jumpDistance = 0;
function animate(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(backgroundLayer1, background1X, 0, canvasWidth, canvasHeight);
    ctx.drawImage(backgroundLayer2, background2X, 0, canvasWidth, canvasHeight);
    ctx.drawImage(player, 20, playerY-100 - jumpDistance, 100, 100);
    requestAnimationFrame(animate);
}

console.log(canvasHeight, canvasWidth)
animate();

function moveRight(){
    background1X -= 10;
    background2X -= 10;
    if(background1X < -canvasWidth){
        background1X = background2X + canvasWidth;
    }
    if(background2X < -canvasWidth){
        background2X = background1X + canvasWidth;
    }
    animatePlayer();
}

function moveLeft(){
    background1X += 10;
    background2X += 10;
    if(background1X > canvasWidth){
        background1X = background2X - canvasWidth;
    }
    if(background2X > canvasWidth){
        background2X = background1X - canvasWidth;
    }
    animatePlayer();
}

let jumpDirection = "up";

let jump;

function jump2(){
    if(jumpDirection == "up"){
        jumpDistance += 8;
    }
    else{
        jumpDistance -= 8;
    }
    if(jumpDistance <= 0){
        clearInterval(jump);
        jumpDistance = 0;
    }
    if(jumpDistance >= 80){
        jumpDirection = "down";
        jumpDistance = 80;
    }
    console.log(jumpDistance);
}

document.addEventListener("keydown", (event) => {
    if(event.key == "ArrowRight"){
        moveRight();
    }
    if(event.key == "ArrowLeft"){
        moveLeft();
    }
    if(event.shiftKey){
        jump = setInterval(jump2, 25);
        jumpDirection = "up";
    }
});

// document.addEventListener("keyup", (event) => {
//     if(event.key == "ArrowRight" || event.key == "ArrowLeft"){
//         clearInterval(animatePlayer);
//     }
// })

