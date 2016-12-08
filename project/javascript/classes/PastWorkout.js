var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];  

var PastWorkout = function(set_json){
	this.did = set_json.did;
    this.date = new Date(set_json.date);
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var fullDate = (monthNames[monthIndex] + ' ' + day + ' ' + year);

    var sets = [];
    for(var i = 0; i < set_json.past_sets.length; i++){
        sets[i] = new Set(set_json.past_sets[i]);
    }

}

PastWorkout.prototype.makeDiv = function() {
    var cdiv = $("<tr></tr>");
    var td = $("<td></td>");

    for (var i = 0; i < sets.length; i++) {
        //var tddiv = $('<td>reps: ' + sets.reps + ' | weight: ' + this.weight +'</td>');
        var tddiv = $('reps: ' + sets[i].reps + '| weight: ' + sets[i].weight + '<br>');

        td.append(tddiv);
    }

    cdiv.append(td);
    
    cdiv.data('pastworkout', this);

    return cdiv;
}