/* load data
Load the data via get requests 
*/
var load_exercises = function(e){
	if(e != null){
		e.preventDefault();
	}

	load_main_table(function(){
		clear_table('Exercise');
		$('h1').text('Exercises');

		remove_add_exercise_clicks();
		enable_add_exercise();
		disable_add_routine();	


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

var load_muscles = function(e){
	e.preventDefault();
	e.stopPropagation();
	load_main_table(function(){
		disable_add_exercise();
		disable_add_routine();	


		clear_table('Muscle');
		$("h1").text("Muscles");

		remove_add_exercise_clicks();	

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


}



var load_routines = function(e){
	e.preventDefault();
	load_main_table(function(){	
		disable_add_exercise();
		enable_add_routine();	

		clear_table('Routine');
		$('h1').text('Routines');

		remove_add_exercise_clicks();	

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
	});
}