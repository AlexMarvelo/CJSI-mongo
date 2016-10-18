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
            template: '<movies-block favourites="MainCtrl.favourites" notifyevents="MainCtrl.notifyEvents"></movies-block>'
          }).
          when('/movie/:movieID', {
            template: '<movie-details favourites="MainCtrl.favourites" notifyevents="MainCtrl.notifyEvents"></movie-details>'
          }).
          when('/login', {
            template: '<entry-login notifyevents="MainCtrl.notifyEvents"></entry-lofin>'
          }).
          when('/signup', {
            template: '<entry-register notifyevents="MainCtrl.notifyEvents"></entry-register>'
          }).
          otherwise('/');

        localStorageServiceProvider
          .setPrefix('omdbhero');
      }])

    .controller('OMDbHero.Controller', [
      '$scope', '$log', 'localStorageService', function($scope, $log, localStorageService) {
        this.notifyEvents = [];
        this.favourites = localStorageService.get('favourites');
        if (!this.favourites) this.favourites = [];
        // $log.log('Main fav', this.favourites);
      }])

    .constant('CONFIG', {
      'moviesPerPage': 10,
      'omdbAPI': '6f0a67d0',
      'appName': 'OMDb Hero'
    });
