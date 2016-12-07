var load_exercise_page = function(exercise){
	console.log("load page " + exercise.name);



	load_dayId(exercise.eid, function(did){

		get_sets_from_day(did);

		$('#current-workout-tab').on('click', function(e){
			$('#add-set-div').empty();

			$('#past-sets-tab').removeClass('active');
			$(this).addClass('active');
			console.log("past sets clicked ");

		}); 

		$('#past-sets-tab').on('click', function(e){
			$('#add-set-div').empty();

			$('#current-workout-tab').removeClass('active');
			$(this).addClass('active');
			console.log("past sets clicked ");

		}); /* End past tab clicked */

		 $('#submitSets').on('click', function(e) {
	 			e.preventDefault();
				var reps = $("#reps").val();
				var weight = $("#weight").val();

				var params = "reps=" +reps +"&weight=" +weight +"&did=" +did;
				console.log(params);

				$.ajax(url_base + sets_api,
				    {type: "POST",
					  dataType: "json",
					  data: params,
					  	success: function(data) {
					  		alert("success");
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
	console.log(url_get);
	/* Empty sets list */
	sets = [];

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