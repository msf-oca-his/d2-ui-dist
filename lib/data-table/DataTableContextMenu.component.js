'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Menu = require('material-ui/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _FontIcon = require('material-ui/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _Popover = require('material-ui/Popover/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _addD2Context = require('../component-helpers/addD2Context');

var _addD2Context2 = _interopRequireDefault(_addD2Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleClick(props, action) {
    props.actions[action].apply(props.actions, [props.activeItem]);

    if (props.onRequestClose) {
        props.onRequestClose();
    }
}

function DataTableContextMenu(props, context) {
    var actionList = Object.keys(props.actions).filter(function (menuActionKey) {
        return typeof props.actions[menuActionKey] === 'function';
    });

    var cmStyle = {
        position: 'fixed'
    };
    return _react2.default.createElement(
        _Popover2.default,
        _extends({}, props, {
            open: Boolean(props.activeItem),
            anchorEl: props.target,
            anchorOrigin: { horizontal: 'middle', vertical: 'center' },
            animated: false,
            style: cmStyle,
            animation: _Paper2.default
        }),
        _react2.default.createElement(
            _Menu2.default,
            { className: 'data-table__context-menu', desktop: true },
            actionList.map(function (action) {
                var iconName = props.icons[action] ? props.icons[action] : action;

                return _react2.default.createElement(_MenuItem2.default, {
                    key: action,
                    'data-object-id': props.activeItem && props.activeItem.id,
                    className: 'data-table__context-menu__item',
                    onClick: function onClick() {
                        return handleClick(props, action);
                    },
                    primaryText: context.d2.i18n.getTranslation(action),
                    leftIcon: _react2.default.createElement(
                        _FontIcon2.default,
                        { className: 'material-icons' },
                        iconName
                    )
                });
            })
        )
    );
}

DataTableContextMenu.defaultProps = {
    icons: {},
    actions: {}
};

DataTableContextMenu.propTypes = {
    actions: _react.PropTypes.objectOf(_react.PropTypes.func),
    activeItem: _react.PropTypes.object,
    icons: _react.PropTypes.object,
    target: _react.PropTypes.object,
    onRequestClose: _react.PropTypes.func
};

exports.default = (0, _addD2Context2.default)(DataTableContextMenu);