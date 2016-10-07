'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Avatar = require('material-ui/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _HeaderMenu = require('./HeaderMenu');

var _HeaderMenu2 = _interopRequireDefault(_HeaderMenu);

var _HeaderMenuItem = require('./HeaderMenuItem');

var _HeaderMenuItem2 = _interopRequireDefault(_HeaderMenuItem);

var _headerBarStyles = require('../header-bar-styles');

var _headerBarStyles2 = _interopRequireDefault(_headerBarStyles);

var _addD2Context = require('../../component-helpers/addD2Context');

var _addD2Context2 = _interopRequireDefault(_addD2Context);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _getBaseUrlFromD2ApiUrl = require('../getBaseUrlFromD2ApiUrl');

var _getBaseUrlFromD2ApiUrl2 = _interopRequireDefault(_getBaseUrlFromD2ApiUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getBaseUrl = _getBaseUrlFromD2ApiUrl2.default;

var ProfileMenu = (0, _addD2Context2.default)(function ProfileMenu(props, _ref) {
    var d2 = _ref.d2;
    var currentUser = props.currentUser;
    var items = props.items;

    var menuItems = items.map(function (item, index) {
        return _react2.default.createElement(_HeaderMenuItem2.default, _extends({ key: index }, item));
    });

    if (!currentUser.firstName) {
        return _react2.default.createElement('div', null);
    }

    var rightSideStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem',
        justifyContent: 'space-between',
        borderLeft: '1px solid #CCC',
        backgroundColor: '#F5F5F5'
    };

    // TODO: Pull out these styles
    var rightSide = _react2.default.createElement(
        'div',
        { style: rightSideStyle },
        _react2.default.createElement(
            'div',
            { style: { display: 'flex', alignItems: 'center', flexDirection: 'column' } },
            _react2.default.createElement(
                _Avatar2.default,
                { size: 60, style: _headerBarStyles2.default.avatarBig },
                currentUser.firstName.charAt(0) + ' ' + currentUser.surname.charAt(0)
            ),
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { style: { width: '100%', marginTop: '1rem', lineHeight: '1.5rem', fontWeight: 'bold' } },
                    currentUser.displayName
                ),
                _react2.default.createElement(
                    'div',
                    { style: { width: '100%', lineHeight: '1.5rem' } },
                    currentUser.email
                )
            )
        ),
        _react2.default.createElement(
            _FlatButton2.default,
            { style: { width: '100%', textAlign: 'center' }, href: getBaseUrl(d2) + '/dhis-web-commons-security/logout.action' },
            d2.i18n.getTranslation('log_out')
        )
    );

    return _react2.default.createElement(
        _HeaderMenu2.default,
        {
            name: _react2.default.createElement(
                _Avatar2.default,
                { size: 32, style: _headerBarStyles2.default.avatar },
                currentUser.firstName.charAt(0) + ' ' + currentUser.surname.charAt(0)
            ),
            rowItemCount: props.rowItemCount,
            columnItemCount: props.columnItemCount,
            rightSide: rightSide,
            width: 700,
            menuStyle: {
                flexDirection: 'row',
                width: 600,
                padding: '0'
            },
            padding: '1rem'
        },
        menuItems
    );
});

exports.default = ProfileMenu;