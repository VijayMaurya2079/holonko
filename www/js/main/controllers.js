app.controller('IntroCtrl', ['$scope', '$state', function ($scope, $state) {
    $scope.startApp = function () {
        $state.go('app.home');
        window.localStorage['didTutorial'] = true;
    }
    // Move to the next slide
    $scope.next = function () {
        $scope.$broadcast('slideBox.nextSlide');
    };
}]);







app.controller('AddNewProfessionalCtrl', ['$state', '$stateParams', '$scope', 'Auth', '$ionicPopup', '$ionicLoading', '$localStorage', function ($state, $stateParams, $scope, Auth, $ionicPopup, $ionicLoading, $localStorage) {
    $scope.location = {};
    $scope.reg = {
        email: "",
        name: "",
        gender: "Male",
        mobile_no: "",
        professional_interest: "0",
        job_interest: "1",
        profile_interest: "0",
        country: {
            country_name: "Country"
        },
        state: {
            state_name: "State"
        },
        city: {
            city_name: "City"
        },
        profession: {
            profession_name: "Profession"
        }
    };

    if ($stateParams.data != "" && $stateParams.data != undefined) {
        var data = JSON.parse($stateParams.data);
        if ($localStorage.reg)
            $scope.reg = $localStorage.reg;

        if (data.hasOwnProperty('country')) {
            $scope.reg.country = data.country;
            $scope.reg.state = {
                state_name: "State"
            };
            $scope.reg.city = {
                city_name: "City"
            };
        } else if (data.hasOwnProperty('state')) {
            $scope.reg.state = data.state;
            $scope.reg.city = {
                city_name: "City"
            };
        } else if (data.hasOwnProperty('city')) {
            $scope.reg.city = data.city;
        } else if (data.hasOwnProperty('profession')) {
            $scope.reg.profession = data.profession;
        } else if (data.hasOwnProperty('industry')) {
            $scope.reg.industry = data.industry;
        }
        $localStorage.reg = $scope.reg;
        console.log($scope.reg);
    }

    $scope.registration = function () {
        var error = "";
        if ($scope.reg.email == "" || $scope.reg.email == undefined) {
            error = "Email required."
        } else if ($scope.reg.name == "" || $scope.reg.name == undefined) {
            error = "Name required."
        } else if ($scope.reg.country == null || $scope.reg.country == undefined || $scope.reg.country.country_name == "Country") {
            error = "Country required."
        } else if ($scope.reg.state == undefined || $scope.reg.country.country_name == "State") {
            $scope.reg.state = "";
        } else if ($scope.reg.city == undefined || $scope.reg.country.country_name == "City") {
            $scope.reg.city = "";
        } else if ($scope.reg.mobile_no == "" || $scope.reg.mobile_no == undefined) {
            error = "Mobile number required."
        } else if ($scope.reg.profession == "" || $scope.reg.profession == undefined) {
            error = "Profession required."
        }

        if (error != "") {
            $ionicPopup.alert({
                title: "Alert",
                template: error
            });
            error = "";
            return;
        }


        console.log($scope.reg);

        $ionicLoading.show();
        $scope.reg.password = "pass";
        Auth.registration($scope.reg).success(function (response) {
            //console.log(response);
            if (response.status == "Ok") {
                $scope.reg = {};
                $ionicLoading.hide();
                $state.go("app.addnewprofessional2", {
                    id: response.data
                });
            } else {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: "Error",
                    template: response.message
                })
            }
        }).error(function (error) {
            $ionicLoading.hide();
            //console.log("error", error);
            $ionicPopup.alert({
                title: "Alert",
                template: error.message
            })
        });
    }
}]);
app.controller('AddNewProfessional2Ctrl', ['$state', '$scope', '$stateParams', '$ionicLoading', '$ionicPopup', 'Camera', 'Auth', '$localStorage', function ($state, $scope, $stateParams, $ionicLoading, $ionicPopup, Camera, Auth, $localStorage) {
    $scope.profilePic = "1";
    Camera.camera($scope, success, error);

    function success(imageURI) {
        $ionicLoading.show();
        //console.log("data:image/jpeg;base64," + imageURI);
        var data = {
            id: $stateParams.id,
            pic: imageURI
        };
        Auth.uploadProfilePic(data).success(function (response) {
            if (response.status == "Error") {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: "Alert",
                    template: response.message
                })
            } else {
                $scope.profilePic = "/upload/" + response.data.id + ".png";
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: "Alert",
                    template: "Pofessional profile image uploaded successfully."
                }).then(function () {
                    $state.go("app.home");
                })
            }
        }).error(function (error) {
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: "Alert",
                template: error.message
            })
        });
    }

    function error(error) {
        $ionicLoading.hide();
        //console.log(error);
    }
}]);









