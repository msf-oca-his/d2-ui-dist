'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = HeaderBar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ProfileMenu = require('./menus/ProfileMenu');

var _ProfileMenu2 = _interopRequireDefault(_ProfileMenu);

var _InnerHeader = require('./InnerHeader');

var _InnerHeader2 = _interopRequireDefault(_InnerHeader);

var _HeaderMenus = require('./menus/HeaderMenus');

var _HeaderMenus2 = _interopRequireDefault(_HeaderMenus);

var _SearchField = require('./search/SearchField');

var _SearchField2 = _interopRequireDefault(_SearchField);

var _headerBarStyles = require('./header-bar-styles');

var _headerBarStyles2 = _interopRequireDefault(_headerBarStyles);

var _LinearProgress = require('material-ui/LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HeaderBar(props, _ref) {
    var d2 = _ref.d2;
    var appItems = props.appItems;
    var profileItems = props.profileItems;
    var currentUser = props.currentUser;
    var settings = props.settings;
    var noLoadingIndicator = props.noLoadingIndicator;

    // If the required props are not passed we're in a loading state.

    if (!appItems && !profileItems && !settings) {
        if (noLoadingIndicator) {
            return _react2.default.createElement('div', { style: { display: 'none' } });
        }
        return _react2.default.createElement(
            'div',
            { style: _headerBarStyles2.default.headerBar },
            _react2.default.createElement(_LinearProgress2.default, { mode: 'indeterminate' })
        );
    }

    return _react2.default.createElement(
        'div',
        { style: (0, _headerBarStyles.applyUserStyle)(d2.currentUser, _headerBarStyles2.default.headerBar) },
        _react2.default.createElement(_InnerHeader2.default, null),
        _react2.default.createElement(_SearchField2.default, null),
        _react2.default.createElement(
            _HeaderMenus2.default,
            null,
            _react2.default.createElement(_ProfileMenu2.default, {
                items: profileItems,
                rowItemCount: 3,
                columnItemCount: 3,
                currentUser: currentUser
            })
        )
    );
}
HeaderBar.contextTypes = {
    d2: _react.PropTypes.object
};
HeaderBar.propTypes = {
    appItems: _react.PropTypes.array,
    profileItems: _react.PropTypes.array,
    currentUser: _react.PropTypes.object,
    settings: _react.PropTypes.object
};