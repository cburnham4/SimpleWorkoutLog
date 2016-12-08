/* load data
	Load the data via get requests 
	*/
var load_exercises = function(){
	load_main_table(function(){
		clear_table('Exercise');
		$('h1').text('Exercises');

		$(document).off("click", "#past-sets-tab");
		$(document).off("click", '#current-workout-tab');
		$(document).off("click", '#submitSets');

		$('#exercisenav').addClass('active');
		$('#musclenav').removeClass('active');
		$('#routinenav').removeClass('active');

		var params = "?userId=" + userId;

		var url_get = url_base + exercise_api + params;

		$.ajax({
		        url: url_get,
		        type: 'GET',
		        success: function(res) {

		        	for (var i=0; i<res.length; i++) {
		   				var t = new Exercise(res[i]);
		   				$("#maintable").append(t.makeDiv());
	       			}

		        }

		    });



		});

}

var load_muscles = function(){
	load_main_table(function(){
		clear_table('Muscle');
		$("h1").text("Muscles");

		$('#exercisenav').removeClass('active');
		$('#musclenav').addClass('active');
		$('#routinenav').removeClass('active');
		

		for (var i=0; i<muscles.length; i++) {
			var m = muscles[i];
			$("#maintable").append(m.makeDiv());
		}
	});

}

var load_muscles_initial = function(){
	load_main_table(function(){
		var url_get = url_base + muscle_api;
		var m = new Muscle({"mid":0 , "name": "None"});

		$("#muscle-select").append(m.makeOption());

		$.ajax({
	        url: url_get,
	        type: 'GET',
	        success: function(res) {
	        	for (var i=0; i<res.length; i++) {
	   				var m = new Muscle(res[i]);
	   				muscles.push(m);
	   				$("#muscle-select").append(m.makeOption());
	   			}
	        }
	    });
	});

}


var load_routines = function(){

	clear_table('Routine');
	$('h1').text('Routines');

	$('#exercisenav').removeClass('active');
	$('#musclenav').removeClass('active');
	$('#routinenav').addClass('active');

	var params = "?userId=" + userId;
	var url_get = url_base + routine_api + params;
	$.ajax({
	        url: url_get,
	        type: 'GET',
	        success: function(res) {

	        	for (var i=0; i<res.length; i++) {
	   				var r = new Routine(res[i]);
	   				$("#maintable").append(r.makeDiv());
       			}

	        }

	    });
}