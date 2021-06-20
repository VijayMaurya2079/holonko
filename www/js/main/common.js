app.controller('LocationCtrl', ['$scope', '$state', '$stateParams', '$localStorage', '$ionicLoading', 'Util', function ($scope, $state, $stateParams, $localStorage, $ionicLoading, Util) {
	$scope.list = [];
	$scope.text = "";
	var count = 10;
	var page = 1;

	$scope.close = function (l) {
		var location = l == undefined ? undefined : l.location;
		$state.go($stateParams.from, {
			data: JSON.stringify({
				location: location
			})
		});
	}
	$scope.check = function () {
		return count > 0;
	}
	$scope.fetchMore = function () {
		Util.getLocationList(page).success(function (location) {
			count = location.length;
			page = page + 1;
			Array.prototype.push.apply($scope.list, location);
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}).error(function (error) {
			console.log(error);
			$scope.$broadcast('scroll.infiniteScrollComplete');
		})
	}
	$scope.search = function () {
		if ($scope.text != 'undefined' && $scope.text != "") {
			Util.getSearchLocation($scope.text).success(function (location) {
				count = location.length;
				$scope.list = location;
			})
		} else {
			$scope.fetchMore();
		}
	}
}]);
app.controller('CountryCtrl', ['$scope', '$state', '$stateParams', '$localStorage', '$ionicLoading', 'Util', function ($scope, $state, $stateParams, $localStorage, $ionicLoading, Util) {
	$scope.list = [];
	$ionicLoading.show({
		showBackdrop: false
	});

	var load = function () {
		Util.getCountry().success(function (data) {
			$scope.list = data;
			$ionicLoading.hide();
		})
	}
	$scope.close = function (country) {
		$state.go($stateParams.from, {
			data: JSON.stringify({
				country: country
			})
		});
		console.log(country);
	}
	load();
}]);
app.controller('ProfessionCtrl', ['$scope', '$state', '$stateParams', '$localStorage', '$ionicLoading', 'Util', function ($scope, $state, $stateParams, $localStorage, $ionicLoading, Util) {
	$scope.list = [];
	$ionicLoading.show({
		showBackdrop: false
	});

	var load = function () {
		Util.getProfession().success(function (data) {
			$scope.list = data;
			$ionicLoading.hide();
		})
	}
	$scope.close = function (profession) {
		$state.go($stateParams.from, {
			data: JSON.stringify({
				profession: profession
			})
		});
		console.log(profession);
	}
	load();
}]);

app.controller('IndustryCtrl', ['$scope', '$state', '$stateParams', '$localStorage', '$ionicLoading', 'Util', function ($scope, $state, $stateParams, $localStorage, $ionicLoading, Util) {
	$scope.list = [];
	$ionicLoading.show({
		showBackdrop: false
	});

	var load = function () {
		Util.getIndustry().success(function (data) {
			$scope.list = data;
			$ionicLoading.hide();
		})
	}

	$scope.close = function (industry) {
		$state.go($stateParams.from, {
			data: JSON.stringify({
				industry: industry
			})
		});
		console.log(industry);
	}
	load();
}]);