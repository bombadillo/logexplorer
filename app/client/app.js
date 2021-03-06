(function() {

    console.log('started');

    var app = angular.module('DemandWareLogExplorer', ['ngRoute'])
        .config(function($routeProvider, $sceProvider) {
            $routeProvider.when('/home', {
                templateUrl: 'app/client/templates/home.html',
                controller: 'HomeController',
                controllerAs: 'home'
            }).otherwise({
                redirectTo: '/home'
            });
    });

    app.filter('startFrom', function() {
        return function(input, start) {
            if (!input) return 0;
            start = +start;
            return input.slice(start);
        }
    });

    app.directive("scroll", function ($window) {
        return function(scope, element, attrs) {
            angular.element($window).bind("scroll", function() {
                 if (this.pageYOffset >= 500 && !$('.scrollToTop').hasClass('show')) {
                     $('.scrollToTop').removeClass('start scrollHide').addClass('show');
                 } else if (this.pageYOffset < 500 && !$('.scrollToTop').hasClass('scrollHide')) {
                     $('.scrollToTop').removeClass('show').addClass('scrollHide');

                 }
            });
        };
    });

    return false;
})();
