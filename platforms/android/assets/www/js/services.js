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
/*
.service('LoadChats', function($firebaseArray) {         
    var chats = []; 
    var ref = new Firebase("https://stir.firebaseio.com/chats/facebook:10207972573965236/");
       
    ref.on('child_added', function(snapshot) {
        var chats = snapshot.val();
        console.log(chats);
       // return chats;
    })

})*/

/*

function asyncGreet(name) {
  // perform some asynchronous operation, resolve or reject the promise when appropriate.
  return $q(function(resolve, reject) {
    setTimeout(function() {
      if (okToGreet(name)) {
        resolve('Hello, ' + name + '!');
      } else {
        reject('Greeting ' + name + ' is not allowed.');
      }
    }, 1000);
  });
}

var promise = asyncGreet('Robin Hood');
promise.then(function(greeting) {
  alert('Success: ' + greeting);
}, function(reason) {
  alert('Failed: ' + reason);
});
*/

 /* .factory('Chats', function($firebase, $firebaseAuth) {
   var chats = {};
   // var res;
  return {
   authDataCallback: function () {
      var ref = new Firebase("https://stir.firebaseio.com/chats/facebook:10207972573965236");
       ref.on("child_added", function(snapshot) {
          chats = snapshot.val();
          return chats;
       });
    }
  }
})*/


  .factory('Chats', function($firebase, $firebaseAuth, $firebaseArray, $timeout) {
   /*function getPromise() {

        return new Promise(function(resolve, reject) {
            var ref = new Firebase("https://stir.firebaseio.com/chats/facebook:10207972573965236");
            ref.on('child_added', resolve);
        });
    }*/

    var ref = new Firebase("https://stir.firebaseio.com/chats/facebook:10207972573965236/");
  //  hej = ref.child('-KOspZVS3qOMEWQuXope');
   // var rooms = $firebaseArray(ref.child('-KOspZVS3qOMEWQuXope'));
   // hej = ref.child('-KOspZVS3qOMEWQuXope').set('message');

  //  $timeout(function() {
    // DO SOMETHING
  //  }, 3000);

     var rooms = $firebaseArray(ref);
    console.log(rooms);
    
    //.$timeout(3) ??????
  
    return {
    all: function(){
        return rooms;
    },
    get: function (roomId) {
        // Simple index lookup
        return rooms.$getRecord(roomId);
    }
    }
/*

    function getArticlePromise(id) {
       var ref = new Firebase("https://stir.firebaseio.com/chats/facebook:10207972573965236/-KOspZVS3qOMEWQuXope");
      return ref.child('message').child(id).once('value').then(function(snapshot) {
          return snapshot.val();
          });
      }*/
    })



    // Register the callback to be fired every time auth state changes
  //  var ref = new Firebase('https://stir.firebaseio.com/chats/facebook:10207972573965236');
   // authDataCallback();
    //console.log('outside', chats);
   // ref.off("value", authDataCallback);
    //console.log('vad fan äre här:', chats);
   // return {
     //   chats: chats
   // };

/*
.factory('Chats', function($firebaseArray, $firebaseObject) {

  UserId = 'facebook:10207972573965236';
  var ref = new Firebase("https://stir.firebaseio.com/chats")
  return {
    ref: function(snapshot){ 
      console.log(snapshot.val());
      console.log('ref', ref);
      return ref;
    },
    //I don't know if this is actually necessary
    refChats: function(){
      console.log('vettetusan', ref.child('message'));
      return ref.child(UserId);
    },
    get: function(chatId){
      $firebase(ref.child(UserId).child(chatId)).$asObject();
    }
  };

  /*  return {
             
            all: function () {
                return chats;
            },
            get: function (chatId) {
                // Simple index lookup
              return chats.$getRecord(chatId);
            }
        } 


})
*/
  /*  var chats = []; 
    var ref = new Firebase("https://stir.firebaseio.com/chats/facebook:10207972573965236/");
       
    ref.on('child_added', function(snapshot) {
        var chats = snapshot.val();
        console.log(chats);
       // return chats;
    })

  // var chats; 
   var ref = new Firebase("https://stir.firebaseio.com/chats/facebook:10207972573965236/");

   var obj = $firebaseObject(ref);

   //obj.$loaded().then(function(res) {
    
   var chats =  obj.$loaded().then(function(data) {
   // console.log(data === obj); // true

    angular.forEach(obj, function(value, key) {
    var chatshej = value;
    console.log('chats', chatshej);
    console.log(key, value);
  }); 
   //  console.log('chats otuside', chatshej);
  },
  function(error) {
    console.error("Error:", error);
  }
);


  // var chats = []; 

          console.log('outside', chats); 
         
        //  function returnFunc(chats, chatId) {
              return {
             
            all: function () {
                return chats;
            },
            get: function (chatId) {
                // Simple index lookup
              return chats.$getRecord(chatId);
            }
        }
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  /*
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  },{
    id: 1,
    name: 'Johanna E',
    lastText: 'var e du?',
    face: 'img/ben.png'
  },{
    id: 2,
    name: 'Hanna F',
    lastText: 'Hur är läget!',
    face: 'img/ben.png'
  },{
    id: 3,
    name: 'Ziggy',
    lastText: 'Mjau!',
    face: 'img/ben.png'
  
  }];
  console.log(chats);
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

          var chats = []; 
          
          //  console.log('start', chats);  
           //  var ref = new Firebase(firebaseUrl);
            var ref = new Firebase("https://stir.firebaseio.com/chats/facebook:10207972573965236/");
           
          // function returnChats() {
           ref.on('child_added', function(snapshot) {
            //  console.log('child_added: ', snapshot.val());
              var chats = snapshot.val();
             //console.log('inside', chats);
             // var chatId = 0;
             // myAfterFunction();
             //console.log(chatId);
              console.log(chats);
             // return chats;
           })
         //  }
         */
          // var chats = returnChats();
             // returnFunc(chats, chatId);
           //   returnFunc(chats, chatId);
           /*     return {
            all: function () {
                return chats;
            },
              get: function (chatId) {
                // Simple index lookup
              
               return chatId;
            }
                   }*/
           
         /*  function myAfterFunction(){
              console.log('myAfterFunction', chats);
          }*/
       /*   var chats = []; 

          console.log('outside', chats); 
         
        //  function returnFunc(chats, chatId) {
              return {
             
            all: function () {
                return chats;
            },
            get: function (chatId) {
                // Simple index lookup
              return chats.$getRecord(chatId);
            }
        }*/

       //   }
       
         
        //    chats = $firebaseArray(ref);
        //    console.log(chats);
          
       //   var ref = new Firebase("https://stir.firebaseio.com/chats/facebook:10207972573965236/-KOspZVS3qOMEWQuXope");
       //   var chats;      
          //var ref = new Firebase("https://stir.firebaseio.com/chats");

      //    ref.on("child_added", function(snapshot, prevChildKey) {  
          //  chats = $firebaseArray(ref);
            //var chats = snapshot.hasChild("message");
        //    var chatId = snapshot.key();
            // chats = snapshot.val();
            // chats = chats.getChild();
            // var chats = testRef.child('chatId');
          //  console.log(chatId);
          // 
       //   })
     //  console.log(chatId);

           // myAfterFunction();
        /*    return {
             
            all: function () {
                return chats;
            },
            get: function (chatId) {
                // Simple index lookup
              return chats.$getRecord(chatId);
            }
        } */
               // })
      //  })


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
