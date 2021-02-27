'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

// npm i -S babel-plugin-transform-runtime babel-runtime --registry=https://registry.npm.taobao.org
var init = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(path) {
        var data;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return (0, _fs.readFileSync)(path);

                    case 3:
                        data = _context.sent;

                        data = JSON.parse(data);
                        console.log(data.name);
                        _context.next = 11;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](0);

                        console.log(_context.t0);

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 8]]);
    }));

    return function init(_x) {
        return _ref.apply(this, arguments);
    };
}();

var _util = require('util');

var _path = require('path');

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import * as qs from 'querystring';

(0, _util.promisify)(_fs.readFile)((0, _path.resolve)(__dirname, '../package.json')).then(function (data) {
    data = JSON.parse(data);
    console.log(data.name);
    (0, _fs.writeFileSync)((0, _path.resolve)(__dirname, './name'), String(data.name), 'utf8');
});

init((0, _path.resolve)(__dirname, '../package.json'));
//# sourceMappingURL=index.js.map