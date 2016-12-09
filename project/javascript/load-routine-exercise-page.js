	


	var load_routine_exercise_page = function (routine) {

		/* Get routine exercises into the routine exercise dropdown */
		load_exercises_initial();


	}

	var load_exercises_initial = function(){
		
		var url_get = url_base + exercise_api;

		$.ajax({
	        url: url_get,
	        type: 'GET',
	        success: function(res) {
	        	for (var i=0; i<res.length; i++) {
	   				var ex = new Exercise(res[i]);
	   				$("#exercise-select").append(ex.makeOption());
	   			}
	        }
		});

	}