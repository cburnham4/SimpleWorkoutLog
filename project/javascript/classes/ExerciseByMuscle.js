var ExerciseByMuscle = function(set_json){


    this.mid = set_json.mid;
    this.name = set_json.name;

}

Muscle.prototype.makeDiv = function() {
    var cdiv = $("<tr></tr>");

    cdiv.append('<td>'+this.name+'</td>');

    cdiv.data('exercisebymuscle', this);

    return cdiv;
};