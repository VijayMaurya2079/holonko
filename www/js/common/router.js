app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    //sidebar
        .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/sidebar-menu.html"
    })







    //common
	.state('location', {
            url: "/location/:from",
            templateUrl: "templates/common/location.html",
            controller: "LocationCtrl"
        })
    	.state('country', {
            url: "/country/:from",
            templateUrl: "templates/common/country.html",
            controller: "CountryCtrl"
        })
        .state('state', {
            url: "/state/:from/:id",
            templateUrl: "templates/common/state.html",
            controller: "StateCtrl"
        })
        .state('city', {
            url: "/city/:from/:id",
            templateUrl: "templates/common/city.html",
            controller: "CityCtrl"
        })
        .state('industry', {
            url: "/industry/:from",
            templateUrl: "templates/common/industry.html",
            controller: "IndustryCtrl"
        })
        .state('profession', {
            url: "/profession/:from",
            templateUrl: "templates/common/profession.html",
            controller: "ProfessionCtrl"
        })
		.state('email', {
            url: "/email",
            templateUrl: "templates/search/send-email.html",
			controller: "EmailCtrl"
        })
		.state('recom', {
            url: "/recom",
            templateUrl: "templates/search/send-recommendation.html",
			controller: "RecomCtrl"
        })

    //auth
    .state('intro', {
            url: "/",
            templateUrl: "templates/intro.html",
            controller: "IntroCtrl",
            onEnter: function ($state, Auth) {
                if (window.localStorage['didTutorial'] === "true")
                    $state.go('app.home');
            }
        })
        .state('app.login', {
            url: "/login/:reg",
            views: {
                'menuContent': {
                    templateUrl: "templates/login.html",
                    controller: "LoginCtrl"
                }
            }
        })
        .state('app.signup', {
            url: "/signup",
            views: {
                'menuContent': {
                    templateUrl: "templates/professional-sign-up.html",
                    controller: "SignUpCtrl"
                }
            }
        })
        .state('app.professionalsignupstep1', {
            url: "/professionalsignupstep1",
            views: {
                'menuContent': {
                    templateUrl: "templates/professional-sign-up-step-1.html",
                    controller: "ProfessionalSignupCtrl"
                }
            }
        })
        .state('app.professionalsignupstep2', {
            url: "/professionalsignupstep2/:id",
            views: {
                'menuContent': {
                    templateUrl: "templates/professional-sign-up-step-2.html",
                    controller: "ProfessionalSignupImageCtrl"
                }
            }
        })
        .state('app.forgot', {
            url: "/forgot",
            views: {
                'menuContent': {
                    templateUrl: "templates/forgot.html",
                    controller: "ForgotCtrl"
                }
            }
        })




    //app
    .state('app.home', {
            url: "/home/:data",
            views: {
                'menuContent': {
                    templateUrl: "templates/home.html",
                    controller: "HomeCtrl"
                }
            }
        })
        .state('app.about', {
            url: "/about",
            views: {
                'menuContent': {
                    templateUrl: "templates/about.html"
                }
            }
        })
        .state('app.contact', {
            url: "/contact",
            views: {
                'menuContent': {
                    templateUrl: "templates/contact.html"
                }
            }
        })
        .state('app.addnewprofessional', {
            url: "/addnewprofessional/:data",
            views: {
                'menuContent': {
                    templateUrl: "templates/add-new-professional.html",
                    controller: "AddNewProfessionalCtrl"
                }
            }
        })
        .state('app.addnewprofessional2', {
            url: "/addnewprofessional2/:id",
            views: {
                'menuContent': {
                    templateUrl: "templates/add-new-professional-2.html",
                    controller: "AddNewProfessional2Ctrl"
                }
            }
        })



    //search
    .state('app.searchprofessionalresult', {
            url: "/searchprofessionalresult",
            views: {
                'menuContent': {
                    templateUrl: "templates/search/search-result-professional.html",
                    controller: "SearchProfessionalResultCtrl"
                }
            }
        })
        .state('app.searchjobresult', {
            url: "/searchjobresult",
            views: {
                'menuContent': {
                    templateUrl: "templates/search/search-result-job.html",
                    controller: "SearchJobResultCtrl"
                }
            }
        })
        .state('app.searchassignmentresult', {
            url: "/searchassignmentresult/:search",
            views: {
                'menuContent': {
                    templateUrl: "templates/search/search-result-assignment.html",
                    controller: "SearchAssignmentResultCtrl"
                }
            }
        })
        .state('app.professionaldetail', {
            url: "/professionaldetail/:id",
            views: {
                'menuContent': {
                    templateUrl: "templates/search/detail-view-personal.html",
                    controller: "ProfessionalDetailCtrl"
                }
            }
        })
        .state('app.jobdetail', {
            url: "/jobdetail/:id",
            views: {
                'menuContent': {
                    templateUrl: "templates/search/detail-view-job.html",
                    controller: "JobDetailCtrl"
                }
            }
        })
        .state('app.assignmentdetail', {
            url: "/assignmentdetail/:id",
            views: {
                'menuContent': {
                    templateUrl: "templates/search/detail-view-assignment.html",
                    controller: "AssignmentDetailCtrl"
                }
            }
        })
        .state('app.appliedjob', {
            url: "/appliedjob",
            views: {
                'menuContent': {
                    templateUrl: "templates/search/applied-jobs.html",
                    controller: "AppliedJobsCtrl"
                }
            }
        })
        .state('app.appliedassignment', {
            url: "/appliedassignment",
            views: {
                'menuContent': {
                    templateUrl: "templates/search/applied-assignment.html",
                    controller: "AppliedAssignmentCtrl"
                }
            }
        })



    .state('app.profile', {
            url: "/profile",
            views: {
                'menuContent': {
                    templateUrl: "templates/profile.html",
                    controller: "ProfileCtrl"
                }
            }
        })
        .state('app.updateprofile', {
            url: "/updateprofile",
            views: {
                'menuContent': {
                    templateUrl: "templates/update-professional-profile.html",
                    controller: "UpdateProfileCtrl"
                }
            }
        })
        .state('app.helpothers', {
            url: "/helpothers",
            views: {
                'menuContent': {
                    templateUrl: "templates/help-others.html"
                }
            }
        })
        .state('app.video', {
            url: "/video",
            views: {
                'menuContent': {
                    templateUrl: "templates/media/video.html",
                    controller: "VideoCtrl"
                }
            }
        })
        .state('app.gallery', {
            url: "/gallery",
            views: {
                'menuContent': {
                    templateUrl: "templates/media/gallery.html",
                    controller: "GalleryCtrl"
                }
            }
        })
        .state('app.changepassword', {
            url: "/changepassword",
            views: {
                'menuContent': {
                    templateUrl: "templates/change-password.html",
                    controller: "ChangePasswordCtrl"
                }
            }
        })
        .state('app.message', {
            url: "/message/:id/:name",
            views: {
                'menuContent': {
                    templateUrl: "templates/social/message.html",
                    controller: "MessageCtrl"
                }
            }
        })








    //social tabs
    .state('app.social', {
            url: "/social",
            views: {
                'menuContent': {
                    templateUrl: "templates/social/social-tab.html"
                }
            }
        })
        .state('app.social.contacts', {
            url: "/contacts",
            views: {
                'contacttab': {
                    templateUrl: "templates/social/my-contacts.html",
                    controller: "ContactListCtrl"
                }
            }
        })
        .state('app.social.requests', {
            url: "/requests",
            views: {
                'contacttab': {
                    templateUrl: "templates/social/my-contacts-requests.html",
                    controller: "SentRequestListCtrl"
                }
            }
        })
        .state('app.social.invites', {
            url: "/invites",
            views: {
                'contacttab': {
                    templateUrl: "templates/social/my-contacts-invites.html",
                    controller: "InvitesListCtrl"
                }
            }
        })
        .state('app.social.messages', {
            url: "/messages",
            views: {
                'messages': {
                    templateUrl: "templates/social/messages.html",
                    controller: "MessageListCtrl"
                }
            }
        })
        .state('app.social.notifications', {
            url: "/notifications",
            views: {
                'notifications': {
                    templateUrl: "templates/social/notification.html",
                    controller: "NotificationListCtrl"
                }
            }
        })


    $urlRouterProvider.otherwise("/");
})