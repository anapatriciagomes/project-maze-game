class MazeGame {
  constructor() {
    this.gameIntroText = document.querySelector('.game-intro-text');
    this.introImage = document.getElementById('intro-image');
    this.gameSpace = document.querySelector('.game-space');
    this.gameArea = document.getElementById('game-area');
    this.easyGame = document.getElementById('easy-level');
    this.normalGame = document.getElementById('normal-level');
    this.hardGame = document.getElementById('hard-level');
    this.playButton = document.getElementById('play-button');
    this.timerArea = document.querySelector('.additional-content');
    this.resetButton = document.getElementById('reset-button');
    this.levels = new Levels().levels;
    this.isMoving = false;
    this.easyLevelStart = false;
    this.normalLevelStart = false;
    this.hardLevelStart = false;
    this.middleScreen = document.getElementById('middle-screen');
    this.firstLevelCompleted = document.getElementById('first-level-completed');
    this.secondLevelCompleted = document.getElementById(
      'second-level-completed'
    );
    this.winnerScreen = document.getElementById('winner-screen');
    this.body = document.querySelector('body');
    this.remainingTime = 3 * 60 * 1000;
    this.elapsedTimeEasy = document.getElementById('elapsed-time');
    this.elapsedTimeNormal = document.getElementById('elapsed-time-normal');
    this.mobileUpButton = document.getElementById('up');
    this.mobileDownButton = document.getElementById('down');
    this.mobileRightButton = document.getElementById('right');
    this.mobileLeftButton = document.getElementById('left');
    this.gameHasStarted = false;
  }

  levelReset() {
    this.easyLevelStart = false;
    this.normalLevelStart = false;
    this.hardLevelStart = false;
    this.clearMap();
  }

  play() {
    this.easyLevelStart = true;
    this.gameIntroText.style.display = 'none';
    this.introImage.style.display = 'none';
    this.gameArea.style.display = 'flex';
    this.timerArea.style.display = 'flex';

    this.easyGame.style.display = 'block';
    this.normalGame.style.display = 'none';
    this.hardGame.style.display = 'none';
    console.log(
      `Game started, Easy: ${this.easyLevelStart}, Normal: ${this.normalLevelStart}, Hard: ${this.hardLevelStart}`
    );
  }

  map() {
    for (let i = 0; i < this.levels.length; i++) {
      for (let r = 0; r < this.levels[i].tiles.length; r++) {
        let row = document.createElement('div');
        row.classList.add('maze-row');
        for (let c = 0; c < this.levels[i].tiles[r].length; c++) {
          if (i === 0 && this.easyLevelStart === true) {
            this.easyGame.appendChild(row);
          } else if (i === 1 && this.normalLevelStart === true) {
            this.normalGame.appendChild(row);
          } else if (i === 2 && this.hardLevelStart === true) {
            this.hardGame.appendChild(row);
          }
          let tile = document.createElement('div');
          row.appendChild(tile);
          if (this.levels[i].tiles[r][c] === 0) {
            tile.classList.add(`path`);
            tile.classList.add(`row-${r}-column-${c}`);
          } else if (this.levels[i].tiles[r][c] === 1) {
            tile.classList.add(`wall`);
            tile.classList.add(`row-${r}-column-${c}`);
          } else if (this.levels[i].tiles[r][c] === 2) {
            tile.classList.add(`path`);
            tile.classList.add(`start`);
            tile.classList.add(`row-${r}-column-${c}`);
            let startImage = document.createElement('img');
            startImage.src = 'images/harry-potter.png';
            startImage.setAttribute('id', 'harry');
            tile.appendChild(startImage);
          } else if (this.levels[i].tiles[r][c] === 3) {
            tile.classList.add(`path`);
            tile.classList.add(`end`);
            tile.classList.add(`row-${r}-column-${c}`);
            let endImage = document.createElement('img');
            endImage.src = 'images/golden-snitch.png';
            endImage.setAttribute('id', 'snitch');
            tile.appendChild(endImage);
          }
        }
      }
    }
  }

  clearMap() {
    const harry = document.getElementById('harry');
    harry.remove();
    const mazeRow = document.getElementsByClassName('maze-row');
    while (mazeRow.length > 0) {
      mazeRow[0].remove();
    }
    console.log('Maze rows deleted');
  }

  move() {
    let r;
    let c;

    if (this.easyLevelStart === true) {
      r = this.levels[0].player.y;
      c = this.levels[0].player.x;
    } else if (this.normalLevelStart === true) {
      r = this.levels[1].player.y;
      c = this.levels[1].player.x;
    } else if (this.hardLevelStart === true) {
      r = this.levels[2].player.y;
      c = this.levels[2].player.x;
    }

    const currentTile = document.querySelector(`.row-${r}-column-${c}`);
    if (currentTile && currentTile.classList.contains('path')) {
      const harry = document.getElementById('harry');
      currentTile.appendChild(harry);
    }

    console.log(`r: ${r}, c: ${c}`);

    const handleKeyDown = event => {
      console.log(event.key);
      event.preventDefault();
      let newRow = r;
      let newColumn = c;
      console.log(`Before click: newRow: ${newRow} newColumn: ${newColumn}`);
      switch (event.key) {
        case 'ArrowUp':
          newRow = r - 1;
          break;
        case 'ArrowDown':
          newRow = r + 1;
          break;
        case 'ArrowRight':
          newColumn = c + 1;
          break;
        case 'ArrowLeft':
          newColumn = c - 1;
          break;
      }

      const newTile = document.querySelector(
        `.row-${newRow}-column-${newColumn}`
      );

      if (newTile && newTile.classList.contains('end')) {
        console.log(`You won!`);
        if (this.easyLevelStart === true) {
          newRow = this.levels[1].player.y;
          newColumn = this.levels[1].player.x;
          console.log(
            `End of level: newRow: ${newRow} newColumn: ${newColumn}`
          );
        } else if (this.normalLevelStart === true) {
          newRow = this.levels[2].player.y;
          newColumn = this.levels[2].player.x;
          console.log(
            `End of level: newRow: ${newRow} newColumn: ${newColumn}`
          );
        }
        this.nextLevelScreen();

        // Pausing Timer
        const reachedEndEvent = new Event('reachedEnd');
        window.dispatchEvent(reachedEndEvent);
      } else if (newTile && newTile.classList.contains('path')) {
        const harry = document.getElementById('harry');
        newTile.appendChild(harry);
        r = newRow;
        c = newColumn;
      }
      this.gameHasStarted = true;
      console.log(`After click: newRow: ${newRow} newColumn: ${newColumn}`);
    };

    // Remove the existing event listener first (if any)
    window.removeEventListener('keydown', handleKeyDown);

    // Add the new event listener
    if (this.gameHasStarted === false) {
      window.addEventListener('keydown', handleKeyDown);
    }
  }

  mobileMove() {
    let r;
    let c;

    if (this.easyLevelStart === true) {
      r = this.levels[0].player.y;
      c = this.levels[0].player.x;
    } else if (this.normalLevelStart === true) {
      r = this.levels[1].player.y;
      c = this.levels[1].player.x;
    } else if (this.hardLevelStart === true) {
      r = this.levels[2].player.y;
      c = this.levels[2].player.x;
    }

    const currentTile = document.querySelector(`.row-${r}-column-${c}`);
    if (currentTile && currentTile.classList.contains('path')) {
      const harry = document.getElementById('harry');
      currentTile.appendChild(harry);
    }

    const handleUp = () => {
      console.log('Up Button');
      let newRow = r - 1;
      movePlayer(newRow, c);
      this.gameHasStarted = true;
    };

    const handleDown = () => {
      console.log('Down Button');
      let newRow = r + 1;
      movePlayer(newRow, c);
      this.gameHasStarted = true;
    };

    const handleRight = () => {
      console.log('Right Button');
      let newColumn = c + 1;
      movePlayer(r, newColumn);
      this.gameHasStarted = true;
    };

    const handleLeft = () => {
      console.log('Left Button');
      let newColumn = c - 1;
      movePlayer(r, newColumn);
      this.gameHasStarted = true;
    };

    const movePlayer = (newRow, newColumn) => {
      const newTile = document.querySelector(
        `.row-${newRow}-column-${newColumn}`
      );

      if (newTile && newTile.classList.contains('end')) {
        console.log(`You won!`);
        this.nextLevelScreen();

        // Pausing Timer
        const reachedEndEvent = new Event('reachedEnd');
        window.dispatchEvent(reachedEndEvent);
      } else if (newTile && newTile.classList.contains('path')) {
        const harry = document.getElementById('harry');
        newTile.appendChild(harry);
        r = newRow;
        c = newColumn;
      }
    };

    // Remove existing event listeners first (if any)
    this.mobileUpButton.removeEventListener('click', handleUp);
    this.mobileDownButton.removeEventListener('click', handleDown);
    this.mobileRightButton.removeEventListener('click', handleRight);
    this.mobileLeftButton.removeEventListener('click', handleLeft);

    // Add new event listeners
    if (this.gameHasStarted === false) {
      this.mobileUpButton.addEventListener('click', handleUp);
      this.mobileDownButton.addEventListener('click', handleDown);
      this.mobileRightButton.addEventListener('click', handleRight);
      this.mobileLeftButton.addEventListener('click', handleLeft);
    }
  }

  nextLevelScreen() {
    console.log('Here from middle screen');
    if (this.easyLevelStart === true) {
      this.levelReset();
      this.gameArea.style.display = 'none';
      this.timerArea.style.display = 'none';
      this.middleScreen.style.display = 'block';
      this.firstLevelCompleted.style.display = 'block';
      this.normalLevelStart = true;
      this.elapsedTimeNormal.style.display = 'none';
    } else if (this.normalLevelStart === true) {
      this.levelReset();
      this.gameArea.style.display = 'none';
      this.timerArea.style.display = 'none';
      this.middleScreen.style.display = 'block';
      this.secondLevelCompleted.style.display = 'block';
      this.hardLevelStart = true;
      this.elapsedTimeEasy.style.display = 'none';
      this.elapsedTimeNormal.style.display = 'block';
    } else if (this.hardLevelStart === true) {
      this.levelReset();
      this.gameSpace.style.display = 'none';
      this.body.style.backgroundImage = 'url(images/winner-image.png)';
      this.winnerScreen.style.display = 'block';
      this.elapsedTimeEasy.style.display = 'none';
      this.elapsedTimeNormal.style.display = 'none';
    }
    console.log(
      `Middle screen, Easy: ${this.easyLevelStart}, Normal: ${this.normalLevelStart}, Hard: ${this.hardLevelStart}`
    );
  }

  nextLevelStart() {
    console.log(
      `Next level, Easy: ${this.easyLevelStart}, Normal: ${this.normalLevelStart}, Hard: ${this.hardLevelStart}`
    );
    this.gameArea.style.display = 'flex';
    this.timerArea.style.display = 'flex';
    this.easyGame.style.display = 'none';

    if (this.normalLevelStart === true) {
      this.middleScreen.style.display = 'none';
      this.firstLevelCompleted.style.display = 'none';
      this.normalGame.style.display = 'block';
      this.hardGame.style.display = 'none';
    } else if (this.hardLevelStart === true) {
      this.middleScreen.style.display = 'none';
      this.secondLevelCompleted.style.display = 'none';
      this.hardGame.style.display = 'block';
      this.normalGame.style.display = 'none';
    }

    this.map();
    this.move();
    this.reset();
  }

  reset() {
    this.resetButton.addEventListener('click', () => location.reload());
  }

  hidePlayButton() {
    this.playButton.style.display = 'none';
  }
}
