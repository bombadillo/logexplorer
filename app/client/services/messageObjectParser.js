(function() {
  var module = angular.module('DemandWareLogExplorer');

  module.factory('messageObjectParser', messageObjectParser);

  function messageObjectParser(jsonParser, xmlParser) {
    return {
      parse: parse
    };

    function parse(splitLine) {

        var pattArray  = /\{|(.*?)\}/g;
        var pattObject = /\[|(.*?)\]/g;
        var pattSql    = 'SQL:'
        var pattXml    = /<\?xml/;
        var containsArray = splitLine.match(pattArray);
        var containsObject = splitLine.match(pattObject);
        var containsSql = splitLine.match(pattSql);
        var containsXml = splitLine.match(pattXml);
        var responseObj = { message: splitLine };

        if (containsXml) {
           var json = xmlParser.parse(splitLine);
           if (json) responseObj = json;
        } else if (containsObject) {
            var json = jsonParser.parseObject(splitLine);
            if (json) responseObj = json;
        } else if (containsArray) {
            var json = jsonParser.parseArray(splitLine);
            if (json) responseObj = json;
        } else if(containsSql) {
            responseObj = { json: splitLine }
        }

        return responseObj;
    }
  }

})();
