(function() {
  var module = angular.module('DemandWareLogExplorer');

  module.factory('numberOfPagesCalculator', numberOfPagesCalculator);

  function numberOfPagesCalculator(logDataParser) {
    return {
      calculate: calculate
    };


    function calculate(array, pageSize) {
      if (!array || array.length < 1) return false;
      return Math.ceil(array.length / pageSize);
    }

  }
})();
