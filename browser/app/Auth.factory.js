app.factory('AuthFactory', function($http, $state){
	var Auth = {};

	var currentUserId;

	Auth.signup = function(username, password){
		console.log("password ", password)
		$http.post('/api/users/signup', {email: username, password: password})
		.then(function(res) {
			currentUserId = res.data._id;
			$state.go('user', {id: res.data._id});
		})
		.then(null, function(err){
			console.log('Invalid email or password', err)
		});
	};

	Auth.login = function(username, password){
		$http.get('/api/users/login/' + username + '/' + password)
		.then(function(res) {
			currentUserId = res.data._id;
			$state.go('user', {id: res.data._id});
		})
		.then(null, function(err){
			console.log('Wrong password or email!', err)
		});
	};
	Auth.logout = function(){
		$http.post('api/users/logout')
		.then(function(res){
			currentUserId = null;
			$state.go('home')
		})
	}

	Auth.getCurrentUserId = function() {
		return currentUserId;
	}

	return Auth;
})