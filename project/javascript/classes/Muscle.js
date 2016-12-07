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


Muscle.prototype.makeOption = function() {
    var option = $("<option>"+this.name+"</option>");

    option.data('muscle', this);

    return option;
};

