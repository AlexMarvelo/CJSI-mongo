'use strict';

require('../node_modules/angular/angular.min');

// Import styles
require('./theme/css/bootstrap.min.css');
require('./theme/css/heroic-features.css');

// Import utils
require('./utils/findAncestor');
require('./utils/indexOfByProp');

// Import modules
require('./core/core.module');
require('./components/navbar/navbar.module');
require('./components/movies-block/movies-block.module');
require('./components/movie-details/movie-details.module');

// Declare app level module which depends on views, and components
angular.module('OMDbHero', [
  require('angular-route'),
  require('angular-local-storage'),
  'core',
  'navbar',
  'moviesBlock',
  'movieDetails'
]);

require('./app.config');

angular.bootstrap(document, ['OMDbHero']);
