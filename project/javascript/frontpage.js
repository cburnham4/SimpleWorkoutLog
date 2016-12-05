var url_base = "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/cvburha/project";

$(document).ready(function () {


	$('#new_account_form').on('submit',
			       function (e) {
				   e.preventDefault();
				   $.ajax(url_base + "/backend/users.php",
					  {type: "POST",
						  dataType: "json",
						  data: $(this).serialize(),
						  	success: function(data) {

							  	console.log(data);
							  	if (data.id != null)
							  	{
							  		$(location).attr('href', url_base + '/html/exercise_page.html');
							  	}
							}
						});

			       });

});