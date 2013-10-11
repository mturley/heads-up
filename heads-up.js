// TODO use either the npm googleapis or the client JS google API to make this kind of request:
// https://developers.google.com/apis-explorer/#p/calendar/v3/calendar.events.list?calendarId=midget913%2540gmail.com&orderBy=startTime&singleEvents=true&timeMin=2013-09-25T03%253A30%253A45.228Z&_h=10&
// here it is on npm: https://github.com/google/google-api-nodejs-client/

if (Meteor.isClient) {
  Template.body.loggedIn = function() {
    return Meteor.user() !== null;
  };
  Template.body.configured = function() {
    var conf;
    return (conf=db.UserConfigs.findOne({ userId : Meteor.userId() })) !== undefined && conf.confirmed;
  };
  Template.config.events({
    'click #config-submit' : function() {
      var config = {
        userId    : Meteor.userId(),
        foo       : 'bar',
        favcolor  : $("#config-favcolor").val(),
        confirmed : true 
      };
      // figure out if we already have a saved config
      if(db.UserConfigs.find({ userId : config.userId }).count() === 0) {
        db.UserConfigs.insert(config);
      } else {
        db.UserConfigs.update({ userId : config.userId }, { $set: config });
      }
    }
  });
  Template.dashboard.events({
    'click #config' : function(e) {
      e.preventDefault();
      db.UserConfigs.update({ userId: Meteor.userId() }, { $set: { confirmed : false }});
    }
  });
  Template.dashboard.favcolor = function() {
    return db.UserConfigs.findOne({ userId : Meteor.userId() }).favcolor;
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


// Collections
db = {
  UserConfigs : new Meteor.Collection("UserConfigs")
};