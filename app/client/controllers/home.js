(function() {

    var app = angular.module('DemandWareLogExplorer');

    app.controller('HomeController', HomeController);

    function HomeController($http, logFiles, logFileContents,
      logDataSplitter, numberOfPagesCalculator, logFilterHandler) {
        var vm = this;
        vm.itemTypeLabels = {'INFO' : 'info', 'ERROR': 'danger', 'DEBUG': 'warning', 'TRACE' : 'default', 'WARN' : 'primary'};
        vm.title = 'Log Explorer';
        vm.currentPage = 0;
        vm.pageSize = 40;
        vm.errors = false;

        vm.splitData = onLogFileContentsComplete;
        vm.numberOfPages = numberOfPagesCalculator.calculate;
        vm.changeLogData = changeLogData;

        vm.onPrevClick = onPrevClick;
        vm.onNextClick = onNextClick;
        vm.filterLog = changeLogFilter(vm);
        vm.changeLogFilter = changeLogFilter;
        vm.scrollToTop = scrollToTop;
        vm.getLogFileContents = getLogFileContents;

        logFiles.get().then(onLogFilesComplete, onError);


        function onLogFilesComplete(data) {
            vm.logFiles = data;
        }

        function onLogFileContentsComplete(rawData) {
            var data = rawData || $('#data').val();
            vm.logItems = logDataSplitter.split(data);

            if (vm.logItems.length < 1) {
              vm.errors = true;
              vm.errorMessage = 'No log data was produced from the input';
            } else
            {
              vm.errors = false;
            }

            vm.currentPage = 0;

            $('.changeData').slideDown();
            $('.input-data').slideUp();
            $('.changePage').fadeIn();
            $('.log-items').slideDown();
            $('.pageInfo').fadeIn();
            $('.loader').fadeOut();
        }

        function onError(reason) {
            vm.error = "Unable to fetch the log data";
        }

        function getLogFileContents() {
            $('.loader').fadeIn();
            logFileContents.get(vm.currentLogFile).then(onLogFileContentsComplete, onError);
        }

        function changeLogFilter(vm, type) {
          console.log(type)
          vm.filterLog = logFilterHandler.getFilterType(type);
        }
    }

    function changeLogData() {
        $('#data').val('');
        $('.input-data').slideDown();
        $('.changeData').slideUp();
        $('.changePage').fadeOut();
        $('.log-items').slideUp();
        $('.pageInfo').fadeOut();
    }

    function onPrevClick(vm) {
        vm.currentPage = vm.currentPage - 1;
        scrollToTop();
    }

    function onNextClick(vm) {
        vm.currentPage = vm.currentPage + 1;
        scrollToTop();
    }

    function scrollToTop() {
        $("html, body").animate({ scrollTop: 0 }, "fast");
    }
})();
