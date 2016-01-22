(function() {
  var module = angular.module('DemandWareLogExplorer');

  module.factory('logDataParser', logDataParser);

  function logDataParser(messageObjectParser) {
    return {
      parse: parse
    };

    function parse(splitLine) {
      var logIndexes = ['date', 'type', 'message'];
      var splitObj = {};

      for (var i in splitLine) {
        if (i === '0') {
          var sDate = splitLine[i].replace(/\[/, '');
          sDate = splitLine[i].substring(0, splitLine[i].length - 7);
          var date = new Date(sDate);
          splitObj[logIndexes[i]] = date.toLocaleString();
        } else if (i === '1') {
          splitObj[logIndexes[i]] = splitLine[i].replace('[', '');
        } else {
          var addJson = messageObjectParser.parse(splitLine[i]);
          splitObj[logIndexes[i]] = addJson;
        }
      }
      return splitObj;
    }
  }
})();
