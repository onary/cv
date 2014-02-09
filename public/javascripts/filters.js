var MyFilters = angular.module('myFilters', []);

MyFilters.filter('datetime', function() {
    return function(date) {
        return date.replace(/T/, ' ').replace(/\..+/, '').substring(0,16);
    };
});