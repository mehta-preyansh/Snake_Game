const board = document.getElementById("board");
let boardSize = 18;

//Adding snake and food markup in grid.
let snake = document.createElement("div");
let food = document.createElement("div");
board.appendChild(snake);
board.appendChild(food);

//speed of rendering
let speed = 5;
let lastTime=0;

//snake initial velocity direction;
let xVelocity = 0;
let yVelocity = 0;
//snake initial position
let snakeX=5;
let snakeY=5;

//foood initialization
let foodX=0;
let foodY=0;

//Placing snake head in grid initially.
function placeSnake(){
  snake.style.gridRowStart=snakeY;
  snake.style.gridColumnStart=snakeX;
  snake.classList.add("snake_head");
}

//Placing food randomly in the grid.
function placeFood(){
  foodX = Math.floor(Math.random()*boardSize)+1;
  foodY = Math.floor(Math.random()*boardSize)+1;
  food.style.gridRowStart=foodY;
  food.style.gridColumnStart=foodX;
  // food.style.gridRowEnd=foodX+10;
  // food.style.gridColumnEnd=foodY+10;
  food.classList.add("food");
}

//snake head motion
function moveSnake(){
  snakeX+=xVelocity;
  snakeY+=yVelocity;
  snake.style.gridRowStart=snakeY;
  snake.style.gridColumnStart=snakeX;
  // snake.style.gridRowEnd=snakeY+10;
  // snake.style.gridColumnEnd=snakeX+10;
}

//Changing snake direction
function changeDirection(e){  
  switch(e.code){
    case "ArrowUp" : 
      if(yVelocity!=1){
        xVelocity=0;
        yVelocity=-1;
      }
      break;
    case "ArrowDown" : 
      if(yVelocity!=-1){
        xVelocity=0;
        yVelocity=1;
      }
      break;
    case "ArrowLeft":
      if(xVelocity!=1){
        xVelocity=-1;
        yVelocity=0;
      }
      break;
    case "ArrowRight":
      if(xVelocity!=-1){
        xVelocity=1;
        yVelocity=0;
      } 
      break;
  }
}

window.onload= function(){
  placeSnake();
  placeFood();
}
function main(ctime){
  window.requestAnimationFrame(main);
  if((ctime-lastTime)/1000 < 1/speed){
    return;
  }
  lastTime=ctime;
  moveSnake();
  if(snakeX==foodX && snakeY==foodY){
    placeFood();
    // console.log("Collided")
  }
  window.addEventListener("keyup", changeDirection);
}
window.requestAnimationFrame(main)