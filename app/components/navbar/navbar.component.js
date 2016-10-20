'use strict';

angular.
  module('navbar').
  component('navbar', {
    controller: ['$scope', '$state', '$log', 'CONFIG', 'User', 'Authorization',
      function NavbarCtrl($scope, $state, $log, CONFIG, User, Authorization) {
        this.static = {
          homeBtn: {
            link: '/',
            state: 'home',
            title: CONFIG.appName,
          },
          loginBtn: {
            link: '/login',
            state: 'login',
            title: 'Login',
          },
          signupBtn: {
            link: '/signup',
            state: 'signup',
            title: 'Sign up',
          },
          logoutBtn: {
            link: '/logout',
            title: 'Logout',
          }
        };

        this.getUser = (event) => {
          event.preventDefault();
          User.get((user) => {
            console.log(user);
          });
        };

        this.logout = (event) => {
          event.preventDefault();
          User.logout(() => {
            if (CONFIG.debug) $log.log('- logouted');
          });
          Authorization.clear();
          $state.go('login');
        };
      }
    ],

    template: `
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" ui-sref="{{$ctrl.static.homeBtn.state}}">{{$ctrl.static.homeBtn.title}}</a>
            </div>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                  <li><a ui-sref="{{$ctrl.static.loginBtn.state}}">{{$ctrl.static.loginBtn.title}}</a></li>
                  <li><a ui-sref="{{$ctrl.static.signupBtn.state}}">{{$ctrl.static.signupBtn.title}}</a></li>
                  <li><a href="#" ng-click="$ctrl.getUser($event)">Get user</a></li>
                  <li><a href="#" ng-click="$ctrl.logout($event)">{{$ctrl.static.logoutBtn.title}}</a></li>
                </ul>
            </div>
        </div>
    </nav>
    `,
  });
