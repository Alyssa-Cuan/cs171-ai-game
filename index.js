window.onload=init;

var assetsFolder = "assets/";

var stateSpaceImage = {
	toppings: ["bacon.png","cheese.png","egg.png","jalapeno.png"],
	vegetables: ["lettuce.png","mushrooms.png","pickles.png","spinach.png","tomato.png"],
	sauces: ["ketchup.png","mayonnaise.png","mustard.png"],
	meats: ["beef steak.png","chicken steak.png","fish steak.png","chorizo.png"]
}

var stateSpace = {
	toppings: ["Bacon","Cheese","Egg","Jalapeno"],
	vegetables: ["Lettuce","Mushrooms","Pickles","Spinach","Tomato"],
	sauces: ["Ketchup","Mayonnaise","Mustard"],
	meats: ["Beef Steak","Chicken Steak","Fish Steak","Chorizo"]
};

var state = {
    topping: -1,
	vegetable: -1,
    sauce: -1,
    meat: -1
};

var goalState = {
	topping: -1,
	vegetable: -1,
    sauce: -1,
    meat: -1
};

var currentScore = 0;

function init() {
	reset();
	nextTopping();
	nextVegetable();
	nextSauce();
	nextMeat();
	generateRandomGoalState();
	displayScore();
}

function reset(){
	state.topping = -1;
	state.vegetable = -1;
	state.sauce = -1;
	state.meat = -1;
}

function generateRandomGoalState(){
	goalState.topping = randomRange(0, stateSpace.toppings.length);
	goalState.vegetable = randomRange(0, stateSpace.vegetables.length);
	goalState.sauce = randomRange(0, stateSpace.sauces.length);
	goalState.meat = randomRange(0, stateSpace.meats.length);
	
	var customer = document.getElementById("customer");
	customer.innerHTML = generateGoalStateString();
}

function randomRange(start, end){
	return Math.floor((Math.random() * end) + start);
}

function generateGoalStateString(){
	return "I want a burger with " + stateSpace.toppings[goalState.topping] + ", " + stateSpace.vegetables[goalState.vegetable] + ", " + stateSpace.sauces[goalState.sauce] + ", and "+ stateSpace.meats[goalState.meat];
}

function nextTopping() {
    var topping = document.getElementById("toppingImage");
	state.topping = (state.topping + 1) % stateSpace.toppings.length;
	topping.src = assetsFolder + stateSpaceImage.toppings[state.topping];
}

function nextVegetable() {
    var vegetable = document.getElementById("vegetableImage");
	state.vegetable = (state.vegetable + 1) % stateSpace.vegetables.length;
	vegetable.src = assetsFolder + stateSpaceImage.vegetables[state.vegetable];
}

function nextSauce() {
    var sauce = document.getElementById("sauceImage");
	state.sauce = (state.sauce + 1) % stateSpace.sauces.length;
	sauce.src = assetsFolder + stateSpaceImage.sauces[state.sauce];
}

function nextMeat() {
    var meat = document.getElementById("meatImage");
	state.meat = (state.meat + 1) % stateSpace.meats.length;
	meat.src = assetsFolder + stateSpaceImage.meats[state.meat];
}

function prevTopping() {
    var topping = document.getElementById("toppingImage");
	state.topping = (state.topping - 1 + stateSpace.toppings.length) % stateSpace.toppings.length;
	topping.src = assetsFolder + stateSpaceImage.toppings[state.topping];
}

function prevVegetable() {
    var vegetable = document.getElementById("vegetableImage");
	state.vegetable = (state.vegetable - 1 + stateSpace.vegetables.length) % stateSpace.vegetables.length;
	vegetable.src = assetsFolder + stateSpaceImage.vegetables[state.vegetable];
}

function prevSauce() {
    var sauce = document.getElementById("sauceImage");
	state.sauce = (state.sauce - 1 + stateSpace.sauces.length) % stateSpace.sauces.length;
	sauce.src = assetsFolder + stateSpaceImage.sauces[state.sauce];
}

function prevMeat() {
    var meat = document.getElementById("meatImage");
	state.meat = (state.meat - 1 + stateSpace.meats.length) % stateSpace.meats.length;
	meat.src = assetsFolder + stateSpaceImage.meats[state.meat];
}

function serve() {
    var customer = document.getElementById("customer");
	if (goalTest()){
		customer.innerHTML = "Thanks! Great Job!";
		currentScore += 10;
		setTimeout(function() {
			init();
		}, 2000);
		
	} else {
		customer.innerHTML = "This isn't what I want... Here is my order!!!<br>";
		customer.innerHTML += generateGoalStateString();
		currentScore -= 10;
	}
	displayScore();
}

function goalTest(){
	return (state.topping === goalState.topping && state.vegetable === goalState.vegetable && state.sauce === goalState.sauce && state.meat === goalState.meat);
}

function displayScore(){
	var score = document.getElementById("score");
	score.innerHTML = "Score: " + currentScore;
}