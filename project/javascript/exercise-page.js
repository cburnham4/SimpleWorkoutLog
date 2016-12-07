var url_base = "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/cvburnha/project";
var day_api = "/backend/day-api.php";
var exercise_api = "/backend/exercise-api.php";
var muscle_api = "/backend/muscle-api.php";
var routine_api = "/backend/routine-api.php";
var routine_exercise_api = "/backend/routines-exercise-api.php";
var sets_api = "/backend/sets-api.php";

var userId; 
var muscles =[];
var fMuscles = [Shoulders, chest, biceps];

$(document).ready(function () {


	/* Get muscles into the muscle array */
	load_muscles_initial();	

	// for (var i = 0; i < fMuscles.length; i++)
	// {
	// 	$("#muscles").append("<option>"+fMuscles[i].name+"</option>");
	// }

	// // $.each(fMuscles, function(i, val) {
	// //     $("#muscles").append("<option>"+val+"</option");
	// // });

	userId = localStorage.getItem("usernameID");


	$('#addExerciseForm').on('submit',
	function(e) {
		e.preventDefault();
		var params = $(this).serialize() + "&userId=" + userId + "&muscleId=0"; 
	    $.ajax(url_base + exercise_api,
		  {type: "POST",
			  dataType: "json",
			  data: params,
			  	success: function(data) {
				  	console.log(data);
				  	var t = new Exercise(data);
			   		$("#exercisediv").append(t.makeDiv());

				},
				error: function (xhr, ajaxOptions, thrownError) {
			        alert(xhr.status);
			        alert(thrownError);
			      }

			});
	})


	/* Get exercise ID */
	load_exercises();





	$('#exercisenav').on('click', load_exercises);
		
	$('#musclenav').on('click', load_muscles);

	$('#routinenav').on('click', load_routines);


});

var load_exercises = function(){
	clear_table('Exercise');
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
	clear_table('Muscle');
	$("h1").text("Muscles");
	

	for (var i=0; i<muscles.length; i++) {
		var m = muscles[i];
		$("#exercisediv").append(m.makeDiv());
	}
        

}

var load_muscles_initial = function(){
	var url_get = url_base + muscle_api;
	console.log(url_get);

	$.ajax({
        url: url_get,
        type: 'GET',
        success: function(res) {
        	console.log(res);
        	for (var i=0; i<res.length; i++) {
   				var m = new Muscle(res[i]);
   				muscles.push(m);
   			}
        }
 });}


var load_routines = function(){

	clear_table('Routine');
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
}

var clear_table = function (name) {
	$("#exercisediv").empty();
	$("#exercisediv").append("<tr><th>"+name+"</th></tr>");

}

