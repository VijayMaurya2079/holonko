app.factory('Util', ['$http', 'Config', function ($http, Config) {
    var data = {};
	data.getLocationList = function (_data) {
        return $http({
            method: 'GET',
            async: true,
            crossDomain: true,
            cache: true,
            url: Config.ApiUrl + "location/list/"+_data
        });
    }
	data.getSearchLocation = function (_data) {
        return $http({
            method: 'GET',
            async: true,
            crossDomain: true,
            cache: true,
            url: Config.ApiUrl + "location/"+_data
        });
    }
    data.getCountry = function () {
        return $http({
            method: 'GET',
            async: true,
            crossDomain: true,
            cache: true,
            url: Config.ApiUrl + "country"
        });
    }
    data.getState = function (_data) {
        return $http({
            method: 'GET',
            async: true,
            crossDomain: true,
            cache: true,
            url: Config.ApiUrl + "state/" + _data
        });
    }
    data.getCity = function (_data) {
        return $http({
            method: 'GET',
            async: true,
            crossDomain: true,
            cache: true,
            url: Config.ApiUrl + "city/" + _data
        });
    }
    data.getProfession = function () {
        return $http({
            method: 'GET',
            async: true,
            crossDomain: true,
            cache: true,
            url: Config.ApiUrl + "profession"
        });
    }
    data.getIndustry = function () {
        return $http({
            method: 'GET',
            async: true,
            crossDomain: true,
            cache: true,
            url: Config.ApiUrl + "industry"
        });
    }
    return data;
}])


app.factory('Auth', ['$http', 'Config', function ($http, Config) {
    var data = {};
    data.registration = function (_data) {
        return $http({
            method: 'POST',
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "auth/registration",
            data: _data,
            headers: {
                "content-type": "application/json"
            }
        });
    }
    data.uploadProfilePic = function (_data) {
        return $http({
            method: 'POST',
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "auth/pic",
            data: _data
        });
    }
    data.login = function (_data) {
        return $http({
            method: 'POST',
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "auth/login",
            data: _data
        });
    }
    data.reset = function (_data) {
        return $http({
            method: 'POST',
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "auth/reset",
            data: _data
        });
    }
    data.changePassword = function (_data) {
        return $http({
            method: 'POST',
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "auth/changepassword",
            data: _data
        });
    }
    return data;
}])





app.factory('Search', ['$http', 'Config', function ($http, Config) {
    var data = {};
    data.searchProfessional = function (_data, _page) {
        _data.page = _page;
        return $http({
            method: 'POST',
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "search/professional",
            data: _data
        });
    }
    data.detailProfessional = function (_data, _by) {
        return $http({
            method: 'GET',
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "search/professional/detail/" + _data + "/by/" + _by
        });
    }
    data.searchJob = function (_data, _page) {
        _data.page = _page;
        return $http({
            method: 'POST',
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "search/job",
            data: _data
        });
    }
    data.detailJob = function (_data) {
        return $http({
            method: 'GET',
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "search/job/detail/" + _data
        });
    }
    data.applyJob = function (_data) {
        return $http({
            method: 'POST',
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "job/apply",
            data: _data
        });
    }
    data.searchAssignment = function (_data, _page) {
        _data.page = _page;
        return $http({
            method: 'POST',
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "search/assignment",
            data: _data
        });
    }
    data.applyAssignment = function (_data) {
        return $http({
            method: 'POST',
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "assignment/apply",
            data: _data
        });
    }
    data.detailAssignment = function (_data) {
        return $http({
            method: 'GET',
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "search/assignment/detail/" + _data
        });
    }
	data.sendRecommendation = function (_data) {
        return $http({
            method: 'POST',
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "search/sendrecommendation",
			data:_data
        });
    }
    return data;
}])








app.factory('Profile', ['$http', 'Config', '$localStorage', function ($http, Config) {
    var data = {};
    data.profile = function (_data) {
        return $http({
            method: 'GET',
            cache: true,
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "professional/" + _data
        });
    }
    data.editProfile = function (_data) {
        return $http({
            method: 'GET',
            cache: true,
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "professional/edit/" + _data
        });
    }
    data.updateProfile = function (_data) {
        return $http({
            method: 'POST',
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "professional/update",
            data: _data
        });
    }
    data.appliedJobs = function (_data, _page) {
        return $http({
            method: 'GET',
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "professional/job/" + _data + "/page/" + _page
        });
    }
    data.appliedAssignment = function (_data, _page) {
        return $http({
            method: 'GET',
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "professional/assignment/" + _data + "/page/" + _page
        });
    }
    data.changePic = function (_data) {
        return $http({
            method: 'POST',
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "professional/pic",
            data: _data
        });
    }
    return data;
}])









app.factory('Social', ['$http', 'Config', function ($http, Config) {
    var data = {};
    data.send = function (_data) {
        return $http({
            method: 'POST',
            cache: true,
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "social/sendrequest",
            data: _data
        });
    }
    data.contacts = function (_data, _page) {
        return $http({
            method: 'GET',
            cache: true,
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "social/contacts/" + _data + "/" + _page
        });
    }
    data.requests = function (_data, _page) {
        return $http({
            method: 'GET',
            cache: true,
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "social/requests/" + _data + "/" + _page
        });
    }
    data.invites = function (_data, _page) {
        return $http({
            method: 'GET',
            cache: true,
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "social/invites/" + _data + "/" + _page
        });
    }
    data.deleteRequest = function (_data) {
        return $http({
            method: 'POST',
            cache: true,
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "social/deleterequest",
            data: _data
        });
    }
    data.deleteContact = function (_data) {
        return $http({
            method: 'POST',
            cache: true,
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "social/deletecontact",
            data: _data
        });
    }
    data.acceptInvite = function (_data) {
        return $http({
            method: 'POST',
            cache: true,
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "social/acceptinvite",
            data: _data
        });
    }
    data.deleteInvite = function (_data) {
        return $http({
            method: 'POST',
            cache: true,
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "social/deleteinvite",
            data: _data
        });
    }
    data.notifications = function (_data, _page) {
        return $http({
            method: 'GET',
            async: true,
            cache:false,
            crossDomain: true,
            url: Config.ApiUrl + "social/notifications/" + _data + "/" + _page
        });
    }
    data.messages = function (_data, _page) {
        return $http({
            method: 'GET',
            async: true,
            cache:false,
            crossDomain: true,
            url: Config.ApiUrl + "social/messages/" + _data + "/" + _page
        });
    }
    data.message = function (_data1, _data2, _page) {
        return $http({
            method: 'GET',
            async: true,
            cache:false,
            crossDomain: true,
            url: Config.ApiUrl + "social/message/" + _data1 + "/" + _data2 + "/" + _page
        });
    }
    data.unReadMessage = function (_data1, _data2) {
        return $http({
            method: 'GET',
            async: true,
            cache:false,
            crossDomain: true,
            url: Config.ApiUrl + "social/unreadmessage/" + _data1 + "/" + _data2
        });
    }
    data.sendMessage = function (_data) {
        return $http({
            method: 'POST',
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "social/sendmessage",
            data:_data
        });
    }
    return data;
}])





















app.factory('Media', ['$http', 'Config', function ($http, Config) {
    var data = {};
    data.gallery = function (_data) {
        return $http({
            method: 'GET',
            cache: true,
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "media/gallery/"+_data
        });
    }
    data.video = function (_data) {
        return $http({
            method: 'GET',
            cache: true,
            async: true,
            crossDomain: true,
            url: Config.ApiUrl + "media/video/"+_data
        });
    }
    return data;
}])