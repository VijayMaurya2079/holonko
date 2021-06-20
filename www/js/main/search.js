app.controller('HomeCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$localStorage',
                            function ($scope, $rootScope, $state, $stateParams, $localStorage) {
		$scope.title = {};
		$scope.search = {};
		$scope.search.profession = {
			profession_name: "Select your Profession"
		};
		$scope.search.location = "location";



		if ($stateParams.data != "") {
			var data = JSON.parse($stateParams.data);
			if ($localStorage.search) {
				$scope.search = $localStorage.search;
			}
			if (data.hasOwnProperty('location')) {
				var a = data.location.split("-");
				$scope.search.location=data.location;
				$scope.search.country = a[1];
				$scope.search.city = a[0];
			} else if (data.hasOwnProperty('profession')) {
				$scope.search.profession = data.profession;
			}
			$localStorage.search = $scope.search;
		}

		$scope.searchProfessional = function () {
			$state.go("app.searchprofessionalresult");
		}
		$scope.searchAssignment = function () {
			
		}
}]);




app.controller('SearchProfessionalResultCtrl', ['$scope', '$rootScope', '$state', '$localStorage', '$ionicLoading', 'Search', 'Social',
                                                function ($scope, $rootScope, $state, $localStorage, $ionicLoading, Search, Social) {
		var search = $localStorage.search;
		var uid = 'Unknown'
		if ($rootScope.isLogin) {
			uid = $localStorage.user.pk_professional_id;
		} else {
			uid = "Unknown";
		}

		var data = {
			by: uid,
			country: search.country,
			city: search.city,
			profession: search.profession.profession_name,
			page: 1
		};

		var count = 10;
		var page = 1;
		$scope.list = [];
		$scope.fetchMore = function () {
			Search.searchProfessional(data, page).success(function (response) {
				console.log(response);
				count = response.data.data.length;
				page = page + 1;
				$scope.total = response.data.total;
				Array.prototype.push.apply($scope.list, response.data.data);
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}).error(function (error) {
				console.log(error);
				$scope.$broadcast('scroll.infiniteScrollComplete');
			})
		}
		$scope.check = function () {
			return count > 0;
		}
		$scope.sendRequest = function (user) {
			var req = {
				name: $localStorage.user.professional_name,
				request_sendby: $localStorage.user.pk_professional_id,
				request_sendto: user.pk_professional_id,
				country: $localStorage.user.country_id,
				text: "",
				remark: ""
			}
			console.log(req);
			$ionicLoading.show({
				showBackdrop: false,
				template: 'Sending request...'
			});
			if ($scope.$parent.setting.isLogin) {
				Social.send(req).success(function (response) {
					if (response.status == "Ok") {
						var index = $scope.result.data.indexOf(user);
						$scope.result.data[index].isFriend = 1;
					} else
						console.log(response.message)
				}).error(function (error) {
					console.log(error);
				}).finally(function () {
					$ionicLoading.hide();
				});
			}
		}
}]);
app.controller('ProfessionalDetailCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'Search', 'Social', '$localStorage', '$ionicLoading',
                                          function ($scope, $rootScope, $state, $stateParams, Search, Social, $localStorage, $ionicLoading) {
		$scope.detail = {};
		$scope.isLogin = $rootScope.isLogin;
		console.log($rootScope.isLogin);
		var by = "";
		if ($rootScope.isLogin) {
			by = $localStorage.user.pk_professional_id;
		} else {
			by = "Unknown";
		}
		$scope.showDetail = function () {
			$ionicLoading.show({
				showBackdrop: false
			})
			Search.detailProfessional($stateParams.id, by).success(function (response) {
				console.log(response.data);
				$scope.detail = response.data;
				$localStorage.professional_detail = response.data;
				$ionicLoading.hide();
			}).error(function (error) {
				$ionicLoading.hide();
			}).finally(function () {
				$ionicLoading.hide();
			});
		}
		$scope.doRefresh = function () {
			Search.detailProfessional($stateParams.id, by).success(function (response) {
				$scope.detail = response.data;
			}).finally(function () {
				$scope.$broadcast('scroll.refreshComplete');
			});
		}
		$scope.sendRequest = function () {
			var req = {
				name: $localStorage.user.professional_name,
				request_sendby: $localStorage.user.pk_professional_id,
				request_sendto: $scope.detail.id,
				country: $localStorage.user.country_id,
				text: "",
				remark: ""
			}

			$ionicLoading.show({
				showBackdrop: false,
				template: 'Sending request...'
			});
			console.log(req);
			Social.send(req).success(function (response) {
				if (response.status == "Ok")
					$scope.detail.isFriend = 1;
				else
					console.log(response.message)
			}).error(function (error) {
				console.log(error);
			}).finally(function () {
				$ionicLoading.hide();
			});
		}
		$scope.showDetail();
}]);


app.controller('EmailCtrl', ['$scope', '$state', '$localStorage', '$ionicHistory', function ($scope, $state, $localStorage, $ionicHistory) {
	$scope.detail = $localStorage.professional_detail;
	$scope.back = function () {
		$ionicHistory.goBack();
	}
}]);


