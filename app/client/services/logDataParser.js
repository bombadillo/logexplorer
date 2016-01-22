(function() {
  var module = angular.module('DemandWareLogExplorer');

  module.factory('logDataParser', logDataParser);

  function logDataParser(messageObjectParser) {
    return {
      parse: parse
    };

    function parse(splitLine) {
      var splitObj = {};

      splitObj.date = parseDate(splitLine[0].replace(/\[/, ''));
      splitObj.type = splitLine[1].replace('[', '');

      if (splitLine.length > 3) {
        splitObj.loggerName = splitLine[2];
        splitObj.message = messageObjectParser.parse(splitLine[3]);
      } else {
          splitObj.message = messageObjectParser.parse(splitLine[2]);
      }

      return splitObj;
    }

    function parseDate(dateString) {
      dateString = dateString.substring(0, dateString.length - 7);
      return new Date(dateString).toLocaleString();
    }
  }
})();
