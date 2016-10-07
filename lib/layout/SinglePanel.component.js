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

function SinglePanel(props) {
    var children = props.children;

    var otherProps = _objectWithoutProperties(props, ['children']);

    var styles = {
        mainStyle: {
            flex: 1,
            display: 'flex',
            flexOrientation: 'row',
            marginTop: '8rem',
            marginLeft: '2rem',
            marginRight: '2rem'
        }
    };

    var childToRender = void 0;
    if ((0, _fp.isArray)(children) && children.length) {
        childToRender = children[0];
        _loglevel2.default.warn('You passed multiple children to the <SinglePanel /> component, this is not supported');
    } else {
        childToRender = children;
    }

    return _react2.default.createElement(
        'main',
        _extends({ style: styles.mainStyle }, otherProps),
        childToRender
    );
}

exports.default = SinglePanel;