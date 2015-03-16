/**
* Created with DemandWareLogExplorer.
* User: bombadillo
* Date: 2014-12-11
* Time: 04:52 PM
* To change this template use Tools | Templates.
*/
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