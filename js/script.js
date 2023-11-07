window.onload = function () {
  const playButton = document.getElementById('play-button');
  const game = new MazeGame();
  const timerDisplay = document.getElementById('timer');
  let timer;
  const mobileUpButton = document.getElementById('up');
  const mobileDownButton = document.getElementById('down');
  const mobileRightButton = document.getElementById('right');
  const mobileLeftButton = document.getElementById('left');
  let r;
  let c;
  /*   const difficulty = select.value; */
  const continueButton = document.getElementById('continue-button');

  if (game.easyLevelStart === true) {
    r = 1;
    c = 3;
  } else if (game.normalLevelStart === true) {
    r = 3;
    c = 3;
  } else if (game.hardLevelStart === true) {
    r = 16;
    c = 12;
  }

  function updateTimer() {
    let selectValue;

    if (game.easyLevelStart === true) {
      selectValue = 'easy';
    } else if (game.normalLevelStart === true) {
      selectValue = 'normal';
    } else if (game.hardLevelStart === true) {
      selectValue = 'hard';
    }

    if (timer) {
      timer.stopTimer();
    }
    timer = new Timer(selectValue, timerDisplay);
    timer.startTimer();
  }

  playButton.addEventListener('click', function () {
    game.play();
    game.map();
    game.move();
    game.hidePlayButton();
    game.reset();
    updateTimer();
  });

  continueButton.addEventListener('click', function () {
    game.nextLevelStart();
    game.map();
    game.move();
    game.reset();
    updateTimer();
  });

  mobileUpButton.addEventListener('click', function () {
    console.log('Mobile up');
    let newRow = r;
    let newColumn = c;
    newRow = r - 1;

    const newTile = document.querySelector(
      `.row-${newRow}-column-${newColumn}`
    );
    if (newTile && newTile.classList.contains('path')) {
      const harry = document.getElementById('harry');
      newTile.appendChild(harry);
      r = newRow;
      c = newColumn;
    }
  });

  mobileDownButton.addEventListener('click', function () {
    console.log('Mobile down');
    let newRow = r;
    let newColumn = c;
    newRow = r + 1;

    const newTile = document.querySelector(
      `.row-${newRow}-column-${newColumn}`
    );
    if (newTile && newTile.classList.contains('path')) {
      const harry = document.getElementById('harry');
      newTile.appendChild(harry);
      r = newRow;
      c = newColumn;
    }
  });

  mobileRightButton.addEventListener('click', function () {
    console.log('Mobile right');
    let newRow = r;
    let newColumn = c;
    newColumn = c + 1;

    const newTile = document.querySelector(
      `.row-${newRow}-column-${newColumn}`
    );
    if (newTile && newTile.classList.contains('path')) {
      const harry = document.getElementById('harry');
      newTile.appendChild(harry);
      r = newRow;
      c = newColumn;
    }
  });

  mobileLeftButton.addEventListener('click', function () {
    console.log('Mobile left');
    let newRow = r;
    let newColumn = c;
    newColumn = c - 1;

    const newTile = document.querySelector(
      `.row-${newRow}-column-${newColumn}`
    );
    if (newTile && newTile.classList.contains('path')) {
      const harry = document.getElementById('harry');
      newTile.appendChild(harry);
      r = newRow;
      c = newColumn;
    }
  });

  window.addEventListener('reachedEnd', function () {
    if (timer) {
      timer.stopTimer();
      const elapsedTime = timer.getElapsedTimeInMinutesAndSeconds();
      console.log(`You reached the end in ${elapsedTime}`);
    }
  });

  window.addEventListener('timerResumed', function () {
    timer.resumeTimer();
    console.log(`Resuming time`);
  });
};
