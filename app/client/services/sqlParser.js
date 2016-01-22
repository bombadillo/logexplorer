(function() {
  var module = angular.module('DemandWareLogExplorer');

  module.factory('sqlParser', sqlParser);

  function sqlParser() {
    return {
      parse: parse
    };

    function parse(message) {

        var split = message.split('SQL:');
        return { message: split[0], parsedData: split[1] };     
    }
  }
})();
