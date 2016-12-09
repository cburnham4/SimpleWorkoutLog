var load_muscle_page = function(muscle){
  console.log("loaded muscle page");
     get_exercises_by_muscle(muscle);//, function(){
    //   for(var i = 0; i <exercises.length; i++){
    //     var e = exercises[i];
    //         $('#maindiv').append(e.makeDiv());
    //   }

    //   var count = $('#maindiv').children().length;

  //});




}

var exercises = [];
var get_exercises_by_muscle = function(muscle){
	var params = "?userId=" + userId + "&mid=" + muscle.mid;
	var url_get = url_base + muscle_api + params;
    exercises = [];
    $.ajax({
        url: url_get,
        dataType: "json",

        type: 'GET',
        success: function(res) {
            for (var i=0; i<res.length; i++) {
                var e= new Exercise(res[i]);
                exercises.push(e);        
                console.log(e.name);
                $("#exercise-muscle-table").append(e.makeDiv());    
            }
        }
    });
}
