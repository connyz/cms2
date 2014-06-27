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
    '</div><h3>Articles</h3>' +
      '<div class="admin-articles"></div>';

    // Add content to page
    $('#maincontent').append(adminContent);
    //$('.form_style').hide();
  }
  else {
    $( '.centerized' ).hide();

    var loggedOut =
    '<div class="row">' +
      '<div class="col-sm-4"></div>' +
      '<div class="loggedout col-sm-4">' +
        'Du är inte inloggad logga in' +
        '<button class="login">här!</button>' +
      '</div>' +
    '</div>'
      ;
    $('.login-div').append(loggedOut); //.loggin-text-and-function

    /*
    var adminLogin =
    '<div class="row">' +
    '<div class="col-sm-4"></div>' +
      '<div class="login col-sm-4"><button>Logga in</button></div></div>' +
    '</div>';
    $('.login-div').append(adminLogin); //.logintext
    */

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
    '<input class="col-xs-12" type="password" id="password" name="password" placeholder="Lösenord">' +
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
    form.appendTo('.login-div'); //#maincontent
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




  // READ DATA FROM DATABASE ==========================================================================================================/
  // För att hämta information från phpDisplay genom ajax
  // skickar datan (som är objekt på varje rad i databasen) till funktionen tableOfDataAdmin
  // som jag sedan visar geno att använda html till diven på adminsidan

  readData();
  clickEvents();

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

  // READ & SHOW DATA FROM ARTICLE_DRAFTS ==================================================================================/
  function readDraftData(){

    var adminContent =
      '<div class="admin-articles"></div>' +
      '<div class="form_style">' +
      '</div>';

    // Add content to page
    $('#maincontent').append(adminContent);

    $.ajax({
      type: "POST",
      url: 'php/queries.php',//the script to call to get data
      dataType: 'json',//data format
      data: { 'type': 'showAllDrafts' },
      success: function(data)//on recieve of reply
      {
        tableOfDrafts(data);
      },
      error:function (xhr, ajaxOptions, thrownError){
        alert(thrownError);
      }
    });
  }

  function tableOfDrafts(data){
    //console.log("from the function tableOfDataAdmin ",data);

    var tableOfTheArticles = "<table>";
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
      "<td><button id='editDraftB'>Edit draft</button><button id='deleteDraftB'>Delete draft</button></td>" +
      "</tr>";

      // ta fram id
      //console.log( data[i].id );
    }

    tableOfTheArticles += "</table>";
    // add the html to the dom
    // console.log(html);
    $('.admin-articles').html(tableOfTheArticles);
  }

  // ADD NEW ARTICLE =================================================================================================/
  $('.new-article-btn-menu').click( function(){
    $("#maincontent>form:first").remove();
    $("#maincontent>h3:first").html("New article");
    $('.admin-articles').remove();
    $('.form_style').remove();

    $.ajax({
      type: "POST",
      url: 'php/queries.php',//the script to call to get data
      dataType: 'json',//data format
      data: { 'type': 'getTag' },
      success: function(data)//on recieve of reply
      {
        console.log(data);
        newArticle(data);
      },
      error:function (xhr, ajaxOptions, thrownError){
        alert(thrownError);
      }
    });

    function newArticle(tag){

      /*for(var i = 0; i < tag.length; i++){
        console.log(tag[i].name);
      }*/

      var newArticleForm  = '<div class="form_style col-xs-12">' +
          '<form>' +
            '<label>Title</label>' +
            '<input type="text" class="title col-xs-12" name="title"><br>' +
            '<label>Summary</label>' +
            '<input type="text" class="summary col-xs-12" name="summary"><br>' +
            '<label>Content</label>' +
            '<textarea name="content_txt" id="contentText" class="col-xs-12" cols="15" rows="5"></textarea>' +
            "<script type='text/javascript'>" +
              "CKEDITOR.replace( 'contentText' );" +
            "</script>" +
            '<br>' +
            '<label>Tagg</label>' +
            '<select class="tags" name="taglist" form="taglist">';

            for(var i = 0; i < tag.length; i++){
              console.log(tag[i].name);
              newArticleForm += '<option value="'+ (i+1) +'">'+tag[i].name+'</option>' ;
            }

            newArticleForm += '</select>' +
            '<label>Date</label>' +
            '<input class="date" type="date">' +
            '<button id="FormSubmit">Create article</button>' +
            '<button id="FormSubmitDraft">Save as draft</button>' +
          '</form>' +
        '</div>';



      $('#maincontent').append(newArticleForm);

              //var X = $( ".tags" ).val();
              //console.log(X);

    }

  });

  // CREATE AN ARTICLE ===============================================================================================/
  //##### send add record Ajax request to create.php #########
  $(document).on('click', "#FormSubmit", function (e) {
    e.preventDefault();
    if($(".title").val()==='')
    {
        alert("Please enter some title for article!");
        return false;
    }

    $("#FormSubmit").hide(); // hide submit button
    $("#FormSubmitDraft").hide(); // hide savedraft-button
    //$("#LoadingImage").show(); // show loading image

    var title = $(".title").val(); //build a post data structure
    var summary = $(".summary").val(); //build a post data structure
    var content = $("#contentText").val(); //build a post data structure
    var tags = $( ".tags" ).val();
    var date = $(".date").val(); //build a post data structure

    //console.log(content, title, summary, date);

    jQuery.ajax({
      type: "POST", // HTTP method POST or GET
      url: "php/queries.php", //Where to make Ajax calls
      dataType:"text", // Data type, HTML, json etc.
      data: { 'title': title, 'summary': summary, 'content': content, 'date': date, 'tags': tags, 'type': 'insert' }, //Form variables
      success:function(response){
          //$("#responds").append(response);
          console.log(response);
          $(".title, .summary, #contentText").val(''); //empty text field on successful
          $("#FormSubmit").show(); //show submit button
          $("#FormSubmitDraft").show(); //show draft button
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

  // SAVE ARTICLE AS DRAFT ===============================================================================================/
  $(document).on('click', "#FormSubmitDraft", function (e) {
    e.preventDefault();
    if($(".title").val()==='')
    {
      alert("Please enter some title for draft!");
      return false;
    }

    // Hide submitbuttons on form
    $("#FormSubmit").hide();
    $("#FormSubmitDraft").hide();

    var title = $(".title").val(); //build a post data structure
    var summary = $(".summary").val(); //build a post data structure
    var content = $("#contentText").val(); //build a post data structure
    var date = $(".date").val(); //build a post data structure

    console.log(content, title, summary, date);

    jQuery.ajax({
      type: "POST", // HTTP method POST or GET
      url: "php/queries.php", //Where to make Ajax calls
      dataType:"text", // Data type, HTML, json etc.
      data: { 'title': title, 'summary': summary, 'content': content, 'date': date, 'type': 'draftinsert' }, //Form variables
      success:function(response){
          //$("#responds").append(response);
          console.log(response);
          $(".title, .summary, #contentText").val(''); //empty text field on successful
          $("#FormSubmit").show(); //show submit button
          $("#FormSubmitDraft").show(); //show submit button
        },
       error:function (xhr, ajaxOptions, thrownError){
        $("#FormSubmit").show(); //show submit button
        $("#FormSubmitDraft").show(); //show submit button
        //$("#LoadingImage").hide(); //hide loading image
        alert(thrownError);
      }
    });
  });

  // SHOW THE CLICKED ARTICLE =============================conny==================================================================/
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
          console.log( "categoryId: ", response[0]['categoryId'] );
          console.log( "date: ", response[0]['publicationDate'] );
          console.log( "id: ", response[0]['id'] );

          var clickedArticleShow = "<form>";
            clickedArticleShow += '<label>Title</label>' +
            '<input type="text" class="updateTitle col-xs-12" name="title" value="' + response[0]['title']  + '"><br>' +
            '<label>Summary</label>' +
            '<input type="text" class="updateSummary col-xs-12" name="summary" value="' + response[0]['summary'] + '"><br>' +
            '<label>Content</label>' +
            '<textarea name="content_txt" class="col-xs-12" id="updateContentText" cols="15" rows="5">'+ response[0]['content'] +'</textarea>' +
            "<script type='text/javascript'>" +
              "CKEDITOR.replace( 'updateContentText' );" +
            "</script>" +
            '<br>' +
            '<label>Tagg</label>' +
            '<p class="tagOnThisArticle"></p>';

            $.ajax({
              type: "POST",
              url: 'php/queries.php',//the script to call to get data
              dataType: 'json',//data format
              data: { 'type': 'getTagByArticleId', 'idx': response[0]['id'] },
              success: function(data)//on recieve of reply
              {
                console.log( data[0].name );
                $('.tagOnThisArticle').append(data[0].name);
              },
              error:function (xhr, ajaxOptions, thrownError){
                alert(thrownError);
              }
            });




            clickedArticleShow += '<label>Date</label>' +
            '<input class="updateDate" type="date" value="' + response[0]['publicationDate'] + '">' +
            '<button id="FormUpdate">Update article</button>' + '<button id="updateUnpublish">Save as draft</button>';
          clickedArticleShow += "</form>";

          $('#maincontent').append(clickedArticleShow);

          updateArticle(response);
          saveArticleToDraft(response);
        },
        error:function (xhr, ajaxOptions, thrownError){
          $("#FormSubmit").show(); //show submit button
          //$("#LoadingImage").hide(); //hide loading image
          alert(thrownError);
        }
      });
    });

    // Event when pushing edit draft on draft list
    $(document).on('click', '#editDraftB', function(){
      //console.log( $(this).text());

      var idx = $(this).closest("tr").find(".article-id").text();
      console.log(idx);

      jQuery.ajax({
      type: "POST", // HTTP method POST or GET
      url: "php/queries.php", //Where to make Ajax calls
      dataType:"json", // Data type, HTML, json etc.
      data: { 'idx': idx, 'type': 'thisArticle' }, //Form variables
      success:function(response){
          $(".admin-articles, .form_style").hide();

          var clickedArticleShow = "<form>";
            clickedArticleShow += '<label>Title</label>' +
            '<input type="text" class="updateTitle" name="title" value="' + response[0]['title']  + '"><br>' +
            '<label>Summary</label>' +
            '<input type="text" class="updateSummary" name="summary" value="' + response[0]['summary'] + '"><br>' +
            '<label>Content</label>' +
            '<textarea name="content_txt" id="updateContentText" cols="15" rows="5">'+ response[0]['content'] +'</textarea>' +
            "<script type='text/javascript'>" +
              "CKEDITOR.replace( 'updateContentText' );" +
            "</script>" +
            '<br>' +
            '<label>Date</label>' +
            '<input class="updateDate" type="date" value="' + response[0]['publicationDate'] + '">' +
            '<button id="FormUpdateDraftPublish">Save and publish article</button>' +
            '<button id="FormUpdateDraft">Update draft</button>';
          clickedArticleShow += "</form>";

          $('#maincontent').append(clickedArticleShow);

          updateArticleDraft(response);
          publishArticleDraft(response);
        },
        error:function (xhr, ajaxOptions, thrownError){
          //$("#FormSubmit").show(); //show submit button
          alert(thrownError);
        }
      });
    });

    // Event when clicking deletebutton on article row or delete draft-button in draft list ========================================/
    $(document).on('click', '#deleteB, #deleteDraftB', function(){
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

    // Event when clicking DRAFT LIST in navigation ======================================================/
    $("#drafts").click(function(){
      $(".admin-articles, .form_style").remove();
      $("#maincontent>form:first").remove();
      $("#maincontent>h3:first").html("Drafts");
      readDraftData();
    });

  }// End of clickevents


  // UPDATE ARTICLE ===============================================================================================/
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

  // UNPUBLISH AND SAVE ARTICLE AS DRAFT ===============================================================================================/
  function saveArticleToDraft(data){
    $("#updateUnpublish").click(function (e) {
      e.preventDefault();
      //console.log("function running?");

      var title = $(".updateTitle").val(); //build a post data structure
      var summary = $(".updateSummary").val(); //build a post data structure
      var content = $("#updateContentText").val(); //build a post data structure
      var date = $(".updateDate").val(); //build a post data structure
      var idx = data[0]['id'];

      jQuery.ajax({
        type: "POST", // HTTP method POST or GET
        url: "php/queries.php", //Where to make Ajax calls
        dataType:"text", // Data type, HTML, json etc.
        data: { 'title': title, 'summary': summary, 'content': content, 'date': date, 'idx': idx, 'type': 'saveAndUnpublish' },
        success:function(data){
          console.log('Unpublished and saved as draft');
          console.log(data);
          window.location.href="http://localhost/git/cms2/admin.html";
        },
        error:function (xhr, ajaxOptions, thrownError){
          alert(thrownError);
        }
      });
    });
  }

  // UPDATE DRAFT ===============================================================================================/
  function updateArticleDraft(data){
    $("#FormUpdateDraft").click(function (e) {
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

          console.log('draft update success');
          console.log(data);

        },
        error:function (xhr, ajaxOptions, thrownError){
          //$("#LoadingImage").hide(); //hide loading image
          alert(thrownError);
        }
      });
    });
  }

  // SAVE AND PUBLISH DRAFT ===============================================================================================/
  function publishArticleDraft(data){
    $("#FormUpdateDraftPublish").click(function (e) {
      e.preventDefault();
      //console.log("function running?");

      var title = $(".updateTitle").val(); //build a post data structure
      var summary = $(".updateSummary").val(); //build a post data structure
      var content = $("#updateContentText").val(); //build a post data structure
      var date = $(".updateDate").val(); //build a post data structure
      var idx = data[0]['id'];

      jQuery.ajax({
        type: "POST", // HTTP method POST or GET
        url: "php/queries.php", //Where to make Ajax calls
        dataType:"text", // Data type, HTML, json etc.
        data: { 'title': title, 'summary': summary, 'content': content, 'date': date, 'idx': idx, 'type': 'draftSavePublish' },
        success:function(data){
          console.log('draft updated and published');
          console.log(data);
          window.location.href="http://localhost/git/cms2/admin.html";
        },
        error:function (xhr, ajaxOptions, thrownError){
          alert(thrownError);
        }
      });
    });
  }

});
