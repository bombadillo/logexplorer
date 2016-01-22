(function() {
  var module = angular.module('DemandWareLogExplorer');

  module.factory('messageObjectParser', messageObjectParser);

  function messageObjectParser(jsonParser, xmlParser) {
    return {
      parse: parse
    };

    function parse(splitLine) {

        var pattObject  = /\{|(.*?)\}/g;
        var pattArray = /\[|(.*?)\]/g;
        var pattSql    = 'SQL:';
        var pattXml    = /<\?xml/;
        var containsArray = splitLine.match(pattArray);
        var containsObject = splitLine.match(pattObject);
        var containsSql = splitLine.match(pattSql);
        var containsXml = splitLine.match(pattXml);
        var responseObj = { message: splitLine };
        var parseData;

        if (containsXml) {
            parseData = xmlParser.parse(splitLine);
            if (parseData) responseObj = parseData;
        } else if (containsObject) {
            parseData = jsonParser.parseObject(splitLine);
            if (parseData) responseObj = parseData;
        } else if (containsArray) {
            parseData = jsonParser.parseArray(splitLine);
            if (parseData) responseObj = parseData;
        } else if(containsSql) {
            responseObj = { parseData: splitLine };
        }

        return responseObj;
    }
  }

})();
