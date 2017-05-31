'use strict';

// Define the `aliensSurveyApp` module
angular.module('aliensSurveyApp', [
  'ngAnimate',
  'ngRoute',
  'satellizer',
    'core',
    'module',
    'textAngular',
    'naif.base64',
    'toaster'
]);

angular.module('aliensSurveyApp').run(function($http, $auth) {
    $http.defaults.headers.common.Authorization = $auth.getToken();
    $http.defaults.headers.common.Accept = 'application/json';
    //$http.defaults.headers.common.Content-Type = 'application/x-www-form-urlencoded';
    console.log($http.defaults.headers.common.Authorization);
});
