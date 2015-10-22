'use strict';
app.controller('SignupCtrl', function ($scope, AuthFactory){
	$scope.signup = function(){
		AuthFactory.signup($scope.email, $scope.password);
	}
})