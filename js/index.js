// Variables
const headerContent = document.getElementById('header-content');
const gameContent = document.getElementById('game-content');
const startButtons = document.getElementById('start-buttons');
const resultsContent = document.getElementById('results-content')

const enemyElementsList = document.getElementById('enemy-elements');
let marginTopEnemyElementsList = -14725;
const enemyElementsArray = ['fire', 'earth', 'water'];
const numberKindsEnemyElements = enemyElementsArray.length;
let numberEnemyElements = 199;
let currentEnemyElement;
let valueCurrentEnemyElement;

const countdownStart = document.getElementById('countdown-start');

let gameActive = false;
const playButton = document.getElementById('play-button');
const tutorialButton = document.getElementById('tutorial-button');

const backButton = document.getElementById('back-button');

const gameButtons = document.getElementById('game-buttons');
const fireButton = document.getElementById('fire-button');
const earthButton = document.getElementById('earth-button');
const waterButton = document.getElementById('water-button');

const containerCountdownTimer = document.getElementById('container-countdown-timer');
const countdownTimer = document.getElementById('countdown-timer');
let time = 64000;
let showTime;
let countdownInterval;

let pulsationCounter = 0;
let winCounter = 0;
const numberPulsations = document.getElementById('number-pulsations');
const counteractedElements = document.getElementById('counteracted-elements');
const hitPercentage = document.getElementById('hit-percentage');

const returnButton = document.getElementById('return-button');

let tutorialActive = false;


//Start game
playButton.addEventListener('click', () => {

	setTimeout(() => {

		headerContent.classList.remove('active');
		startButtons.classList.remove('active');
		gameContent.classList.remove('hidden');
		gameContent.classList.add('active');

		setTimeout(() => {
			headerContent.classList.add('hidden');
			startButtons.classList.add('hidden');
			gameButtons.classList.add('active');
			enemyElementsList.classList.add('active-transition');
			containerCountdownTimer.classList.add('active');
			backButton.classList.add('active');
		}, 400);

		setTimeout(() => {
			enemyElementsList.classList.remove('active-transition');
			enemyElementsList.classList.add('active');
		}, 900);

		if (!tutorialActive) countdownInterval = setInterval(countdown, 1000);

	}, 400);

}, false);


// Countdown
const countdown = () => {

	time -= 1000;
	showTime = time / 1000;

	countdownTimer.textContent = `00:${showTime}`;

	if (time > 59000) countdownTimer.textContent = '01:00';

	if (time === 60000) gameActive = true;

	if (time <= 9000) countdownTimer.textContent = `00:0${showTime}`;

	if (time === 0) {
		clearInterval(countdownInterval);
		gameActive = false;
		results();
	}

}


// Create new element
const createNewElement = () => {

	const randomEnemyElement = Math.floor(Math.random() * numberKindsEnemyElements);
	const chosenEnemyElement = enemyElementsArray[randomEnemyElement];

	newEnemyElement = document.createElement('li');
	newEnemyElement.className += `${chosenEnemyElement} ${chosenEnemyElement}-radiance`;

	const newIconEnemyElement = document.createElement('span');
	newIconEnemyElement.className += `icon-${chosenEnemyElement}`;

	enemyElementsList.prepend(newEnemyElement);
	newEnemyElement.appendChild(newIconEnemyElement);

}


// Assign ID to element
const assignIdElement = number => {

	enemyElement[number].id = 'current-enemy-element';
	currentEnemyElement = document.getElementById('current-enemy-element');
	valueCurrentEnemyElement = currentEnemyElement.className.split(' ')[0];

}


// Star enemy elements
const startEnemyElements = () => {

	for (let i = 0; i < 200; i++) {
		createNewElement();
	}

}
startEnemyElements();
let enemyElement = enemyElementsList.querySelectorAll('li');
assignIdElement(numberEnemyElements);


// Move elements
const moveElements = () => {

	marginTopEnemyElementsList += 75;
	enemyElementsList.style.marginTop = `${marginTopEnemyElementsList}px`;

}


