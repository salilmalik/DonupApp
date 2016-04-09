angular.module('starter.services', [])

.factory('UserService', [ '$http', function($http) {
	return {
		registerUser : registerUser,
		loginUser : loginUser,
		getUser : getUser
	};

	function registerUser(user) {
		return $http({
			method : 'POST',
			url : 'http://54.69.21.130/api/user',
			data : user
		})
	}
	;

	function loginUser(user) {
		return $http({
			method : 'POST',
			url : 'http://54.69.21.130/api/login',
			data : user
		})
	}
	;
	function getUser(user) {
		return $http({
			method : 'GET',
			url : 'http://54.69.21.130/api/user/' + user.userID,
			headers : {
				'x-access-token' : user.token
			}
		})
	}
	;

} ]).factory('ImageService', [ '$http', function($http) {
	return {
		getImage : getImage,
		getUserImages : getUserImages,
		getmultiImage : getmultiImage,
		updatePoints : updatePoints,
		updateUserPoints : updateUserPoints
	};
	function getImage(imageId) {
		return $http({
			method : 'GET',
			url : '/api/image/' + imageId
		})
	}
	;
	function getUserImages(userId) {
		return $http({
			method : 'GET',
			url : '/api/image/getUserImages/' + userId
		})
	}
	;
	function getmultiImage(multiImage) {
		return $http({
			method : 'GET',
			url : '/api/image/multiImage/' + multiImage

		})
	}
	;
	function updatePoints(imageId) {
		return $http({
			method : 'PUT',
			url : '/api/image/' + imageId

		})
	}
	;
	function updateUserPoints(userID) {
		return $http({
			method : 'PUT',
			url : '/api/user/' + userID
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
} ]);