angular.module('starter.controllers', ['starter.services', 'ngOpenFB', 'firebase'])


.controller('loginCtrl', function($scope, $firebaseAuth) {
  $scope.login = function() {

    var ref = new Firebase('https://STIR.firebaseio.com');

    var authObject = $firebaseAuth(ref);

    authObject.$authWithOAuthPopup('facebook').then(function(authData) {
        console.log(authData);

        /* REDIRECTA TILL KARTAN */

    }).catch(function(error) {
          console.log('error' . error);

    })
}

})

.controller('LocationCtrl', function($scope, $state, $cordovaGeolocation) {})

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

.controller('LocationCtrl', function($scope, $state, $cordovaGeolocation) {

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


    //Wait until the map is loaded
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
      var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng
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
