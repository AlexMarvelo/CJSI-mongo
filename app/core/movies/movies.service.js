'use strict';

angular.
  module('core.movies').
  factory('Movies', ['$resource', 'CONFIG',
    function($resource, CONFIG) {
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
