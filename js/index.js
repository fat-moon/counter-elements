//Variables
/******************************************/
var enemyElementsList = document.getElementById("enemy-elements");
var enemyElementsArray = ["fire","earth","water"];
var numberEnemyElements = enemyElementsArray.length;
var currentEnemyElement;
var valueCurrentEnemyElement;

var fireButton = document.getElementById("fire-btn");
var earthButton = document.getElementById("earth-btn");
var waterButton = document.getElementById("water-btn");


//Star enemy elements
/******************************************/
for (i = 0; i < numberEnemyElements; i++) { 
	createNewElement();
}

assignIdElement();


//Create new element
/******************************************/
function createNewElement(){
	var randomEnemyElement = Math.floor(Math.random() * numberEnemyElements);
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
	var chosenElement = elementObject.getAttribute("aria-label");
	console.log('Chosen element: '+ chosenElement);
	console.log('Enemy element: '+ valueCurrentEnemyElement);

	if(chosenElement === "fire" && valueCurrentEnemyElement === "earth" ||
	   chosenElement === "earth" && valueCurrentEnemyElement === "water" ||
	   chosenElement === "water" && valueCurrentEnemyElement === "fire"){
		
		console.log('Result: win');

		currentEnemyElement.classList.add("remove-element");

		setTimeout(function(){
			//Remove the element
			enemyElementsList.removeChild(currentEnemyElement);

			//Assign ID to element
			assignIdElement();

			//Create new element
			createNewElement();

		}, 200);
		

	}else if(chosenElement === valueCurrentEnemyElement){
		
		console.log('Result: draw');

	}else{

		console.log('result: lose');

	}
	console.log('---------------------------');

	elementObject.classList.add("press-button");
	setTimeout(function(){elementObject.classList.remove("press-button");}, 100);
}