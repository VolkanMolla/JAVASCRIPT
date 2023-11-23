  /*
    let score = JSON.parse(localStorage.getItem('score'))
     || {
      player: 0,
      computer: 0,
      ties: 0
    };

    // üstteki
    /////////////*/
    //////////////////////

    let score = JSON.parse(localStorage.getItem('score')) || {
        player: 0,
        computer: 0,
        ties: 0
      }
  
      let jsResult = document.querySelector('.js-result');
  
      function updateScore() {
        document.querySelector('.js-score').innerHTML =
          `Wins: ${score.player}. Losses: ${score.computer}. Ties: ${score.ties}`;
      }
      updateScore();
      ////////////////////////
      function playgame(playerMove) {
        let result = '';
        const computerMove = pickComputerMove();
        if (playerMove === 'scissors') {
          if (computerMove === 'scissors') {
            result = 'Tie!'
          } else if (computerMove === 'rock') {
            result = 'You Lose!';
          } else {
            result = `You win!`;
          }
        } else if (playerMove === 'paper') {
          if (computerMove === 'paper') {
            result = 'Tie!'
          } else if (computerMove === 'scissors') {
            result = 'You Lose!';
          } else {
            result = `You win!`;
          }
        } else if (playerMove === 'rock') {
          if (computerMove === 'rock') {
            result = 'Tie!'
          } else if (computerMove === 'paper') {
            result = 'You Lose!';
          } else {
            result = `You win!`;
          }
        }
  
        if (result === 'You win!') {
          score.player++;
          jsResult.classList = ('js-result mt-4 text-success');
        } else if (result === 'You Lose!') {
          score.computer++;
          jsResult.classList = ('js-result mt-4 text-danger');
        } else if (result === 'Tie!') {
          score.ties++;
          jsResult.classList = ('js-result mt-4 text-warning');
        }
  
        localStorage.setItem('score', JSON.stringify(score));
        document.querySelector('.js-result').innerHTML = result;
        document.querySelector('.js-moves').innerHTML =
          `You  <img src="img/${playerMove}-emoji.png" class="move-icon" alt=""> - <img src="img/${computerMove}-emoji.png" class="move-icon"  alt=""> Computer`
        updateScore();
  
  
      }
  
      function pickComputerMove() {
        const randomNumber = Math.random();
        let computerMove = '';
        if (randomNumber < 1 / 3) {
          computerMove = 'rock';
        } else if (randomNumber < 2 / 3) {
          computerMove = 'paper';
        } else {
          computerMove = 'scissors';
        }
        return computerMove;
      }