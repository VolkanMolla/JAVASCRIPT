  /*
    let score = JSON.parse(localStorage.getItem('score'))
     || {
      player: 0,
      computer: 0,
      ties: 0
    };
*/
  /// optimize öncesi benim yazdığım kod:
  /*
    let score = JSON.parse(localStorage.getItem('score')) || {
      player: 0,
      computer: 0,
      ties: 0
    }

    let jsResult = document.querySelector('.js-result');

    function updateScore() {
      document.querySelector('.js-score').innerHTML =
        `Wins: ${score.player}. Losses: ${score.computer}. Ties: ${score.ties}`;
    };
    updateScore();

    function playgame(playerMove, buttonElement) {

      let clickedbuton = document.querySelector(buttonElement)
      let result = '';
      // Butonların tümünden "selected" sınıfını kaldır
      const buttons = document.querySelectorAll(".gamebuton");
      buttons.forEach(function (button) {
        button.classList.remove("selected");
      });

      // Sadece tıklanan butona "selected" sınıfını ekle
      clickedbuton.classList.add("selected");
      const computerMove = pickRandomMove();

      if (playerMove === 'scissors') {

        if (computerMove === 'scissors') {
          result = 'Tie!'
        } else if (computerMove === 'rock') {
          result = 'You Lose!';
        } else {
          result = 'You win!';
        }
      } else if (playerMove === 'paper') {

        if (computerMove === 'paper') {
          result = 'Tie!'
        } else if (computerMove === 'scissors') {
          result = 'You Lose!';
        } else {
          result = 'You win!';
        }
      } else if (playerMove === 'rock') {


        if (computerMove === 'rock') {
          result = 'Tie!'
        } else if (computerMove === 'paper') {
          result = 'You Lose!';
        } else {
          result = 'You win!';
        }
      }
      jsResult.classList.remove('loseAnimation', 'js-result', 'winAnimation', 'tieAnimation'); // Önce animasyon sınıflarını kaldır
      void jsResult.offsetWidth; // Tekrar boyut hesaplama

      if (result === 'You win!') {
        score.player++;
        jsResult.classList.add('winAnimation', 'js-result');
      } else if (result === 'You Lose!') {
        score.computer++;
        jsResult.classList.add('loseAnimation', 'js-result');
      } else if (result === 'Tie!') {
        jsResult.classList.add('tieAnimation', 'js-result');
        score.ties++;
      }


      localStorage.setItem('score', JSON.stringify(score));
      document.querySelector('.js-result').innerHTML = result;
      document.querySelector('.js-moves').innerHTML =
        `You  <img src="img/${playerMove}-emoji.png" class="move-icon" alt=""> - <img src="img/${computerMove}-emoji.png" class="move-icon"  alt=""> Computer`;
      updateScore();
    };

    function playWithRock() {
      stopAutoPlay();
      playgame('rock', '.btnRock');
    };

    function playWithPaper() {
      stopAutoPlay();
      playgame('paper', '.btnPaper');
    };

    function playWithScissors() {
      stopAutoPlay();
      playgame('scissors', '.btnScissors');
    };


    document.querySelector('.btnRock').addEventListener('click', () => {
      playWithRock();
    });

    document.querySelector('.btnPaper').addEventListener('click', () => {
      playWithPaper();
    });

    document.querySelector('.btnScissors').addEventListener('click', () => {
      playWithScissors();
    });
    let isAutoPlay = false;
    let autoplayInterval;
    const autoButton = document.querySelector('.js-autoButton');

    document.querySelector('.js-autoButton').addEventListener('click', () => autoplay())

    function autoplay() {

      if (isAutoPlay === false) {

        autoplayInterval = setInterval(() => {

          let randomMove = pickRandomMove();
          let randomMoveBtn = '';
          if (randomMove === 'rock') {
            randomMoveBtn = '.btnRock';
          } else if (randomMove === 'paper') {
            randomMoveBtn = '.btnPaper';
          } else if (randomMove === 'scissors') {
            randomMoveBtn = '.btnScissors'
          }
          playgame(randomMove, randomMoveBtn)
        }, 1000);

        autoButton.innerHTML = 'Stop Playing..';
        autoButton.classList.add('active');
        isAutoPlay = true;
      } else if (isAutoPlay === true) {
        stopAutoPlay();
      }
    };

    function stopAutoPlay() {
      clearInterval(autoplayInterval);
      autoButton.innerHTML = 'Auto Play!';
      autoButton.classList.remove('active');
      isAutoPlay = false;
    };

    function pickRandomMove() {
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
    };
    document.body.addEventListener('keypress', (event) => {
      if (event.key === 'r' || event.key === 'R') playWithRock();

      else if (event.key === 'p' || event.key === 'P') playWithPaper();

      else if (event.key === 's' || event.key === 'S') playWithScissors();

      if (event.key === 'a' || event.key === 'A') autoplay();
    });*/


  //chatgtpnin optimize ettği kod:
  // DOM öğelerini seçin
  // DOM öğelerini seçin
  const jsResult = document.querySelector('.js-result');
  const scoreDisplay = document.querySelector('.js-score');
  const autoButton = document.querySelector('.js-autoButton');
  const btnRock = document.querySelector('.btnRock');
  const btnPaper = document.querySelector('.btnPaper');
  const btnScissors = document.querySelector('.btnScissors');
  const btnReset = document.querySelector('.js-resetScore');
  const confirmResetElement = document.querySelector('.confirmReset');



  // Oyun skorlarını saklayan obje
  let score = JSON.parse(localStorage.getItem('score')) || {
    player: 0,
    computer: 0,
    ties: 0
  };

  // Oyun sonucunu gösterme işlevi
  function updateScoreDisplay() {
    scoreDisplay.innerHTML = `Wins: ${score.player}. Losses: ${score.computer}. Ties: ${score.ties}`;
  }

  // Oyunu oynama işlevi
  function playGame(playerMove, buttonElement) {
    const clickedButton = document.querySelector(buttonElement);
    const buttons = document.querySelectorAll(".gamebuton");

    buttons.forEach((button) => {
      button.classList.remove("selected");
    });

    clickedButton.classList.add("selected");
    const computerMove = pickRandomMove();

    const result = determineResult(playerMove, computerMove);
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML =
      `You  <img src="img/${playerMove}-emoji.png" class="move-icon" alt=""> - <img src="img/${computerMove}-emoji.png" class="move-icon"  alt=""> Computer`;
    updateResult(result);
    updateScoreDisplay();
  }

  // Oyun sonucunu belirleme işlevi
  function determineResult(playerMove, computerMove) {
    if (playerMove === computerMove) {
      return 'Tie!';
    } else if (
      (playerMove === 'rock' && computerMove === 'scissors') ||
      (playerMove === 'paper' && computerMove === 'rock') ||
      (playerMove === 'scissors' && computerMove === 'paper')
    ) {
      return 'You win!';
    } else {
      return 'You Lose!';
    }
  }

  // Oyun sonucunu güncelleme işlevi
  function updateResult(result) {
    jsResult.classList.remove('loseAnimation', 'js-result', 'winAnimation', 'tieAnimation');
    void jsResult.offsetWidth;

    if (result === 'You win!') {
      score.player++;
      jsResult.classList.add('winAnimation', 'js-result');
    } else if (result === 'You Lose!') {
      score.computer++;
      jsResult.classList.add('loseAnimation', 'js-result');
    } else if (result === 'Tie!') {
      jsResult.classList.add('tieAnimation', 'js-result');
      score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));
    jsResult.innerHTML = result;
  }

  // Taş ile oynama işlevi
  function playWithRock() {
    stopAutoPlay();
    playGame('rock', '.btnRock');
  }

  // Kağıt ile oynama işlevi
  function playWithPaper() {
    stopAutoPlay();
    playGame('paper', '.btnPaper');
  }

  // Makas ile oynama işlevi
  function playWithScissors() {
    stopAutoPlay();
    playGame('scissors', '.btnScissors');
  };

  function confirmResetScore() {
    const confirmYesElement= document.querySelector('.btnYes');
    const confirmNoElement=document.querySelector('.btnNo');
    confirmResetElement.classList.replace('d-none','d-block');
    confirmYesElement.addEventListener('click', () =>{
      resetScore();
      hideToggleConfirmResetElement()
    });
    confirmNoElement.addEventListener('click', ()=>{
      hideToggleConfirmResetElement()
    })
  };

  function hideToggleConfirmResetElement(){
    confirmResetElement.classList.replace('d-block','d-none');

  }
  

  function resetScore() {
    score.player = 0;
    score.computer = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreDisplay();
  };

  // Otomatik oyun işlemleri
  let isAutoPlay = false;
  let autoplayInterval;

  autoButton.addEventListener('click', toggleAutoPlay);

  // Otomatik oyunu başlatma veya duraklatma işlevi
  function toggleAutoPlay() {
    if (isAutoPlay) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  }

  // Otomatik oyunu başlatma işlevi
  function startAutoPlay() {
    if (isAutoPlay) return;

    autoplayInterval = setInterval(() => {
      const randomMove = pickRandomMove();
      let randomMoveBtn = '.btnRock';
      if (randomMove === 'paper') randomMoveBtn = '.btnPaper';
      else if (randomMove === 'scissors') randomMoveBtn = '.btnScissors';
      playGame(randomMove, randomMoveBtn);
    }, 1000);

    autoButton.innerHTML = 'Stop Playing..';
    autoButton.classList.add('active');
    isAutoPlay = true;
  }

  // Otomatik oyunu duraklatma işlevi
  function stopAutoPlay() {
    clearInterval(autoplayInterval);
    autoButton.innerHTML = 'Auto Play!';
    autoButton.classList.remove('active');
    isAutoPlay = false;
  }

  // Rasgele bir hamle seçme işlevi
  function pickRandomMove() {
    const randomNumber = Math.random();
    if (randomNumber < 1 / 3) {
      return 'rock';
    } else if (randomNumber < 2 / 3) {
      return 'paper';
    } else {
      return 'scissors';
    }
  }

  // Tuşlara basıldığında oyun işlemleri
  document.body.addEventListener('keydown', (event) => {

    if (event.key === 'r' || event.key === 'R') playWithRock();
    else if (event.key === 'p' || event.key === 'P') playWithPaper();
    else if (event.key === 's' || event.key === 'S') playWithScissors();
    else if (event.key === 'a' || event.key === 'A') toggleAutoPlay();
    else if (event.key === 'Backspace') resetScore();
  });

  // Reset düğmesine tıklandığında puanları sıfırlama işlevi


  // Sayfa yüklendiğinde puanları göster
  updateScoreDisplay();

  // Rock butonuna tıklanınca
  btnRock.addEventListener('click', () => {
    playWithRock();
  });

  // Paper butonuna tıklanınca
  btnPaper.addEventListener('click', () => {
    playWithPaper();
  });

  // Scissors butonuna tıklanınca
  btnScissors.addEventListener('click', () => {
    playWithScissors();
  });

  btnReset.addEventListener('click', () => {
    confirmResetScore()
  });