// Wait for the DOM
$(function(){

  // Create a loginHandler
  loginHandler = new LoginHandler();

  // Create a div;
  //var div = $('<div/>').appendTo('body');

  // Check if a user is logged in
  var user = loginHandler.getUser();
  // and show different things accordingly:
  if(user){
    // Html for adminarea
    var adminUser =
    '<div class="admincontent">' +
      'Du är inloggad som ' + user +
    '</div>';

    // Add content to page
    $('.loggin-text-and-function').append(adminUser);

    var adminLogout = '<div class="logout">Logga ut</div>';
    $('.logout').append(adminLogout);

    var adminContent =
    '<h3>Articles</h3>' +
      '<div class="admin-articles"></div><br>' +
      '<div class="form_style">' +
        '<form>' +
          '<label>Title</label>' +
          '<input type="text" class="title" name="title"><br>' +
          '<label>Summary</label>' +
          '<input type="text" class="summary" name="summary"><br>' +
          '<label>Content</label>' +
          '<textarea name="content_txt" id="contentText" cols="15" rows="5"></textarea><br>' +
          '<label>Date</label>' +
          '<input class="date" type="date">' +
          '<button id="FormSubmit">Add record</button>' +
        '</form>' +
      '</div>';

    // Add content to page
    $('#maincontent').append(adminContent);
  }
  else {
    var loggedOut = '<div class="loggedout">' +
    'Du är inte inloggad' +
    '</div>';
    $('.loggin-text-and-function').append(loggedOut);

    var adminLogin = '<div class="login">Logga in</div></div>';
    $('.logintext').append(adminLogin);

  }

  // A form for registration/login
  var form = $(
    '<div class="row">' +
    '<div class="col-sm-4"></div>' +
    '<div class="col-sm-4">' +

    '<form class="loginform">' +
    '<label for="username">Användarnamn:</label>' +
    '<input class="col-xs-12" type="text" id="username" name="username" placeholder="Användarnamn">' +
    '<label for="password">password:</label>' +
    '<input class="col-xs-12" type="text" id="password" name="password" placeholder="Lösenord">' +
    '<input class="submit" type="submit" value="Skicka">' +
    '</form>' +

    '</div>' +
    '<div class="col-sm-4"></div>' +
    '</div>'
  );

 // When the user clicks login
  $('.login').click(function(){
    form.find('.submit').val("Logga in");
    form.submit(loginAttempt);
    form.appendTo('#maincontent');
  });

  // Do on login attempt
  function loginAttempt(e){
    e.preventDefault();
    var username = $(this).find('#username').val();
    var password = $(this).find('#password').val();
    // If login is successful
    if(loginHandler.login(username,password)){
      // Reload the page - just to test state
      // (that php rembembers it session values)
      // we DO NOT need this in a real app - it's crude...
      location.reload();
    }
    // Otherwise...
    else {
      alert("No such combination... Try again...");
      // Empty form
      this.reset();
    }
  }

  // valentin - logga ut funktionen ovan funkade inte så skapade denna funktionen
  $('.logout').click( function(){
    loginHandler.logout();
    location.reload();
  });

  /*
   // When the user clicks register
  div.on("click",".register",function(){
    form.find('.submit').val("Registrera dig");
    form.submit(registrationAttempt);
    form.appendTo('body');
  });


  // Do on registration attempt
  function registrationAttempt(e){
    e.preventDefault();
    var username = $(this).find('#username').val();
    var password = $(this).find('#password').val();
    // If login is successful
    if(loginHandler.registerUser(username,password)){
      // Reload the page - just to test state
      // (that php rembembers it session values)
      // we DO NOT need this in a real app - it's crude...
      location.reload();
    }
    // Otherwise...
    else {
      alert("Already taken... Try again...");
      // Empty form
      this.reset();
    }
  }
  */
  /*
  // When the user clicks logout
  $(document).on("click",".logout",function(){
    loginHandler.logout();
    // Reload the page - just to test state
    // (that php rembembers it session values)
    // we DO NOT need this in a real app - it's crude...
    location.reload();
  });
  */




//==========================================================================================================READ DATA FROM DATABASE/
  // För att hämta information från phpDisplay genom ajax
  // skickar datan (som är objekt på varje rad i databasen) till funktionen tableOfDataAdmin
  // som jag sedan visar geno att använda html till diven på adminsidan
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

  readData();
  clickEvents();

  function tableOfDataAdmin(data){
    console.log("from the function tableOfDataAdmin ",data);

    var tableOfTheArticles = "<table>";
    tableOfTheArticles += "<thead><tr>" +
    "<th>Publication Date</th>" +
    "<th>Article</th>" +
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



//===============================================================================================CREATE AN ARTICLE /
  //##### send add record Ajax request to create.php #########
  $("#FormSubmit").click(function (e) {
    e.preventDefault();
    if($("#contentText").val()==='')
    {
        alert("Please enter some text!");
        return false;
    }

    $("#FormSubmit").hide(); //hide submit button
    //$("#LoadingImage").show(); //show loading image

    var title = $(".title").val(); //build a post data structure
    var summary = $(".summary").val(); //build a post data structure
    var content = $("#contentText").val(); //build a post data structure
    var date = $(".date").val(); //build a post data structure

    console.log(content, title, summary, date);

    jQuery.ajax({
    type: "POST", // HTTP method POST or GET
    url: "php/queries.php", //Where to make Ajax calls
    dataType:"text", // Data type, HTML, json etc.
    data: { 'title': title, 'summary': summary, 'content': content, 'date': date, 'type': 'insert' }, //Form variables
    success:function(response){
        //$("#responds").append(response);
        console.log(response);
        $(".title, .summary, #contentText").val(''); //empty text field on successful
        $("#FormSubmit").show(); //show submit button
        //$("#LoadingImage").hide(); //hide loading image
        readData();
      },
      error:function (xhr, ajaxOptions, thrownError){
        $("#FormSubmit").show(); //show submit button
        //$("#LoadingImage").hide(); //hide loading image
        alert(thrownError);
      }
    });
  });


//===============================================================================================SHOW THE CLICKED ARTICLE/


function clickEvents() {
  // Event when pushing editbutton on article row
  $(".admin-articles").on('click', '#editB', function(){
    //console.log( $(this).text());

    var idx = $(this).closest("tr").find(".article-id").text();
    console.log(idx);

    jQuery.ajax({
    type: "POST", // HTTP method POST or GET
    url: "php/queries.php", //Where to make Ajax calls
    dataType:"json", // Data type, HTML, json etc.
    data: { 'idx': idx, 'type': 'thisArticle' }, //Form variables
    success:function(response){
        //$("#responds").append(response);
        $(".admin-articles, .form_style").hide();
        console.log(response);
        console.log( "title: ", response[0]['title'] );
        console.log( "summary: ", response[0]['summary'] );
        console.log( "content: ", response[0]['content'] );
        console.log( "date: ", response[0]['publicationDate'] );
        console.log( "id: ", response[0]['id'] );

        var clickedArticleShow = "<form>";
          clickedArticleShow += '<label>Title</label>' +
          '<input type="text" class="updateTitle" name="title" value=" ' + response[0]['title']  + '"><br>' +
          '<label>Summary</label>' +
          '<input type="text" class="updateSummary" name="summary" value="' + response[0]['summary'] + '"><br>' +
          '<label>Content</label>' +
          '<textarea name="content_txt" id="updateContentText" cols="15" rows="5">'+ response[0]['content'] +'</textarea><br>' +
          '<label>Date</label>' +
          '<input class="updateDate" type="date" value="' + response[0]['publicationDate'] + '">' +
          '<button id="FormUpdate">Update record</button>';
        clickedArticleShow += "</form>";

        $('#maincontent').append(clickedArticleShow);

        updateArticle(response);
      },
      error:function (xhr, ajaxOptions, thrownError){
        $("#FormSubmit").show(); //show submit button
        //$("#LoadingImage").hide(); //hide loading image
        alert(thrownError);
      }
    });
  });

  // Event when clicking deletebutton on article row
  $(".admin-articles").on('click', '#deleteB', function(){
    // Find id of clicked row
    var idx = $(this).closest("tr").find(".article-id").text();
    // Remove tablerow after getting id
    $(this).closest("tr").remove();
    // Start ajax request
    jQuery.ajax({
    type: "POST", // HTTP method POST or GET
    url: "php/queries.php", //Where to make Ajax calls
    dataType:"text", // Data type, HTML, json etc.
    data: { 'idx': idx, 'type': 'deleteArticle' }, //Form variables
    success:function(response){
        console.log("Article deleted from db");
      },
      error:function (xhr, ajaxOptions, thrownError){
        alert(thrownError);
      }
    });
  });
}


//===============================================================================================UPDATE ARTICLE/

function updateArticle(data){
  $("#FormUpdate").click(function (e) {
    e.preventDefault();
    //console.log(data);

        var title = $(".updateTitle").val(); //build a post data structure
        var summary = $(".updateSummary").val(); //build a post data structure
        var content = $("#updateContentText").val(); //build a post data structure
        var date = $(".updateDate").val(); //build a post data structure
        var idx = data[0]['id'];

    jQuery.ajax({
    type: "POST", // HTTP method POST or GET
    url: "php/queries.php", //Where to make Ajax calls
    dataType:"text", // Data type, HTML, json etc.
    data: { 'title': title, 'summary': summary, 'content': content, 'date': date, 'idx': idx, 'type': 'update' }, //Form variables
    success:function(data){

        console.log('update success');
        console.log(data);

      },
      error:function (xhr, ajaxOptions, thrownError){
        //$("#LoadingImage").hide(); //hide loading image
        alert(thrownError);
      }
    });
  });
}















});
