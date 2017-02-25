(function(){

    angular
    .module('jot')
    .service('meanData', meanData);

    meanData.$inject = ['$http', 'authentication'];
    function meanData($http, authentication){
        return $http.get('/api/profile', {
            headers: {
                Authorization: 'Bearer'+  authentication.getToken()
            }
        });
    };

    return {
        getProfile : getProfile
    };
})();
