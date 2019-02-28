

function showHighScores() {
  let menu = document.getElementById('main-menu');
  menu.style.display = 'none';
  let highScores = document.getElementById('high-scores');
  highScores.style.display = 'block';
}

function showControls() {
  let menu = document.getElementById('main-menu');
  menu.style.display = 'none';
  let options = document.getElementById('controls');
  options.style.display = 'block';
}

function showCredits() {
  let menu = document.getElementById('main-menu');
  menu.style.display = 'none';
  let credits = document.getElementById('credits');
  credits.style.display = 'block';
}

function showMenu() {
  let menu = document.getElementById('main-menu');
  menu.style.display = 'block';
  let credits = document.getElementById('credits');
  credits.style.display = 'none';
  let options = document.getElementById('controls');
  options.style.display = 'none';
  let highScores = document.getElementById('high-scores');
  highScores.style.display = 'none';
}
