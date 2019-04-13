//Variables
/******************************************/
var headerContent = document.getElementById("header-content");
var gameContent = document.getElementById("game-content");
var startButtons = document.getElementById("start-buttons");

var enemyElementsList = document.getElementById("enemy-elements");
var marginTopEnemyElementsList = -7224;
var enemyElementsArray = ["fire","earth","water"];
var numberKindsEnemyElements = enemyElementsArray.length;
var numberEnemyElements = 99;
var currentEnemyElement;
var valueCurrentEnemyElement;

var gameActive = false;
var playButton = document.getElementById("play-btn");

var gameButtons = document.getElementById('game-buttons');
var fireButton = document.getElementById("fire-btn");
var earthButton = document.getElementById("earth-btn");
var waterButton = document.getElementById("water-btn");
var pulsationCounter = 0;
var winCounter = 0;
var drawCounter = 0;
var loseCounter = 0;

var countdownTimer = document.getElementById("countdown-timer");
var time = 64000;
var showTime;


//Start game
/******************************************/
playButton.addEventListener("click", function(){
	
	setTimeout(function(){
		
		//Transition
		headerContent.classList.add("hidden");
		startButtons.classList.add("hidden");
		gameContent.classList.remove("hidden");

		setTimeout(function(){
			gameButtons.classList.add("active");
			enemyElementsList.classList.add("active-transition");
			countdownTimer.classList.add("active");
		}, 300);

		setTimeout(function(){
			enemyElementsList.classList.remove("active-transition");
			enemyElementsList.classList.add("active");
		}, 800);

		//Countdown
		var countdownInterval = setInterval(countdown, 1000);

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
				console.log('Pulsations: '+pulsationCounter);
				console.log('wins: '+winCounter);
				console.log('draws: '+drawCounter);
				console.log('loses: '+loseCounter);
			}
		}	

	}, 300);

}, false);


//Star enemy elements
/******************************************/
for (i = 0; i < 100; i++) { 
	createNewElement();
}
var enemyElement = enemyElementsList.querySelectorAll("li");
assignIdElement(numberEnemyElements);


//Create new element
/******************************************/
function createNewElement(){
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
function moveElements()  {
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
		console.log('Chosen element: '+ chosenElement);
		console.log('Enemy element: '+ valueCurrentEnemyElement);

		if(chosenElement === "fire" && valueCurrentEnemyElement === "earth" ||
		   chosenElement === "earth" && valueCurrentEnemyElement === "water" ||
		   chosenElement === "water" && valueCurrentEnemyElement === "fire"){
			
			console.log('Result: win');
			winCounter++;

			//Remove the element
			currentEnemyElement.classList.add("remove-element");
			currentEnemyElement.removeAttribute("id");
			numberEnemyElements--;

			//Assign ID to element
			assignIdElement(numberEnemyElements);

			//Move elements
			moveElements();


		}else if(chosenElement === valueCurrentEnemyElement){
	
			console.log('Result: tie');
			drawCounter++;

		}else{

			console.log('result: lose');
			loseCounter++;

		}
		console.log('---------------------------');

		elementObject.classList.add("press-button");
		setTimeout(function(){elementObject.classList.remove("press-button");}, 100);
	}
}