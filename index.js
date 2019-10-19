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
	reset();
	nextTopping();
	nextSauce();
	nextMeat();
	generateRandomGoalState();
	displayScore();
}

function reset(){
	state.topping = -1;
	state.sauce = -1;
	state.meat = -1;

	var customerImage = document.getElementById("customerImage");
	customerImage.src = assetsFolder + "customer_normal.png";
}

function generateRandomGoalState(){
	goalState.topping = randomRange(0, stateSpace.toppings.length);
	goalState.sauce = randomRange(0, stateSpace.sauces.length);
	goalState.meat = randomRange(0, stateSpace.meats.length);
	
	var customer = document.getElementById("customerText");
	customer.innerHTML = generateGoalStateString();
}

function randomRange(start, end){
	return Math.floor((Math.random() * end) + start);
}

function generateGoalStateString(){
	return "I want a burger with " + stateSpace.toppings[goalState.topping] + ", " + stateSpace.sauces[goalState.sauce] + ", and "+ stateSpace.meats[goalState.meat];
}

function showState(node){
	var topping = document.getElementById("toppingImage");
	topping.src = assetsFolder + stateSpaceImage.toppings[node.topping];

	var sauce = document.getElementById("sauceImage");
	sauce.src = assetsFolder + stateSpaceImage.sauces[node.sauce];

	var meat = document.getElementById("meatImage");
	meat.src = assetsFolder + stateSpaceImage.meats[node.meat];
}

function nextTopping() {
    var topping = document.getElementById("toppingImage");
	state.topping = (state.topping + 1) % stateSpace.toppings.length;
	topping.src = assetsFolder + stateSpaceImage.toppings[state.topping];
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
    var customer = document.getElementById("customerText");
	if (goalTest()){
		customer.innerHTML = "Thanks! Great Job!";
		currentScore += 10;

		var customerImage = document.getElementById("customerImage");
		customerImage.src = assetsFolder + "customer_happy.png";
		setTimeout(function() {
			init();
		}, 2000);
		
	} else {
		customer.innerHTML = "This isn't what I want... Here is my order!!!<br>";

		var customerImage = document.getElementById("customerImage");
		customerImage.src = assetsFolder + "customer_angry.png";
		setTimeout(function() {
			customer.innerHTML = generateGoalStateString();
			customerImage.src = assetsFolder + "customer_normal.png";
		}, 2000);
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

function getNeighbors(node){
	var neighbors = [];
	if (node.topping < stateSpace.toppings.length - 1) {
		var neighbor1 = JSON.parse(JSON.stringify(node));
		neighbor1.topping++;
		neighbors.push(neighbor1);
	}
	if (node.sauce < stateSpace.sauces.length - 1) {
		var neighbor3 = JSON.parse(JSON.stringify(node));
		neighbor3.sauce++;
		neighbors.push(neighbor3);
	}
	if (node.meat < stateSpace.meats.length - 1) {
		var neighbor4 = JSON.parse(JSON.stringify(node));
		neighbor4.meat++;
		neighbors.push(neighbor4);
	}

	return neighbors;
}

async function dfs(){
	var fringe = new Stack();
	fringe.push(state);
	var seen = new Set();

	while (!fringe.isEmpty()){
		var current = fringe.pop();
		
		if (seen.has(JSON.stringify(current))){
			continue;
		}
		showState(current);
		console.log("Showing current state: " + JSON.stringify(current));
		await sleep(1000);
		

		if (compare(current, goalState)){
			state = current;
			console.log("Goal found " + JSON.stringify(current));
			serve();
			return "found";
		}

		var neighbors = getNeighbors(current);
		for (var i = 0; i < neighbors.length; i++) {
			fringe.push(neighbors[i]);
		}
		seen.add(JSON.stringify(current));
	}
}

async function bfs(){
	var fringe = new Queue();
	fringe.enqueue(state);
	var seen = new Set();

	while (!fringe.isEmpty()){
		var current = fringe.dequeue();
		
		if (seen.has(JSON.stringify(current))){
			continue;
		}
		showState(current);
		console.log("Showing current state: " + JSON.stringify(current));
		await sleep(1000);
		

		if (compare(current, goalState)){
			state = current;
			console.log("Goal found " + JSON.stringify(current));
			serve();
			return "found";
		}

		var neighbors = getNeighbors(current);
		for (var i = 0; i < neighbors.length; i++) {
			fringe.enqueue(neighbors[i]);
		}
		seen.add(JSON.stringify(current));
	}
}

async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}

function compare(s, g){
	return (s.topping === g.topping && s.sauce === g.sauce && s.meat === g.meat);
}

class Stack { 
    constructor() { 
        this.items = []; 
    }  
    push(element) { 
        this.items.push(element); 
    } 
    pop() { 
        if (this.items.length == 0) return "Underflow"; 
        return this.items.pop(); 
    } 
    peek() { 
        return this.items[this.items.length - 1]; 
    } 
    isEmpty() { 
        return this.items.length == 0; 
    } 
    printStack() { 
        var str = ""; 
        for (var i = 0; i < this.items.length; i++) 
            str += this.items[i] + " "; 
        return str; 
    } 
} 

class Queue { 
    constructor() { 
        this.items = []; 
    }         
    enqueue(element) {     
    	this.items.push(element); 
	} 
    dequeue() { 
		if(this.isEmpty()) return "Underflow"; 
		return this.items.shift(); 
	} 
    front() { 
		if(this.isEmpty()) return "No elements in Queue"; 
		return this.items[0]; 
	} 
    isEmpty() { 
		return this.items.length == 0; 
	} 
    printQueue() { 
		var str = ""; 
		for(var i = 0; i < this.items.length; i++) 
			str += this.items[i] +" "; 
		return str; 
	} 
} 