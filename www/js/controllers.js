angular
    .module('starter.controllers', [])

    .controller('ChatsCtrl', function($scope, Chats) {
      // With the new view caching in Ionic, Controllers are only called
      // when they are recreated or on app start, instead of every page
      // change.
      // To listen for when this page is active (for example, to refresh
      // data),
      // listen for the $ionicView.enter event:
      //
      // $scope.$on('$ionicView.enter', function(e) {
      // });

      $scope.chats = Chats.all();
      $scope.remove = function(chat) {
        Chats.remove(chat);
      };
    })

    .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
      $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function($scope) {
      $scope.settings = {
        enableFriends : true
      };
    })
    .controller(
        'ProfileCtrl',
        function($scope, $window, $state, $cordovaOauth,
            ProfileService, UserService, $localstorage) {
          console.log('ProfileCtrl');
          $scope.isAuthenticated = false;
          var user = {};
          var user = $localstorage.getObject('user');
          if (user.name === undefined) {

          } else {
            $scope.isAuthenticated = true;
            $scope.email = user.email;
            $scope.name = user.name;
            $scope.imageURL = user.imageURL;
          }
          $scope.googleLogin = function() {
                console.log('googleLogin');
            $cordovaOauth
                .google(
                    "673944921770-cv6rdg7rgtcqu4p15ob12brc3v1u6963.apps.googleusercontent.com",
                    [ "email" ])
                .then(
                    function(result) {
                      console.log('googleLogin');
                      $scope.access_token = result.access_token;
                      ProfileService
                          .getProfileGoogle(
                              $scope.access_token)
                          .success(
                              function(data) {
                                user.name = data.displayName;
                                user.username = data.emails[0].value;
                                user.imageURL = data.image.url
                                saveUserData(user);
                              });
                    }, function(error) {
                    });
          }
          function saveUserData(user) {
            console.log('user'+JSON.stringify(user));
            UserService.saveUserData(user).success(function(data) {
              $scope.userID = data.objectId;
              $localstorage.setObject('user', user);
              $state.go($state.current, {}, {
                reload : true
              });
            });
          }
          $scope.facebookLogin = function() {
            console.log('facebookLogin');
            $cordovaOauth
                .facebook(
                    "758110324290388",
                    [ "email", "public_profile",
                        "user_friends" ])
                .then(
                    function(result) {
                      $scope.access_token = result.access_token;
                      ProfileService
                          .getProfileFacebook(
                              $scope.access_token)
                          .success(
                              function(data) {
                                user.name = data.name;
                                user.username = data.email;
                                user.imageURL = data.picture.data.url;
                                saveUserData(user);
                              });
                    }, function(error) {
                    });
          }
          $scope.logout = function() {
            $localstorage.setObject('user', undefined);
            $scope.isAuthenticated = false;
            $state.go($state.current, {}, {
              reload : true
            });
          }
        });
