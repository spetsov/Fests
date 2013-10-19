var festsApp = angular.module("fests", []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/fests', {templateUrl: 'partials/fests-list.html',   controller: FestController}).
      when('/fests/:festId/:semiFinal', {templateUrl: 'partials/fest-songs.html', controller: FestSongsController}).
      otherwise({redirectTo: '/fests'});
}]).filter('range', function() {
  return function(input, total) {
    if(total){
        total = parseInt(total) + 1;
        for (var i=1; i<total; i++)
          input.push(i);
        return input;
    };
  };
});

