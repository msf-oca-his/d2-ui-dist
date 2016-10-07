'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = mapProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapProps(mapper, BaseComponent) {
    return function (props) {
        return _react2.default.createElement(BaseComponent, mapper(props));
    };
}