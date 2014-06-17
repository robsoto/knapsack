function validWeight($elem) {
	var newWeight = $elem.attr('data-weight') + knapsackWeight;
	if (newWeight <= 20) {
		return true;	
	}
	else {
		return false;	
	}
}

function moveItem($elem) {
	//if (validWeight($elem)) {
		if ($elem.attr('data-location') == 'house') {
			$elem.attr('data-location', 'knapsack');
			$('#knapsack').append($elem);
			knapsackWeight += $elem.attr('data-weight');
		}
		else {
			$elem.attr('data-location', 'house');
			$('#house').append($elem);
			knapsackWeight -= $elem.attr('data-weight');
		}
	//}
}

$(document).ready(function() {
	//initialize variables
	knapsackWeight = 0;
	var items = $('.item');
	items.attr('data-location', 'house');
	
	//move items on click
	items.click(function(e) {
		moveItem($(this));
	});
});