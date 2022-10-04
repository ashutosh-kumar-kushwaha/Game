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

let background1X = 0;
let background2X = canvasWidth;

function animate(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(backgroundLayer1, background1X, 0, canvasWidth, canvasHeight);
    ctx.drawImage(backgroundLayer2, background2X, 0, canvasWidth, canvasHeight);
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
}

document.addEventListener("keydown", (event) => {
    if(event.key == "ArrowRight"){
        moveRight();
    }
    if(event.key == "ArrowLeft"){
        moveLeft();
    }
})