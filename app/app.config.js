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
        }).when('/edit-survey/:id',{
          templateUrl : 'src/modules/createsurvey/templates/createsurvey.html'
        }).when('/surveymanagement',{
          templateUrl : 'src/modules/createsurvey/templates/surveymanagement.html'
        }).when('/results',{
            templateUrl : 'src/modules/results/templates/results.html'
        }).when('/viewsurvey/:survey_id/:participantid',{
          templateUrl : 'src/modules/viewsurvey/templates/survey.html'
        }).otherwise({
            templateUrl : 'src/core/shared/templates/pagenotfound.html'
        })
    }
  ]);




