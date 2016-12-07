var Set = function(set_json){
	this.sid = set_json.sid;
	this.reps = set_json.reps;
	this.weight = set_json.weight;
	this.did = set_json.did;
}

Set.prototype.makeDiv = function() {
    var cdiv = $("<tr></tr>");

    var tddiv = $('<td>reps: ' + this.reps + ' | weight: ' + this.weight +'</td>');

    var tddiv2 = $('<td><span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></td>');
    tddiv2.addClass('deleteSet');

    cdiv.append(tddiv);
    cdiv.append(tddiv2);
    
    cdiv.data('set', this);

    return cdiv;
}