var Exercise  = function(exercise_json){
	this.eid = exercise_json.eid;
	this.name = exercise_json.name;
	this.mid = exercise_json.mid;
};

Exercise.prototype.makeDiv = function() {
    var cdiv = $("<div></div>");

    $('#exercisediv').append('<tr><th>Number</th><th>Exercise</th></tr>');

    cdiv.data('exercise', this);

    return cdiv;
};

				// <div>
				// 	<table class="table table-hover">
				// 	    <tr>
				// 	    	<th>Number</th>
				// 		    <th>Exercise</th>
				// 		</tr>


				// 	</table>	

				// </div>