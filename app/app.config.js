'use strict';

angular.
  module('aliensSurveyApp').
  config(['$routeProvider',
    function config( $routeProvider) {
      $routeProvider.
        when('/', {
            templateUrl: 'src/core/login/templates/login.html'
        });
    }


  ]);




