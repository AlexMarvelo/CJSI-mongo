'use strict';

// Define the `core` module
angular.module('core', [
  'core.movies',
  'core.movie',
  'core.status',
  'core.user'
]);

require('./movies/movies.module');
require('./movie/movie.module');
require('./status/status.module');
require('./user/user.module');
