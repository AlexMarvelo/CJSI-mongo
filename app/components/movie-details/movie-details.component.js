'use strict';

angular.
  module('movieDetails').
  component('movieDetails', {
    controller: ['$scope', '$log', '$routeParams', 'localStorageService', 'Movies', 'CONFIG',
      function MovieDetailsCtrl($scope, $log, $routeParams, localStorageService, Movies) {
        // $log.log('Movie-details fav', this.favourites);

        this.movie = Movies.get({i: $routeParams.movieID}, () => {
          // $log.log(this.movie);
          this.movie.isFavourite = this.favourites.indexOfByProp({imdbID: $routeParams.movieID}, 'imdbID') !== -1;
          this.tableDetails = {};
          let skippingKeys = ['Title', 'Rated', 'Director', 'Plot', 'Poster', 'Response', 'imdbID'];
          for (let key in this.movie) {
            if (!this.movie.hasOwnProperty(key) ||
                skippingKeys.indexOf(key) !== -1 ||
                this.movie[key] === 'N/A') continue;
            this.tableDetails[key] = this.movie[key];
          }
        });
        this.staticText = {
          tableHeader: 'Movie details',
        };

        this.toggleFavourite = function(event) {
          event.preventDefault();
          let btn = window.findAncestor(event.target, 'btn-favourite');
          if (this.movie.isFavourite) {
            btn.classList.remove('active');
            this.movie.isFavourite = false;
            let movieIndex = this.favourites.indexOfByProp({imdbID: $routeParams.movieID}, 'imdbID');
            if (movieIndex !== -1) {
              this.favourites.splice(movieIndex, 1);
            }
          } else {
            btn.classList.add('active');
            this.movie.isFavourite = true;
            this.favourites.push(this.movie);
          }
          localStorageService.set('favourites', this.favourites);
          // $log.log('Favourites:', this.favourites);
          // $log.log('Local storage:', localStorageService.get('favourites'));
        };
      }
    ],

    bindings: {
      favourites: '='
    },

    template: `
    <div class="container">
      <div class="row">
        <div class="col-sm-4 text-center">
          <img ng-src="{{$ctrl.movie.Poster !== 'N/A' ? $ctrl.movie.Poster : 'http://placehold.it/280x390'}}" alt="{{$ctrl.movie.Title}}">
          <div class="btn-container">
            <button class="btn btn-default btn-favourite {{$ctrl.movie.isFavourite ? 'active' : ''}}" ng-click="$ctrl.toggleFavourite($event)" type="button">
              <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
              <span class="btn-favourite-text btn-favourite-text-add">Add to favourites</span>
              <span class="btn-favourite-text btn-favourite-text-remove">Remove from favourites</span>
            </button>
          </div>
        </div>

        <div class="col-sm-8">
          <div class="page-header">
            <h1 class="text-left">
              {{$ctrl.movie.Title}} <small>{{ $ctrl.movie.Director !== 'N/A' ? 'directed by ' + $ctrl.movie.Director : ''}}</small>
            </h1>
          </div>

          <div class="panel panel-default">
            <div class="panel-heading">{{$ctrl.staticText.tableHeader}}</div>
            <table class="table">
              <tbody>
                <tr ng-repeat="(key, value) in $ctrl.tableDetails">
                  <th scope="row">{{key}}</th>
                  <td>{{value}}</td>
                </tr>
              </tbody>
            </table>
            <div class="panel-body">
              <p>{{$ctrl.movie.Plot}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    `,
  });
