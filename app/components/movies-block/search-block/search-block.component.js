'use strict';

angular.
  module('moviesBlock').
  component('searchBlock', {
    controller: ['$scope', '$log', 'CONFIG', 'Movies',
      function SearchBlockCtrl($scope, $log, CONFIG, Movies) {
        this.blockTitle = `Welcome to ${CONFIG.appName}`;

        this.onSearchSubmit = (event, targetPage = 1) => {
          event.preventDefault();
          this.currentview = Movies.get({
            s: this.qstring,
            y: this.qyear,
            type: this.qtype,
            page: targetPage
          }, () => {
            if (this.currentview.Response === 'True') {
              this.currentview.currentPage = targetPage;
            } else {
              targetPage = 1;
              this.currentview.Search = [];
              this.currentviewtotalResults = 0;
              this.currentview.currentPage = 1;
            }
            $scope.$parent.$ctrl.updateMoviesList();
          });
        };
      }
    ],

    bindings: {
      currentview: '='
    },

    template: `
    <div class="container">

        <header class="jumbotron hero-spacer">
            <h1>{{$ctrl.blockTitle}}</h1>

            <div class="row">
              <div class="col-sm-10 col-sm-push-1">
                <form action="#" ng-submit="$ctrl.onSearchSubmit($event)" name="search-group" autocomplete="off">
                  <div class="input-group input-group-lg input-group-search">
                    <input ng-model="$ctrl.qstring" name="search" type="search" class="form-control" placeholder="Search for..." maxlength="300">
                    <span class="input-group-btn">
                      <button class="btn btn-default" type="submit">Search!</button>
                    </span>
                  </div>

                  <div class="row">
                    <div class="col-sm-6">
                      <div class="input-group input-group-sm">
                        <span class="input-group-addon" id="basic-addon1">Year filter:</span>
                        <input ng-model="$ctrl.qyear" name="year" type="number" class="form-control" placeholder="Year" min="1700" max="2020">
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="input-group input-group-sm">
                        <span class="input-group-addon" id="basic-addon1">Type filter:</span>
                        <input ng-model="$ctrl.qtype" name="type" type="text" class="form-control" placeholder="Type (movie, series, episode, game)">
                      </div>
                    </div>
                  </div>

                </form>
              </div>
            </div>
        </header>

        <hr>
    `,
  });
