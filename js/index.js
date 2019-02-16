//Variables
/******************************************/
var headerContent = document.getElementById("header-content");
var gameContent = document.getElementById("game-content");
var startContent = document.getElementById("start-content");

var enemyElementsList = document.getElementById("enemy-elements");
var enemyElementsArray = ["fire","earth","water"];
var numberEnemyElements = enemyElementsArray.length;
var currentEnemyElement;
var valueCurrentEnemyElement;

var gameActive = false;
var playButton = document.getElementById("play-btn");

var fireButton = document.getElementById("fire-btn");
var earthButton = document.getElementById("earth-btn");
var waterButton = document.getElementById("water-btn");
var activeButton = false;
var pulsationCounter = 0;
var winCounter = 0;
var drawCounter = 0;
var loseCounter = 0;

var countdownTimer = document.getElementById("countdown-timer");
var time = 60000;
var showTime;


//Start game
/******************************************/
playButton.addEventListener("mousedown", function(){
	gameActive = true;
	headerContent.classList.add("hidden");
	gameContent.classList.remove("hidden");
	startContent.classList.add("hidden");

	//Countdown
	var countdownInterval = setInterval(countdown, 1000);

	function countdown() {
		time -= 1000;
		showTime = time/1000;

		countdownTimer.innerHTML = "00:"+ showTime;

		if(time <= 9000){
			countdownTimer.innerHTML = "00:0"+ showTime;	
		}

		if(time === 0){
			clearInterval(countdownInterval);
			gameActive = false;
			console.log('Pulsations: '+pulsationCounter);
			console.log('wins: '+winCounter);
			console.log('draws: '+drawCounter);
			console.log('loses: '+loseCounter);
		}
	}	

}, false);


//Star enemy elements
/******************************************/
for (i = 0; i < 4; i++) { 
	createNewElement();
}

assignIdElement();


//Create new element
/******************************************/
function createNewElement(playing){
	var randomEnemyElement = Math.floor(Math.random() * numberEnemyElements);
	var chosenEnemyElement = enemyElementsArray[randomEnemyElement];

	newEnemyElement = document.createElement("li");
	newEnemyElement.className += chosenEnemyElement + " " + chosenEnemyElement + "-radiance";

	var newIconEnemyElement = document.createElement("span");
	newIconEnemyElement.className += "icon-" + chosenEnemyElement;

	enemyElementsList.prepend(newEnemyElement);
	newEnemyElement.appendChild(newIconEnemyElement);

	if(playing){
		newEnemyElement.classList.add("new-element");
	}
}


//Assign ID to element
/******************************************/
function assignIdElement() {
	enemyElementsList.lastElementChild.id = "current-enemy-element";
	currentEnemyElement = document.getElementById("current-enemy-element");
	valueCurrentEnemyElement = currentEnemyElement.className.split(" ")[0];
}


//Choose element
/******************************************/
fireButton.addEventListener("mousedown", function(){chooseElement(this)}, false);
earthButton.addEventListener("mousedown", function(){chooseElement(this)}, false);   
waterButton.addEventListener("mousedown", function(){chooseElement(this)}, false);   

function chooseElement (elementObject) {
	
	window.navigator.vibrate(25);

	if(!activeButton && gameActive){
		activeButton = true;
		pulsationCounter++;
		var chosenElement = elementObject.getAttribute("aria-label");
		console.log('Chosen element: '+ chosenElement);
		console.log('Enemy element: '+ valueCurrentEnemyElement);

		if(chosenElement === "fire" && valueCurrentEnemyElement === "earth" ||
		   chosenElement === "earth" && valueCurrentEnemyElement === "water" ||
		   chosenElement === "water" && valueCurrentEnemyElement === "fire"){
			
			console.log('Result: win');
			winCounter++;

			currentEnemyElement.classList.add("remove-element");

			setTimeout(function(){
				//Create new element
				createNewElement(true);
				
				//Remove the element
				enemyElementsList.removeChild(currentEnemyElement);

				//Assign ID to element
				assignIdElement();

			}, 100);
			

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
		setTimeout(function(){activeButton=false;}, 100);
	}
}