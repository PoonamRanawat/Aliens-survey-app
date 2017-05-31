
angular.module('notification')
.service('dataGetService', function ($q, $http, toaster, $timeout) {

    var data = this;
    data.success = function (msg,timeout) {
        toaster.pop('success', "Success", msg, timeout);
    }
    data.errors = function (msg, timeout) {
        toaster.pop('error', "Error", msg, timeout);
    }
    data.waiting = function (msg, timeout) {
        toaster.pop('wait', "Wait", msg, timeout);
    }

    data.popups = function (data) {
        toaster.pop(data.status, data.status, data.msg, data.timeout);
    }

});
