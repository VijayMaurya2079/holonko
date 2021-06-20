app.controller('GalleryCtrl', ['$scope', '$state', '$ionicModal', 'Media', function ($scope, $state, $ionicModal, Media) {
    $scope.items = [];
    $scope.count = 10;
    var page = 1;
    $scope.fetchMore = function () {
            Media.gallery(page).success(function (response) {
                $scope.count = response.data.length;
                page = page + 1;
                Array.prototype.push.apply($scope.items, response.data);
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }).error(function (error) {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            })
        }
        // modal to show image full screen
    $ionicModal.fromTemplateUrl('templates/media/image-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function () {
        $scope.showNav = true;
        $scope.modal.show();
    };

    $scope.closeModal = function () {
        $scope.modal.hide();
    };
    // show image in popup
    $scope.showImage = function (index) {
            $scope.imageIndex = index;
            $scope.imageSrc = $scope.items[index].image_name;
            $scope.detail = $scope.items[index].image_details;
            $scope.openModal();
        }
        // image navigation // swiping and buttons will also work here
    $scope.imageNavigate = function (dir) {
            if (dir == 'right') {
                $scope.imageIndex = $scope.imageIndex + 1;
            } else {
                $scope.imageIndex = $scope.imageIndex - 1;
            }
            //alert(dir);
            if ($scope.items[$scope.imageIndex] === undefined) {
                $scope.closeModal();
            } else {
                $scope.imageSrc = $scope.items[$scope.imageIndex].image_name;
                $scope.detail = $scope.items[$scope.imageIndex].image_details;
            }
        }
        // cleaning modal
    $scope.$on('$stateChangeStart', function () {
        $scope.modal.remove();
    });
}]);
app.controller('VideoCtrl', ['$scope', '$state', '$sce', 'Media', function ($scope, $state, $sce, Media) {
    $scope.items = [];
    $scope.count = 10;
    var page = 1;
    $scope.fetchMore = function () {
        Media.video(page).success(function (response) {
            $scope.count = response.data.length;
            page = page + 1;
            Array.prototype.push.apply($scope.items, response.data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }).error(function (error) {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    }
    $scope.videoEmbed = function (video) {
        return $sce.trustAsResourceUrl(video);
    }
}]);