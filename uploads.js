var MyImageStore = new FS.Store.GridFS('myImageStore');

myImages = new FS.Collection('myImageStore', {
  stores: [MyImageStore]
});

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.fileUpload.events({
    "change #uploadButton": function(e, t) {
      var files = e.target.files;
      var i = 0;
      for (i = 0; i < files.length; i++) {
        myImages.insert(files[i]);
      }
    }
  });

  Template.showImages.theImage = function() {
    return myImages.find();
  };
  
    Template.showImages.helpers({
      showImage: function(imageId) {
        return myImages.findOne({_id: imageId}).url();
      }
    });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}