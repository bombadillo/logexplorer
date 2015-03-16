/**
* Created with DemandWareLogExplorer.
* User: bombadillo
* Date: 2014-12-11
* Time: 03:44 PM
* To change this template use Tools | Templates.
*/
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