// Choose element
const chooseElement = elementObject => {

	if (gameActive) {
		pulsationCounter++;
		const chosenElement = elementObject.getAttribute('aria-label');

		if (chosenElement === 'fire' && valueCurrentEnemyElement === 'earth' ||
			chosenElement === 'earth' && valueCurrentEnemyElement === 'water' ||
			chosenElement === 'water' && valueCurrentEnemyElement === 'fire') {

			winCounter++;

			// Remove the element
			currentEnemyElement.classList.remove('mistake-element');
			currentEnemyElement.classList.add('remove-element');
			currentEnemyElement.removeAttribute('id');
			numberEnemyElements--;

			// Assign ID to element
			assignIdElement(numberEnemyElements);

			// Move elements
			moveElements();

		} else {
			// Animation mistake
			currentEnemyElement.classList.add('mistake-element');
			setTimeout(() => currentEnemyElement.classList.remove('mistake-element'), 100);
		}

		elementObject.classList.add('press-button');
		setTimeout(() => elementObject.classList.remove('press-button'), 100);
	}

}
fireButton.addEventListener('mousedown', () => chooseElement(fireButton), false);
earthButton.addEventListener('mousedown', () => chooseElement(earthButton), false);
waterButton.addEventListener('mousedown', () => chooseElement(waterButton), false);


// Tutorial
tutorialButton.addEventListener('click', () => {

	countdownStart.classList.add('hidden');
	containerCountdownTimer.classList.add('tutorial');
	enemyElementsList.classList.add('tutorial');
	gameButtons.classList.add('tutorial');
	fireButton.classList.add('tutorial');
	earthButton.classList.add('tutorial');
	waterButton.classList.add('tutorial');

	tutorialActive = true;

	const tutorialElements = `
	<li class="water water-radiance"><span class="icon-water"></span></li>
	<li class="earth earth-radiance"><span class="icon-earth"></span></li>
	<li class="fire fire-radiance"><span class="icon-fire"></span></li>
	<li class="earth earth-radiance"><span class="icon-earth"></span></li>
	<li class="water water-radiance"><span class="icon-water"></span></li>`;

	enemyElementsList.innerHTML = tutorialElements;
	enemyElementsList.style.marginTop = '-100px';

	setTimeout(() => gameButtons.classList.add('tutorial-active'), 800);

	playButton.click();

})


// Results
const results = () => {

	gameContent.classList.remove('active');
	backButton.classList.remove('active');
	containerCountdownTimer.classList.remove('active');
	enemyElementsList.classList.remove('active');
	gameButtons.classList.remove('active');

	setTimeout(() => {
		numberPulsations.textContent = pulsationCounter;
		counteractedElements.textContent = winCounter;

		if (pulsationCounter > 0) {
			hitPercentage.textContent = `${((winCounter * 100) / pulsationCounter).toFixed(2)}%`;
		} else {
			hitPercentage.textContent = '0.00%';
		}

		resultsContent.classList.remove('hidden');
		resultsContent.classList.add('active');
	}, 400);

}


// Reset
const reset = () => {

	clearInterval(countdownInterval);
	gameActive = false;

	gameContent.classList.remove('active');
	gameContent.classList.add('hidden');

	resultsContent.classList.remove('active');
	resultsContent.classList.add('hidden');

	headerContent.classList.remove('hidden');
	startButtons.classList.remove('hidden');

	gameButtons.classList.remove('active', 'tutorial', 'tutorial-active');
	fireButton.classList.remove('tutorial');
	earthButton.classList.remove('tutorial');
	waterButton.classList.remove('tutorial');
	enemyElementsList.classList.remove('active', 'active-transition');
	containerCountdownTimer.classList.remove('active');
	backButton.classList.remove('active');

	enemyElementsList.innerHTML = '';
	enemyElementsList.style.marginTop = '-14725px';
	marginTopEnemyElementsList = -14725;
	startEnemyElements();
	numberEnemyElements = 199;
	enemyElement = enemyElementsList.querySelectorAll('li');
	assignIdElement(numberEnemyElements);

	time = 64000;
	countdownTimer.textContent = '01:00';

	pulsationCounter = 0;
	winCounter = 0;

	countdownStart.classList.remove('hidden');
	containerCountdownTimer.classList.remove('tutorial');
	enemyElementsList.classList.remove('tutorial');
	tutorialActive = false;

	setTimeout(() => {
		headerContent.classList.add('active');
		startButtons.classList.add('active');
	}, 150);

}
returnButton.addEventListener('click', reset);
backButton.addEventListener('click', reset);


// Correct Viewport height on Mobile
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);


// ServiceWorker
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('https://juan-antonio-ledesma.github.io/counter-elements/sw.js').then( registration => {
			// Registration was successful
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
		}, err => {
			// registration failed :(
			console.log('ServiceWorker registration failed: ', err);
		});
	});
}