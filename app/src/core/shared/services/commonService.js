angular.module('shared')
    .factory('CommonService', function () {
        var copyData = [];
        var flag=true;
        return {
            setData: function (data) {
                copyData = jQuery.extend({}, data);
                flag =false;
            },
            getData: function (key) {
                return copyData;
            },
            setFlag: function (f) {
                flag=f;
            },
            getFlag: function (key) {
                return flag;
            }

        }
    });