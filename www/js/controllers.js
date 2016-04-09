angular
    .module('starter.controllers', [])

    .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

      // With the new view caching in Ionic, Controllers are only called
      // when they are recreated or on app start, instead of every page
      // change.
      // To listen for when this page is active (for example, to refresh
      // data),
      // listen for the $ionicView.enter event:
      // $scope.$on('$ionicView.enter', function(e) {
      // });

      // Form data for the login modal
      $scope.loginData = {};

      // Create the login modal that we will use later
      $ionicModal.fromTemplateUrl('templates/login.html', {
        scope : $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

      // Triggered in the login modal to close it
      $scope.closeLogin = function() {
        $scope.modal.hide();
      };

      // Open the login modal
      $scope.login = function() {
        $scope.modal.show();
      };

      // Perform the login action when the user submits the login form
      $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

      };

    })

    .controller('PlaylistsCtrl', function($scope) {
      $scope.playlists = [ {
        title : 'Reggae',
        id : 1
      }, {
        title : 'Chill',
        id : 2
      }, {
        title : 'Dubstep',
        id : 3
      }, {
        title : 'Indie',
        id : 4
      }, {
        title : 'Rap',
        id : 5
      }, {
        title : 'Cowbell',
        id : 6
      } ];
    })

    .controller(
        'LoginCtrl',
        function($scope, $window, $state, $cordovaOauth, UserService,
            $localstorage) {
          $scope.user = {};
          $scope.isUserRegistered = false;
          $scope.message = 'sdasd';
          $scope.loginUser = function() {
            UserService.loginUser($scope.user).success(
                function(data) {
                  if (data.success == true) {
                    window.localStorage.setItem(
                        "usertoken", data.token);
                    console.log('data.token' + data.token);
                    console.log('TOKEN IN LOCAL STORAGE'
                        + window.localStorage
                            .getItem("usertoken"));
                    window.localStorage.setItem("username",
                        $scope.user.username);
                    $scope.message = data.message;
                    $state.go('tab.chats');
                  }
                  console.log(data.message);
                  $scope.message = data.message;
                  $scope.user.password = '';
                });
          }
          $scope.googleLogin = function() {
            $cordovaOauth
                .google(
                    "673944921770-cv6rdg7rgtcqu4p15ob12brc3v1u6963.apps.googleusercontent.com",
                    [ "email" ])
                .then(
                    function(result) {
                      $scope.access_token = result.access_token;
                      ProfileService
                          .getProfileGoogle(
                              $scope.access_token)
                          .success(
                              function(data) {
                                user.name = data.displayName;
                                user.email = data.emails[0].value;
                                user.imageURL = data.image.url
                                saveUserData(user);
                              });
                    }, function(error) {
                    });
          }
          function saveUserData(user) {
            UserService.saveUserData(user).success(function(data) {
              $scope.userID = data.objectId;
              $localstorage.setObject('user', user);
              $state.go($state.current, {}, {
                reload : true
              });
            });
          }
          $scope.facebookLogin = function() {
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
                                user.email = data.email;
                                user.imageURL = data.picture.data.url;
                                saveUserData(user);
                              });
                    }, function(error) {
                    });
          }
        })
    .controller(
        'RegisterCtrl',
        function($scope, UserService) {
           $scope.user = {};
          $scope.registerUser = function() {
            console.log($scope.user.username);
            UserService
                .registerUser($scope.user)
                .success(
                    function(data) {
                      if (data.message == 'User created!') {
                        console.log('SUCCESS');
                        $scope.isUserRegistered = true;
                        var alertPopup = $ionicPopup
                            .alert({
                              title : 'Successfully Registered.',
                              template : 'Successfully Registered. Please login.',
                            });
                        $state.go('tab.login');
                      }
                      console.log('ERROR');
                      $scope.message = data.message;
                      var alertPopup = $ionicPopup
                          .alert({
                            title : 'Error.',
                            template : $scope.message,
                          });

                      $scope.register = {};
                      /*
                       * if(data.success===false){
                       * $window.location.reload(); }
                       */

                    });
          }
        }).controller('PlaylistCtrl', function($scope, $stateParams) {
    });
