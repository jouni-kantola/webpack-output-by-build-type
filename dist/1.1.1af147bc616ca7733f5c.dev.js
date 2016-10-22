webpackJsonp([1],{

/***/ 11:
/***/ function(module, exports) {

	module.exports = function() {
	    console.log("now in module c's tree");
	}

/***/ },

/***/ 12:
/***/ function(module, exports) {

	module.exports = function() {
	    console.log("another module c's tree");
	}

/***/ },

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	const c1 = __webpack_require__(11);
	const c2 = __webpack_require__(12);

	const is = __webpack_require__(1);

	module.exports = function() {
	    c1();
	    c2();
	    console.log('module c says 12 + 1 === 13', is(12 + 1).thirteen());
	}

/***/ }

});