var url_base = "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/cvburnha/project";
var day_api = "/backend/day-api.php";
var exercise_api = "/backend/exercise-api.php";
var muscle_api = "/backend/muscle-api.php";
var routine_api = "/backend/routine-api.php";
var routine_exercise_api = "/backend/routines-exercise-api.php";
var sets_api = "/backend/sets-api.php";

var userId; 
var muscles;

$(document).ready(function () {

	userId = localStorage.getItem("usernameID");

	/* Get exercise ID */
	load_exercises();


	$('#exercisenav').on('click', load_exercises);
		
	$('#musclenav').on('click', load_muscles);

	$('#routinenav').on('click',
		function(e) {
			$('h1').text('Routines');

			var params = "?userId=" + userId;
			var url_get = url_base + routine_api + params;
			console.log(url_get);

			$.ajax({
			        url: url_get,
			        type: 'GET',
			        success: function(res) {
			        	console.log(res);

			        	for (var i=0; i<res.length; i++) {
			   				//var t = new Exercise(res[i]);
		       			}

			        }

			    });

	});


});

var load_exercises = function(){
			$('h1').text('Exercises');

			var params = "?userId=" + userId;

			var url_get = url_base + exercise_api + params;
			console.log(url_get);

			$.ajax({
			        url: url_get,
			        type: 'GET',
			        success: function(res) {
			        	console.log(res);

			        	for (var i=0; i<res.length; i++) {
			   				var t = new Exercise(res[i]);
			   				$("#exercisediv").append(t.makeDiv());
		       			}

			        }

			    });}

var load_muscles = function(){
	$("h1").text("Muscles");
	var url_get = url_base + muscle_api;
	console.log(url_get);

	$.ajax({
        url: url_get,
        type: 'GET',
        success: function(res) {
        	console.log(res);
        	for (var i=0; i<res.length; i++) {
   				//var t = new Muscle(res[i]);
   			}
        }
    });
}

var clear_table = function () {
	$("#exercisediv").empty();
	$("#exercisediv").append(<tr><th>Exercise</th></tr>);

}
