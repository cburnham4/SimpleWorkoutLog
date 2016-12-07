var Exercise  = function(exercise_json){
	this.eid = exercise_json.eid;
	this.name = exercise_json.name;
	this.mid = exercise_json.mid;
};

Exercise.prototype.makeDiv = function() {
    var cdiv = $("<tr></tr>");

    var tddiv = $("<td>'+this.name+'</td>");
    tddiv.addClass('openExercise');

    var tddiv2 = $('<td><span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></td>');
    tddiv2.addClass('deleteExercise');

    cdiv.append(tddiv);
    cdiv.append(tddiv2);
    
    cdiv.data('exercise', this);

    return cdiv;
};

