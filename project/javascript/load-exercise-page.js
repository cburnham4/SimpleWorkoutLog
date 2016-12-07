var load_exercise_page = function(exercise){
	console.log("load page " + exercise.name);

	load_dayId(exercise.eid, function(did){

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
						  	
						},
						error: function (xhr, ajaxOptions, thrownError) {
					        console.log(xhr);
					      }

					});

		    });


	});

   

}