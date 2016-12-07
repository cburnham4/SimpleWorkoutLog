var Routine  = function(routine_json){
	this.rid = routine_json.rid;
	this.name = routine_json.name;
};

Routine.prototype.makeDiv = function() {
    var cdiv = $("<tr></tr>");

    var tddiv = $("<td>"+this.name+"</td>");
    tddiv.addClass('openRoutine');

    var tddiv2 = $('<td><span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></td>');
    tddiv2.addClass('deleteRoutine');

    cdiv.append(tddiv);
    cdiv.append(tddiv2);
    
    cdiv.data('routine', this);

    return cdiv;
};