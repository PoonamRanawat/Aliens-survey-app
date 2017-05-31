
angular.module('notification')
.service('dataGetService', function ($q, $http, toaster, $timeout) {

    var data = this;
    data.success = function (msg,timeout) {
        toaster.pop('success', "success", msg, timeout);
    }
    data.errors = function (msg, timeout) {
        toaster.pop('error', "error", msg, timeout);
    }
    data.waiting = function (msg, timeout) {
        toaster.pop('wait', "wait", msg, timeout);
    }

    data.popups = function (data) {
        console.log("data", data);
        toaster.pop(data.status, data.status, data.msg, data.timeout);
    }

});
