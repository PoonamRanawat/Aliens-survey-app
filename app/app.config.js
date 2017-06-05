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
          templateUrl : 'src/modules/survey/templates/participant/participant.html'
        }).when('/addparticipant',{
          templateUrl : 'src/modules/survey/templates/participant/addparticipant.html'
        }).when('/createsurvey',{
          templateUrl : 'src/modules/createsurvey/templates/createsurvey.html'
        }).when('/edit-survey',{
          templateUrl : 'src/modules/createsurvey/templates/createsurvey.html'
        }).when('/surveymanagement',{
          templateUrl : 'src/modules/createsurvey/templates/surveymanagement.html'
        }).otherwise({
            templateUrl : 'src/core/login/templates/login.html'
        })
    }
  ]);




