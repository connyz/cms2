// Wait for the DOM
$(function(){

	readData();
	//clickEvents();

	var adminContent = '<h3>Articles</h3><div class="admin-articles"></div>';

    // Add content to page
    $('#maincontent').append(adminContent);

	function readData(){
		$.ajax({
			type: "POST",
			url: 'php/queries.php',//the script to call to get data
			dataType: 'json',//data format
			data: { 'type': 'showAll' },
			success: function(data)//on recieve of reply
				{
				//console.log(data);
				tableOfDataAdmin(data);
			},
			error:function (xhr, ajaxOptions, thrownError){
				alert(thrownError);
			}
		});
	}

	function tableOfDataAdmin(data){
		//console.log("from the function tableOfDataAdmin ",data);

		var tableOfTheArticles ='<table class="col-xs-12">';
		tableOfTheArticles += "<thead><tr>" +
			"<th>Publication Date</th>" +
			"<th>Article</th>" +
			"<th>Options</th>" +
			"</tr></thead>";
		// loop through result array
		for(var i = 0; i < data.length; i++){
			//console.log(data[i]);
			tableOfTheArticles += '<tr>' +
				"<td>" + data[i].publicationDate + "</td>" +
				"<td>" + data[i].title + "</td>" +
				'<td class="article-id">' + data[i].id + "</td>" +
				"<td><button id='editB'>Edit</button><button id='deleteB'>Delete</button></td>" +
				"</tr>";

		// ta fram id
		//console.log( data[i].id );
    }

	tableOfTheArticles += "</table>";
	// add the html to the dom
	// console.log(html);
	$('.admin-articles').html(tableOfTheArticles);
  }

}); // End of "Wait for DOM"
