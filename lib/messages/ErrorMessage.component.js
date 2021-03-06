'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Message = require('./Message.component');

var _Message2 = _interopRequireDefault(_Message);

var _mapProps = require('../component-helpers/mapProps');

var _mapProps2 = _interopRequireDefault(_mapProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _mapProps2.default)(function (props) {
  return _extends({ style: { color: 'red' } }, props);
}, _Message2.default);