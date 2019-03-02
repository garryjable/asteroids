MyGame.main = (function(graphics, ship) {
  'use strict';
  var currentScore = 0;
  var highScores = [];
  var lastMoveStamp = 0;
  var elapsedTime = 0;
  var gameOver = false;
  var moveRate = 0;

  var nextInput;
  var input = [];

  var shipSpec = ship.getShipSpec()
  var shipTexture = graphics.Texture(shipSpec);


  gameLoop();

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
      if (nextInput === 'rotateCounter') {
        ship.turnCounterClockwise();
        shipSpec = ship.getShipSpec()
        shipTexture = graphics.Texture(shipSpec);
      } else if (nextInput === 'rotateClock') {
        ship.turnClockwise();
        shipSpec = ship.getShipSpec()
        shipTexture = graphics.Texture(shipSpec);
      }
    }
  }

  function render() {
    graphics.clear();
    graphics.refresh();
    shipTexture.draw();
  }


  function checkInput (e) {
    e = e || window.event;
    if ( e.keyCode == '38') {
      input.push('thrust');
    } else if ( e.keyCode == '37') {
      input.push('rotateCounter');
    } else if ( e.keyCode == '39') {
      input.push('rotateClock');
    } else if ( e.charCode == '122') {
      input.push('hyperspace');
    }
  }

  document.onkeypress = checkInput;

}(MyGame.graphics, MyGame.ship));
