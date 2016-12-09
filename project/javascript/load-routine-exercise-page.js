	


var load_routine_exercise_page = function (routine) {
	/* Get routine exercises into the routine exercise dropdown */
	load_exercise_from_rid(routine);


	console.log("ran");
	load_exercises_initial(function(){
		console.log("set on click");
		$("#addRoutineExerciseForm").on("submit", function(e){
			addRoutineExercises(e, routine)
		});

	});
}

var load_exercise_from_rid = function(routine){
	var params = "?rid=" + routine.rid;

	var url_get = url_base + routine_exercise_api + params;

	$.ajax({
		url: url_get,
		dataType: "json",
		type: 'GET',
		success: function(res) {
			console.log(res.length);
			for (var i=0; i<res.length; i++) {
				var e = new Exercise(res[i]);
				$("#routine-exercise-table").append(e.makeDiv());
			}
		}
	});
}

var load_exercises_initial = function(callback){

	var params = "?userId=" + userId;

	var url_get = url_base + exercise_api + params;

	$.ajax({
		url: url_get,
		type: 'GET',
		success: function(res) {
			console.log(res);
			for (var i=0; i<res.length; i++) {
				var ex = new Exercise(res[i]);
				$("#maindiv #exercise-select").append(ex.makeOption());
			}
			callback();
		}
	});

}

var addRoutineExercises = function(e, routine){
	e.preventDefault();
	console.log("on click");

	var exercise = $('#exercise-select').find(':selected').data('exercise');

	var params = $(this).serialize() + "&eid=" + exercise.eid + "&rid=" +routine.rid; 
	console.log(params);
	
	$.ajax(url_base + routine_exercise_api,
		{type: "POST",
		dataType: "json",
		data: params,
		success: function(data) {
			console.log(data);
			var e = new Exercise(data);
			$("#routine-exercise-table").append(e.makeDiv());

		},
		error: function (xhr, ajaxOptions, thrownError) {
			alert(xhr.status);
			alert(thrownError);
		}

	});
}