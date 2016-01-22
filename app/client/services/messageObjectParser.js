(function() {
  var module = angular.module('DemandWareLogExplorer');

  module.factory('messageObjectParser', messageObjectParser);

  function messageObjectParser(jsonParser, xmlParser, sqlParser,
    anonymousCodeParser) {
    return {
      parse: parse
    };

    function parse(splitLine) {

        var pattObject  = /\{"|(.*?)\}/g;
        var pattArray = /\[|(.*?)\]/g;
        var pattXml    = /<\?xml/;
        var pattSql    = 'SQL:';
        var pattAnonymousCode = "CodeSnippet:";
        var containsArray = splitLine.match(pattArray);
        var containsObject = splitLine.match(pattObject);
        var containsSql = splitLine.match(pattSql);
        var containsXml = splitLine.match(pattXml);
        var containsAnonymousCode = splitLine.match(pattAnonymousCode);
        var responseObj = { message: splitLine };
        var parsedData;

        if (containsXml) {
            parsedData = xmlParser.parse(splitLine);
        } else if (containsObject && containsArray){
          parsedData = jsonParser.parseArray(splitLine);
        } else if (containsObject) {
            parsedData = jsonParser.parseObject(splitLine);
        } else if (containsArray) {
            parsedData = jsonParser.parseArray(splitLine);
        } else if(containsSql) {
            parsedData = sqlParser.parse(splitLine);
        } else if(containsAnonymousCode) {
          parsedData = anonymousCodeParser.parse(splitLine);
        }

        if (parsedData) responseObj = parsedData;
        return responseObj;
    }
  }

})();
