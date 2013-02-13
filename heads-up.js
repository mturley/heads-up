if (Meteor.isClient) {
  Template.body.loggedIn = function() {
    return Meteor.user() !== null;
  };
  Template.body.configured = function() {
    return false;
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
