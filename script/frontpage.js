// Wait for the DOM
$(function(){

	readData();
	clickEvents();

	var frontContent = '<img class="img-responsive" src="img/logga.png"/><div class="front-articles"></div>';
	// (Old headertext) '<h2 class="text-center">This is the Amazing Blog</h2>';

    // Add content to page
    $('#maincontent').append(frontContent);

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

		var article ='<articles class="col-xs-12">';

		// loop through result array
		for(var i = 0; i < data.length; i++){
			//console.log(data[i]);
			article += '<div class="row">' +
				"<div class='col-sm-6 col-md-6'><h3 class='frontH3' style='color:#428bca'>" + data[i].title + "</h3></div>" +
				"<div class='col-sm-6 col-md-6 text-right'><h3>" + data[i].publicationDate + "</h3></div>" +
				"<p class='col-xs-12'>" + data[i].summary + "</p>" +
				"<p class='readMore col-xs-12'>Continue reading..</p>" +
				'<p class="article-id">' + data[i].id + "</p>" +
				"</div><hr>";
		}

		article += "</articles";
		// add the html to the dom
		// console.log(html);
		$('.front-articles').html(article);
	}

	// SHOW THE CLICKED ARTICLE ===============================================================================================/
	function clickEvents() {
		// Event when pushing editbutton on article row
		$(document).on('click', 'h3, .readMore', function(){

			var idx = $(this).closest(".row").find(".article-id").text();
			console.log(idx);

			jQuery.ajax({
				type: "POST", // HTTP method POST or GET
				url: "php/queries.php", //Where to make Ajax calls
				dataType:"json", // Data type, HTML, json etc.
				data: { 'idx': idx, 'type': 'thisArticle' }, //Form variables
				success:function(response){
					//$("#responds").append(response);
					$("articles").remove();
					$("#maincontent>h2:first").remove();
					console.log(response);
					console.log( "title: ", response[0]['title'] );
					console.log( "summary: ", response[0]['summary'] );
					console.log( "content: ", response[0]['content'] );
					console.log( "date: ", response[0]['publicationDate'] );
					console.log( "id: ", response[0]['id'] );

					var clickedArticleShow = "<div class='row col-xs-12'>";

					clickedArticleShow += "<div class='col-sm-6 col-md-6'><h1 class='blog-post-title' style='color:#428bca'>" +
					response[0]['title'] + "</h1></div>" +
					"<h4 class='col-sm-6 col-md-6 text-right'>" +	response[0]['publicationDate'] + "</h4>" +
					"<h4 class='col-xs-12'>" + response[0]['summary'] + "</h4>" +
					"<p class='col-xs-12'>" + response[0]['content'] + "</p>" +
					"<hr class='col-xs-12'></div>";

					clickedArticleShow += "</div>";

					$('.front-articles').append(clickedArticleShow);

					//updateArticle(response);
					//saveArticleToDraft(response);
				},
				error:function (xhr, ajaxOptions, thrownError){
					$("#FormSubmit").show(); //show submit button
					//$("#LoadingImage").hide(); //hide loading image
					alert(thrownError);
				}
			});
		});
	}



	$('.searchByCategory').click( function(){
		console.log('yes');

		// Få fram Select i menyn för taggar (category)
		$.ajax({
			type: "POST",
			url: 'php/queries.php',//the script to call to get data
			dataType: 'json',//data format
			data: { 'type': 'getArticleTags' },
			success: function(data)//on recieve of reply
			{
				console.log(data);
				GetOutFormTagFunction(data);
			},
			error:function (xhr, ajaxOptions, thrownError){
				alert(thrownError);
			}
		});

		function GetOutFormTagFunction(tag){
			var searchTagForm  = '<div class="col-xs-12">' +
			'<form>' +
            '<select class="tags" name="taglist" form="taglist">';

            for(var i = 0; i < tag.length; i++){
				console.log(tag[i].name);
				searchTagForm += '<option value="'+ (i+1) +'">'+tag[i].name+'</option>' ;
            }

            searchTagForm += '</select>' +
							'</form>' +
							'</div>';

			$('.tag-select').html(searchTagForm);

			//console.log( $( ".tags" ).val() );
			//var tags = $( ".tags" ).val();

			$( ".tags" ).change(function() {
				//alert( $( ".tags" ).val()	);
				var tags = $( ".tags" ).val();

				// get the article  tag selected
				$.ajax({
					type: "POST",
					url: 'php/queries.php',//the script to call to get data
					dataType: 'json',//data format
					data: { 'type': 'showAllArticleByTag', 'tags': tags },
					success: function(data)//on recieve of reply
						{
						//console.log(data);
						console.log(data, tags);

						var article ='<articles class="col-xs-12">';

						// loop through result array
						for(var i = 0; i < data.length; i++){
							//console.log(data[i]);
							article += '<div class="row">' +
								"<div class='col-sm-6 col-md-6'><h3 style='color:#428bca'>" + data[i].title + "</h3></div>" +
								"<div class='col-sm-6 col-md-6 text-right'><h3>" + data[i].publicationDate + "</h3></div>" +
								"<p class='col-xs-12'>" + data[i].summary + "</p>" +
								"<p class='readMore col-xs-12'>Continue reading..</p>" +
								'<p class="article-id">' + data[i].id + "</p>" +
								"</div><hr>";
						}

						article += "</articles";
						// add the html to the dom
						// console.log(html);
						$('.front-articles').html(article);

					},
					error:function (xhr, ajaxOptions, thrownError){
						alert(thrownError);
					}
				});
			});

		}


	});



	$('.searchByDate').click( function(){
		console.log('yes');

		var searchDateForm  = '<div class="col-xs-12">' +
          '<form>' +
            '<select class="year" name="year">';

            var myDate = new Date();
			var year = myDate.getFullYear();
			for(var i = 2010; i < year+1; i++){
				searchDateForm += '<option value="'+i+'">'+i+'</option>';
				}

            searchDateForm += '</select>' +
							'</form>' +
							'</div>';

			$('.tag-date').html(searchDateForm);



		// om man ändrar på select fältet så händer detta
		$( ".year" ).change(function() {

		var year = $( ".year" ).val();
		// alert( year );

			// get the article  tag selected
			$.ajax({
				type: "POST",
				url: 'php/queries.php',//the script to call to get data
				dataType: 'json',//data format
				data: { 'type': 'showAllArticleByYear', 'year': year },
				success: function(data)//on recieve of reply
						{
						//console.log(data);
						console.log(data);

						var article ='<articles class="col-xs-12">';

						// loop through result array
						for(var i = 0; i < data.length; i++){
							//console.log(data[i]);
							article += '<div class="row">' +
								"<div class='col-sm-6 col-md-6'><h3 style='color:#428bca'>" + data[i].title + "</h3></div>" +
								"<div class='col-sm-6 col-md-6 text-right'><h3>" + data[i].publicationDate + "</h3></div>" +
								"<p class='col-xs-12'>" + data[i].summary + "</p>" +
								"<p class='readMore col-xs-12'>Continue reading..</p>" +
								'<p class="article-id">' + data[i].id + "</p>" +
								"</div><hr>";
						}

						article += "</articles";
						// add the html to the dom
						// console.log(html);
						$('.front-articles').html(article);

					},
					error:function (xhr, ajaxOptions, thrownError){
						alert(thrownError);
					}
				});
			});

	});

}); // End of "Wait for DOM"
