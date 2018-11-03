//global variables
let cardTypes = ['fa-diamond', 'fa-diamond',
'fa-paper-plane-o', 'fa-paper-plane-o',
'fa-anchor', 'fa-anchor',
'fa-bolt', 'fa-bolt',
'fa-cube', 'fa-cube',
'fa-leaf', 'fa-leaf',
'fa-bicycle', 'fa-bicycle',
'fa-bomb', 'fa-bomb'];
let moves;
let cards;
let openCards = [];
let openCardsCount = 0;
let stars = 3;
let matched;
let clock;
let timer;
let second = 0;
let minute = 0;


 function createCard(cardType) {
 	return `<li class="card" data-card="${cardType}"><i class="fa ${cardType}"></i></li>`;
 }


 function creatCardListHTML() {
 	//loop through each card and create its HTML
 	let cardHTML = cardTypes.map(function(card) {
 		return createCard(card);
 	});
 	//Create a list that holds all of your cards
 	return cardHTML.join(' ');
 }


 function initGame() {
 	moves = 0;
 	openCards = [];
 	openCardsCount = 0;
 	cards = [];
 	matched = 0;
 	document.querySelector('.container').innerHTML = '<header><h1>Matching Game</h1></header><section class="score-panel"><ul class="stars"></ul><span class="moves">0</span> Moves<span class="timer">Time   <span class="time">-- : --</span></span><div class="restart"><i class="fa fa-repeat"></i></div></section><ul class="deck"></ul>';
 	timer = document.querySelector('.time');
 	timer.innerText = '-- : --';
 	document.querySelector('.moves').innerText = moves;
 	//shuffle the list of cards using the provided 'shuffle' method below
 	cardTypes = shuffle(cardTypes);
 	let deck = document.querySelector('.deck');
 	//add each card's HTML to the page
 	deck.innerHTML = creatCardListHTML();
 	cards = document.querySelectorAll('.card');
 	document.querySelector('.stars').innerHTML = '<li><i class="fa fa-star"></i></li>'.repeat(3);
 	clearInterval(clock);
 	second = 0;
 	minute = 0;
 	game(cards);
 }


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}


function game(cards) {
	let started = false;
	//set up the event listener for a card. If a card is clicked
	for (let card of cards) {
		card.addEventListener('click', function(event) {
			if (started == false) {
				startTimer();
				started = true;
			}
			//display the card's symbol
			if (openCardsCount < 2) {
				//if the list already has another card, check to see if the two cards match
				if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
					card.classList.add('open', 'show');
					openCards.push(card);
					openCardsCount++;
					if (openCardsCount == 2) {
						//increment the move counter and display it on the page
						moves++;
						if (moves >= 16 && moves < 24) {
							document.querySelector('.stars').innerHTML = '<li><i class="fa fa-star"></i></li>'.repeat(2)+ '<li><i class="fa fa-star-o"></i></li>';
							stars = 2;
						} else if (moves >= 24 && moves < 32) {
							document.querySelector('.stars').innerHTML = '<li><i class="fa fa-star"></i></li>' + '<li><i class="fa fa-star-o"></i></li>'.repeat(2);
							stars = 1;
						}
						document.querySelector('.moves').innerText = moves;
						//if the cards do not match, remove the cards from the list and hide the card's symbol
						if (openCards[0].dataset.card != openCards[1].dataset.card) {
							for (let card of openCards) {
								card.classList.add('swing');
							}
							setTimeout(function() {
								for (let card of openCards) {
									card.classList.remove('open', 'show', 'swing');
								}
								openCards = [];
								openCardsCount = 0;
							}, 500);
						} else {
							//if the cards do match, lock the cards in the open position
							for (let card of openCards) {
								card.classList.add('match', 'shake');
							}
							matched++;
							if (matched == 8) {
								//if all cards have matched, display a message with the final score
								win();
							}
						openCards = [];
						openCardsCount = 0;
						}
					}
				}
			}
		});
	}
}


function startTimer() {
	clock = setInterval(function() {
		second++;
		if (second >= 60) {
			second = 0;
			minute++;
		}
		timer.innerHTML = `${minute} : ${second}`;
	}, 1000);
}


function win() {
	document.querySelector('.container').innerHTML = `<div class="popup"><img src="img/checkmark.png" alt="checkmark"><h2>Congratulations! You Won!</h2><p>With ${moves} Moves and ${stars} Stars in ${minute} minutes and ${second} seconds.</p><p>Woooooo!</p><button class="again">Play again!</button></div>`;
	document.querySelector('.again').addEventListener('click', function(event) {
		initGame();
	});
}


initGame();
document.querySelector('.restart').addEventListener('click', function(event) {
	initGame();
});
