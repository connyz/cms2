// Wait for the DOM
$(function(){

	readData();
	clickEvents();

	var frontContent = '<h2 class="text-center">This is the Amazing Blog</h2><div class="front-articles"></div>';

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
				"<div class='col-sm-6 col-md-6'><h3 style='color:#428bca'>" + data[i].title + "</h3></div>" +
				"<div class='col-sm-6 col-md-6 text-right'><h3>" + data[i].publicationDate + "</h3></div>" +
				"<p class='col-xs-12'>" + data[i].summary + "</p>" +
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
		$(document).on('click', 'h3', function(){

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
					"<h4 class='col-xs-12'>" +	response[0]['publicationDate'] + "</h4>" +
					"<h4 class='col-xs-12'>" + response[0]['summary'] + "</h4>" +
					"<p class='col-xs-12'>" + response[0]['content'] + "</p>" +
					"<hr class='col-xs-12'></div>";

					clickedArticleShow += "</div>";

					$('#maincontent').append(clickedArticleShow);

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

}); // End of "Wait for DOM"

/*
<article>
    <h2><a href="singlepost.html">Aries Sun Sign March 21 - April 19</a></h2>

    <div class="row">
        <div class="group1 col-sm-6 col-md-6">
            <span class="glyphicon glyphicon-folder-open"></span>  <a href="#">Signs</a>
                     <span class="glyphicon glyphicon-bookmark"></span> <a href="#">Aries</a>,
                <a href="#">Fire</a>, <a href="#">Mars</a>
        </div>
        <div class="group2 col-sm-6 col-md-6">
                <span class="glyphicon glyphicon-pencil"></span> <a href="singlepost.html#comments">20 Comments</a>
                  <span class="glyphicon glyphicon-time"></span> August 24, 2013 9:00 PM
        </div>
    </div>

    <hr>

    <img src="http://placehold.it/900x300" class="img-responsive">

    <br />

    <p class="lead">Aries is the first sign of the zodiac, and that's pretty much how those born under this sign see themselves: first. Aries are the leaders of the pack, first in line to get things going. Whether or not everything gets done is another question altogether, for an Aries prefers to initiate rather than to complete. Do you have a project needing a kick-start? Call an Aries, by all means. The leadership displayed by Aries is most impressive, so don't be surprised if they can rally the troops against seemingly insurmountable odds.</p>

    <p>The symbol of Aries is the Ram, and that's both good and bad news. Impulsive Aries might be tempted to ram their ideas down everyone's throats without even bothering to ask if they want to know. It's these times when you may wish Aries' symbol were a more subdued creature, more lamb than ram perhaps. You're not likely to convince the Ram to soften up; these folks are blunt and to the point. Along with those qualities comes the sheer force of the Aries nature, a force that can actually accomplish a great deal. Much of Aries' drive to compete and to win comes from its Cardinal Quality. Cardinal Signs love to get things going, and Aries exemplifies this even better than Cancer, Libra or Capricorn.</p>

    <p class="text-right">
        <a href="singlepost.html" class="text-right">
            continue reading...
        </a>
    </p>

    <hr>
</article>
*/