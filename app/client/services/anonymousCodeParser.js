(function() {
  var module = angular.module('DemandWareLogExplorer');

  module.factory('anonymousCodeParser', anonymousCodeParser);

  function anonymousCodeParser() {
    return {
      parse: parse
    };

    function parse(message) {

        var split = message.split('CodeSnippet:');
        return { message: split[0], parsedData: split[1] };
    }
  }
})();
