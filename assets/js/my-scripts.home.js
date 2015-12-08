$(function () {	
	// for tests!
	var questionTmp = $('.question').last();	
	for(i = 1; i < 5; i++){
		var T = questionTmp.position().top - 20 - (i*100);
		var L = questionTmp.position().left - 15 + (i*50);
		$('.question').last().after($('.question').first().clone().css({'posiotion':'relativ', 'top':T, 'left':L}));
		$('.result').last().after($('.result').first().clone().css({'posiotion':'relativ', 'top':T, 'left':L}));
	}
	
	// jqueru ui draggable
	$('.draggable').draggable({ 
		handle: ".panel-heading", 
		containment: "body", 
		zIndex: 100 
	});
	
});

