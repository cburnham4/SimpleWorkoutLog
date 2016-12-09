var load_exercise_page = function(exercise){
	load_dayId(exercise.eid, function(did){

		disable_add_exercise();
		disable_add_routine();	

		get_sets_from_day(did);

		/* Display the current workout tab */
		$(document).on('click','#current-workout-tab', function(e){
			e.preventDefault();
			$('#add-set-div').css('display', 'block');

			$('#past-sets-tab').removeClass('active');
			$(this).addClass('active');

			clear_sets_table();
			get_sets_from_day(did);
		}); 

		/* Show the past workouts */
		$(document).on('click', '#past-sets-tab',function(e){
			e.preventDefault();

			$('#add-set-div').css('display', 'none');

			clear_sets_table();

			$('#current-workout-tab').removeClass('active');
			$(this).addClass('active');

			var params = "?eid="+exercise.eid+"&all=1";
			var url_get = url_base + day_api + params;

			$.ajax({
		        url: url_get,
		        type: 'GET',
		        dataType: 'json',
		        success: function(res) {
		        	for(var i = res.length-1; i >= 0; i--){
		        		var past_workout = new PastWorkout(res[i]);
		        		$('#completed-sets-table').append(past_workout.makeDiv());
		        	}
		        }

		    });

		}); /* End past tab clicked */

			/* submit a new set */
		 $(document).on('click','#submitSets', function(e) {
	 			e.preventDefault();
				var reps = $("#reps").val();
				var weight = $("#weight").val();

				var params = "reps=" +reps +"&weight=" +weight +"&did=" +did;

				$.ajax(url_base + sets_api,
				    {type: "POST",
					  dataType: "json",
					  data: params,
					  	success: function(data) {
						  	console.log(data);
						  	var set =  new Set(data);
						  	$('#completed-sets-table').append(set.makeDiv());
						},
						error: function (xhr, ajaxOptions, thrownError) {
					        console.log(xhr);
					      }

					});
		    }); /* End submit */

		$(document).on('click','#maindiv td.deleteSet',
		   null,
		   function (e) {
		   	e.preventDefault();
		       var set = $(this).parent().data('set');
		       /* Run ajax call to get the exercise stuff */

	     	   delete_set(set.sid, $(this).parent());
	    });

	});/* Load page from did end */

}

var get_sets_from_day = function(did){
	var params = "?did=" + did;
	var url_get = url_base + sets_api + params;
	clear_sets_table();


	$.ajax({
        url: url_get,
        type: 'GET',
        success: function(res) {
        	for (var i=0; i<res.length; i++) {
   				var set = new Set(res[i]);
   				$('#completed-sets-table').append(set.makeDiv());
   			}
        }

    });
}

var delete_set = function(sid, row){
	console.log("Delete set");
	var params = "sid="+sid;
    $.ajax(url_base + sets_api,
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

var clear_sets_table = function(){
	$("#completed-sets-table tbody").remove();
	$("#completed-sets-table").append("<tr><th>Completed Sets</th></tr>");
}

var remove_add_exercise_clicks = function(){
	$(document).off("click", "#past-sets-tab");
	$(document).off("click", '#current-workout-tab');
	$(document).off("click", '#submitSets');
}