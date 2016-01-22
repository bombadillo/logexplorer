(function() {
  var module = angular.module('DemandWareLogExplorer');

  module.factory('xmlParser', xmlParser);

  function xmlParser() {
    return {
      parse: parse
    };

    function parse(splitLine) {
        var startOfXml = splitLine.indexOf('<?xml');
        var xmlString = splitLine.substr(startOfXml, splitLine.length);
        var message = splitLine.substr(0, startOfXml);
        var responseObj = { message: message };

        if (xmlString !== '' && xmlString.trim() !== ']') {
            responseObj.parseData = xmlString;
            return responseObj;
        }
        return false;
    }
  }
})();
