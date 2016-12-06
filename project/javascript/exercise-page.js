var url_base = "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/cvburnha/project";
var day_api = "/backend/day-api.php";
var exercise_api = "/backend/exercise-api.php";
var muscle_api = "/backend/muscle-api.php";
var routine_api = "/backend/routine-api.php";
var routine_exercise_api = "/backend/routines-exercise-api.php";
var sets_api = "/backend/sets-api.php";

var userId; 
$(document).ready(function () {

	userId = localStorage.getItem("usernameID");



});

var show_exercises = function(){
	/* Clear body */

	$('#exercise_sidebar').on('submit',
		function(e) {
			var params = "?userId=" + userId;

			var url_get = url_base + exercise_api + params;
			console.log(url_get);

			$.ajax({
			        url: url_get,
			        type: 'GET',
			        success: function(res) {
			        	localStorage.setItem("usernameID", res.id);
			            console.log(res);
						$(location).attr('href', url_base + '/html/exercise_page.html');
			        }

			    });

	});
}