angular.module('starter.services', [])

/*
.factory('account', '$firebaseAuth', function() {

  var ref = new Firebase('https://STIR.firebaseio.com/users/facebook%3A10209542863159430');

  var authObject = $firebaseAuth(ref);

 ref.orderByKey().on("value", function(snapshot) {
       snapshot.forEach(function(data) {
       console.log( data.key() +  data.val());

       if(data.key() == 'img') {
          image = data.val();
          console.log(image);
          }

      if(data.key() == 'name') {
         name = data.val();
         console.log(name);
         }

        var users = [{
        name: name,
        img: image
        }]

        return users;
    });
  });  
})
*/

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
