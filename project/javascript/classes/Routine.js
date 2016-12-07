var Routine  = function(routine_json){
	this.rid = routine_json.rid;
	this.name = routine_json.name;
};

Routine.prototype.makeDiv = function() {
    var cdiv = $("<tr></tr>");
    cdiv.addClass('routine');

    cdiv.append('<td>'+this.name+'</td>');

    cdiv.data('exercise', this);

    return cdiv;
};

