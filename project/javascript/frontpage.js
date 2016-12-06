var url_base = "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/cvburnha/project";

$(document).ready(function () {


	$('#new_account_form').on('submit',
	       function (e) {
		   e.preventDefault();
		   $.ajax(url_base + "/backend/users.php",
			  {type: "POST",
				  dataType: "json",
				  data: $(this).serialize(),
				  	success: function(data) {
				  		alert("success");
					  	console.log(data);
					  	if (data.id != null)
					  	{
					  		$(location).attr('href', url_base + '/html/exercise_page.html');
					  	}
					},
					error: function (xhr, ajaxOptions, thrownError) {
				        alert(xhr.status);
				        alert(thrownError);
				      }

				});

	       });

	$('#login_form').on('submit',
		function(e) {
			var params = $(this).serialize();

			var url_get = url_base + "/backend/users.php?" + params;
			console.log(url_get);

			$.ajax({
			        url: url_get,
			        type: 'GET',
			        success: function(res) {
			            console.log(res);
						$(location).attr('href', url_base + '/html/exercise_page.html');
			        },

			    });

			// $.ajax(
			// {
			// 	url: url_base + "/backend/users.php?" + params,
			// 	type: "GET",
			// 	success: function(res) {
			// 		alert(res);
			// 		console.log(res);
			// 		if (res != null)
			// 		{
			// 			console.log(url_base);
			// 			$(location).attr('href', url_base + '/html/exercise_page.html');
			// 		}
			// 	},
			// 	error: function (xhr, ajaxOptions, thrownError) {
			// 		alert("error");
			//         alert(xhr.status);
			//         alert(thrownError);
			//       }
			// });
	});

});