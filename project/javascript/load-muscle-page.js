var load_muscle_page = function(muscle){
		
	get_exercises_by_muscle(muscle);


	}
}

var get_exercises_by_muscle = function(muscle){
	var params = "?userId=" + did + "?mid=" + mid;
	//var url_get = url_base + sets_api + params;
	//where does this sets_api variable come from?

	clear_table();

	$.ajax({
        url: url_get,
        type: 'GET',
        success: function(res) {
        	for (var i=0; i<res.length; i++) {
   				var ebyMuscle = new ExerciseByMuscle(res[i]);
   				$('#exercise-muscle-table').append(ebyMuscle.makeDiv());
   			}
        }

    });
}

var clear_table = function () {
	$("#maintable").empty();
	//$("#maintable").append("<tr><th>"+name+"</th><th></th></tr>");

}