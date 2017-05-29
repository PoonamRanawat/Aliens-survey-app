angular.module('shared')
    .factory('CommonService', function () {
        var copyData = [];
        return {
            setData: function (data) {
                copyData = jQuery.extend({}, data);
            },
            getData: function (key) {
                return copyData;
            }
        }
    });