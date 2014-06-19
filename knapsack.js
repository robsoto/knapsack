/*
	Things to add:
		WORKING RESET BUTTON W/ SFX
		pie chart that fills as items are added
		display results of previous attempts
		drag and drop
		multiple select
		change cursor when items are moused over 
		animate transitions
*/

function validWeight($elem) {
	var itemWeight = parseInt($elem.find('img').attr('data-weight'));
	var newWeight = itemWeight + knapsackWeight;

	return (newWeight <= weightLimit) 
}

function moveItem($elem) {
	var moveSound = new Audio('moveSound.mp3');
	var errorSound = new Audio('errorSound.mp3');
	
	//house to knapsack
	if ($elem.attr('data-location') == 'house') {
		if (validWeight($elem)) {
			moveSound.play();
			$elem.attr('data-location', 'knapsack');
			$('#knapsack').append($elem);
			updateKnapsack($elem);
		}
		else {
			$elem.effect('shake');
			errorSound.play();
		}
	}
	//knapsack to house
	else {
		moveSound.play();
		$elem.attr('data-location', 'house');
		$('#house').append($elem);
		updateKnapsack($elem);
	}
}

//display the value and weight of each item
function displayValAndWeight() {
	items = $('.item');
	images = items.find('figcaption');
	console.log(images);
	items.each(function() {
		var info = '$' + $(this).find('img').attr('data-value') + ', ' + $(this).find('img').attr('data-weight') + ' kg';
		$(this).find('figcaption').text(info);
	});
}

//display the value of each item as $/kg
function displayValPerWeight() {
	items = $('.item');
	items.each(function() {
		var val = parseFloat($(this).find('img').attr('data-value'));
		var weight = parseFloat($(this).find('img').attr('data-weight'));
		$(this).find('figcaption').text(val/weight + ' $/kg');
	});
}

//updates display of total value and weight of items in knapsack
//assumes item has successfully been moved
function updateKnapsack($elem) {
	var itemValue = parseInt($elem.find('img').attr('data-value'));
	var itemWeight = parseInt($elem.find('img').attr('data-weight'));
	
	if ($elem.attr('data-location') == 'knapsack') {
		knapsackValue += itemValue;
		knapsackWeight += itemWeight;
	}
	else {
		knapsackValue -= itemValue;
		knapsackWeight -= itemWeight;
	}
	
	$('#knapsackContents').text('Value: $' + knapsackValue + '\n Weight: ' + knapsackWeight + ' kg' + '\n(Limit: ' + weightLimit + ' kg)');
}

function reset() {
	items = $('.item');
	items.each(function() {
		if ($(this).attr('data-location') == 'knapsack') {
			updateKnapsack($(this));
			$(this).find('div').attr('data-location', 'house');
			$('#house').append($(this));
		}
	});
}

$(document).ready(function() {
	//initialize variables
	knapsackWeight = 0;
	knapsackValue = 0;
	weightLimit = 20;
	var items = $('.item');
	var buttons = $('button');
	items.attr('data-location', 'house');
	
	//initialize displayed information
	$('#knapsackContents').text('Value: $' + 0 + '\n Weight: ' + 0 + ' kg' + '\n(Limit: ' + weightLimit + ' kg)');
	displayValAndWeight();
	
	//move items on click
	items.click(function(e) {
		moveItem($(this));
	});
	
	//button click actions
	buttons.click(function(e) {
		if ($(this).attr('id') == 'valAndWeight') {
			displayValAndWeight();	
		}
		else if ($(this).attr('id') == 'valPerWeight') {
			displayValPerWeight();
		}
		/*else if ($(this).attr('id') == 'reset') { 
			reset();
		}*/
	});
});