let score = JSON.parse(localStorage.getItem('score')) || {
				wins: 0,
				losses: 0,
				ties: 0
			};

			updateScoreElement();

		function pickComputerMove() {
			let computerMove = '';
			const randomNumber=Math.random();
			if ( randomNumber >= 0 && randomNumber < 1/3) {
				computerMove = 'rock';
			} else if ( randomNumber >= 1/3 && randomNumber < 2/3 ) {
				computerMove = 'paper';
			} else if ( randomNumber >=2/3 && randomNumber < 1 ) {
				computerMove = 'scisor';
			}
			return computerMove;
		}

		let isAutoPlaying = false;
		intervalId;
		function autoPlay() {
			if (!isAutoPlaying) {
				intervalId = setInterval(() =>{
					const playerMove = pickComputerMove();
					playGame(playerMove);
					isAutoPlaying = true;

				}, 1000) 
			} else {
				clearInterval(intervalId);
				isAutoPlaying = false;
			}
		}

		document.querySelector('.js-rock-button')
		.addEventListener('click', () => {
			playGame('rock');
		});

		document.querySelector('.js-paper-button').addEventListener('click', () => {
			playGame('paper');
		});

		document.querySelector('.js-scisor-button').addEventListener('click', () => {
			playGame('scisor');
		});


		function playGame (playerMove){
			const computerMove = pickComputerMove();
			let result = '';

			if (playerMove === 'scisor') {
				if (computerMove === 'scisor'){
					result = 'tie';
				} else if (computerMove === 'rock'){
					result = 'you lose.';
				} else if (computerMove === 'paper'){
					result = 'you win.';
				}
			} else if (playerMove === 'rock') {
					if ( computerMove === 'rock') {
						result = 'tie';
					} else if (computerMove === 'paper'){
						result = 'you lose.';
					} else if ( computerMove === 'scisor'){
						result = 'you win.';
					}
			} else if (playerMove === 'paper') {
					if (computerMove === 'paper') {
						result = 'tie';
					} else if (computerMove === 'scisor'){
						result = 'you lose.';
					} else if (computerMove === 'rock'){
						result = 'you win.';
					}
				}	
		
				if (result === 'you win.'){
					score.wins += 1;
				} else if (result === 'you lose.') {
					score.losses += 1;
				} else if (result === 'tie') {
					score.ties += 1;
				}

				localStorage.setItem('score', JSON.stringify(score));
					updateScoreElement();
       
          document.querySelector('.js-result')
          .innerHTML = result;
        
          document.querySelector('.js-moves').innerHTML = `You 
						<img src="${playerMove}-emoji.png" class="move-icon">
						<img src="${computerMove}-emoji.png" class="move-icon">
						Computer `;
	}

  function updateScoreElement() {
    document.querySelector('.js-score')
      .innerHTML = `wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  }