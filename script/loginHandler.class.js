LoginHandler = Object.createClass({
  _class: "LoginHandler",

  ajaxCall: function(data){

    // since action is called loginHandlerAction
    // on the php side change this here...
    data.loginHandlerAction = data.action;
    delete data.action;

    // make the ajax call
    // (synchronously, a bit naughty)
    return $.ajax({
      url: "php/main.php",
      dataType: "json",
      data: data,
      async: false,
      cache: false
    }).responseJSON;
  },

  // These four methods just reflect the methods
  // on the PHP side

  login: function(username, password){
    return this.ajaxCall(
      {action:"login", username: username, password: password}
    );
  },

  logout: function(){
    return this.ajaxCall({action:"logout"});
  },

  registerUser: function(username, password){
    return this.ajaxCall(
      {action:"registerUser", username: username, password: password}
    );
  },

  getUser: function(){
    return this.ajaxCall({action:"getUser"});
  }

});