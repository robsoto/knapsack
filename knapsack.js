/*
	Things to add:
		keep previous state on page refresh
		pie chart that fills as items are added
		display results of previous attempts
		drag and drop
		multiple select
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
			$elem.toggle('puff', {percent:110}, function() {
				$('#knapsack').append($elem);	
			});
			$elem.toggle('puff', {percent:110});
			updateKnapsack($elem);
		}
		else {
			$elem.effect('shake');
			errorSound.play();
			$('#error').text("That's more than I can carry!")
					   .css('color', 'red')
					   .css('font-size', 'large')
					   .delay(750)
					   .fadeOut(1000, function() {
							   	$('#error').text('');
						})
					   .fadeIn();
		}
	}
	//knapsack to house
	else {
		moveSound.play();
		$elem.attr('data-location', 'house');
		$elem.toggle('puff', {percent:110}, function() {
			$('#house').append($elem);	
		});
		$elem.toggle('puff', {percent:110});
		updateKnapsack($elem);
	}
}

//display the value and weight of each item
function displayValAndWeight() {
	var items = $('.item');
	var images = items.find('figcaption');
	items.each(function() {
		var info = '$' + $(this).find('img').attr('data-value') + ', ' + $(this).find('img').attr('data-weight') + ' kg';
		$(this).find('figcaption').text(info);
	});
}

//display the value of each item as $/kg
function displayValPerWeight() {
	var items = $('.item');
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

//moves all items back into house
function reset() {
    var resetSound = new Audio('resetSound.mp3');
	if ($('#knapsack > div').length > 0) {
		resetSound.play();
	}
	
	var items = $('.item');
	items.each(function() {
		var item = $(this)
		if (item.attr('data-location') == 'knapsack') {
			item.attr('data-location', 'house');
			item.toggle('puff', {percent:110}, function() {
				$('#house').append(item);	
			});
			item.toggle('puff', {percent:110})
			updateKnapsack(item);
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
	
	//change cursor on hover
	items.find('img').hover(function() {
		$(this).css('cursor', 'pointer');
	});
	
	//move items on click
	items.click(function() {
		moveItem($(this));
	});
	
	//button click actions
	buttons.click(function() {
		if ($(this).attr('id') == 'valAndWeight') {
			displayValAndWeight();	
		}
		else if ($(this).attr('id') == 'valPerWeight') {
			displayValPerWeight();
		}
		else if ($(this).attr('id') == 'reset') { 
			reset();
		}
	});
});