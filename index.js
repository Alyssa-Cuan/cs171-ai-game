window.onload=init;

var availableStates = {
	toppings: ["Lettuce","Tomato","Cheese"],
	sauces: ["Ketchup","Mayonnaise","BBQ Sauce"],
	meats: ["Ground Beef","Sirlion Steak","Vegan Meat"]
};

var state = {
    topping: -1,
    sauce: -1,
    meat: -1
};

var goalState = {
	topping: -1,
    sauce: -1,
    meat: -1
};

var currentScore = 0;

function init() {
    console.log("window has loaded");
	nextTopping();
	nextSauce();
	nextMeat();
	generateRandomGoalState();
	displayScore();
}

function generateRandomGoalState(){
	goalState.topping = randomRange(0, availableStates.toppings.length);
	goalState.sauce = randomRange(0, availableStates.sauces.length);
	goalState.meat = randomRange(0, availableStates.meats.length);
	
	var customer = document.getElementById("customer");
	customer.innerHTML = generateGoalStateString();
}

function randomRange(start, end){
	return Math.floor((Math.random() * end) + start);
}

function generateGoalStateString(){
	return "I want a burger with " + availableStates.meats[goalState.meat] + " and " + availableStates.sauces[goalState.sauce] + " with " + availableStates.toppings[goalState.topping];
}

function nextTopping() {
    var topping = document.getElementById("topping");
	state.topping = (state.topping + 1) % availableStates.toppings.length;
	topping.innerHTML = availableStates.toppings[state.topping];
}

function nextSauce() {
    var sauce = document.getElementById("sauce");
	state.sauce = (state.sauce + 1) % availableStates.sauces.length;
	sauce.innerHTML = availableStates.sauces[state.sauce];
}

function nextMeat() {
    var meat = document.getElementById("meat");
	state.meat = (state.meat + 1) % availableStates.meats.length;
	meat.innerHTML = availableStates.meats[state.meat];
}

function serve() {
    var customer = document.getElementById("customer");
	if (goalTest()){
		customer.innerHTML = "Thanks! Great Job!";
		currentScore += 10;
		setTimeout(function() {
			generateRandomGoalState();
		}, 2000);
		
	} else {
		customer.innerHTML = "This isn't what I want... Here is my order!!!<br>";
		customer.innerHTML += generateGoalStateString();
		currentScore -= 10;
	}
	displayScore();
}

function goalTest(){
	return (state.topping === goalState.topping && state.sauce === goalState.sauce && state.meat === goalState.meat);
}

function displayScore(){
	var score = document.getElementById("score");
	score.innerHTML = "Score: " + currentScore;
}