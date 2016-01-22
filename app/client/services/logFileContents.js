(function(){
    var module = angular.module('DemandWareLogExplorer');

    module.factory('logFileContents', logFileContents);

    function logFileContents($http) {

        return {
            get: get
        };

        function get(fileName) {
            return $http.get('app/server/getLogFileContents.php?fileName=' + fileName)
                .then(function(response) {
                    return response.data;
            });
        }
    }
})();
