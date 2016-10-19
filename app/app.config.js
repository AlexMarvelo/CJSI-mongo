'use strict';

angular
  .module('OMDbHero')
    .config([
      '$locationProvider',
      '$stateProvider',
      'localStorageServiceProvider',
      '$urlRouterProvider',
      ($locationProvider, $stateProvider, localStorageServiceProvider, $urlRouterProvider) => {
        $locationProvider.hashPrefix('');
        $locationProvider.html5Mode(true);
        $stateProvider.state({
          name: 'home',
          url: '/',
          template: '<movies-block favourites="MainCtrl.favourites" notifyevents="MainCtrl.notifyEvents"></movies-block>'
        });
        $stateProvider.state({
          name: 'movieDetails',
          url: '/movie/{movieID}',
          template: '<movie-details favourites="MainCtrl.favourites" notifyevents="MainCtrl.notifyEvents"></movie-details>'
        });
        $stateProvider.state({
          name: 'login',
          url: '/login',
          template: '<entry-login notifyevents="MainCtrl.notifyEvents"></entry-lofin>'
        });
        $stateProvider.state({
          name: 'signup',
          url: '/signup',
          template: '<entry-register notifyevents="MainCtrl.notifyEvents"></entry-register>'
        });
        $urlRouterProvider.otherwise('/');
        localStorageServiceProvider
          .setPrefix('omdbhero');
      }])

      .controller('OMDbHero.Controller', [
        '$scope', '$rootScope', '$log', 'localStorageService',
        function($scope, $rootScope, $log, localStorageService) {
          this.notifyEvents = [];
          $rootScope.user = {
            logined: true
          };
          this.favourites = localStorageService.get('favourites');
          if (!this.favourites) this.favourites = [];
        }])

      // .run( ['$rootScope', '$location', '$log', 'CONFIG',
      //   function($rootScope, $location, $log, CONFIG) {
      //     $rootScope.$on( '$routeChangeStart', (event, next) => {
      //       if (!$rootScope.user.logined && next.private) {
      //         if (CONFIG.debug) $log.log('Redirecting to /login');
      //         $location.path( '/login' );
      //       }
      //     });
      //   }])

    .constant('CONFIG', {
      'moviesPerPage': 10,
      'appDomain': 'http://localhost:3000',
      'omdbAPI': '6f0a67d0',
      'appName': 'OMDb Hero',
      'debug': true
    });
