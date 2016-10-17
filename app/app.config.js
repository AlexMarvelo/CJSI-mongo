'use strict';

angular
  .module('OMDbHero')
    .config([
      '$locationProvider',
      '$routeProvider',
      'localStorageServiceProvider',
      ($locationProvider, $routeProvider, localStorageServiceProvider) => {
        $locationProvider.hashPrefix('');
        $locationProvider.html5Mode(true);
        $routeProvider.
          when('/', {
            template: '<movies-block favourites="MainCtrl.favourites"></movies-block>'
          }).
          when('/movie/:movieID', {
            template: '<movie-details favourites="MainCtrl.favourites"></movie-details>'
          }).
          otherwise('/');

        localStorageServiceProvider
          .setPrefix('omdbhero');
      }])

    .controller('OMDbHero.Controller', [
      '$scope', '$log', 'localStorageService', function($scope, $log, localStorageService) {
        let vm = this;
        vm.favourites = localStorageService.get('favourites');
        if (!vm.favourites) vm.favourites = [];
        // $log.log('Main fav', this.favourites);
      }])

    .constant('CONFIG', {
      'moviesPerPage': 10,
      'omdbAPI': '6f0a67d0',
      'appName': 'OMDb Hero'
    });
