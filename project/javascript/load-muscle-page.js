var load_muscle_page = function(muscle, e){
	console.log("loaded muscle page");
	get_exercises_by_muscle(muscle, function(){
    for(var i = 0; i <exercises.length; i++){
      var e = exercises[i];
          $('#exercise-muscle-table').append(e.makeDiv());
    }

  });

	console.log("done");

}

var exercises = [];
var get_exercises_by_muscle = function(muscle, callback){
	var params = "?userId=" + userId + "&mid=" + muscle.mid;
	var url_get = url_base + muscle_api + params;
  exercises = [];
	$.ajax({
        url: url_get,
        type: 'GET',
        success: function(res) {
        	
        	for (var i=0; i<res.length; i++) {
     				var e= new Exercise(res[i]);
            exercises.push(e);
     				console.log(e.name);
     				
            
   			  }
          callback();
        }
    });
}
