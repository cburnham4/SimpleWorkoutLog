var Muscle = function(muscle_json){
	this.mid = muscle_json.mid;
	this.name = muscle_json.name;
};

Muscle.prototype.makeDiv = function() {
    var cdiv = $("<tr></tr>");

    cdiv.append('<td>'+this.name+'</td>');

    cdiv.data('muscle', this);

    return cdiv;
};