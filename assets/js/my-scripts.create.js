$(function () {
	// start config:	
	updateAnswerNumber();
	updateSubmitButton();
	
	// jquery ui datapicker:	
	$('#datepicker').datepicker( {
		dateFormat: "yy-mm-dd",
		defaultDate: "+7d",
		minDate: "+0d",
		maxDate: "+2m",
		},
		$.datepicker.regional["pl"]
	);
	
	// jquery ui sortable:
	$('.answers').sortable({
		axis: "y",
		receive: function(event, ui) {
			ui.helper.first().removeAttr('style');
		}
	});    
	
	// jquery ui draggable:
	$('.draggable').draggable({ handle: ".panel-heading", containment: "body" });
	$('#drag-to-clone').draggable({
		connectToSortable: ".answers",
		helper: function() {
			var helper = $(this).clone();
			helper.find('input').removeAttr("disabled").next().addClass("answer-close");
			helper.css({'width': $('answer').first().width(), 'z-index': '6'});
			return helper;
		},
		stop: function() {
			updateAnswerNumber();
		},
		revert: "invalid", 
		containment: "body"
    });
	
	// click events:
	$('#info-caret').click(function(){
		if ($(this).hasClass("fa-caret-up")) {
			$('#info-text').hide(100);
			$(this).removeClass("fa-caret-up").addClass("fa-caret-down");			
		} else {
			$('#info-text').show(100);
			$(this).removeClass("fa-caret-down").addClass("fa-caret-up");			
		}
	});
	
	$('.btn-toggle').click(function(){		
		togglePanel($(this).data("dest"));
		return false;
	});
	
	$('button.close').click(function(){
		togglePanel($(this).data("dest"));
		return false;		
	});
	
	$('.answers').delegate(".answer-close", "click", function(){
		closeAnswer($(this));
		updateAnswerNumber();
		return false;
	});
	
	// change events:
	$('[name="question_title"]').change(function(){
		if($(this).val().length > 0){
			$('#info-title').removeClass("list-group-item-danger").addClass("list-group-item-success").find('.fa').removeClass("fa-square-o").addClass("fa-check-square-o");
		} else {
			$('#info-title').removeClass("list-group-item-success").addClass("list-group-item-danger").find('.fa').removeClass("fa-check-square-o").addClass("fa-square-o");
		}
		updateSubmitButton();
	});
	
	$('[name="question_text"]').change(function(){
		if($(this).val().length > 0){
			$('#info-content').removeClass("list-group-item-danger").addClass("list-group-item-success").find('.fa').removeClass("fa-square-o").addClass("fa-check-square-o");
		} else {
			$('#info-content').removeClass("list-group-item-success").addClass("list-group-item-danger").find('.fa').removeClass("fa-check-square-o").addClass("fa-square-o");
		}
		updateSubmitButton();
	});
	
	$("#answer-number").change(function() {
        $('.answers').find('input').trigger("change");
    });
	
	$('.answers').delegate("input", "change", function(){		
		var answers = $('.answers').find('.answer');
		var FilledInput = 0;
		var FilledCheckbox = 0;
		var answer = answers.first();
		for(i = 0; i < answers.length; i++){
			if(answer.find('input[type="text"]').val().length > 0){
				FilledInput++;
			} 
			if(answer.find('input[type="checkbox"]').prop('checked') && (answer.find('input[type="text"]').val().length > 0)){
				FilledCheckbox++;
			}
			if(answer.next() != null){
				answer = answer.next();
			}
		};
		if(FilledInput >= $("#answer-number").val()){
			$('#info-answer').removeClass("list-group-item-danger").addClass("list-group-item-success").find('.fa').removeClass("fa-square-o").addClass("fa-check-square-o");
		} else {
			$('#info-answer').removeClass("list-group-item-success").addClass("list-group-item-danger").find('.fa').removeClass("fa-check-square-o").addClass("fa-square-o");
		}
		if(FilledCheckbox == $("#answer-number").val()){
			$('#info-check').removeClass("list-group-item-danger").addClass("list-group-item-success").find('.fa').removeClass("fa-square-o").addClass("fa-check-square-o");
		} else {
			$('#info-check').removeClass("list-group-item-success").addClass("list-group-item-danger").find('.fa').removeClass("fa-check-square-o").addClass("fa-square-o");
		}
		updateSubmitButton();
	});
	
	// change type radio
	$('input[type=radio][name=type_question]').change(function() {
        changeTypeQuestion($(this).val());
    });
});

changeTypeQuestion = function(type){
	var spanAnswer = $('.right-answer');
	var input = $('.right-answer').next('input');
	if(type === "questionary"){
		spanAnswer.html("").removeClass("right-answer-short");
		input.width("100%");		
		$('#label-number-answers').html("Ilość <b>możliwych</b> odpowiedzi:");
		$('#check-group').children().last().remove();		
	} else if(type === "test"){
		spanAnswer.html($('<div class="checkbox"><label><input type="checkbox"><span>poprawna</span></label></div>')).addClass("right-answer-short").width(spanAnswer.first().find('span').width() + 23);
		input.width(input.width() - spanAnswer.first().find('span').width() - 38);
		$('#label-number-answers').html("Ilość <b>poprawnych</b> odpowiedzi:");
		$('#check-group').children().last().after('<li class="list-group-item list-group-item-danger" id="info-check"><span class="fa fa-square-o"></span><span> Poprawne odpowiedzi </span></li>');			
	}
	updateSubmitButton();	
}

updateSubmitButton = function(){
	if($('ul.list-group').find('li.list-group-item-danger').length === 0){
		$('#btn-submit').prop("disabled", false);
	} else {
		$('#btn-submit').prop("disabled", true);
	}
};

updateAnswerNumber = function(){
	var numberOptions = $('.answers').find('.answer').length;
	var select = $('#answer-number');
	select.children().remove();
	for(i = 1; i <= numberOptions; i++){
		select.append($('<option>', {
			value: i,
			text: i
		}));
	}	
};

closeAnswer = function(button){
	if($('.answers').find('.answer').length>1){
		button.parent().remove();
		$('.answers').find('input').trigger("change");
	} else {
		//TODO alert
	}
};

togglePanel = function(panelName){
	var destination = $('#'+panelName);
	var btnToggle = $('[href="'+panelName+'"]');
	if(btnToggle.children('span').hasClass("fa-toggle-on")){
		btnToggle.children('span').removeClass("fa-toggle-on").addClass("fa-toggle-off");
		destination.hide(100);
	} else {
		btnToggle.children('span').removeClass("fa-toggle-off").addClass("fa-toggle-on");
		destination.show(100);
	}	
};