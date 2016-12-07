var url_base = "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/cvburnha/project";
var day_api = "/backend/day-api.php";
var exercise_api = "/backend/exercise-api.php";
var muscle_api = "/backend/muscle-api.php";
var routine_api = "/backend/routine-api.php";
var routine_exercise_api = "/backend/routines-exercise-api.php";
var sets_api = "/backend/sets-api.php";

var userId; 
var muscles =[];

$(document).ready(function () {

	$("#maindiv").empty();
	$("#maindiv").load("content.html");

	/* Get muscles into the muscle array */
	load_muscles_initial();	

	// $.each(muscles, function(i, val) {
	//     $("#muscles_select").append("<option>"+val.name+"</option>");
	// });
	console.log(muscles.length);


	userId = localStorage.getItem("usernameID");


	$('#addExerciseForm').on('submit',
	function(e) {
		e.preventDefault();
		var params = $(this).serialize() + "&userId=" + userId + "&muscleId=0"; 
		console.log(params);
		//var data = params.serialize();
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

	$('#exercisediv').on('click','td.openExercise',
		   null,
		   function (e) {
		       var exercise = $(this).parent().data('exercise');
		       console.log(exercise.name);
		       /* Run ajax call to get the exercise stuff */
		       $('h1').text(exercise.name);
		   });

	$('#exercisediv').on('click','td.deleteExercise',
	   null,
	   function (e) {
	       var exercise = $(this).parent().data('exercise');
	       console.log("Delete" + exercise.name);
	       /* Run ajax call to get the exercise stuff */
	    
	       delete_exercise(exercise.eid, $(this).parent());
	   });


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
	}}

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

/* Load in the individual exercise */
var load_exercise = function(){

}

var delete_exercise = function(eid, row){
	console.log("Delete exercise");
	var params = "eid="+eid;
    $.ajax(url_base + exercise_api,
    {type: "POST",
	  dataType: "json",
	  data: params,
	  	success: function(data) {
	  		alert("success");
		  	console.log(data);
		  	
		},
		error: function (xhr, ajaxOptions, thrownError) {
	        alert(xhr.status);
	        alert(thrownError);
	      }

	});
	row.remove();
}
var clear_table = function (name) {
	$("#exercisediv").empty();
	$("#exercisediv").append("<tr><th>"+name+"</th><th></th></tr>");

}

