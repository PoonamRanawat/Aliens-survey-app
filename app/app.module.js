'use strict';

// Define the `phonecatApp` module
angular.module('aliensSurveyApp', [
  'ngAnimate',
  'ngRoute',
  'satellizer',
    'core'
]);

angular.module('aliensSurveyApp').run(function($http, $auth) {
    $http.defaults.headers.common.Authorization = $auth.getToken();
    console.log($http.defaults.headers.common.Authorization);
});
