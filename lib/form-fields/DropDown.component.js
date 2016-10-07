'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function renderMenuItem(_ref) {
    var value = _ref.value;
    var text = _ref.text;

    return _react2.default.createElement(_MenuItem2.default, { key: value, value: value, primaryText: text });
}

function renderMenuItems(_ref2) {
    var menuItems = _ref2.menuItems;
    var includeEmpty = _ref2.includeEmpty;
    var emptyLabel = _ref2.emptyLabel;

    var renderedMenuItems = menuItems.map(function (_ref3) {
        var id = _ref3.id;
        var displayName = _ref3.displayName;
        return renderMenuItem({ value: id, text: displayName });
    });

    if (includeEmpty) {
        renderedMenuItems.unshift(renderMenuItem({ value: 'null', text: emptyLabel }));
    }

    return renderedMenuItems;
}

function createCallbackWithFakeEventFromMaterialSelectField(callback) {
    return function (event, index, value) {
        return callback({ target: { value: value } });
    };
}

function DropDown(_ref4) {
    var onFocus = _ref4.onFocus;
    var onBlur = _ref4.onBlur;
    var onChange = _ref4.onChange;
    var value = _ref4.value;
    var disabled = _ref4.disabled;
    var menuItems = _ref4.menuItems;
    var includeEmpty = _ref4.includeEmpty;
    var emptyLabel = _ref4.emptyLabel;
    var noOptionsLabel = _ref4.noOptionsLabel;

    var other = _objectWithoutProperties(_ref4, ['onFocus', 'onBlur', 'onChange', 'value', 'disabled', 'menuItems', 'includeEmpty', 'emptyLabel', 'noOptionsLabel']);

    var menuItemArray = Array.isArray(menuItems) && menuItems || menuItems.toArray();
    var hasOptions = menuItemArray.length > 0;

    return _react2.default.createElement(
        _SelectField2.default,
        _extends({
            value: hasOptions ? value : 1,
            onChange: createCallbackWithFakeEventFromMaterialSelectField(onChange),
            disabled: !hasOptions || disabled
        }, other),
        hasOptions ? renderMenuItems({ menuItems: menuItemArray, includeEmpty: includeEmpty, emptyLabel: emptyLabel }) : _react2.default.createElement(_MenuItem2.default, { value: 1, primaryText: noOptionsLabel || '-' })
    );
}
DropDown.propTypes = {
    defaultValue: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number, _react2.default.PropTypes.bool]),
    value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number, _react2.default.PropTypes.bool]),
    onFocus: _react2.default.PropTypes.func,
    onBlur: _react2.default.PropTypes.func,
    onChange: _react2.default.PropTypes.func.isRequired,
    menuItems: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.array, _react2.default.PropTypes.object]),
    includeEmpty: _react2.default.PropTypes.bool,
    emptyLabel: _react2.default.PropTypes.string,
    noOptionsLabel: _react2.default.PropTypes.string
};
DropDown.defaultProps = {
    includeEmpty: false,
    emptyLabel: ''
};

exports.default = DropDown;