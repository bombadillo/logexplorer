(function() {
  var module = angular.module('DemandWareLogExplorer');

  module.factory('logDataSplitter', logDataSplitter);

  function logDataSplitter(logDataParser) {
    return {
      split: split
    };

    function split(logData) {

      if (logData === '') {
        return false;
      }

      var lines = logData.split('\n');

      logItems = [];

      for (var i in lines) {
        var splitLine = getDataFromLine(lines[i]);

        var logObj = logDataParser.parse(splitLine);

        if (logObj.message) logItems.push(logObj);
      }

      return logItems;
    }

    function getDataFromLine(line) {

        var splitLine;

        if (line.split('|').length === 4) {
            splitLine = line.split('|');
            splitLine.splice(2, 1);
        } else {
            splitLine = line.split('] ');
        }

        return splitLine;
    }
  }
})();
