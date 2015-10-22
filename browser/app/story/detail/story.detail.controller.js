'use strict';

app.controller('StoryDetailCtrl', function ($scope, story, users, AuthFactory) {
	$scope.story = story;
	$scope.users = users;
	$scope.$watch('story', function () {
		$scope.story.save();
	}, true);
	$scope.currentUserId = AuthFactory.getCurrentUserId()
	$scope.canEdit = function() {
		console.log($scope.currentUserId)
		console.log(story.author._id)
		return $scope.currentUserId === story.author._id//story's userid
	}
});