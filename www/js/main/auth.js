app.controller('LoginCtrl', ['$state', '$rootScope', '$stateParams', '$scope', 'Auth', '$ionicPopup', '$localStorage', '$ionicLoading', '$ionicHistory',
    function ($state, $rootScope, $stateParams, $scope, Auth, $ionicPopup, $localStorage, $ionicLoading, $ionicHistory) {
        $scope.login = {
            email: "",
            password: ""
        };

        if ($stateParams.reg == "done") {
            $ionicPopup.alert({
                title: "Registration Done",
                template: "Use email id and password to login."
            })
        }
        $scope.doLogin = function () {
            if ($scope.login.email == "") {
                $scope.login.error = "Email required";
            } else if ($scope.login.password == "") {
                $scope.login.error = "Password required";
            } else {
                $ionicLoading.show();
                Auth.login($scope.login).success(function (response) {
                    if (response.status == "Ok") {
                        $localStorage.user = response.data;
                        $rootScope.greet = "Hi " + $localStorage.user.professional_name;
                        $rootScope.isLogin = true;
                        $ionicLoading.hide();
                        $state.go("app.home");
                    } else {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: "Error",
                            template: response.message
                        })
                    }
                }).error(function (error) {
                    //console.log(error);
                    $ionicLoading.hide();
                })
            }
        }
    }]);

app.controller('SignUpCtrl', ['$state', '$scope', function ($state, $scope) {
    $scope.goToLogin = function () {
        $state.go("app.login");
    }
    $scope.doRegistration = function () {
        $state.go('app.professionalsignupstep1');
    }
}]);

