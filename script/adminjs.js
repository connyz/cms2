// Wait for the DOM
$(function(){

  // Create a loginHandler
  loginHandler = new LoginHandler();

  // Create a div;
  var div = $('<div/>').appendTo('body');

  // Check if a user is logged in
  var user = loginHandler.getUser();
  // and show different things accordingly:
  if(user){
    // Html for adminarea
    var adminContent =
    '<div class="admincontent">' +
      'Du är inloggad som ' + user + '.' +
      '<div class="logout">Logga ut</div>' +

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
      '</div>' +
    '</div>';
    // Add content to page
    $('#maincontent').append(adminContent);
  }
  else {
    div.html(
      'Du är inte inloggad.' +
      '<div class="login">Logga in.</div>'
    );
  }

  // A form for registration/login
  var form = $(
    '<form class="login">' +
    '<label for="username">Användarnamn:</label>' +
    '<input type="text" id="username" name="username">' +
    '<label for="password">password:</label>' +
    '<input type="text" id="password" name="password">' +
    '<input class="submit" type="submit" value="Skicka">' +
    '</form>'
  );

 // When the user clicks login
  div.on("click",".login",function(){
    form.find('.submit').val("Logga in");
    form.submit(loginAttempt);
    form.appendTo('body');
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

  // When the user clicks logout
  div.on("click",".logout",function(){
    loginHandler.logout();
    // Reload the page - just to test state
    // (that php rembembers it session values)
    // we DO NOT need this in a real app - it's crude...
    location.reload();
  });

  // valentin - logga ut funktionen ovan funkade inte så skapade denna funktionen
  $('.logout').click( function(){
    loginHandler.logout();
    location.reload();
  });



//==========================================================================================================READ/
  // För att hämta information från phpDisplay genom ajax
  // skickar datan (som är objekt på varje rad i databasen) till funktionen tableOfDataAdmin
  // som jag sedan visar geno att använda html till diven på adminsidan
  function readData(){
    $.ajax({
      url: 'php/read.php',//the script to call to get data
      dataType: 'json',//data format
      success: function(data)//on recieve of reply
      {
        //console.log(data);
        tableOfDataAdmin(data);
        clickEvents(data);
      }
    });
  }

  readData();

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
      "</tr>";

      // ta fram id
      console.log( data[i].id );
    }

    tableOfTheArticles += "</table>";
    // add the html to the dom
    // console.log(html);
    $('.admin-articles').html(tableOfTheArticles);
  }




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
    url: "php/create.php", //Where to make Ajax calls
    dataType:"text", // Data type, HTML, json etc.
    data: { 'title': title, 'summary': summary, 'content': content, 'date': date }, //Form variables
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


function clickEvents(data) {

  $(".admin-articles").on('click', 'table tr', function(){
    var x = $(this).text();
    alert(x);


    // the x is the text from this clicked tr row
    // get the last character from this x(text) that is the id
    // then use ajax on this and send it to databases to get the content of this row
    // try to open it with a new page or a new screen.

    /*
    var ids = this.id;
    $.ajax({
      url:"sql",
      cache:false,
      data: {
        action: "getBookByISBN",
        isbn: this.id
      },
      success:function(data){
        console.log("Book details",data[0]);
        // gör function som får ut info om boken på main content.
        renderBookdetails(data[0]);
      },
      error:function(errordata){
        console.log(errordata.responseJSON);
      }
    });
    */

  });
}
















});
