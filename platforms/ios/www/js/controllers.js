angular.module('starter.controllers', ['starter.services', 'ngOpenFB', 'firebase'])

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

.controller('AccountCtrl', function($scope, ngFB) {
  ngFB.api({
        path: '/me',
        params: {fields: 'id,name'}
    }).then(
        function (user) {
            $scope.user = user;
        },
        function (error) {
            alert('Facebook error: ' + error.error_description);
        });
})

.controller('LocationCtrl', function($scope, $state, $cordovaGeolocation, $rootScope, $firebaseAuth) {

   var ref = new Firebase('https://STIR.firebaseio.com');

    var authObject = $firebaseAuth(ref);
  //  $scope.Location = sync.$asArray();
   
   console.log($rootScope.authData);

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
    
    if($rootScope.authData) {
      console.log($rootScope.authData);
      console.log($rootScope.authData.facebook.displayName);
    }
    else {
      console.log('no data found');
    }
    

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

  /* profileImage = $rootScope.authData.facebook.profileImageURL = {
    'border-radius': '50px'
  }*/

    //Wait until the map is loaded
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){ 
      var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
    //  title: $rootScope.authData.facebook.displayName,
      icon: $rootScope.authData.facebook.profileImageURL
  });      
});
 
  }, function(error){
    console.log("Could not get location");
  });
/*KARTA */





  var deploy = new Ionic.Deploy();
  
})


.controller('recipesCtrl', function($scope) {

});
