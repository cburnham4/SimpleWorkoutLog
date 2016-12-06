var Exercise  = function(exercise_json){
	this.eid = exercise_json.eid;
	this.name = exercise_json.name;
	this.mid = exercise_json.mid;
};

Exercise.prototype.makeDiv = function() {
    var cdiv = $("<tr></tr>");

    cdiv.append('<td>'+this.name+'</td>');

    cdiv.data('exercise', this);

    return cdiv;
};

