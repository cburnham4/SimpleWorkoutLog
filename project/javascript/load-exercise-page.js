var load_exercise_page = function(exercise){
	load_dayId(exercise.eid, function(did){

	get_sets_from_day(did);

	$(document).on('click','#current-workout-tab', function(e){
		e.preventDefault();
		$('#add-set-div').css('display', 'block');

		$('#past-sets-tab').removeClass('active');
		$(this).addClass('active');

		clear_sets_table();
		get_sets_from_day(did);

	}); 

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

	    });


	});

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

var clear_sets_table = function(){
	$("#completed-sets-table tbody").remove();
	$("#completed-sets-table").append("<tr><th>Completed Sets</th></tr>");
}