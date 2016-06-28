angular.module('starter.controllers', ['starter.services', 'firebase'])

.controller('loginCtrl', function($scope, $state, $firebaseAuth) {
     /*
    $scope.login = function(authMethod) {
    Auth.$authWithOAuthRedirect(authMethod).then(function(authData) {
    }).catch(function(error) {
      if (error.code === 'TRANSPORT_UNAVAILABLE') {
        Auth.$authWithOAuthPopup(authMethod).then(function(authData) {
        });
      } else {
        console.log(error);
      }
    });
  };

    Auth.$onAuth(function(authData) {
    if (authData === null) {
      console.log('Not logged in yet');
    } else {
      console.log('Logged in as', authData.uid);
      //Go to location when logged in
       $state.go('tab.location');
    }
    // This will display the user's name in our view
    $scope.authData = authData;
  });
*/
     var ref = new Firebase('https://STIR.firebaseio.com');
     var authObject = $firebaseAuth(ref);

     authObject.$onAuth(function(authData) {
    if (authData === null) {
      console.log('Not logged in yet');
    } else {
      console.log('Logged in as', authData.uid);
      //Go to location when logged in
       $state.go('tab.location');
    }
   }); 

    $scope.login = function() {
 
     authObject.$authWithOAuthPopup('facebook').then(function(authData) {
         console.log(authData);

       //Go to location when logged in
      // $state.go('tab.location');
 
     }).catch(function(error) {
           console.log('error' . error);
     })
 

 }

   
/*SAVE DATA TO DATABASE */

// we would probably save a profile when we register new users on our site
// we could also read the profile to see if it's null
// here we will just simulate this with an isNewUser boolean

var ref = new Firebase('https://STIR.firebaseio.com');
 
var authObject = $firebaseAuth(ref);

var isNewUser = true;

ref.onAuth(function(authData) {
  if (authData && isNewUser) {
    // save the user's profile into the database so we can list users,
    // use them in Security and Firebase Rules, and show profiles
    ref.child("users").child(authData.uid).set({
      provider: authData.provider,
      name: getName(authData),
      img: getImg(authData),
    });
  }
});

function getName(authData) {
  return authData.facebook.displayName;
}

function getImg(authData) {
  return authData.facebook.profileImageURL;
}
/*SAVE DATA TO DATABASE */

})



//.controller('LocationCtrl', function($scope, $state, $cordovaGeolocation, $rootScope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
  Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $firebaseAuth,  $ionicActionSheet, $state, $ionicLoading) {

  var ref = new Firebase('https://STIR.firebaseio.com/users/facebook%3A10209542863159430');

  var authObject = $firebaseAuth(ref);
  
 ref.orderByKey().on("value", function(snapshot) {
       snapshot.forEach(function(data) {
         
       if(data.key() == 'name') {
         name = data.val();
         }

       if(data.key() == 'img') {
          img = data.val();
          }
          
        $scope.user ={
         name: name,
         img: img
       }
    
       }); 

      //  console.log($scope.user.img);
        return $scope.user;
 });  

	$scope.showLogOutMenu = function() {
	     ref.unauth();
       $state.go('login');
	};
 
})

.controller('LocationCtrl', function($scope, $state, $cordovaGeolocation, $rootScope, $firebaseAuth) {

/*KARTA */
 var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var myLatLng = new google.maps.LatLng(58.58930,	16.19930);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeControl: false,
      scaleControl: false,
      navigationControl: false,
      streetViewControl: false,
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

 
      var ref = new Firebase('https://STIR.firebaseio.com/users')

     ref.on("child_added", function(snapshot, prevChildKey) {
          var newPost = snapshot.val();
          console.log(newPost.lon);
          console.log(newPost.lat);
     })







  var ref = new Firebase('https://STIR.firebaseio.com/users');
  var authData = ref.getAuth();
  image = authData.facebook.profileImageURL;


  if(authData) {
    //Wait until the map is loaded
   //   google.maps.event.addListenerOnce($scope.map, 'idle', function(){
      var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      icon: image
      });      
    //  });

          window.google.maps.event.addListener(marker, 'click', function () {
               $state.go('attend');
          });
      
      var marker1 = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: myLatLng,
      icon: image
      }); 
  
    } else {
      console.log("User is logged out");
    }
 
  }, function(error){
    console.log("Could not get location");
  });
    
    /*KARTA */

  var deploy = new Ionic.Deploy();
  
})
 
.controller('recipesCtrl', function($scope, $location) {
   //Change view to recipes
    $scope.changeView = function(recipes){
        $location.path('receptbanken'); // path not hash
    }
}) 

