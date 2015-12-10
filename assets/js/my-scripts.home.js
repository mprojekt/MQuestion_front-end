$(function () {	
	// start config
	var zIndex = 100;
	var zIndexTmp;
	var allQuestionSets = 5, currentQuestionSet = 1;
	var allResultSets = 5, currentResultSet = 1;
	
	$(window).resize(function(){
		if($(document).innerHeight() > $(window).innerHeight()){
			$('footer').removeClass('stick-bottom');
		} else {
			$('footer').addClass('stick-bottom');
		}
	});
	$(window).trigger("resize");

	// for tests!
	var questionTmp = $('.question').first().clone().removeClass("hide");
	var resultTmp = $('.result').first().clone().removeClass("hide");
	var T = 0;
	var L = 200;	
	
	for(i = 1; i <= 5; i++){
		var n = 6 - i;
		
		$('.question').last().after(questionTmp.clone().prop('id', "question_" + n).css({'posiotion':'relativ', 'top':T, 'left':L}));
		$('#question_' + n).find('.title').text(n + ". Tytuł pytania");
		$('.result').last().after(resultTmp.clone().prop('id', "result_" + n).css({'posiotion':'relativ', 'top':T, 'left':L}));
		$('#result_' + n).find('.title').text(n + ". Tytuł pytania [zakończone]");
		
		T -= 100;
		L -= 50;
	}	
	
	setPaginButtons("question", currentQuestionSet, allQuestionSets);
	setPaginButtons("result", currentResultSet, allResultSets);
	// -- end tests
	
	
	// jqueru ui draggable
	$('.draggable').draggable({ 
		handle: ".panel-heading", 
		containment: "body",
		start: function() {
			zIndexTmp = ++zIndex;
			$(this).css('z-index', zIndex);
		}
	});
	
	// 	
	$('.draggable').mouseenter(function(){
		zIndexTmp = $(this).css('z-index');
		$(this).css('z-index', "9999");
	});
	$('.draggable').mouseleave(function(){
		$(this).css('z-index', zIndexTmp);
	});
	
	// click events
	$('.btn-pagin-question').click(function(){	
		var isChange = false;	
		switch($(this).data("dest")){			
			case 'first':
				if(currentQuestionSet > 1){
					currentQuestionSet = 1;
					isChange = true;
				}				
				break;
			case 'previous':
				if(currentQuestionSet > 1){
					currentQuestionSet--;
					isChange = true;
				}				
				break;
			case 'next':
				if(currentQuestionSet < allQuestionSets){
					currentQuestionSet++;
					isChange = true;
				}				
				break;
			case 'last':
				if(currentQuestionSet < allQuestionSets){
					currentQuestionSet = allQuestionSets;
					isChange = true;
				}
				break;
		}
		
		if(isChange){
			// AJAX
			setPaginButtons("question", currentQuestionSet, allQuestionSets);
		}		
	});
	
	$('.btn-pagin-result').click(function(){
		var isChange = false;		
		switch($(this).data("dest")){			
			case 'first':
				if(currentResultSet > 1){
					currentResultSet = 1;
					isChange = true;
				}				
				break;
			case 'previous':
				if(currentResultSet > 1){
					currentResultSet--;
					isChange = true;
				}				
				break;
			case 'next':
				if(currentResultSet < allResultSets){
					currentResultSet++;
					isChange = true;
				}				
				break;
			case 'last':
				if(currentResultSet < allResultSets){
					currentResultSet = allResultSets;
					isChange = true;
				}
				break;
		}
		
		if(isChange){
			// AJAX
			setPaginButtons("result", currentResultSet, allResultSets);
		}		
	});
	
});

setPaginButtons = function(type, current, all){
	$('#' + type + '-page').prop('placeholder', "Zestaw " + current + " z " + all);
	if(current <= 1){
		$('#' + type + '-first').add($('#' + type + '-previous')).addClass("disabled");
		$('#' + type + '-next').add($('#' + type + '-last')).removeClass("disabled");
	} else if(current >= all){
		$('#' + type + '-first').add($('#' + type + '-previous')).removeClass("disabled");
		$('#' + type + '-next').add($('#' + type + '-last')).addClass("disabled");
	} else {
		$('#' + type + '-first').add($('#' + type + '-previous')).removeClass("disabled");
		$('#' + type + '-next').add($('#' + type + '-last')).removeClass("disabled");
	}	
};

