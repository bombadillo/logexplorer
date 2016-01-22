(function() {
  var module = angular.module('DemandWareLogExplorer');

  module.factory('logFilterHandler', logFilterHandler);

  function logFilterHandler(logDataParser) {
    return {
      getFilterType: getFilterType
    };


    function getFilterType(type) {
      var returnObj;

      if (type === 'ALL') {
        returnObj = {};
      } else {
         returnObj = { type: type};
      }

      return returnObj;
    }

  }
})();
