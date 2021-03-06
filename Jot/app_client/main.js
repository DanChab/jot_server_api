(function(){
    angular.module('jot',['ngRoute']);

    function config ($routeProvider, $locationProvider){
        $routeProvider
        .when('/', {
            templateUrl: 'home.view.html',
            controller: 'homeCtrl',
            controllerAs: 'vm'
        })
        .when('/register', {
            templateUrl: '/auth/register/register.view.html',
            controller: 'registerCtrl',
            controllerAs: 'vm'
        })

        .when('/login', {
            templateUrl: 'auth/login/login.view.html',
            controller: 'loginCtrl',
            controllerAs: 'vm'
        })
        .otherwise({redirectTo: '/'});

        //use the HTML5 History API
        $locationProvider.html5Model(true);
    };

    function run($rootScope, $location, authentication){
        $rootScope.$on('rooteChangeStart', function(event, nextRoute, currentRoute){
            if($location.path() === '/profile' && !authentication.isLoggedIn()){
                $location.path('/');
            }
        });
    }

    angular
        .module('jot')
        .config(['$routeProvider', '$locationProvider', config])
        .run(['$rootScope','$location', 'authentication', run]);
})();
