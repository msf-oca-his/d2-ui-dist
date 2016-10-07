'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = D2UIApp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function D2UIApp(props) {
    return _react2.default.createElement(
        _MuiThemeProvider2.default,
        { muiTheme: props.theme || (0, _getMuiTheme2.default)() },
        props.children
    );
}