angular.module('starter.services', [])

/*
 .factory('Auth', function($firebaseAuth) {
    var endPoint = 'https://STIR.firebaseio.com';
    var usersRef = new Firebase(endPoint);
    return $firebaseAuth(usersRef);
  })

   .factory('Users', function($firebaseObject) {
    var ref = 'https://STIR.firebaseio.com';
    var usersRef = ref.child('users');
    this.get = function get(name) {
      return $firebaseObject(usersRef.child(name));
    }

})
*/
.factory('SharedUser', function($rootScope) {
      //$scope.LocUser = LocUser;
      //console.log($scope.LocUser);
    var SharedUser = {};
    SharedUser.LocUser = "";
    SharedUser.prepForBroadcast = function (user) {
        this.LocUser = user;
        this.broadcastItem();
    };

    SharedUser.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    };

    return SharedUser;

}) 

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  
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
})


.factory('Recipe', function() {

  var recipes = [{
    id: 1,
    name: 'Blåbärspaj',
    img: 'img/rsz_photo8.jpg',
    recipe: '1 dl blåbär\n1 dl socker (drygt) \n2 msk vetemjöl \n100 g smör \n1/2 dl socker \n2 dl vetemjöl',
    tutorial: '1. Värm ugnen till 200°C.\n2. Skölj och rensa bären. Blanda dem med socker \noch mjöl.\
  \n3. Smält smöret till smuldegen. \nRör ner socker och mjöl. Rör tills det blivit en deg. \nLåt svalna något.\
  \n4. Bottna en pajform med blåbären. \nSmula över degen. Grädda pajen \n15-20 minuter i ugnen.\
  \nTill servering: Servera med marsansås, vispad \ngrädde eller glass.'
    }, {
    id: 2,
    name: 'Spagetti och köttfärssås',
    img: 'img/rsz_photo3.jpg',
    recipe: 'hej',
    tutorial: 'gör grejer'
  }, {
    id: 3,
     name: 'Potatismos och köttbullar',
    img: 'img/rsz_photo6.jpg',
    recipe: 'hej',
    tutorial: 'gör grejer'
 
  }];
  //  return recipes.recipe.replace(/\n/g, '<br />');

  return {
    all: function() {
      return recipes;
    },
    get: function(recipeId) {
      for (var i = 0; i < recipes.length; i++) {
        if (recipes[i].id === parseInt(recipeId)) {
          return recipes[i];
        }
      }
      return null;
    }
  };
});
