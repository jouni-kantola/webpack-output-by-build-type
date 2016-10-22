webpackJsonp([6],{

/***/ 5:
/***/ function(module, exports) {

	module.exports = {dev: true, debug: true};

/***/ },

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	const config = __webpack_require__(5);

	console.dir(config);
	console.log(({"in":"dev"}));

	__webpack_require__.e/* nsure */(3, function (require) {
	    const a = __webpack_require__(8);
	    console.log(a());
	});


	__webpack_require__.e/* nsure */(2, function (require) {
	    const b = __webpack_require__(9);
	    console.log(b());
	});

	__webpack_require__.e/* nsure */(1, function (require) {
	    const c = __webpack_require__(10);
	    console.log(c());
	});

	if (config.debug) {
	    __webpack_require__.e/* nsure */(5, function (require) {
	        const debug = __webpack_require__(6);
	        console.log(debug("i'm accessible by runtime config"));
	    });
	}

	if (true) {
	    __webpack_require__.e/* nsure */(4, function (require) {
	        const debug = __webpack_require__(7);
	        console.log(debug("i'm accessible in dev build"));
	    });
	}


/***/ }

});