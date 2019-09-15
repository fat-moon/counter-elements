//Variables
/******************************************/
var headerContent = document.getElementById("header-content");
var gameContent = document.getElementById("game-content");
var startButtons = document.getElementById("start-buttons");
var resultsContent = document.getElementById("results-content")

var enemyElementsList = document.getElementById("enemy-elements");
var marginTopEnemyElementsList = -14725;
var enemyElementsArray = ["fire","earth","water"];
var numberKindsEnemyElements = enemyElementsArray.length;
var numberEnemyElements = 199;
var currentEnemyElement;
var valueCurrentEnemyElement;

var countdownStart = document.getElementById("countdown-start");

var gameActive = false;
var playButton = document.getElementById("play-button");
var tutorialButton = document.getElementById("tutorial-button")

var backButton = document.getElementById("back-button");

var gameButtons = document.getElementById("game-buttons");
var fireButton = document.getElementById("fire-button");
var earthButton = document.getElementById("earth-button");
var waterButton = document.getElementById("water-button");

var containerCountdownTimer = document.getElementById("container-countdown-timer");
var countdownTimer = document.getElementById("countdown-timer");
var time = 64000;
var showTime;
var countdownInterval;

var pulsationCounter = 0;
var winCounter = 0;
var numberPulsations = document.getElementById("number-pulsations");
var counteractedElements = document.getElementById("counteracted-elements");
var hitPercentage = document.getElementById("hit-percentage");

var returnButton = document.getElementById("return-button");

var tutorialActive = false;


//Start game
/******************************************/
playButton.addEventListener("click", function(){

	setTimeout(function(){

		headerContent.classList.remove("active");
		startButtons.classList.remove("active");
		gameContent.classList.remove("hidden");
		gameContent.classList.add("active");

		setTimeout(function(){
			headerContent.classList.add("hidden");
			startButtons.classList.add("hidden");
			gameButtons.classList.add("active");
			enemyElementsList.classList.add("active-transition");
			containerCountdownTimer.classList.add("active");
			backButton.classList.add("active");
		}, 400);

		setTimeout(function(){
			enemyElementsList.classList.remove("active-transition");
			enemyElementsList.classList.add("active");
		}, 900);

		if (!tutorialActive) {
			countdownInterval = setInterval(countdown, 1000);
		}
		
	}, 400);

}, false);


//Countdown
/******************************************/
function countdown() {

	time -= 1000;
	showTime = time/1000;

	countdownTimer.innerHTML = "00:"+ showTime;

	if (time > 59000) {
		countdownTimer.innerHTML = "01:00";
	}
	
	if (time === 60000){
		gameActive = true;
	}
	
	if (time <= 9000) {
		countdownTimer.innerHTML = "00:0"+ showTime;	
	}

	if (time === 0) {
		clearInterval(countdownInterval);
		gameActive = false;
		results();
	}

}


//Star enemy elements
/******************************************/
startEnemyElements();

function startEnemyElements() {
	
	for (i = 0; i < 200; i++) { 
		createNewElement();
	}

}
var enemyElement = enemyElementsList.querySelectorAll("li");
assignIdElement(numberEnemyElements);


//Create new element
/******************************************/
function createNewElement() {

	var randomEnemyElement = Math.floor(Math.random() * numberKindsEnemyElements);
	var chosenEnemyElement = enemyElementsArray[randomEnemyElement];

	newEnemyElement = document.createElement("li");
	newEnemyElement.className += chosenEnemyElement + " " + chosenEnemyElement + "-radiance";

	var newIconEnemyElement = document.createElement("span");
	newIconEnemyElement.className += "icon-" + chosenEnemyElement;

	enemyElementsList.prepend(newEnemyElement);
	newEnemyElement.appendChild(newIconEnemyElement);

}


//Assign ID to element
/******************************************/
function assignIdElement(number) {

	enemyElement[number].id = "current-enemy-element";
	currentEnemyElement = document.getElementById("current-enemy-element");
	valueCurrentEnemyElement = currentEnemyElement.className.split(" ")[0];

}


//Move elements
/******************************************/
function moveElements() {

    marginTopEnemyElementsList += 75;
    enemyElementsList.style.marginTop = marginTopEnemyElementsList + "px";

}


