/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/network.png":
/*!*************************!*\
  !*** ./src/network.png ***!
  \*************************/
/***/ (() => {

eval("throw new Error(\"Module build failed (from ./webp-loader.js):\\nError: Command failed: cannot open input file '�PNG\\r\\n\\u001a\\n'\\nError! Could not process file �PNG\\r\\n\\u001a\\n\\nError! Cannot read input picture file '�PNG\\r\\n\\u001a\\n'\\n\\n    at ChildProcess.onClose (/Users/xuqunhai/Desktop/work/git/xuqunhai/work/手写loader和plugin/loader/node_modules/cwebp/lib/wrapper.js:45:15)\\n    at Object.onceWrapper (node:events:514:26)\\n    at ChildProcess.emit (node:events:394:28)\\n    at maybeClose (node:internal/child_process:1067:16)\\n    at Socket.<anonymous> (node:internal/child_process:453:11)\\n    at Socket.emit (node:events:394:28)\\n    at Pipe.<anonymous> (node:net:661:12)\");\n\n//# sourceURL=webpack://code/./src/network.png?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("// index.js\n__webpack_require__(/*! ./network.png */ \"./src/network.png\");\nconsole.log('我要学好前端，因为学好前端可以： ');\n异步走上人生颠覆888同步走上人生巅峰666\n\n//# sourceURL=webpack://code/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;