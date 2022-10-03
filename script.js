const screen = document.querySelector(".screen");
let screenHeight = screen.offsetWidth;
let screenWidth = screen.offsetHeight;
let rect = screen.getBoundingClientRect();
let screenTop = rect.top;
let screenLeft = rect.left;
let background1 = document.querySelector(".background-1");
let background2 = document.querySelector(".background-2");
let posX = 0;

function moveLeft(){
    posX += 3;
    background1.style.left = posX;
}

function moveRight(){
    posX -=3;
    background1.style.left = posX;
}


document.addEventListener("keydown", (event) => {
    if(event.key == "ArrowRight"){
        moveRight();
    }
    else if(event.key == "ArrowLeft"){
        moveLeft();
    }
})


console.log(screenHeight, screenWidth, screenTop, screenLeft);