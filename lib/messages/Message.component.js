'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Message;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultStyle = {
    padding: '0.5rem 0'
};

function Message(_ref) {
    var propsStyle = _ref.style;
    var message = _ref.message;

    var style = Object.assign({}, defaultStyle, propsStyle);

    return _react2.default.createElement(
        'div',
        { style: style },
        message
    );
}
Message.propTypes = {
    style: _react.PropTypes.object,
    message: _react.PropTypes.string
};