app.controller('RecomCtrl', ['$scope', '$state', '$rootScope', '$localStorage', '$ionicHistory', '$ionicLoading', 'Search', function ($scope, $state, $rootScope, $localStorage, $ionicHistory, $ionicLoading, Search) {
	$scope.detail = $localStorage.professional_detail;

	$scope.data = {
		"fk_professional_id": $scope.detail.id,
		"recommendation_by": "",
		"recommendation_note": "",
		"transaction_country": ""
	};

	if ($rootScope.isLogin) {
		$scope.data.recommendation_by = $localStorage.user.pk_professional_id;
		$scope.data.transaction_country = $localStorage.user.country_id;
	} else {
		$scope.data.recommendation_by = 'Unknown';
	}

	$scope.back = function () {
		$ionicHistory.goBack();
	}
	$scope.send = function () {
		console.log($scope.data);
		$ionicLoading.show({
			showBackdrop: false
		});
		Search.sendRecommendation($scope.data).success(function (response) {
			$ionicLoading.hide();
			console.log(response);
			if (response.data) {
				if (alert('Your recommendation has submitted.')) {
					$ionicHistory.goBack();
				}
			}
		}).error(function (error) {
			$ionicLoading.hide();
		})
	}
}]);



app.controller('SearchJobResultCtrl', ['$scope', '$state', '$stateParams', '$localStorage', 'Search', function ($scope, $state, $stateParams, $localStorage, Search) {
	var search = $localStorage.search;
	var data = {
		country: search.country.country_name,
		state: search.state.state_name,
		city: search.city.city_name,
		profession: search.profession.profession_name,
		page: 1
	};

	var count = 10;
	var page = 1;
	$scope.list = [];

	$scope.fetchMore = function () {
		Search.searchJob(data, page).success(function (response) {
			count = response.data.data.length;
			page = page + 1;
			$scope.total = response.data.total;
			Array.prototype.push.apply($scope.list, response.data.data);
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}).error(function (error) {
			//console.log(error);
			$scope.$broadcast('scroll.infiniteScrollComplete');
		})
	}
	$scope.check = function () {
		return count > 0;
	}
}]);
app.controller('JobDetailCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'Search', '$localStorage', '$ionicLoading', '$ionicPopup',
                                 function ($scope, $rootScope, $state, $stateParams, Search, $localStorage, $ionicLoading, $ionicPopup) {
		$scope.detail = {};
		$scope.job = {};
		//console.log($scope.isLogin);
		$scope.showDetail = function () {
			$ionicLoading.show({
				showBackdrop: false
			});
			Search.detailJob($stateParams.id).success(function (response) {
				if ($scope.isLogin) {
					$scope.job.job_id = response.data.pk_com_jobpost_id;
					$scope.job.company_id = response.data.fk_com_company_id;
					$scope.job.professional_id = $localStorage.user.pk_professional_id;
				}
				$scope.detail = response.data;
				$ionicLoading.hide();
			}).error(function (error) {
				//console.log(error);
				$ionicLoading.hide();
			}).finally(function () {
				$ionicLoading.hide();
			})
		}
		$scope.apply = function () {
			//console.log($scope.job);
			$ionicLoading.show();
			if ($scope.job.message == undefined)
				$scope.job.message = "";
			Search.applyJob($scope.job).success(function (response) {
				$ionicPopup.alert({
					title: response.status,
					template: response.message
				});
				$ionicLoading.hide();
			}).error(function (error) {
				$ionicPopup.alert({
					title: 'Error',
					template: response.message
				});
				$ionicLoading.hide();
			})
		}
		$scope.showDetail();
}]);




app.controller('SearchAssignmentResultCtrl', ['$scope', '$state', '$localStorage', 'Search', function ($scope, $state, $localStorage, Search) {
	var search = $localStorage.search;
	var data = {
		country: search.country.country_name,
		state: search.state.state_name,
		city: search.city.city_name,
		profession: search.profession.profession_name,
		page: 1
	};

	var count = 10;
	var page = 0;
	$scope.list = [];

	$scope.fetchMore = function () {
		Search.searchAssignment(data, $scope.result.next).success(function (response) {
			count = response.data.data.length;
			page = page + 1;
			Array.prototype.push.apply($scope.list, response.data.data);
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}).error(function (error) {
			//console.log(error);
			$scope.$broadcast('scroll.infiniteScrollComplete');
		})
	}
	$scope.check = function () {
		return count > 0;
	}
}]);
app.controller('AssignmentDetailCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'Search', '$localStorage', '$ionicLoading', '$ionicPopup',
                                        function ($scope, $rootScope, $state, $stateParams, Search, $localStorage, $ionicLoading, $ionicPopup) {
		$scope.detail = {};
		$scope.assignment = {};
		$scope.showDetail = function () {
			$ionicLoading.show({
				showBackdrop: false
			})
			Search.detailAssignment($stateParams.id).success(function (response) {
				//console.log("detail ::", response);
				if ($scope.isLogin) {
					$scope.assignment.assignment_id = response.data.pk_cor_assignment_id;
					$scope.assignment.professional_id = $localStorage.user.pk_professional_id;
				}
				$scope.detail = response.data;
				$ionicLoading.hide();
			}).error(function (error) {
				//console.log(error);
				$ionicLoading.hide();
			})
		}
		$scope.apply = function () {
			//console.log($scope.assignment);
			$ionicLoading.show();
			if ($scope.assignment.message == undefined)
				$scope.assignment.message = "";
			Search.applyAssignment($scope.assignment).success(function (response) {
				$ionicPopup.alert({
					title: response.status,
					template: response.message
				});
				$ionicLoading.hide();
			}).error(function (error) {
				$ionicPopup.alert({
					title: 'Error',
					template: response.message
				});
				$ionicLoading.hide();
			})
		}
		$scope.showDetail();
}]);