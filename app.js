"use strict";

// modal variables declaration
const modal__1 = document.querySelector('.modal__1');
const modal__2 = document.querySelector('.modal__2');
const overlay = document.querySelector('.overlay');
const close_btn = document.querySelectorAll('.close_btn');

// game varables configuration
const player1 = document.querySelector('.player__0');
const player2 = document.querySelector('.player__1');
const playerTitleOne = document.querySelector('.playerTitle--0');
const playerTitleTwo = document.querySelector('.playerTitle--1');
const displayDice = document.querySelector('.displayDice');
const dice__img = document.querySelector('.dice');

// buttons configuration
const reset__button = document.querySelector('#resetBtn');
const dice__button = document.querySelector('#btnRollDice');
const hold__button = document.querySelector('#btnHold');
const btn__yes = document.querySelector('#btn__yes');
const btn__no = document.querySelector('#btn__no');

let totalScores = [0, 0];
let playerCurrScore = 0;
let activePlayer = 0;

const closeModal = function (modal) {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
}

const resetGame = function () {
	totalScores = [0, 0];
	playerCurrScore = 0;
	document.getElementById(`player__score__0`).textContent = 0;
	document.getElementById(`player__score__1`).textContent = 0;
	document.getElementById(`playerCurrScore__0`).textContent = 0;
	document.getElementById(`playerCurrScore__1`).textContent = 0;
	playerTitleOne.textContent = "Player 1";
	playerTitleTwo.textContent = "Player 2";
	displayDice.classList.add("hidden");
	if (document.querySelector(`.player__${activePlayer}`).classList.contains('playerActive')) {
		document.querySelector(`.player__${activePlayer}`).classList.remove('playerWinner');
		document.querySelector(`.player__${activePlayer}`).classList.remove('playerActive');
		document.querySelector(`.playerTitle--${activePlayer}`).classList.remove('boldFont');
		enableButtons();
	}
	activePlayer = 0;
	if (!document.querySelector(`.player__${activePlayer}`).classList.contains('playerActive')) {
		document.querySelector(`.player__${activePlayer}`).classList.add('playerActive');
		document.querySelector(`.playerTitle--${activePlayer}`).classList.add('boldFont');
	}
}

reset__button.addEventListener("click", function () {
	modal__2.classList.remove('hidden');
	overlay.classList.remove('hidden');
	btn__yes.addEventListener("click", function () {
		closeModal(modal__2);
		resetGame();
	});
	btn__no.addEventListener("click", function () {
		closeModal(modal__2);
	});
	for (let i = 0; i < close_btn.length; i++) {
		close_btn[i].addEventListener("click", function () {
			modal__2.classList.add('hidden');
			overlay.classList.add('hidden');
		});
	}
});

const disableButtons = function () {
	dice__button.classList.add("disabled");
	hold__button.classList.add("disabled");
}

const enableButtons = function () {
	dice__button.classList.remove("disabled");
	hold__button.classList.remove("disabled");
}

const winnerPopUp = function () {
	modal__1.classList.remove("hidden");
	overlay.classList.remove('hidden');
	document.getElementById("playerWinner").textContent = activePlayer + 1;
	for (let i = 0; i < close_btn.length; i++) {
		close_btn[i].addEventListener("click", function () {
			modal__1.classList.add('hidden');
			overlay.classList.add('hidden');
			resetGame();
		});
	}
}

const playerWinner = function () {
	let winner = false;
	if (totalScores[activePlayer] >= 100) {
		winner = true;
		document.querySelector(`.player__${activePlayer}`).classList.add("playerWinner");
		document.querySelector(`.playerTitle--${activePlayer}`).textContent = "Winner";
		disableButtons();
		setTimeout(winnerPopUp, 1200);
	}
	return winner;
}

const switchPlayer = function () {
	playerCurrScore = 0;
	document.getElementById(`playerCurrScore__${activePlayer}`).textContent = playerCurrScore;
	activePlayer = activePlayer === 0 ? 1 : 0;
	player1.classList.toggle("playerActive");
	player2.classList.toggle("playerActive");
	playerTitleOne.classList.toggle("boldFont");
	playerTitleTwo.classList.toggle("boldFont");
	document.querySelector("#player__score__0").classList.toggle("colorChange");
	document.querySelector("#player__score__1").classList.toggle("colorChange");
}

hold__button.addEventListener("click", function () {
	totalScores[activePlayer] += playerCurrScore;
	document.querySelector(`#player__score__${activePlayer}`).textContent = totalScores[activePlayer];
	playerCurrScore = 0;
	if (!playerWinner()) {
		switchPlayer();
	} else {
		playerWinner();
	}
});

dice__button.addEventListener("click", function () {
	const dice = Math.trunc((Math.random() * 6)) + 1;
	displayDice.classList.remove("hidden");
	dice__img.src = `./app_asset/dice-${dice}.png`;
	if (dice !== 1) {
		playerCurrScore += dice;
		document.getElementById(`playerCurrScore__${activePlayer}`).textContent = playerCurrScore;
	} else {
		switchPlayer();
	}
});