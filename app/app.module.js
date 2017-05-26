'use strict';

// Define the `phonecatApp` module
angular.module('aliensSurveyApp', [
  'ngAnimate',
  'ngRoute',
  'satellizer',
    'core',
    'module'
]);

angular.module('aliensSurveyApp').run(function($http, $auth) {
    $http.defaults.headers.common.Authorization = $auth.getToken();
    $http.defaults.headers.common.Accept = 'application/json';
    // $http.defaults.headers.common.Content-Type = 'application/x-www-form-urlencoded';
    console.log($http.defaults.headers.common.Authorization);
});
