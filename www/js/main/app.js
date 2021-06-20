// Ionic Starter App
var app = angular.module('HolonkoApp', ['ionic', 'ngSanitize', 'ngCordova', 'ngIOS9UIWebViewPatch', 'ngStorage', 'ngTouch']);
app.run(function ($rootScope, $localStorage, $ionicPlatform, $cordovaSplashscreen, $timeout, $cordovaNetwork) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
			$cordovaSplashscreen.hide();
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        $timeout(function () {
            if ($localStorage.user) {
                $rootScope.isLogin = true;
                $rootScope.greet = "Hi " + $localStorage.user.professional_name;
            } else {
                $rootScope.greet = "";
                $rootScope.isLogin = false;
            }

            $rootScope.isOnline = true;
            $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
                $rootScope.isOnline = true;
                $rootScope.isOffline = false;
            })
            $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
                $rootScope.isOnline = false;
                $rootScope.isOffline = true;
            })
        }, 300);
    })
});
app.config(function ($ionicConfigProvider) {
    $ionicConfigProvider.views.swipeBackEnabled(false);
    $ionicConfigProvider.views.transition('platform');
    $ionicConfigProvider.platform.android.views.transition('android');
    $ionicConfigProvider.navBar.alignTitle('platform');
    $ionicConfigProvider.views.maxCache(1);
    $ionicConfigProvider.tabs.position('top');
    if (ionic.Platform.isAndroid()) {
        $ionicConfigProvider.scrolling.jsScrolling(false);
    }
});
app.controller('MainCtrl', ['$scope', '$rootScope', '$timeout', '$state', '$ionicPlatform', '$ionicSideMenuDelegate', '$ionicHistory', '$localStorage',
    function ($scope, $rootScope, $timeout, $state, $ionicPlatform, $ionicSideMenuDelegate, $ionicHistory, $localStorage) {

        $timeout(function () {
            if ($localStorage.user) {
                $rootScope.isLogin = true;
                $rootScope.greet = "Hi " + $localStorage.user.professional_name;
            }
        }, 200);

        $scope.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };
        $scope.goBackOne = function () {
            $ionicHistory.goBack();
        }

        $scope.goHome = function () {
            $state.go("app.home");
        }
        $scope.logout = function () {
            delete $localStorage.user;
            $rootScope.isLogin = false;
            $rootScope.greet = "";
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $state.go("app.home");
        }
        $scope.shareMain = function () {
            var title = "Download Holonko For Android Device";
            var url = "https://play.google.com/store/apps/details?id=www.holonko.com&hl=en";
            window.plugins.socialsharing.share(title, null, null, url)
        }
}]);