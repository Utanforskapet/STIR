angular.module('starter.controllers', ['starter.services', 'firebase'])

.controller('loginCtrl', function($scope, $state, $firebaseAuth) {
     var ref = new Firebase('https://STIR.firebaseio.com');
     var authObject = $firebaseAuth(ref);

     authObject.$onAuth(function(authData) {
    if (authData) {
      console.log('Logged in as', authData.uid);
      //Go to location when logged in
      $state.go('tab.location');
    }
    else {
      console.log('Not logged in yet');

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

var isNewUser = true;

ref.onAuth(function(authData) {
  if (authData && isNewUser) {
    // save the user's profile into the database so we can list users,
    // use them in Security and Firebase Rules, and show profiles
    ref.child("users").child(authData.uid).set({
      provider: authData.provider,
      name: getName(authData),
      img: getImg(authData),
      uid: authData.uid
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
    }
   }); 

})

//.controller('LocationCtrl', function($scope, $state, $cordovaGeolocation, $rootScope) {})

.controller('ChatsCtrl', function($scope, Chats, SharedUser, $rootScope) {

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
  Chats.remove(chat);
  };

   $scope.$on('handleBroadcast', function() {
      $rootScope.LocUser = SharedUser.LocUser;
      LocUser = $scope.LocUser;
   });  
})

.controller('ChatDetailCtrl', function($scope, $stateParams, $firebaseArray, Chats, SharedUser, $rootScope) {
  $scope.chat = Chats.get($stateParams.chatId);

   $scope.$on('handleBroadcast', function() {
      $rootScope.LocUser = SharedUser.LocUser;
      LocUser = $scope.LocUser;
   });  

     var ref = new Firebase("https://stir.firebaseio.com/chat");
    $scope.chats = $firebaseArray(ref);

    var ref = new Firebase("https://stir.firebaseio.com/chat");
    var authData = ref.getAuth();

    if (authData) {
 
    url = 'https://STIR.firebaseio.com/users/' + authData.uid;
    var ref = new Firebase(url);

     ref.orderByKey().on("value", function(snapshot) {
          var newPost = snapshot.val();
       //   $scope.newPost = newPost;
          console.log(newPost);
          $scope.sendChat = function(chat) {
          $scope.chats.$add({
              user: newPost.name,
              message: chat.message,
              imgUrl: newPost.img
          });
          chat.message = "";
     }
     });
               
    } else {
      console.log("User is logged out");
    }


})

.controller('AccountCtrl', function($scope, $firebaseAuth,  $ionicActionSheet, $state, $ionicLoading, $firebaseObject) {
                
 /* GET DATA FROM DATABASE */
var ref = new Firebase("https://stir.firebaseio.com");
var authData = ref.getAuth();

if (authData) {
 
    url = 'https://STIR.firebaseio.com/users/' + authData.uid;
    var ref = new Firebase(url);

     ref.orderByKey().on("value", function(snapshot) {
          var newPost = snapshot.val();
          $scope.newPost = newPost;
          return $scope.newPost;
     });
          
 } else {
      console.log("User is logged out");
    }
 /* GET DATA FROM DATABASE */

	$scope.showLogOutMenu = function() {
	     ref.unauth();
       $state.go('login');
	};
})

.controller('LocationCtrl', function($scope, $state, $cordovaGeolocation, $firebaseAuth, $rootScope, SharedUser) {

 /*KARTA */
 var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
   // var myLatLng = new google.maps.LatLng(58.58930,	16.19930);
 
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

var ref = new Firebase("https://stir.firebaseio.com");
var authData = ref.getAuth();

if (authData) {
 
     var ref = new Firebase('https://STIR.firebaseio.com/users')
   // ref.child("users").child(authData.uid).set({
     ref.on("child_added", function(snapshot, prevChildKey) {
         // var SnapshotUser = snapshot.child("users");
         // console.log(SnapshotUser);
        //  var users = SnapshotUser.val();
          var user = snapshot.val();
          console.log(user);

       /*   GÖRA BILD RUND (???)
          var usrImg = new Image();
          usrImg.id = "userImage";
          usrImg.src = user.img;

          document.body.appendChild(usrImg);
          var image = document.getElementById("userImage");
   
          image.style.borderRadius = '50%';
          console.log(image);

           GÖRA BILD RUND (???)  */

          var myLatLng = new google.maps.LatLng(user.ad.lat,	user.ad.lng);
      
          //Wait until the map is loaded
          //google.maps.event.addListenerOnce($scope.map, 'idle', function(){
          var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: myLatLng,
          icon: user.img,
          title: user.name
          });     
         
          window.google.maps.event.addListener(marker, 'click', function () {
         
                 SharedUser.prepForBroadcast(user);
                 $scope.$on('handleBroadcast', function() {
                 $scope.LocUser = SharedUser.LocUser;
             
                 console.log($scope.LocUser.uid);
                // console.log(authData.uid); 
                 
                 if($rootScope.LocUser.uid == authData.uid) {

                 var contentString = '<div id="content">'+
                  '<div id="siteNotice">'+
                  '</div>'+
                  '<div id="bodyContent">'+
                  '<p><b>Du anordnar redan denna middag.</b></p>'+
                  '</div>'+
                  '</div>';
                
                 var infowindow = new google.maps.InfoWindow({
                 content: contentString
                 });
                 
                 infowindow.open(map, marker);
             
                 }
                 else {
                    $state.go('attend');
                 }
                 });
          }); 
     })
      
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

.controller('CreateAdCtrl', function($scope, $location, $rootScope) {

      var ref = new Firebase("https://stir.firebaseio.com");
      var authData = ref.getAuth();

      var input = document.getElementById('searchTextField');
      autocomplete = new google.maps.places.Autocomplete(input);
    
        var $result = $(".js-result"),
        $getvalues = $(".get-values"),
        from = 0, to = 0;

        //Save how many guests
        var saveGuests = function (data) {
            fromGuests = data.from;
        };

        var writeResult = function () {

            //if user is logged in
            if (authData) {
             $scope.master = {};
            //Get data form input-field
             $scope.update = function(ad) {
                    //Saving the place, name, lat, lng
                   var place = autocomplete.getPlace(),
                       loc = place.name,
                       lat = place.geometry.location.lat(),
                       lng = place.geometry.location.lng();

                  $scope.master = angular.copy(ad);

                  url = 'https://STIR.firebaseio.com/users/' + authData.uid;
                  var ref = new Firebase(url);

                  //Save data to database
                  var usersRef = ref.child("ad");
                  usersRef.set({
                      guests: fromGuests,
                      ageMin: from,
                      ageMax: to,
                      ad: ad,
                      place: loc,
                      lat: lat,
                      lng: lng
                    });
              };
            }
            else {
              console.log("User is logged out");
            }
        };

      var $value = $("#value");

        //Create slider for how many guests
        $value.ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
            min: 1,
            max: 15,
            type: 'single',
            step: 1,
            postfix: " gäster",
            grid: false,
             onStart: function (data) {
                saveGuests(data);
                writeResult();
            },
            onChange: saveGuests,
            onFinish: saveGuests
        });
    //Save the age-interval
    var saveAge = function (data) {
            from = data.from;
            to = data.to;
        };

    var $range = $("#range"); 

    //Slider for age-interval
      $range.ionRangeSlider({
            hide_min_max: true,
              keyboard: true,
              min: 18,
              max: 99,
              from: 18,
              to: 25,
              type: 'double',
              step: 1,
              postfix: " år",
              grid: false,
              onStart: function (data) {
                saveAge(data);
                writeResult();
            },
            onChange: saveAge,
            onFinish: saveAge
      });  

     $getvalues.on("click", writeResult);

    //Change view to preview
    $scope.changeView = function(preview){
    $location.path('forhandsgranska'); // path not hash
    }
}) 

.controller('previewCtrl', function($scope, $firebaseAuth, $state) {

/* GET DATA FROM DATABASE */
var ref = new Firebase("https://stir.firebaseio.com");
var authData = ref.getAuth();

if (authData) {
 
    url = 'https://STIR.firebaseio.com/users/' + authData.uid;
    var ref = new Firebase(url);
    

     ref.orderByKey().on("value", function(snapshot) {
          var newPost = snapshot.val();
          $scope.newPost = newPost;
          return $scope.newPost;
     });
          
 } else {
      console.log("User is logged out");
    }
 /* GET DATA FROM DATABASE */
  
    //Change view to location
     $scope.changeView2 = function(){
         $state.go('tab.location');
    }
})

.controller('receptbankCtrl', function($scope, Recipe, $location) {
    $scope.recipes = Recipe.all();

    $scope.go = function (path) {
      $location.path(path);
    }; 
}) 

.controller('recipeDeatilCtrl', function($scope, $stateParams, Recipe, $location) {
  $scope.recipes = Recipe.get($stateParams.recipeId);

   /* SAVE RECIPE TO DATABASE */
    recipes = $scope.recipes;
   // console.log(recipes);
   var ref = new Firebase("https://stir.firebaseio.com");
   var authData = ref.getAuth();

if (authData) {

    url = 'https://STIR.firebaseio.com/users/' + authData.uid;
    var ref = new Firebase(url);  
  
      var usersRef = ref.child("recipe");
      usersRef.set({
          id: recipes.id,
          name: recipes.name,
          img: recipes.img,
          recipe: recipes.recipe,
          tutorial: recipes.tutorial
      }); 
   /* SAVE RECIPE TO DATABASE */

   //Change view to ad
   $scope.changeView = function(CreateAd){
   $location.path('annons'); // path not hash
    }
    } else {
      console.log("User is logged out");
      }
    })

.controller('attendCtrl', function($scope, $firebaseAuth, $state, $rootScope, SharedUser) {

   $scope.$on('handleBroadcast', function() {
      $rootScope.LocUser = SharedUser.LocUser;
      LocUser = $scope.LocUser;
   });

    //Change view to location
     $scope.changeView = function(){
         $state.go('tab.chats');
    }

});


