/*
	Things to add:
		pie chart that fills as items are added
		reset button that moves everything back to house
		display results of previous attempts
		sound effects
		drag and drop
		multiple select
		change cursor when items are moused over 
		descriptions/instructions 
		animate transitions
*/

function validWeight($elem) {
	var itemWeight = parseInt($elem.find('img').attr('data-weight'));
	var newWeight = itemWeight + knapsackWeight;

	return (newWeight <= weightLimit) 
}

function moveItem($elem) {
	//house to knapsack
	if ($elem.attr('data-location') == 'house') {
		if (validWeight($elem)) {
			$elem.attr('data-location', 'knapsack');
			$('#knapsack').append($elem);
			updateKnapsack($elem);
		}
		else {
			$elem.effect('shake');	
		}
	}
	//knapsack to house
	else {
		$elem.attr('data-location', 'house');
		$('#house').append($elem);
		updateKnapsack($elem);
	}
}

//display the value and weight of each item
function displayValAndWeight() {
	items = $('.item');
	images = items.find('img');
	/*items.each(function() {
		this.text('$' + this.find('img').attr('data-value') + ', ' + this.find('img').attr('data-weight') + ' kg')
	});*/
	for (var i in images) {
		var img = $(images[i]);
		//console.log(img)
		//console.log(item.attr('data-value'))
		//console.log(item)
		img.find('figcaption')
		   .text('$' + img.attr('data-value') + ', ' + img.attr('data-weight') + ' kg')
	}
}

//display the value of each item as $/kg
function displayValPerWeight() {
	items = $('.item');
	for (var i in items) {
		var item = $(items[i]);
		var val = item.attr('data-value');
		var weight = item.attr('data-weight');
		item.find('figcaption')
			.text(val/weight + ' $/kg');
	}
}

//updates display of total value and weight of items in knapsack
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
	
	$('#knapsackContents').text('Value: $' + knapsackValue + '\n Weight: ' + knapsackWeight + ' kg' + '\nLimit: ' + weightLimit + ' kg');
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
	$('#knapsackContents').text('Value: $' + 0 + '\n Weight: ' + 0 + ' kg' + '\nLimit: ' + weightLimit + ' kg');
	displayValAndWeight();
	
	//move items on click
	items.click(function(e) {
		moveItem($(this));
	});
	
	//change displayed info on button click
	buttons.click(function(e) {
		if ($(this).attr('id') == 'valAndWeight') {
			displayValAndWeight();	
		}
		else if ($(this).attr('id') == 'valPerWeight') {
			displayValPerWeight();
		}
	});
});