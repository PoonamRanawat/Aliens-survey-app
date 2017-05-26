'use strict';

angular.
  module('aliensSurveyApp').
  config(['$routeProvider',
    function config( $routeProvider) {
      $routeProvider.
        when('/', {
            templateUrl: 'src/core/login/templates/login.html'
        }).when('/userlist',{
          templateUrl : 'src/modules/user/templates/userlist.html'
        }).when('/surveyoverview',{
          templateUrl : 'src/modules/survey/templates/surveyoverview.html'
        }).when('/participant',{
          templateUrl : 'src/modules/survey/templates/participant.html'
        })
    }


  ]);




