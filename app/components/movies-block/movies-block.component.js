angular.
  module('moviesBlock').
  component('moviesBlock', {
    controller: ['$scope', '$log', 'localStorageService', 'CONFIG',
      function MoviesBlockCtrl($scope, $log, localStorageService, CONFIG) {
        // $log.log('Movies-block fav: ', this.favourites);

        this.moviesOnPage = [];
        this.currentView = {
          totalResults: 0,
          currentPage: 1
        };

        this.updateMoviesList = function() {
          if (!this.currentView.Search) {
            this.moviesOnPage = this.favourites;
          } else {
            this.moviesOnPage = this.favourites.concat(
              this.currentView.Search.filter((movie) => {
                return this.favourites.indexOfByProp(movie, 'imdbID') === -1;
              })
            );
            // TODO call notification about false response
          }
          this.setPagination();
          // $log.log('Favourites:', this.favourites);
        };

        this.setPagination = function() {
          this.pagination = [];
          let totalPages = Math.ceil(this.currentView.totalResults / CONFIG.moviesPerPage);
          let currentPage = this.currentView.currentPage;
          if (totalPages <= 1) return;
          for(let i = 0; i < totalPages; i++) {
            if (Math.abs(i - 1) > 4 &&
                Math.abs(i - currentPage) > 4 &&
                Math.abs(i - totalPages) > 4) continue;
            this.pagination.push({
              name: i+1,
              number: i+1,
              link: '#',
              active: currentPage === i+1
            });
          }
        };
        this.setPagination();

        this.onPaginationClick = function(event) {
          event.preventDefault();
          let targetPage = parseInt(event.target.dataset.id);
          if (!targetPage) return;
          $scope.$$childHead.$ctrl.onSearchSubmit(new Event('submit'), targetPage);
        };

        this.onFavouritesAddClick = function(event) {
          if (!event.target.classList.contains('btn-favourite') &&
              !event.target.classList.contains('btn-favourite-text') &&
              !event.target.classList.contains('glyphicon-star')) return;
          event.preventDefault();
          let card = window.findAncestor(event.target, 'thumbnail');
          if (!card || !card.dataset.id) return;
          if (!card.classList.contains('thumbnail-favourite')) {
            card.classList.add('thumbnail-favourite');
            let movieIndex = this.currentView.Search.indexOfByProp({imdbID: card.dataset.id}, 'imdbID');
            let selectedMovie = this.currentView.Search[movieIndex];
            selectedMovie.isFavourite = true;
            this.favourites.push(selectedMovie);
          } else {
            card.classList.remove('thumbnail-favourite');
            let movieIndex = this.favourites.indexOfByProp({imdbID: card.dataset.id}, 'imdbID');
            if (card.dataset.id && movieIndex !== -1) {
              this.favourites.splice(movieIndex, 1);
            }
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
    <search-block currentview="$ctrl.currentView"></search-block>

    <div class="container" ng-click="$ctrl.onFavouritesAddClick($event)">

      <div class="row text-center">
        <div ng-repeat="movie in $ctrl.moviesOnPage" class="movie-card col-sm-6 col-md-4 col-lg-3">
          <div class="thumbnail {{movie.isFavourite ? 'thumbnail-favourite' : ''}}" data-id="{{movie.imdbID}}">
            <a href="movie/{{movie.imdbID}}">
              <img ng-src="{{movie.Poster !== 'N/A' ? movie.Poster : 'http://placehold.it/280x390'}}" alt="{{movie.Title}}">
            </a>
            <div class="caption">
              <a href="movie/{{movie.imdbID}}">
                <h3>{{movie.Title}}</h3>
              </a>
              <span class="badge">{{movie.Year}}</span>
              <span class="badge">{{movie.Type}}</span>
              <button class="btn btn-default btn-favourite" type="button">
                <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                <span class="btn-favourite-text btn-favourite-text-add">Add to favourites</span>
                <span class="btn-favourite-text btn-favourite-text-remove">Remove from favourites</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <nav class="text-center" aria-label="Page navigation">
        <ul class="pagination" ng-click="$ctrl.onPaginationClick($event)">
          <li ng-repeat="page in $ctrl.pagination" class="{{page.active ? 'active' : ''}}">
            <a href="{{page.link}}" data-id="{{page.number}}">{{page.name}}</a>
          </li>
        </ul>
      </nav>

    </div>
    `,
  });