//Choose element
/******************************************/
fireButton.addEventListener("mousedown", function(){chooseElement(this)}, false);
earthButton.addEventListener("mousedown", function(){chooseElement(this)}, false);   
waterButton.addEventListener("mousedown", function(){chooseElement(this)}, false);   

function chooseElement (elementObject) {

	if(gameActive){
		pulsationCounter++;
		var chosenElement = elementObject.getAttribute("aria-label");

		if(chosenElement === "fire" && valueCurrentEnemyElement === "earth" ||
		   chosenElement === "earth" && valueCurrentEnemyElement === "water" ||
		   chosenElement === "water" && valueCurrentEnemyElement === "fire"){
			
			winCounter++;

			//Remove the element
			currentEnemyElement.classList.remove("mistake-element");
			currentEnemyElement.classList.add("remove-element");
			currentEnemyElement.removeAttribute("id");
			numberEnemyElements--;

			//Assign ID to element
			assignIdElement(numberEnemyElements);

			//Move elements
			moveElements();
		
		} else {
			//Animation mistake
			currentEnemyElement.classList.add("mistake-element");
			setTimeout(function(){currentEnemyElement.classList.remove("mistake-element");}, 100);
		}

		elementObject.classList.add("press-button");
		setTimeout(function(){elementObject.classList.remove("press-button");}, 100);
	}

}


//Tutorial
/******************************************/
tutorialButton.addEventListener("click", function(){
	
	countdownStart.classList.add("hidden");
	containerCountdownTimer.classList.add("tutorial");
	enemyElementsList.classList.add("tutorial");
	gameButtons.classList.add("tutorial");
	fireButton.classList.add("tutorial");
	earthButton.classList.add("tutorial");
	waterButton.classList.add("tutorial");

	tutorialActive = true;

	setTimeout(function(){
		gameButtons.classList.add("tutorial-active");
	}, 800);

	playButton.click();

})


//Results
/******************************************/
function results() {

	gameContent.classList.remove("active");
	backButton.classList.remove("active");
	containerCountdownTimer.classList.remove("active");
	enemyElementsList.classList.remove("active");
	gameButtons.classList.remove("active");

	setTimeout(function(){
		numberPulsations.innerHTML = pulsationCounter;
		counteractedElements.innerHTML = winCounter;

		if(pulsationCounter > 0){
			hitPercentage.innerHTML = ((winCounter*100)/pulsationCounter).toFixed(2) + "%";
		} else {
			hitPercentage.innerHTML = "0.00%";
		}

		resultsContent.classList.remove("hidden");
		resultsContent.classList.add("active");
	},400);

}


//Reset
/******************************************/
returnButton.addEventListener("click", reset);
backButton.addEventListener("click", reset);

function reset(){

	clearInterval(countdownInterval);
	gameActive = false;

	gameContent.classList.remove("active");
	gameContent.classList.add("hidden");

	resultsContent.classList.remove("active");
	resultsContent.classList.add("hidden");

	headerContent.classList.remove("hidden");
	startButtons.classList.remove("hidden");

	gameButtons.classList.remove("active", "tutorial", "tutorial-active");
	fireButton.classList.remove("tutorial");
	earthButton.classList.remove("tutorial");
	waterButton.classList.remove("tutorial");
	enemyElementsList.classList.remove("active","active-transition");
	containerCountdownTimer.classList.remove("active");
	backButton.classList.remove("active");

	enemyElementsList.innerHTML = "";
	enemyElementsList.style.marginTop = "-14725px";
	marginTopEnemyElementsList = -14725;
	startEnemyElements();
	numberEnemyElements = 199;
	enemyElement = enemyElementsList.querySelectorAll("li");
	assignIdElement(numberEnemyElements);

	time = 64000;
	countdownTimer.innerHTML = "01:00";

	pulsationCounter = 0;
	winCounter = 0;

	countdownStart.classList.remove("hidden");
	containerCountdownTimer.classList.remove("tutorial");
	enemyElementsList.classList.remove("tutorial");
	tutorialActive = false;

	setTimeout(function(){
		headerContent.classList.add("active");
		startButtons.classList.add("active");
	},150);

}