.controller('CreateAdCtrl', function($scope, $location) {
      /* GET DATA FROM INPUT */
      $scope.master = {};

      $scope.update = function(ad) {
      $scope.master = angular.copy(ad);
      console.log(ad);
      /* GET DATA FROM INPUT */

    /* SAVE DATA TO DATABASE */
   var ref = new Firebase('https://STIR.firebaseio.com/users/facebook%3A10209542863159430');
  
      var usersRef = ref.child("ad");
      usersRef.set({
          ad: ad
      });
 };
      /* SAVE DATA TO DATABASE */

    //Change view to preview
    $scope.changeView = function(preview){
    $location.path('forhandsgranska'); // path not hash
    }
}) 

.controller('previewCtrl', function($scope, $firebaseAuth, $state) {

      /* GET DATA FROM DATABASE */
     var ref = new Firebase('https://STIR.firebaseio.com/users/facebook%3A10209542863159430');

     var authObject = $firebaseAuth(ref);

       ref.orderByKey().on("value", function(snapshot) {
       snapshot.forEach(function(data) {

        if(data.key() == 'ad') {
         ad = data.val();
        // console.log(ad);
         }
        
        if(data.key() == 'recipe') {
         var recipe = data.val();
        // console.log(recipe);
        }

        if(data.key() == 'name') {
         name = data.val();
       //  console.log(name);
         } 

        if(data.key() == 'img') {
         var img = data.val();
      //   console.log(img);

         $scope.user ={
           img: img,
           name: name
         }
         }
        
      //  console.log($scope.user);

        $scope.obj ={
         ad: ad.ad,
         recipe: recipe,
         user: $scope.user
        }        
       }); 

     //   console.log($scope.obj.user.name);
        //console.log($scope.user.img);
        return $scope.obj;
 });  

    /* GET DATA FROM DATABASE */
  
    //Change view to location
     $scope.changeView2 = function(){
         $state.go('tab.location');
    }

})

.controller('receptbankCtrl', function($scope, Recipe) {
    $scope.recipes = Recipe.all();
    
}) 

.controller('recipeDeatilCtrl', function($scope, $stateParams, Recipe, $location) {
  $scope.recipes = Recipe.get($stateParams.recipeId);

 // console.log($scope.recipes.id);

   /* SAVE RECIPE TO DATABASE */
    recipes = $scope.recipes;
   // console.log(recipes);
    var ref = new Firebase('https://STIR.firebaseio.com/users/facebook%3A10209542863159430');
  
      var usersRef = ref.child("recipe");
      usersRef.set({
          id: recipes.id,
          name: recipes.name,
          img: recipes.img
      }); 
   /* SAVE RECIPE TO DATABASE */

   //Change view to ad
   $scope.changeView = function(CreateAd){
   $location.path('annons'); // path not hash
    }
})


.controller('attendCtrl', function($scope, $firebaseAuth, $state) {
     var ref = new Firebase('https://STIR.firebaseio.com/users')

     ref.on("child_added", function(snapshot, prevChildKey) {
          var newPost = snapshot.val();
          console.log(newPost.name);
     })

     // Get the data on a post that has changed
    ref.on("child_changed", function(snapshot) {
        var changedPost = snapshot.val();
        console.log("The updated post title is " + changedPost.recipe.name);
    });

    ref.on("child_removed", function(snapshot) {
        var deletedPost = snapshot.val();
        console.log("The blog post titled '" + deletedPost.name + "' has been deleted");
    });

     /*
      var ref = new Firebase('https://STIR.firebaseio.com/users/facebook%3A10209542863159430');

      var authObject = $firebaseAuth(ref);

       ref.orderByKey().on("value", function(snapshot) {
       snapshot.forEach(function(data) {

        if(data.key() == 'ad') {
         ad = data.val();
        // console.log(ad);
         }
        
        if(data.key() == 'recipe') {
         var recipe = data.val();
        // console.log(recipe);
        }

        if(data.key() == 'name') {
         name = data.val();
       //  console.log(name);
         } 

        if(data.key() == 'img') {
         var img = data.val();
      //   console.log(img);

         $scope.user ={
           img: img,
           name: name
         }
         }
        
      //  console.log($scope.user);

        $scope.obj ={
         ad: ad.ad,
         recipe: recipe,
         user: $scope.user
        }        
       }); 

     //   console.log($scope.obj.user.name);
        //console.log($scope.user.img);
        return $scope.obj;
 });  

    /* GET DATA FROM DATABASE */
  
    //Change view to location
     $scope.changeView2 = function(){
         $state.go('tab.location');
    }

    
});


