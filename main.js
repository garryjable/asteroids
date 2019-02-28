var rectWidth = 50;
var currentScore = 0;
var highScores = [];
var lastMoveStamp = 0;
var gameOver = false;
var moveRate = 5;

var nextInput;
var maze = [];
var input = [];

// all walls are listed as 2 cells, listed in the order of movement
var canvas;
var context;
var canvasWidth;

function newGame() {
  let title = document.getElementById('title');
  title.style.display = 'none';
  let gameScreen = document.getElementById('gameScreen-wrapper');
  gameScreen.style.display = 'flex';
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  canvasWidth = canvas.offsetWidth;
  CanvasRenderingContext2D.prototype.clear = function() {
    this.clearRect(0, 0, canvas.width, canvas.height);
  }


  gameLoop();
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
  canvasWidth = canvas.offsetWidth;
  if(elapsedTime - lastMoveStamp >= moveRate){
  }
}

function render() {
  context.clear();
  ship = new Image()
  ship.src = "resources/ship.png"
  context.drawImage(ship , 200, 200);
}


function checkInput (e) {
  console.log(e.charCode)
  e = e || window.event;
  if ( e.keyCode == '38') {
    input.push('thrust');
  } else if ( e.keyCode == '40') {
    input.push('rotateCounter');
  } else if ( e.keyCode == '39') {
    input.push('rotateClock');
  } else if ( e.charCode == '122') {
    input.push('hyperspace');
  }
}

document.onkeypress = checkInput;
