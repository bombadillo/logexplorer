(function() {

    var module = angular.module('DemandWareLogExplorer');

    module.factory('logFiles', logFiles);

    function logFiles($http) {

        return {
            get: get
        };

        function get() {
            return $http.get('app/server/getLogFiles.php')
                .then(function(response) {
                    return response.data;
            });
        }
    }

})();
