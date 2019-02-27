const canvasWidth = 500;
var rectWidth = 50;
var currentScore = 0;
var highScores = [];
var lastMoveStamp = 0;
var gameOver = false;

var nextInput;
var maze = [];
var input = [];

// all walls are listed as 2 cells, listed in the order of movement
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

CanvasRenderingContext2D.prototype.clear = function() {
  this.clearRect(0, 0, canvas.width, canvas.height);
}


function newGame() {
  let menu = document.getElementById('menu');
  menu.style.display = 'none';
  let gameScreen = document.getElementById('gameScreen');
  gameScreen.style.display = 'block';
}


function gameLoop(elapsedTime) {
  if (!gameOver) {
    processInput(elapsedTime);
    update(elapsedTime);
  }
    render();
    requestAnimationFrame(gameLoop);
}


function processInput(elapsedTime) {
  nextInput = input.pop();
  input = []
}


function update(elapsedTime) {
  if(elapsedTime - lastMoveStamp >= moveRate){
  }
}

function render() {
  context.clear();
  context.beginPath();
}


function checkInput (e) {
  e = e || window.event;
  if ( e.keyCode == '38') {
    input.push('thrust');
  } else if ( e.keyCode == '40') {
    input.push('rotateCounter');
  } else if ( e.keyCode == '39') {
    input.push('rotateClock');
  } else if ( e.charCode == '104') {
    input.push('hyperspace');
  }
}

document.onkeypress = checkInput;
