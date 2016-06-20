angular.module('starter.controllers', ['starter.services', 'firebase'])

.controller('loginCtrl', function($scope, $firebaseAuth, $state, $rootScope) {

 /*ionic.Platform.ready(function() {
    // hide the status bar using the StatusBar plugin
    StatusBar.hide();
  });*/

   $scope.login = function() {
    var ref = new Firebase('https://STIR.firebaseio.com');

    var authObject = $firebaseAuth(ref);

    authObject.$authWithOAuthPopup('facebook').then(function(authData) {
      //  console.log(authData);
        $rootScope.authData = authData;
        console.log($rootScope.authData);

/*SAVE DATA TO DATABASE */

// we would probably save a profile when we register new users on our site
// we could also read the profile to see if it's null
// here we will just simulate this with an isNewUser boolean
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

     //   $location.url('/tab.location');

      //Go to location when logged in
       $state.go('tab.location');

      /* REDIRECTA TILL KARTAN 
      Behövs dessa create och close funktioner???
      $scope.create = function() {
        console.log("hej hej");
            $state.go('tab.location');
      };
      $scope.close = function() { 
       $state.go('tab.location'); 
      };
        REDIRECTA TILL KARTAN */

    }).catch(function(error) {
          console.log('error' . error);

    })
}
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

.controller('AccountCtrl', function($scope, $firebaseAuth) {

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
 
})

.controller('LocationCtrl', function($scope, $state, $cordovaGeolocation, $rootScope, $firebaseAuth) {

  var ref = new Firebase('https://STIR.firebaseio.com/users/facebook%3A10209542863159430');

  var authObject = $firebaseAuth(ref);
  //  $scope.Location = sync.$asArray();
   
  // console.log($rootScope.authData);

// Attach an asynchronous callback to read the data at our posts reference
/*ref.on("value", function(snapshot) {
  console.log(snapshot.val());
  var value = snapshot.val();
  console.log("Name: " + value.name);
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
*/


/*KARTA */
 var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
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

  /* profileImage = $rootScope.authData.facebook.profileImageURL = {
    'border-radius': '50px'
  }*/
  ref.orderByKey().on("value", function(snapshot) {
  snapshot.forEach(function(data) {
       console.log( data.key() +  data.val());

       if(data.key() == 'img') {

          image = data.val();
          console.log(image);

    //Wait until the map is loaded
     google.maps.event.addListenerOnce($scope.map, 'idle', function(){ 
      var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      icon: image
  });      
});

  }
    });
  });
 
  }, function(error){
    console.log("Could not get location");
  });
/*KARTA */


  var deploy = new Ionic.Deploy();
  
})

.controller('recipesCtrl', function($scope, $location) {
    
        $scope.changeView = function(recipes){
            $location.path('receptbanken'); // path not hash
        }
}) 

.controller('receptbankCtrl', function($scope) {
    
    
});
