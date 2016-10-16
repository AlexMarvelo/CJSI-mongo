/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _search = __webpack_require__(1);
	
	var _search2 = _interopRequireDefault(_search);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var movieSearch = new _search2.default({
	  searchBlockId: 'search-group',
	  moviesContainerId: 'movies-container',
	  favMoviesContainerId: 'movies-container-favourite',
	  paginationId: 'pagination-container'
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _config = __webpack_require__(2);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SearchEngine = function () {
	  function SearchEngine(setup) {
	    _classCallCheck(this, SearchEngine);
	
	    this.form = document.querySelector('form[name="' + setup.searchBlockId + '"]');
	    if (!this.form) return;
	    this.input = this.form.querySelector('input[name="search"]');
	    this.searchBtn = this.form.querySelector('button[type="submit"]');
	    this.yearInput = this.form.querySelector('input[name="year"]');
	    this.typeInput = this.form.querySelector('input[name="type"]');
	    this.paginationContainer = document.getElementById(setup.paginationId);
	    this.container = document.getElementById(setup.moviesContainerId);
	    this.favContainer = document.getElementById(setup.favMoviesContainerId);
	    this.currentPage = 0;
	    this.favList = [];
	
	    this.form.addEventListener('submit', this.searchMovies.bind(this));
	
	    this.container.addEventListener('click', this.handleFavourite.bind(this));
	    this.favContainer.addEventListener('click', this.handleFavourite.bind(this));
	  }
	
	  _createClass(SearchEngine, [{
	    key: 'handleFavourite',
	    value: function handleFavourite(event) {
	      event.preventDefault();
	      if (!event.target.classList.contains('btn-favourite') && !event.target.classList.contains('btn-favourite-text') && !event.target.classList.contains('glyphicon-star')) return;
	      var card = findAncestor(event.target, 'thumbnail');
	      if (!card || !card.dataset.id) return;
	      if (!card.classList.contains('thumbnail-favourite')) {
	        card.classList.add('thumbnail-favourite');
	        var queryObj = {
	          i: card.dataset.id
	        };
	        var queryString = this.convertToQueryString(queryObj);
	        this.handleQuery(queryString);
	      } else {
	        card.classList.remove('thumbnail-favourite');
	        var movieIndex = this.inFavourites(card.dataset.id);
	        if (card.dataset.id && movieIndex !== -1) {
	          this.favList.splice(movieIndex, 1);
	        }
	      }
	    }
	  }, {
	    key: 'searchMovies',
	    value: function searchMovies(event, page) {
	      this.currentPage = page || 1;
	      if (event) event.preventDefault();
	      var searchQuery = this.input.value;
	      if (!searchQuery.length) return;
	      var queryObj = {
	        s: searchQuery,
	        page: this.currentPage.toString()
	      };
	      if (this.typeInput && this.typeInput.value.length) {
	        queryObj.type = this.typeInput.value.toLowerCase();
	      }
	      if (this.typeInput && this.yearInput.value.length) {
	        queryObj.y = this.yearInput.value.toLowerCase();
	      }
	      var queryString = this.convertToQueryString(queryObj);
	      this.handleQuery(queryString);
	    }
	  }, {
	    key: 'handleQuery',
	    value: function handleQuery(queryString) {
	      var _this = this;
	
	      if (!queryString.length) return;
	      var self = this;
	      var promise = new Promise(function (resolve, reject) {
	        var httpRequest = void 0;
	        if (window.XMLHttpRequest) {
	          // Mozilla, Safari, IE7+ ...
	          httpRequest = new XMLHttpRequest();
	        } else if (window.ActiveXObject) {
	          // IE 6 and older
	          httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
	        }
	        var updateMovies = function updateMovies() {
	          if (httpRequest.readyState === XMLHttpRequest.DONE) {
	            if (httpRequest.status === 200) {
	              var result = JSON.parse(httpRequest.responseText);
	              resolve(result);
	            } else {
	              reject('There was a problem with the request.');
	            }
	          }
	        };
	        httpRequest.onreadystatechange = updateMovies.bind(_this);
	        httpRequest.open('GET', queryString);
	        httpRequest.send();
	      }).then(function (data) {
	        // console.log(data);
	        if (data.Response === 'False') {
	          _this.pushMessageToContainer('error', 'Sorry, movie not found');
	          return;
	        }
	        if (!data.Search) {
	          self.favList.push(data);
	          return;
	        }
	        self.updateMoviesList(data);
	        self.setPagination(data.totalResults);
	      }, function (error) {
	        throw new Error(error);
	      });
	      promise.catch(this.pushError.bind(this));
	    }
	  }, {
	    key: 'updateMoviesList',
	    value: function updateMoviesList(data) {
	      var _this2 = this;
	
	      this.container.innerHTML = '';
	      this.favList.forEach(function (movie) {
	        _this2.pushMovieCardToContainer(movie, true);
	      });
	      data.Search.forEach(function (movie) {
	        _this2.pushMovieCardToContainer(movie);
	      });
	    }
	  }, {
	    key: 'convertToQueryString',
	    value: function convertToQueryString(qObj) {
	      if ((typeof qObj === 'undefined' ? 'undefined' : _typeof(qObj)) !== 'object') return;
	      var searchQuery = qObj.hasOwnProperty('s');
	      var byId = qObj.hasOwnProperty('i');
	      var byTitle = qObj.hasOwnProperty('t');
	      if (!searchQuery && !byId && !byTitle) return;
	      var result = _config2.default.domain + '?apikey=' + _config2.default.api + '&';
	      for (var key in qObj) {
	        if (!qObj.hasOwnProperty(key)) continue;
	        result += key + '=' + qObj[key].replace(' ', '+') + '&';
	      }
	      // console.log(result);
	      return result.slice(0, -1);
	    }
	  }, {
	    key: 'pushMovieCardToContainer',
	    value: function pushMovieCardToContainer(card) {
	      var favourite = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
	      if (!favourite && this.inFavourites(card.imdbID) !== -1) return;
	      favourite = favourite && this.inFavourites(card.imdbID) !== -1;
	      var cardContainer = document.createElement('DIV');
	      cardContainer.classList.add('movie-card', 'col-sm-6', 'col-md-4', 'col-lg-3');
	      var cardEl = document.createElement('DIV');
	      cardEl.classList.add('thumbnail');
	      if (card.imdbID) {
	        cardEl.setAttribute('data-id', card.imdbID);
	        if (favourite) cardEl.classList.add('thumbnail-favourite');
	      }
	      if (card.Poster) {
	        var img = document.createElement('IMG');
	        if (card.Poster === 'N/A') {
	          img.setAttribute('src', 'http://placehold.it/280x390');
	        } else {
	          img.setAttribute('src', card.Poster);
	        }
	        if (card.Title) img.setAttribute('alt', card.Title);
	        cardEl.appendChild(img);
	      }
	      var caption = document.createElement('DIV');
	      caption.classList.add('caption');
	      if (card.Title) {
	        var title = document.createElement('H3');
	        title.appendChild(document.createTextNode(card.Title));
	        caption.appendChild(title);
	      }
	      if (card.Year) {
	        var year = document.createElement('SPAN');
	        year.appendChild(document.createTextNode(card.Year));
	        year.classList.add('badge');
	        caption.appendChild(year);
	      }
	      if (card.Type) {
	        var type = document.createElement('SPAN');
	        type.appendChild(document.createTextNode(card.Type));
	        type.classList.add('badge');
	        caption.appendChild(type);
	      }
	      var favBtn = document.createElement('BUTTON');
	      favBtn.classList.add('btn', 'btn-default', 'btn-favourite');
	      favBtn.setAttribute('type', 'button');
	      favBtn.innerHTML = '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>\n    <span class="btn-favourite-text btn-favourite-text-add">Add to favourites</span>\n    <span class="btn-favourite-text btn-favourite-text-remove">Remove from favourites</span>';
	      caption.appendChild(favBtn);
	      cardEl.appendChild(caption);
	      cardContainer.appendChild(cardEl);
	      if (favourite) {
	        this.container.insertBefore(cardContainer, this.container.firstChild);
	        return;
	      }
	      this.container.appendChild(cardContainer);
	    }
	  }, {
	    key: 'setPagination',
	    value: function setPagination(totalCardsAmount) {
	      var _this3 = this;
	
	      // this.paginationContainer
	      var list = this.paginationContainer.querySelector('ul.pagination');
	      if (!list) {
	        list = document.createElement('UL');
	        list.classList.add('pagination');
	        list.addEventListener('click', function (event) {
	          _this3.searchMovies(event, parseInt(event.target.dataset.id, 10));
	        });
	        this.paginationContainer.appendChild(list);
	      }
	      list.innerHTML = '';
	      var totalPagesAmount = Math.ceil(totalCardsAmount / _config2.default.cardsPerPage);
	      if (totalPagesAmount < 2) return;
	      for (var i = 1; i <= totalPagesAmount; i++) {
	        if (Math.abs(i - 1) > 4 && Math.abs(i - this.currentPage) > 4 && Math.abs(i - totalPagesAmount) > 4) continue;
	        var item = document.createElement('LI');
	        if (Math.abs(i - 1) === 4 && Math.abs(1 - this.currentPage) > 8 || Math.abs(i - totalPagesAmount) === 4 && Math.abs(totalPagesAmount - this.currentPage) > 8) {
	          item.classList.add('disabled');
	          item.innerHTML = '<a href="#">...</a>';
	          list.appendChild(item);
	          continue;
	        }
	        if (i === this.currentPage) item.classList.add('active');
	        item.innerHTML = '<a href="#" data-id="' + i + '">' + i + '</a>';
	        list.appendChild(item);
	      }
	    }
	  }, {
	    key: 'pushMessageToContainer',
	    value: function pushMessageToContainer(type, message) {
	      this.container.innerHTML = '';
	      this.favContainer.innerHTML = '';
	      this.paginationContainer.innerHTML = '';
	      var alertBlock = document.createElement('DIV');
	      alertBlock.classList.add('alert');
	      alertBlock.classList.add('col-sm-6');
	      alertBlock.classList.add('col-sm-push-3');
	      if (type === 'error') alertBlock.classList.add('alert-danger');
	      alertBlock.appendChild(document.createTextNode(message));
	      this.container.appendChild(alertBlock);
	    }
	  }, {
	    key: 'pushError',
	    value: function pushError(error) {
	      console.error(error);
	      var alertContainer = document.getElementById('alert-block-container');
	      var alertBlock = document.createElement('DIV');
	      alertBlock.classList.add('alert');
	      alertBlock.classList.add('alert-danger');
	      alertBlock.classList.add('text-center');
	      alertBlock.classList.add('col-sm-6');
	      alertBlock.classList.add('col-sm-push-3');
	      alertBlock.appendChild(document.createTextNode(error));
	      alertContainer.appendChild(alertBlock);
	    }
	  }, {
	    key: 'inFavourites',
	    value: function inFavourites(movieId) {
	      var movieIndex = -1;
	      this.favList.forEach(function (movie, index) {
	        if (movie.imdbID === movieId) {
	          movieIndex = index;
	        }
	      });
	      return movieIndex;
	    }
	  }]);
	
	  return SearchEngine;
	}();
	
	exports.default = SearchEngine;
	
	
	function findAncestor(el, cls) {
	  while (!el.classList.contains(cls)) {
	    el = el.parentElement;
	  }
	  return el;
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  domain: 'http://www.omdbapi.com/',
	  api: '6f0a67d0',
	  cardsPerPage: 10
	};

/***/ }
/******/ ]);
//# sourceMappingURL=main.bundle.js.map