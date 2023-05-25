//canvas size and dom node
const board = document.getElementById("board");
let boardSize = 22;

//snake head motion
let pause = false;

//Game reset button


//score element
let score = document.getElementById("score");

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
let snakeX=1;
let snakeY=1;

//foood initialization
let foodX=0;
let foodY=0;

//initial score
let count=0;
let high=0;

//Placing snake head in grid initially.
function placeSnake(){
  for(let i=0; i<snakeBody.length; i++){
    snakeBody[i].remove();
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
  let flag = false;
  for(let i=0; i<snakeBody.length; i++){
    if(snakeBody[i].style.gridRowStart==foodY && snakeBody[i].style.gridColumnStart==foodX){
      flag = true;
      placeFood();
    }
  }
  if(flag==false){
    food.style.gridRowStart=foodY;
    food.style.gridColumnStart=foodX;
    food.classList.add("food");
  }
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

function moveSnake(){
  if(!pause){
    for(let i=snakeBody.length-1; i>0; i--){
      snakeBody[i].style.gridRowStart=snakeBody[i-1].style.gridRowStart;
      snakeBody[i].style.gridColumnStart=snakeBody[i-1].style.gridColumnStart;
    }
    if(snakeBody.length){
      snakeBody[0].style.gridRowStart=snakeY;
      snakeBody[0].style.gridColumnStart=snakeX;
    }
    snakeX+=xVelocity;
    snakeY+=yVelocity;
  
    snake.style.gridRowStart=snakeY;
    snake.style.gridColumnStart=snakeX;
  }
  
  for(let i=0; i<snakeBody.length; i++){
    if(snakeY==snakeBody[i].style.gridRowStart && snakeX==snakeBody[i].style.gridColumnStart){
      pause=true;
      reset();
    }
  }
  if(snakeX>boardSize || snakeX<1 || snakeY >boardSize || snakeY <1){
    pause=true;
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
  snakeBody.push(newSegment);
  
  count++;
  if(count>high){
    high++;
  }
  score.innerHTML=`Score: ${count} High score: ${high}`;
}

//reset game
function reset(){
  count=0;
  speed = 10;
  xVelocity = 0;
  yVelocity = 0;
  // placeSnake();
  // placeFood();
  score.innerHTML=`Score: ${count} High score: ${high}`
}

//Opening screen.
window.onload= function(){
  placeSnake();
  placeFood();
  high=0;
  score.innerHTML=`Score: ${count} High score: ${high}`;
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