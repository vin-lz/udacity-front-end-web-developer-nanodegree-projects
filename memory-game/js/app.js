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

/*
 * Create a list that holds all of your cards
 */
 function createCard(cardType) {
 	return `<li class="card" data-card="${cardType}"><i class="fa ${cardType}"></i></li>`;
 }

 function creatCardListHTML() {
 	let cardHTML = cardTypes.map(function(card) {
 		return createCard(card);
 	});
 	return cardHTML.join(' ');
 }

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided 'shuffle' method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 function initGame() {
 	moves = 0;
 	openCards = [];
 	openCardsCount = 0;
 	cards = [];
 	document.querySelector('.moves').innerText = moves;
 	cardTypes = shuffle(cardTypes);
 	let deck = document.querySelector('.deck');
 	deck.innerHTML = creatCardListHTML();
 	cards = document.querySelectorAll('.card');
 	document.querySelector('.stars').innerHTML = '<li><i class="fa fa-star"></i></li>'.repeat(3);
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
	for (let card of cards) {
		card.addEventListener('click', function(event) {
			if (openCardsCount < 2) {
				if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
					card.classList.add('open', 'show');
					console.log("opened");
					openCards.push(card);
					openCardsCount++;
					if (openCardsCount == 2) {
						moves++;
						if (moves >= 5 && moves < 10) {
							document.querySelector('.stars').innerHTML = '<li><i class="fa fa-star"></i></li>'.repeat(2)+ '<li><i class="fa fa-star-o"></i></li>';
						} else if (moves >= 10 && moves < 15) {
							document.querySelector('.stars').innerHTML = '<li><i class="fa fa-star"></i></li>' + '<li><i class="fa fa-star-o"></i></li>'.repeat(2);
						} else if (moves >= 15) {
							document.querySelector('.stars').innerHTML = '<li><i class="fa fa-star-o"></i></li>'.repeat(3);
						}
						document.querySelector('.moves').innerText = moves;
						if (openCards[0].dataset.card != openCards[1].dataset.card) {
							setTimeout(function() {
								for (let card of openCards) {
									card.classList.remove('open', 'show');
								}
								openCards = [];
								openCardsCount = 0;
							}, 1000);
						} else {
							for (let card of openCards) {
								card.classList.add('match');
							}
						//here to add score by 1
						openCards = [];
						openCardsCount = 0;
					    }
					}
				}
			}
		});
	}
}

function win() {

}

initGame();

document.querySelector('.restart').addEventListener('click', function(event) {
	initGame();
});







/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of 'open' cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