app.controller('ProfileCtrl', ['$scope', 'Profile', '$localStorage', '$ionicLoading', '$ionicHistory', '$ionicPopup', 'Camera', 'Profile', function ($scope, Profile, $localStorage, $ionicLoading, $ionicHistory, $ionicPopup, Camera, Profile) {
    $scope.detail = {};
    $scope.detail.pic = $localStorage.user.profile_image;
    $scope.detail.professional_name = $localStorage.user.professional_name;
    $scope.showDetail = function () {
        $ionicLoading.show({ noBackdrop: true });
        Profile.profile($localStorage.user.pk_professional_id).success(function (response) {
            $scope.detail = response.data;
            $ionicLoading.hide();
        }).error(function (error) {
            //console.log(error);
            $ionicLoading.hide();
        })
    }
    $scope.doRefresh = function () {
        Profile.profile($localStorage.user.pk_professional_id).success(function (response) {
            $scope.detail = response.data;
            $scope.detail.pic = $scope.detail.pic + "?rand=" + Math.round(Math.random() * 999999);
        }).finally(function () {
            $scope.$broadcast('scroll.refreshComplete');
        });
    }

    Camera.camera($scope, success, error);

    function success(imageURI) {
        $ionicLoading.show();
        //console.log("data:image/jpeg;base64," + imageURI);
        var data = {
            pk_professional_id: $localStorage.user.pk_professional_id,
            pic: imageURI
        };
        Profile.changePic(data).success(function (response) {
            //console.log(response);
            if (response.status == "Error") {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: "Error",
                    template: response.message
                })
            } else {
                console.log(response);
                $ionicLoading.hide();
                $scope.doRefresh();
            }
        }).error(function (error) {
            console.log(error);
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: "Alert",
                template: error.message
            })
        }).finally(function () {
            $ionicLoading.hide();
        });
    }

    function error(error) {
        $ionicLoading.hide();
        //console.log(error);
    }
    $scope.showDetail();
}]);

