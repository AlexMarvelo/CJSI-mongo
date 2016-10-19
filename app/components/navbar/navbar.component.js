'use strict';

angular.
  module('navbar').
  component('navbar', {
    controller: ['$scope', 'CONFIG',
      function NavbarCtrl($scope, CONFIG) {
        this.homeBtn = {
          link: '/',
          title: CONFIG.appName,
        };
        this.loginBtn = {
          link: '/login',
          title: 'Login',
        };
        this.signupBtn = {
          link: '/signup',
          title: 'Sign up',
        };
        this.logoutBtn = {
          link: '/logout',
          title: 'Logout',
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
                <a class="navbar-brand" href="{{$ctrl.homeBtn.link}}">{{$ctrl.homeBtn.title}}</a>
            </div>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                  <li><a href="{{$ctrl.loginBtn.link}}">{{$ctrl.loginBtn.title}}</a></li>
                  <li><a href="{{$ctrl.signupBtn.link}}">{{$ctrl.signupBtn.title}}</a></li>
                  <li><a href="{{$ctrl.logoutBtn.link}}">{{$ctrl.logoutBtn.title}}</a></li>
                </ul>
            </div>
        </div>
    </nav>
    `,
  });
