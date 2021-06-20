app.constant("Config", {
    //"ApiUrl": "http://localhost:8080/v1/"
    "ApiUrl": "http://holo.bitoapi.in/v1/index.php"
});

// config contact
app.constant("ConfigContact", {
    "EmailId": "weblogtemplatesnet@gmail.com",
    "ContactSubject": "Contact"
});

app.factory('Camera', ['$ionicActionSheet', '$cordovaCamera', '$ionicPopup', function ($ionicActionSheet, $cordovaCamera, $ionicPopup) {
    var data = {};
    data.camera = function (scope, successCallback, failCallback) {
        scope.openMenu = function () {
            $ionicActionSheet.show({
                buttons: [
                    {
                        text: 'Camera'
                },
                    {
                        text: 'Album'
                }
            ],
                buttonClicked: function (index) {
                    getPhoto(index);
                    return true;
                }
            });
        }

        function getPhoto(source) {
            var options;
            document.addEventListener("deviceready", function () {
                if (source == 0) {
                    options = {
                        quality: 50,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: Camera.PictureSourceType.CAMERA,
                        allowEdit: true,
                        encodingType: Camera.EncodingType.JPEG,
                        targetWidth: 150,
                        targetHeight: 150,
                        popoverOptions: CameraPopoverOptions,
                        saveToPhotoAlbum: false,
                        correctOrientation: true
                    };
                } else if (source == 1) {
                    options = {
                        allowEdit: true,
                        targetWidth: 150,
                        targetHeight: 150,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
                    };
                }
                console.log(source);
                $cordovaCamera.getPicture(options).then(successCallback, failCallback)
            }, false);
        }
    }
    return data;
}]);