app.controller('UpdateProfileCtrl', ['$scope', '$state', 'Profile', 'Util', '$localStorage', '$ionicLoading', '$ionicModal', '$ionicPopup', function ($scope, $state, Profile, Util, $localStorage, $ionicLoading, $ionicModal, $ionicPopup) {
    $scope.reg = {};
    $scope.showDetail = function () {
        $ionicLoading.show()
        Profile.editProfile($localStorage.user.pk_professional_id).success(function (response) {
            $scope.reg = response.data;
            //console.log(response);
            $ionicLoading.hide();
        }).error(function (error) {
            //console.log(error);
            $ionicLoading.hide();
        })
    }

    //initilize modal
    $ionicModal.fromTemplateUrl('country.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (ionicModal) {
        $scope.cmodal = ionicModal;
    });
    $ionicModal.fromTemplateUrl('state.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (ionicModal) {
        $scope.smodal = ionicModal;
    });
    $ionicModal.fromTemplateUrl('city.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (ionicModal) {
        $scope.ccmodal = ionicModal;
    });
    $ionicModal.fromTemplateUrl('profession.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (ionicModal) {
        $scope.pmodal = ionicModal;
    });


    //country list
    $scope.openCountry = function () {
        $scope.cmodal.show();
        $ionicLoading.show();
        Util.getCountry().success(function (data) {
            console.log(data);
            $scope.reg.country = data;
            $ionicLoading.hide();
        });
    }
    $scope.closeCountry = function (country) {
        $scope.reg.country = country;
        $scope.cmodal.hide();
    }

    //state list
    $scope.openState = function () {
        if ($scope.reg.country != undefined) {
            $scope.smodal.show();
            $ionicLoading.show();
            Util.getState($scope.reg.country.pk_utm_country_id).success(function (data) {
                $scope.reg.state = data;
                $ionicLoading.hide();
            });
        }
    }
    $scope.closeState = function (state) {
        $scope.reg.state = state;
        $scope.smodal.hide();
    }

    //city list
    $scope.openCity = function () {
        if ($scope.reg.state != undefined) {
            $ionicLoading.show();
            $scope.ccmodal.show();
            Util.getCity($scope.reg.state.pk_utm_state_id).success(function (data) {
                $scope.reg.city = data;
                $ionicLoading.hide();
            });
        }
    }
    $scope.closeCity = function (city) {
        $scope.reg.city = city;
        $scope.ccmodal.hide();
    }

    //profession list
    $scope.openProfession = function () {
        $scope.pmodal.show();
        $ionicLoading.show();
        Util.getProfession().success(function (data) {
            $scope.reg.profession = data;
            $ionicLoading.hide();
        });
    }
    $scope.closeProfession = function (profession) {
        $scope.reg.profession = profession;
        $scope.pmodal.hide();
    }


    $scope.registration = function () {
        console.log($scope.reg);

        var error = "";

        if ($scope.reg.name == "") {
            error = "Name required."
        } else if ($scope.reg.country == null || $scope.reg.country == undefined) {
            error = "Country required."
        } else if ($scope.reg.mobile_no == "") {
            error = "Mobile number required."
        } else if ($scope.reg.profession == "") {
            error = "Profession required."
        }

        if (error != "") {
            $ionicPopup.alert({
                title: "Alert",
                template: error
            });
            error = "";
            return;
        }


        //console.log($scope.reg);
        $scope.reg.pk_professional_id = $localStorage.user.pk_professional_id;
        $ionicLoading.show();
        Profile.updateProfile($scope.reg).success(function (data) {
            if (data.status == "Ok") {
                $ionicPopup.alert({
                    title: "Success",
                    template: "Profile updated successfully"
                })
                $ionicLoading.hide();
            } else {
                $ionicPopup.alert({
                    title: "Error",
                    template: data.message
                })
                $ionicLoading.hide();
            }
            console.log(data);
        }).error(function (error) {
            //console.log("error", error);
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: "Error",
                template: error.message
            })
        });
    }
    $scope.showDetail();
}]);
app.controller('AppliedJobsCtrl', ['$scope', 'Profile', '$localStorage', '$ionicLoading', function ($scope, Profile, $localStorage, $ionicLoading) {
    $scope.result = {
        next: 1
    };
    $scope.moreDataCanBeLoaded = true;
    $scope.list = [];

    $scope.fetchMore = function () {
        Profile.appliedJobs($localStorage.user.pk_professional_id, $scope.result.next).success(function (response) {
            console.log("more ::", response);
            $scope.result = response;
            Array.prototype.push.apply($scope.list, response.data);
            $scope.moreDataCanBeLoaded = response.data.lenght;
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }).error(function (error) {
            console.log(error);
        })
    }
}]);
app.controller('AppliedAssignmentCtrl', ['$scope', 'Profile', '$localStorage', '$ionicLoading', function ($scope, Profile, $localStorage, $ionicLoading) {
    $scope.result = {
        next: 1
    };
    $scope.moreDataCanBeLoaded = 1;
    $scope.list = [];

    $scope.fetchMore = function () {
        Profile.appliedAssignment($localStorage.user.pk_professional_id, $scope.result.next).success(function (response) {
            //console.log("more ::", response);
            $scope.result = response;
            Array.prototype.push.apply($scope.list, response.data);
            $scope.moreDataCanBeLoaded = response.data.lenght;
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }).error(function (error) {
            console.log(error);
        })
    }
}]);
app.controller('ChangePasswordCtrl', ['$scope', 'Auth', '$localStorage', '$ionicLoading', '$ionicPopup', function ($scope, Auth, $localStorage, $ionicLoading, $ionicPopup) {
    $scope.change = {};

    $scope.changePassword = function () {
        $ionicLoading.show();
        Auth.changePassword($scope.change).success(function (response) {
            //console.log("more ::", response);
            $ionicPopup.alert({
                title: response.status,
                template: response.message
            });
            $scope.change = {};
            $ionicLoading.hide();
        }).error(function (error) {
            //console.log(error);
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: "Error",
                template: error.message
            })
        })
    }
}]);