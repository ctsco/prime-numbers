'use strict';

angular.module('primetables.utils.number', [
])
    .service("NumberUtils", function () {
        this.isValidPositiveNumber = function(number) {
            if(isNaN(number)) {
                return false;
            }
            
            if(number === true || number === false) {
                return false;
            }
            
            if(number < 1) {
                return false;
            }
            
            return true;
        };
    });