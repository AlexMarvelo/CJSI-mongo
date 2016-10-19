'use strict';

// Define the `core` module
angular.module('core', [
  'core.movies',
  'core.status',
  'core.user'
]);

require('./movies/movies.module');
require('./status/status.module');
require('./user/user.module');
