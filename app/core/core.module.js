'use strict';

// Define the `core` module
angular.module('core', [
  'core.movies',
  'core.status'
]);

require('./movies/movies.module');
require('./status/status.module');
