//called in moveItem to check that weightLimit is not exceeded
function validWeight($elem) {
	var itemWeight = parseInt($elem.find('img').attr('data-weight'));
	var newWeight = itemWeight + knapsackWeight;

	if (newWeight <= weightLimit) {
		return true;	
	}
	else {
		return false;	
	}
}

function moveItem($elem) {
    var itemWeight = parseInt($elem.find('img').attr('data-weight'));
	
	//house to knapsack
	if ($elem.attr('data-location') == 'house') {
		if (validWeight($elem)) {
			$elem.attr('data-location', 'knapsack');
			$('#knapsack').append($elem);
			knapsackWeight += itemWeight;
			console.log(knapsackWeight)
		}
	}
	//knapsack to house
	else {
		$elem.attr('data-location', 'house');
		$('#house').append($elem);
		knapsackWeight -= itemWeight;
	}
}

$(document).ready(function() {
	//initialize variables
	knapsackWeight = 0;
	weightLimit = 20;
	var items = $('.item');
	items.attr('data-location', 'house');
	
	//move items on click
	items.click(function(e) {
		moveItem($(this));
	});
});