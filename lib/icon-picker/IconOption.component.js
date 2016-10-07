'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = IconOption;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FlatButton = require('material-ui/FlatButton/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function IconOption(props) {
    return _react2.default.createElement(
        _FlatButton2.default,
        { onClick: function onClick(event) {
                return props.onIconClicked(event, props.value);
            } },
        _react2.default.createElement('img', { src: props.imgSrc })
    );
}