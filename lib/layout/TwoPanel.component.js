'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fp = require('lodash/fp');

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function TwoPanelSelector(props) {
    var children = props.children;
    var childWrapStyle = props.childWrapStyle;
    var sizeRatio = props.sizeRatio;

    var otherProps = _objectWithoutProperties(props, ['children', 'childWrapStyle', 'sizeRatio']);

    var styles = {
        mainStyle: {
            flex: 1,
            display: 'flex',
            flexOrientation: 'row',
            marginTop: '8rem'
        }
    };
    var childrenToRender = void 0;

    if ((0, _fp.isArray)(children)) {
        // More than two children defeats the purpose of a two panel layout and was probably not what the
        // user of the component intended to do.
        if (children.length > 2) {
            _loglevel2.default.warn('You passed more than two children to the <TwoPanel /> component, it requires exactly two');
        }

        // We will always only render two children even when more are passed.
        childrenToRender = children.slice(0, 2);
    } else {
        // Just a single child was passed, log a warning because this will only fill the left bar with content.
        // And it was probably not what the user intended to do.
        _loglevel2.default.warn('You passed just one child to the <TwoPanel /> component, it requires exactly two');
        childrenToRender = [children];
    }

    var flexedChilden = childrenToRender.map(function (childComponent, index) {
        var childStyle = Object.assign({}, childWrapStyle, {
            flex: sizeRatio[index],
            paddingRight: index === children.length - 1 ? '2rem' : undefined
        });

        return _react2.default.createElement(
            'div',
            { key: index, style: childStyle },
            childComponent
        );
    });

    return _react2.default.createElement(
        'main',
        _extends({}, otherProps, { style: styles.mainStyle }),
        flexedChilden
    );
}
TwoPanelSelector.defaultProps = {
    sizeRatio: ['0 0 320px', 1],
    children: [],
    childWrapStyle: {}
};

exports.default = TwoPanelSelector;