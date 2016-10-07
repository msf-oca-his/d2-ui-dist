'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createFlexContainer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createFlexContainer(defaultFlexStyle) {
    var displayName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'FlexContainer';

    function FlexContainer(_ref) {
        var style = _ref.style;
        var _ref$flexValue = _ref.flexValue;
        var flexValue = _ref$flexValue === undefined ? '1 0 auto' : _ref$flexValue;
        var children = _ref.children;

        var flexContainerStyle = Object.assign({ display: 'flex' }, defaultFlexStyle, style);
        var flexedChildren = _react.Children.map(children, function (child) {
            return (0, _react.cloneElement)(child, { style: Object.assign({}, { flex: flexValue }, child.props.style) });
        });

        return _react2.default.createElement(
            'div',
            { style: flexContainerStyle },
            flexedChildren
        );
    }
    FlexContainer.displayName = displayName;

    return FlexContainer;
}