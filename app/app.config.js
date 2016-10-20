'use strict';

angular
  .module('OMDbHero')
    .config([
      '$locationProvider',
      '$stateProvider',
      '$logProvider',
      '$urlRouterProvider',
      'localStorageServiceProvider',
      ($locationProvider, $stateProvider, $logProvider, $urlRouterProvider, localStorageServiceProvider) => {
        $locationProvider.hashPrefix('');
        $locationProvider.html5Mode(true);
        $logProvider.debugEnabled(true);
        $stateProvider.state({
          name: 'home',
          url: '/',
          data: {
            authorization: true,
            redirectTo: 'login'
          },
          template: '<movies-block favourites="MainCtrl.favourites"></movies-block>'
        });
        $stateProvider.state({
          name: 'movieDetails',
          url: '/movie/{movieID}',
          data: {
            authorization: true,
            redirectTo: 'login'
          },
          template: '<movie-details favourites="MainCtrl.favourites"></movie-details>'
        });
        $stateProvider.state({
          name: 'login',
          url: '/login',
          template: '<entry-login></entry-lofin>'
        });
        $stateProvider.state({
          name: 'signup',
          url: '/signup',
          template: '<entry-register></entry-register>'
        });
        $urlRouterProvider.otherwise('/');
        localStorageServiceProvider
          .setPrefix('omdbhero');
      }])

    .controller('OMDbHero.Controller', [
      '$scope', '$rootScope', '$log', 'localStorageService', 'Authorization',
      function($scope, $rootScope, $log, localStorageService, Authorization) {
        Authorization.init();
        $rootScope.user = {
          logined: true
        };
        this.favourites = localStorageService.get('favourites') || [];
      }])

    .run([
      '$rootScope', '$state', 'Authorization',
      ($rootScope, $state, Authorization) => {
        $rootScope.$on('$stateChangeSuccess', (event, toState) => {
          if (!Authorization.authorized() &&
              toState.data &&
              toState.data.authorization &&
              toState.data.redirectTo) {
            $state.go(toState.data.redirectTo);
          }
        });
      }])

    .constant('CONFIG', {
      'moviesPerPage': 10,
      'appDomain': 'http://localhost:3000',
      'omdbAPI': '6f0a67d0',
      'appName': 'OMDb Hero',
      'debug': true
    });