app.controller('ProfessionalSignupCtrl', ['$state', '$scope', '$ionicModal', 'Util', 'Auth', '$ionicPopup', '$ionicLoading', '$localStorage', function ($state, $scope, $ionicModal, Util, Auth, $ionicPopup, $ionicLoading, $localStorage) {
    $scope.location = {};
    $scope.regForm = {
        email: "",
        name: "",
        gender: "",
        mobile_no: "",
        country: null,
        state: null,
        city: null,
        seeking: "",
        profession: null,
        professional_interest: "0",
        job_interest: "0",
        profile_interest: "0"
    };
    $scope.goToLogin = function () {
        $state.go("app.login");
    };

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
    $ionicModal.fromTemplateUrl('seeking-for.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (ionicModal) {
        $scope.fmodal = ionicModal;
    });



    //country list
    $scope.openCountry = function () {
        $ionicLoading.show();
        $scope.cmodal.show();
        Util.getCountry().success(function (data) {
            $scope.location.country = data;
            $ionicLoading.hide();
        });
    }
    $scope.closeCountry = function (country) {
        //console.log(country);
        $scope.regForm.country = country;
        $scope.cmodal.hide();
    }

    //state list
    $scope.openState = function () {
        if ($scope.regForm.country != undefined) {
            $ionicLoading.show();
            $scope.smodal.show();
            Util.getState($scope.regForm.country.pk_utm_country_id).success(function (data) {
                $scope.location.state = data;
                $ionicLoading.hide();
            });
        }
    }
    $scope.closeState = function (state) {
        $scope.regForm.state = state;
        $scope.smodal.hide();
    }

    //city list
    $scope.openCity = function () {
        if ($scope.regForm.state != undefined) {
            $ionicLoading.show();
            $scope.ccmodal.show();
            Util.getCity($scope.regForm.state.pk_utm_state_id).success(function (data) {
                $scope.location.city = data;
                $ionicLoading.hide();
            });
        }
    }
    $scope.closeCity = function (city) {
        $scope.regForm.city = city;
        $scope.ccmodal.hide();
    }

    //profession list
    $scope.openProfession = function () {
        $ionicLoading.show();
        $scope.pmodal.show();
        Util.getProfession().success(function (data) {
            $scope.location.profession = data;
            $ionicLoading.hide();
        });
    }
    $scope.closeProfession = function (profession) {
        $scope.regForm.profession = profession;
        $scope.pmodal.hide();
    }

    //seeking for list
    $scope.openSeekingFor = function () {
        $scope.fmodal.show();
    }


    $scope.next = function () {
        var error = "";
        if ($scope.regForm.email == "") {
            error = "Email required."
        } else if ($scope.regForm.name == "") {
            error = "Name required."
        } else if ($scope.regForm.country == null || $scope.regForm.country == undefined) {
            error = "Country required."
        } else if ($scope.regForm.mobile_no == "") {
            error = "Mobile number required."
        } else if ($scope.regForm.profession == "") {
            error = "Profession required."
        } else if ($scope.regForm.professional_interest == "0" && $scope.regForm.jobseeker_interest == "0" && $scope.regForm.profile_interest == "0") {
            error = "Seeking for required."
        } else if ($scope.regForm.password == "") {
            error = "Password required."
        } else if ($scope.regForm.password.length < 6) {
            error = "Password length must be 6 char."
        } else if ($scope.regForm.cpassword != $scope.regForm.password) {
            error = "Please re-confirm password"
            $scope.regForm.cpassword = "";
        }
        if (error != "") {
            $ionicPopup.alert({
                title: "Alert",
                template: error
            });
            error = "";
            return;
        }


        console.log($scope.regForm);
        $ionicLoading.show();
        Auth.registration($scope.regForm).success(function (response) {
            $ionicLoading.hide();
            console.log(response);
            if (response.status == "Ok") {
                $scope.regForm = {};
                $state.go("app.professionalsignupstep2", {
                    id: response.data
                });
            } else if (response.status == "Error") {
                $ionicPopup.alert({
                    title: "Alert",
                    template: response.message
                });
            }
        }).error(function (error) {
            console.log("error", error);
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: "Alert",
                template: error.message
            })
        }).finally(function () {
            $ionicLoading.hide();
        });
    }
    $scope.back = function () {
        $state.go("app.signup");
    }
}]);
app.controller('ProfessionalSignupImageCtrl', ['$scope', '$state', '$stateParams', '$ionicLoading', 'Camera', 'Auth', '$localStorage', function ($scope, $state, $stateParams, $ionicLoading, Camera, Auth, $localStorage) {
    $scope.profilePic = "img/photo.png";
    Camera.camera($scope, success, error);

    function success(imageURI) {
        $ionicLoading.show();
        //console.log("data:image/jpeg;base64," + imageURI);
        var data = {
            id: $stateParams.id,
            pic: imageURI
        };
        Auth.uploadProfilePic(data).success(function (data) {
            if (data.status == "Error") {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: "Error",
                    template: data.message
                })
            } else {
                $localStorage.reg_form = $scope.regForm;
                $ionicLoading.hide();
                $state.go("app.login", {
                    reg: "done"
                });
            }
        }).error(function (error) {
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: "Alert",
                template: error.message
            })
        }).finally(function () {
            $ionicLoading.hide();
            $state.go("app.login", {
                reg: "done"
            });
        });
    }

    function error(error) {
        $ionicLoading.hide();
        //console.log(error);
    }
}]);
app.controller('ForgotCtrl', ['$scope', '$state', 'Auth', '$ionicPopup', '$ionicLoading', function ($scope, $state, Auth, $ionicPopup, $ionicLoading) {
    $scope.forgot = {
        email: ""
    };
    $scope.reset = function () {
        $ionicLoading.show();
        Auth.reset($scope.forgot).success(function (response) {
            $ionicPopup.alert({
                title: 'Forgot Password',
                template: response.message
            })
            $scope.forgot = "";
            //console.log("success ::", response);
        }).error(function (error) {
            //console.log(error);
            $ionicPopup.alert({
                title: 'Forgot Password',
                //template: error.message
            })
            console.log("error ::", error);
        }).finally(function () {
            $ionicLoading.hide();
        })
    }
    $scope.gotoLogin = function () {
        $state.go("app.login");
    }
}]);