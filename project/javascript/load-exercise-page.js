var load_exercise_page = function(exercise){
	console.log("load page " + exercise.name);



	load_dayId(exercise.eid, function(did){

		get_sets_from_day(did);

		console.log("load");

		 $('#submitSets').on('click', function(e) {
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
   				var s = new Set(res[i]);
   				/* TODO: Add to list */
   			}
        }

    });
}