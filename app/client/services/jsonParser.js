(function() {
  var module = angular.module('DemandWareLogExplorer');

  module.factory('jsonParser', jsonParser);

  function jsonParser() {
    return {
      parseArray: parseArray,
      parseObject: parseObject
    };


    function parseArray(splitLine) {
      var startOfJson = splitLine.indexOf('[');
      var jsonString = splitLine.substr(startOfJson, splitLine.length - 1);
      var message = splitLine.substr(0, startOfJson - 1);
      var responseObj = {
        message: message
      };

      if (jsonString !== '') {
        responseObj.json = JSON.parse(jsonString);
        return responseObj;
      }
      return false;
    }

    function parseObject(splitLine) {
        var startOfJson = splitLine.indexOf('{');
        var jsonString = splitLine.substr(startOfJson, splitLine.length - 1);
        var message = splitLine.substr(0, startOfJson - 1);
        var responseObj = { message: message };

        if (jsonString !== '' && jsonString.trim() !== ']') {
            responseObj.json = JSON.parse(jsonString);
            return responseObj;
        }
        return false;
    }
  }

})();
