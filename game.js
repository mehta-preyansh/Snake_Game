const board = document.getElementById("board");
let boardSize = 18;

//Adding snake and food markup in grid.
let snake = document.createElement("div");
let food = document.createElement("div");
board.appendChild(snake);
board.appendChild(food);

//Snake body
let snakeBody = [];

//speed of rendering
let speed = 10;
let lastTime=0;

//snake initial velocity direction;
let xVelocity = 0;
let yVelocity = 0;

//snake initial position
let snakeX=0;
let snakeY=0;

//foood initialization
let foodX=0;
let foodY=0;

//Placing snake head in grid initially.
function placeSnake(){
  for(let i=0; i<snakeBody.length; i++){
    snakeBody[i][0].remove();
  }
  snakeBody = [];
  snakeX=Math.floor(Math.random()*boardSize)+1;
  snakeY=Math.floor(Math.random()*boardSize)+1;
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
  food.classList.add("food");
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
//snake head motion
function moveSnake(){
  for(let i=snakeBody.length-1; i>0; i--){
    snakeBody[i][0].style.gridRowStart=snakeBody[i-1][0].style.gridRowStart;
    snakeBody[i][0].style.gridColumnStart=snakeBody[i-1][0].style.gridColumnStart;
  }
  if(snakeBody.length){
    snakeBody[0][0].style.gridRowStart=snakeY;
    snakeBody[0][0].style.gridColumnStart=snakeX;
  }
  snakeX+=xVelocity;
  snakeY+=yVelocity;

  snake.style.gridRowStart=snakeY;
  snake.style.gridColumnStart=snakeX;
  for(let i=0; i<snakeBody.length; i++){
    if(snakeY==snakeBody[i][0].style.gridRowStart && snakeX==snakeBody[i][0].style.gridColumnStart){
      alert("Game over");
      reset();
    }
  }
  if(snakeX>boardSize || snakeX<1 || snakeY >boardSize || snakeY <1){
    alert("Game over")
    reset();
  }
}

//Grow body function
function grow(){
  let newSegment = document.createElement("div");
  newSegment.classList.add("snake_body");
  newSegment.style.gridRowStart=foodY;
  newSegment.style.gridColumnStart=foodX;
  board.appendChild(newSegment);
  snakeBody.push([newSegment, {x: foodX, y: foodY}]);
  console.log(snakeBody)
}

//reset game
function reset(){
  speed = 10;
  xVelocity = 0;
  yVelocity = 0;
  placeFood();
  placeSnake();
}

//Opening screen.
window.onload= function(){
  placeSnake();
  placeFood();
}

//Game Loop 
function main(ctime){
  window.requestAnimationFrame(main);
  if((ctime-lastTime)/1000 < 1/speed){
    return;
  }
  lastTime=ctime;
  if(snakeX==foodX && snakeY==foodY){
    grow();
    placeFood();
  }
  moveSnake();
  window.addEventListener("keyup", changeDirection);
}
window.requestAnimationFrame(main)