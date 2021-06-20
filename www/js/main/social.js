app.controller('ContactListCtrl', ['$scope', '$state', '$ionicLoading', '$ionicPopup', '$localStorage', 'Social', function ($scope, $state, $ionicLoading, $ionicPopup, $localStorage, Social) {
    $scope.items = [];

    var count = 10;
    var page = 1;
    $scope.fetchMore = function () {
        Social.contacts($localStorage.user.pk_professional_id, page).success(function (response) {
            count = response.data.length;
            page = page + 1;
            Array.prototype.push.apply($scope.items, response.data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }).error(function (error) {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    }
    $scope.check = function () {
        return count > 0;
    }

    $scope.delete = function (contact) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Alter',
            template: 'Are you sure you want to remove ' + contact.professional_name + ' from contact?'
        });
        confirmPopup.then(function (res) {
            if (res) {
                $ionicLoading.show({
                    template: 'Removing from contact list...'
                });
                var data = {
                    id: $localStorage.user.pk_professional_id,
                    fk_cot_request_id: contact.fk_cot_request_id,
                    contact_professional: contact.contact_professional
                }
                Social.deleteContact(data).success(function (response) {
                    var index = $scope.items.indexOf(contact);
                    $scope.items.splice(index, 1);
                }).error(function (error) {
                    console.log(error.message);
                }).finally(function () {
                    $ionicLoading.hide();
                })
            } else {
                console.log('You are not sure');
            }
        });
    };

    $scope.message = function (contact) {
        $state.go("app.message", {
            id: contact.contact_professional,
            name: contact.professional_name
        })
    };
}]);
app.controller('SentRequestListCtrl', ['$scope', '$state', '$ionicLoading', '$localStorage', 'Social', function ($scope, $state, $ionicLoading, $localStorage, Social) {
    $scope.items = [];

    var count = 10;
    var page = 1;
    $scope.fetchMore = function () {
        Social.requests($localStorage.user.pk_professional_id, page).success(function (response) {
            count = response.data.length;
            page = page + 1;
            Array.prototype.push.apply($scope.items, response.data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }).error(function (error) {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    }
    $scope.check = function () {
        return count > 0;
    }

    $scope.delete = function (contact) {
        var data = {
            request_sendby: $localStorage.user.pk_professional_id,
            request_sendto: contact.request_sendto
        }
        $ionicLoading.show({
            template: 'Removing request...'
        });
        Social.deleteRequest(data).success(function (response) {
            var index = $scope.items.indexOf(contact);
            $scope.items.splice(index, 1);
        }).error(function (error) {
            console.log(error.message);
        }).finally(function () {
            $ionicLoading.hide();
        })
    };
}]);
app.controller('InvitesListCtrl', ['$scope', '$state', '$localStorage', 'Social', function ($scope, $state, $localStorage, Social) {
    $scope.items = [];
    var data = {};

    var count = 10;
    var page = 1;
    $scope.fetchMore = function () {
        Social.invites($localStorage.user.pk_professional_id, page).success(function (response) {
            count = response.data.length;
            page = page + 1;
            Array.prototype.push.apply($scope.items, response.data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }).error(function (error) {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    }
    $scope.check = function () {
        return count > 0;
    }

    $scope.accept = function (user) {
        data = {
            name: $localStorage.user.professional_name,
            request_sendto: $localStorage.user.pk_professional_id,
            request_sendby: user.request_sendby,
            pk_cor_request_id: user.pk_cot_request_id,
            country: $localStorage.user.country_id,
        };
        console.log(data);
        Social.acceptInvite(data).success(function (response) {
            if (response.status == "Ok") {
                var index = $scope.items.indexOf(user);
                $scope.items.splice(index, 1);
            } else {
                console.log(response.message);
            }
        }).error(function (error) {
            console.log(error);
        });
    }
    $scope.delete = function (user) {
        data = {
            request_sendto: $localStorage.user.pk_professional_id,
            request_sendby: user.request_sendby,
            pk_cor_request_id: user.pk_cot_request_id
        };
        Social.deleteInvite(data).success(function (response) {
            if (response.status == "Ok") {
                var index = $scope.items.indexOf(user);
                $scope.items.splice(index, 1);
            } else {
                console.log(response.message);
            }
        }).error(function (error) {
            console.log(error);
        });
    }
}]);
app.controller('NotificationListCtrl', ['$scope', '$state', '$localStorage', 'Social', function ($scope, $state, $localStorage, Social) {
    $scope.items = [];
    var count = 10;
    var page = 1;
    $scope.fetchMore = function () {
        Social.notifications($localStorage.user.pk_professional_id, page).success(function (response) {
            count = response.data.length;
            page = page + 1;
            Array.prototype.push.apply($scope.items, response.data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }).error(function (error) {
            console.log(error);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    }
    $scope.check = function () {
        return count > 0;
    }
}]);
app.controller('MessageListCtrl', ['$scope', '$state', '$localStorage', 'Social', function ($scope, $state, $localStorage, Social) {
    $scope.items = [];
    var count = 10;
    var page = 1;
    $scope.fetchMore = function () {
        Social.messages($localStorage.user.pk_professional_id, page).success(function (response) {
            count = response.data.length;
            page = page + 1;
            Array.prototype.push.apply($scope.items, response.data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }).error(function (error) {
            console.log(error);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    }
    $scope.check = function () {
        return count > 0;
    }
}]);
app.controller('MessageCtrl', ['$scope', '$stateParams', 'Social', '$ionicScrollDelegate', '$localStorage',
                               function ($scope, $stateParams, Social, $ionicScrollDelegate, $localStorage) {

        $scope.items = [];
        $scope.postsCompleted = false;
        var page = 1;
        $scope.postsCompleted = false;
        $scope.title = $stateParams.name;

        $scope.getMessage = function () {
                Social.message($localStorage.user.pk_professional_id, $stateParams.id, page).success(function (response) {
                    if (response.data.length == 0) {
                        $scope.postsCompleted = true;
                    }
                    page = page + 1;
                    Array.prototype.push.apply($scope.items, response.data);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    $ionicScrollDelegate.scrollBottom();
                }).error(function (error) {
                    console.log(error);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                })
            }
            // pull to refresh buttons
        $scope.doRefresh = function () {
            $scope.postsCompleted = false;
            Social.unReadMessage($localStorage.user.pk_professional_id, $stateParams.id).success(function (response) {
                Array.prototype.push.apply($scope.items, response.data);
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $ionicScrollDelegate.scrollBottom();
            }).error(function (error) {
                console.log(error);
                $scope.$broadcast('scroll.infiniteScrollComplete');
            })
            $scope.$broadcast('scroll.refreshComplete');
        }
        var newMessage = {};
        $scope.addMesage = function () {
            newMessage = {
                pk_professional_id: $localStorage.user.pk_professional_id,
                fid: $stateParams.id,
                mesage_subject: "",
                message_text: $scope.message_text,
                transaction_country: $localStorage.user.country_id,
                message_by: "P",
                from: '2'
            }
            Social.sendMessage(newMessage).success(function (response) {
                $scope.items = $scope.items.concat(newMessage);
                $scope.message_text = "";
                newMessage = {};
            }).error(function (error) {
                console.log(error.message);
            });

            $scope.datamessage = "";
            $ionicScrollDelegate.scrollBottom();
        }
}])