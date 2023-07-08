const move = new Audio("./music/move.mp3")
const music = new Audio("./music/music.mp3")
const chew = new Audio("./music/food.mp3")
const died = new Audio("./music/gameover.mp3")
//canvas size and dom node
const board = document.getElementById("board");
let boardSize = 22;

//snake head motion
let pause = false;

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
let speed = 6;
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
  foodX = Math.floor(Math.random()*(boardSize-2)+2);
  foodY = Math.floor(Math.random()*(boardSize-2)+2);
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
    if(yVelocity!=1 && yVelocity!=-1){
        xVelocity=0;
        yVelocity=-1;
        move.play();  
      }
      break;
      case "ArrowDown" : 
      if(yVelocity!=-1 && yVelocity!=1){
        xVelocity=0;
        yVelocity=1;
        move.play();  
      }
      break;
      case "ArrowLeft":
        if(xVelocity!=1 && xVelocity!=-1){
          xVelocity=-1;
          yVelocity=0;
          move.play();  
        }
        break;
        case "ArrowRight":
        if(xVelocity!=-1 && xVelocity!=1){
          xVelocity=1;
          yVelocity=0;
          move.play();
        } 
      break;
    }
}

function moveSnake(){
  window.addEventListener("keydown", changeDirection); 
  if(!pause){
    resetFlag=true
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
      break;
    }
  }
  if(snakeX>boardSize || snakeX<1 || snakeY >boardSize || snakeY <1){
    pause=true;
    reset();
  }
}
let segments=[];
let counter=1;

//Grow body function
function grow(){
  let newSegment = document.createElement("div");
  newSegment.classList.add("snake_body");
  newSegment.style.gridRowStart=foodY;
  newSegment.style.gridColumnStart=foodX;
  board.appendChild(newSegment);
  snakeBody.push(newSegment);
  if((snakeBody.length)%5 == 0){
    speed+=2;
  }
  count++;
  if(count>high){
    high++;
  }
  score.innerHTML=`Score: ${count} --- High score: ${high}`;
}
let resetFlag=true;
//reset game
function reset(){
  if(resetFlag){
    music.pause();
    died.play();
    resetFlag=false;
  }

  let prompt = document.getElementById("restart");
  prompt.innerHTML=`Press any key to resume.`
  segments = document.getElementsByClassName("snake_body");
  if(counter==1 && segments.length){
    segments[0].classList.add("snake_head");
    segments[0].classList.remove("snake_body");
    counter=2;
  }
  count=0;
  speed = 6;
  xVelocity = 0;
  yVelocity = 0;
  window.addEventListener("keypress", ()=>{
    music.play()
    prompt.innerHTML='';
    placeFood();
    placeSnake();
    pause=false;
    counter=1;
  })
  score.innerHTML=`Score: ${count} --- High score: ${high}`;
}

//Opening screen.
window.onload= function(){
  placeFood();
  placeSnake();
  music.play()
  high=0;
  score.innerHTML=`Score: ${count} --- High score: ${high}`;
}

//Game Loop 
function main(ctime){
  window.requestAnimationFrame(main);
  if(snakeX==foodX && snakeY==foodY){
    chew.play();
  }
  if((ctime-lastTime)/1000 < 1/speed){
    return;
  }
  lastTime=ctime;
  if(snakeX==foodX && snakeY==foodY){
    placeFood();
    grow();
  }
  moveSnake(); 
}
let animation = window.requestAnimationFrame(main)