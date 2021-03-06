// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','firebase', 'ionic.service.core', 'starter.controllers', 'starter.services', 'ngCordova'])

//angular.module('starter', ['ionic', 'ngCordova'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('login', {
   url: '/login',
   controller: 'loginCtrl',
   templateUrl: 'templates/login.html'
})

  // Each tab has its own nav history stack:

  .state('tab.location', {
    url: '/location',
    views: {
      'tab-location': {
        templateUrl: 'templates/tab-location.html',
        controller: 'LocationCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
/*
    .state('tab.rooms', {
    url: '/rooms',
    views: {
        'tab-rooms': {
            templateUrl: 'templates/tab-rooms.html',
            controller: 'RoomsCtrl'
        }
    }
})
*/
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  
  .state('tab.recipes', {
    url: '/recipes',
    views: {
      'tab-recipes': {
        templateUrl: 'templates/tab-recipes.html',
        controller: 'recipesCtrl'
      }
    }
  })

   .state('recipes', {
   url: '/receptbanken',
   controller: 'receptbankCtrl',
   templateUrl: 'templates/recipes.html'
})

   .state('CreateAd', {
   url: '/annons',
   controller: 'CreateAdCtrl',
   templateUrl: 'templates/Create-ad.html'
  })

  .state('recipes-detail', {
   url: '/receptbanken/:recipeId',
   controller: 'recipeDeatilCtrl',
   templateUrl: 'templates/recipes-detail.html'
})

  .state('preview', {
   url: '/forhandsgranska',
   controller: 'previewCtrl',
   templateUrl: 'templates/preview.html'
})

  .state('attend', {
   url: '/delta',
   controller: 'attendCtrl',
   templateUrl: 'templates/attend.html'
})

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});


