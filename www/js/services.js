angular
    .module('starter.services', [])
    .factory(
        'ProfileService',
        [
            '$http',
            function($http) {
              return {
                getProfileGoogle : getProfileGoogle,
                getProfileFacebook : getProfileFacebook
              };

              function getProfileGoogle(access_token) {
                return $http({
                  method : 'GET',
                  url : 'https://www.googleapis.com/plus/v1/people/me?access_token='
                      + access_token
                })
              }
              ;

              function getProfileFacebook(access_token) {
                console.log('access_token' + access_token);
                return $http({
                  method : 'GET',
                  url : 'https://graph.facebook.com/me?fields=name,email,gender,age_range,picture,location&access_token='
                      + access_token
                })
              }
              ;

            } ]).factory('UserService', [ '$http', function($http) {
      return {
        saveUserData : saveUserData
      };

      function saveUserData(user) {
        return $http({
          method : 'POST',
          url : 'http://54.69.21.130/api/socialLogin',
          data : user
        })
      }
      ;

    } ]).factory('$localstorage', [ '$window', function($window) {
      return {
        set : function(key, value) {
          $window.localStorage[key] = value;
        },
        get : function(key, defaultValue) {
          return $window.localStorage[key] || defaultValue;
        },
        setObject : function(key, value) {
          $window.localStorage[key] = JSON.stringify(value);
        },
        getObject : function(key) {
          if ($window.localStorage[key] === "undefined") {
            return {};
          } else {
            return JSON.parse($window.localStorage[key] || '{}');
          }
        }
      }
    } ]).factory('Chats', function() {
      // Might use a resource here that returns a JSON array

      // Some fake testing data
      var chats = [  ];

      return {
        all : function() {
          return chats;
        },
        remove : function(chat) {
          chats.splice(chats.indexOf(chat), 1);
        },
        get : function(chatId) {
          for (var i = 0; i < chats.length; i++) {
            if (chats[i].id === parseInt(chatId)) {
              return chats[i];
            }
          }
          return null;
        }
      };
    }).factory('$localstorage', [ '$window', function($window) {
      return {
        set : function(key, value) {
          $window.localStorage[key] = value;
        },
        get : function(key, defaultValue) {
          return $window.localStorage[key] || defaultValue;
        },
        setObject : function(key, value) {
          $window.localStorage[key] = JSON.stringify(value);
        },
        getObject : function(key) {
          if ($window.localStorage[key] === "undefined") {
            return {};
          } else {
            return JSON.parse($window.localStorage[key] || '{}');
          }
        }
      }
    } ]);
