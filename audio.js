MyGame.audio = (function() {
    'use strict';
    let sounds = {};

    function loadSound(source, label, idButton) {
        let sound = new Audio();
        sound.addEventListener('canplay', function() {
            console.log(`${source} is ready to play`);
        });
        sound.addEventListener('play', function() {
            console.log(`${source} started playing`);
        });
        sound.addEventListener('pause', function() {
            console.log(`${source} paused`);
        });
        sound.addEventListener('canplaythrough', function() {
            console.log(`${source} can play through`);
        });
        sound.addEventListener('progress', function() {
            console.log(`${source} progress in loading`);
        });
        sound.addEventListener('timeupdate', function() {
            console.log(`${source} time update: time`);
        });
        sound.src = source;
        return sound;
    }

    function loadAudio() {
        sounds['resources/asteroid-break'] = loadSound('resources/asteroid-break.flac', 'Asteroid Break', 'id-asteroidBreak');
        sounds['resources/alien-death'] = loadSound('resources/alien-death.flac', 'Alien Death', 'id-alienDeath');
        sounds['resources/laser'] = loadSound('resources/laser.ogg', 'Laser', 'id-laser');
        sounds['resources/rocket'] = loadSound('resources/rocket.ogg', 'Rocket', 'id-rocket');
        sounds['resources/hyperspace'] = loadSound('resources/hyperspace.wav', 'Hyperspace', 'id-hyperspace');
        sounds['resources/ship-death'] = loadSound('resources/ship-death.flac', 'Ship Death', 'id-shipDeath');
        sounds['resources/sound-alien'] = loadSound('resources/sound-alien.ogg', 'Sound Alien', 'id-soundAlien');
        sounds['resources/thruster'] = loadSound('resources/thruster.mp3', 'Thruster', 'id-thruster');
        sounds['resources/menu-beep'] = loadSound('resources/menu-beep.wav', 'Menu Beep', 'id-menuBeep');
        sounds['resources/comptroller-crossover-dragon'] = loadSound('resources/comptroller-crossover-dragon.mp3', 'Menu Music', 'id-menuMusic');
    }

    loadAudio();

    //------------------------------------------------------------------
    //
    // Pauses the specified audio
    //
    //------------------------------------------------------------------
    function pauseSound(whichSound) {
        sounds[whichSound].pause();
    }

    //------------------------------------------------------------------
    //
    // Plays the specified audio
    //
    //------------------------------------------------------------------
    function playSound(whichSound) {
        sounds[whichSound].play();
    }

    function playFireSound() {
      return
    }

    let api = {
        playFireSound: playFireSound,
        playSound: playSound,
        pauseSound: pauseSound,
    };

    Object.defineProperty(api, 'sounds', {
        value: sounds,
        writable: true,
        enumerable: true,
        configurable: false
    });



    return api;
}());
