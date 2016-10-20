'use strict';

angular.
  module('core.movies').
  factory('Movies', ['$resource', 'User', 'CONFIG',
    function($resource, User, CONFIG) {
      this.currentView = {};
      const getCurrentView = () => this.currentView;
      const setCurrentView = currentView => {this.currentView = currentView;};

      this.currentQuery = {};
      const getCurrentQuery = () => this.currentQuery;
      const setCurrentQuery = currentQuery => {this.currentQuery = currentQuery;};

      const serverRequest = $resource(`${CONFIG.appDomain}/search/`, {}, {
        query: {
          method: 'GET'
        }
      });

      const loadMovies = (qObj, targetPage = 1) => {
        if (qObj) this.currentQuery = qObj;
        serverRequest.query({
          s: this.currentQuery.qstring,
          y: this.currentQuery.qyear,
          type: this.currentQuery.qtype,
          page: targetPage
        }, (currentView) => {
          if (currentView.Response == 'True') {
            currentView.currentPage = targetPage;
            let favs = User.getFavourites();
            currentView.Search.forEach(movie => {
              if (favs.indexOf(movie.imdbID) != -1) {
                movie.isFavourite = true;
              }
            });
          } else {
            currentView.currentPage = 1;
            currentView.Search = [];
            currentView.totalResults = 0;
          }
          this.currentView = currentView;
        });
      };

      return {
        serverRequest,
        loadMovies,
        getCurrentView,
        setCurrentView,
        getCurrentQuery,
        setCurrentQuery
      };
    }
  ]);
