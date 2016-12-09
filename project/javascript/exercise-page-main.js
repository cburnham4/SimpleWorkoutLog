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
	load_main_table();

	$('#home').on('click', function(e) {
		location.reload();
	})

	/* Get muscles into the muscle array */
	load_muscles_initial();	

	/* Get the stored user id */
	userId = localStorage.getItem("usernameID");

	/* Add Exercise button clicked */
	$('#addExerciseForm').on('submit', addExercise);

	/* Add Routine button clicked */
	$('#addRoutineForm').on('submit', addRoutine);				


	/* Get exercises */
	load_exercises();

	$('#exercisenav').on('click', load_exercises);
		
	$('#musclenav').on('click', load_muscles);

	$('#routinenav').on('click', load_routines);

	/* Click Exercise And open it */
	$('#maindiv').on('click','td.openExercise',
		   null,
		   function (e) {
		       var exercise = $(this).parent().data('exercise');
		       console.log(exercise.name);
		       $('h1').text(exercise.name);

		       /* Load in the new page */
		       $("#maindiv").empty();
			   $("#maindiv").load("../html/completedsets-content.html", load_exercise_page(exercise));
		   });

	/* Delete Exercise */
	$('#maindiv').on('click','td.deleteExercise',
	   null,
	   function (e) {
	       var exercise = $(this).parent().data('exercise');
	       console.log("Delete" + exercise.name);
	       /* Run ajax call to get the exercise stuff */

     	    delete_exercise(exercise.eid, $(this).parent());
	   
	   });



	$('#maindiv').on('click','td.openRoutine',
	   null,
	   function (e) {
	       var routine = $(this).parent().data('routine');
	       console.log(routine.name);
	       $('h1').text(routine.name);

	       /* Load in the new page */
	   });

	$('#maindiv').on('click','td.deleteRoutine',
	   null,
	   function (e) {
	       var routine= $(this).parent().data('routine');
	       console.log("Delete" + routine.name);
	       /* Run ajax call to get the exercise stuff */

     	    delete_routine(routine.rid, $(this).parent());
	   });



});

var load_main_table = function(callback){
	$("#maindiv").empty();
	$("#maindiv").load("../html/table-content.html", callback);
}

var addExercise = 	function(e) {
	e.preventDefault();

	var muscle = $('#muscle-select').find(':selected').data('muscle');

	var params = $(this).serialize() + "&userId=" + userId + "&muscleId=" +muscle.mid; 
	console.log(params);
	
    $.ajax(url_base + exercise_api,
	  {type: "POST",
		  dataType: "json",
		  data: params,
		  	success: function(data) {
			  	console.log(data);
			  	var t = new Exercise(data);
		   		$("#maintable").append(t.makeDiv());

			},
			error: function (xhr, ajaxOptions, thrownError) {
		        alert(xhr.status);
		        alert(thrownError);
		      }

		});
}

//add routine
var addRoutine = function(e) {
	e.preventDefault();

	var params = $(this).serialize() + "&userId=" + userId; 
	console.log(params);
	
    $.ajax(url_base + routine_api,
	  {type: "POST",
		  dataType: "json",
		  data: params,
		  	success: function(data) {
			  	console.log(data);
			  	var r = new Routine(data);
		   		$("#maintable").append(r.makeDiv());

			},
			error: function (xhr, ajaxOptions, thrownError) {
		        alert(xhr.status);
		        alert(thrownError);
		      }

		});
}



var did;
/* Load in the individual exercise */
var load_dayId= function(eid, callback){
	var params = "?eid=" + eid + "&all=0";
	var url_get = url_base + day_api + params;
	console.log(url_get);

	$.ajax({
	        url: url_get,
	        type: 'GET',
	        success: function(res) {
	        	console.log(res);
	        	did = res.did;
	        	callback(did);
	        }

	    });
}

var sets= [];


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
	        console.log(xhr);
	      }

	});
	row.remove();
}

var delete_routine = function(rid, row){
	console.log("Delete routine");
	var params = "rid="+rid;
    $.ajax(url_base + routine_api,
    {type: "POST",
	  dataType: "json",
	  data: params,
	  	success: function(data) {
		  	console.log(data);
		  	
		},
		error: function (xhr, ajaxOptions, thrownError) {
	        console.log(xhr.status);
	        console.log(thrownError);
	      }

	});
	row.remove();
}



var clear_table = function (name) {
	$("#maintable").empty();
	$("#maintable").append("<tr><th>"+name+"</th><th></th></tr>");

}

var disable_add_exercise = function(){
	$('#btnAddExercise').css('display', 'none');
}

var disable_add_routine = function(){
	$('#btnAddRoutine').css('display', 'none');
}


var enable_add_exercise = function(){
	$('#btnAddExercise').css('display', 'block');
}

var enable_add_routine = function(){
	$('#btnAddRoutine').css('display', 'block');
}


