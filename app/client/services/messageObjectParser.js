(function() {
  var module = angular.module('DemandWareLogExplorer');

  module.factory('messageObjectParser', messageObjectParser);

  function messageObjectParser(jsonParser, xmlParser, sqlParser) {
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
        var parsedData;

        if (containsXml) {
            parsedData = xmlParser.parse(splitLine);
        } else if (containsObject) {
            parsedData = jsonParser.parseObject(splitLine);
        } else if (containsArray) {
            parsedData = jsonParser.parseArray(splitLine);
        } else if(containsSql) {
            parsedData = sqlParser.parse(splitLine);
        }

        if (parsedData) responseObj = parsedData;
        return responseObj;
    }
  }

})();
