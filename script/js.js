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
    div.html(
      'Du är inloggad som ' + user + '.' +
      '<div class="logout">Logga ut</div>'
    );
  }
  else {
    div.html(
      'Du är inte inloggad.' +
      '<div class="login">Logga in.</div>'
     /* '<div class="register">Registrera dig.</div>' */
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

});