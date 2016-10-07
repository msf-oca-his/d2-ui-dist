'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _SearchResultsList = require('./SearchResultsList');

var _SearchResultsList2 = _interopRequireDefault(_SearchResultsList);

var _HeaderMenuItem = require('../menus/HeaderMenuItem');

var _HeaderMenuItem2 = _interopRequireDefault(_HeaderMenuItem);

var _withStateFrom = require('../../component-helpers/withStateFrom');

var _withStateFrom2 = _interopRequireDefault(_withStateFrom);

var _addD2Context = require('../../component-helpers/addD2Context');

var _addD2Context2 = _interopRequireDefault(_addD2Context);

var _search = require('./search.stores');

var _headerBarStyles = require('../header-bar-styles');

var _headerBarStyles2 = _interopRequireDefault(_headerBarStyles);

var _NoResults = require('./NoResults');

var _NoResults2 = _interopRequireDefault(_NoResults);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _d = require('d2/lib/d2');

var _getBaseUrlFromD2ApiUrl = require('../getBaseUrlFromD2ApiUrl');

var _getBaseUrlFromD2ApiUrl2 = _interopRequireDefault(_getBaseUrlFromD2ApiUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// App menu strings to be translated
_d.config.i18n.strings.add('manage_my_apps');

var getBaseUrl = _getBaseUrlFromD2ApiUrl2.default;

function SearchResults(props, _ref) {
    var d2 = _ref.d2;

    var menuItems = (props.searchResults || []).map(function (item, index) {
        return _react2.default.createElement(_HeaderMenuItem2.default, _extends({ key: index }, item));
    });

    var moreAppsButton = _react2.default.createElement(
        _FlatButton2.default,
        {
            style: _headerBarStyles2.default.moreAppsButton,
            href: getBaseUrl(d2) + '/dhis-web-menu-management'
        },
        d2.i18n.getTranslation('manage_my_apps')
    );

    var searchResultBoxContent = menuItems.length ? _react2.default.createElement(
        _SearchResultsList2.default,
        null,
        menuItems
    ) : _react2.default.createElement(_NoResults2.default, null);

    var searchResultsWrap = Object.assign({}, _headerBarStyles2.default.searchResults, {
        display: 'flex',
        flexDirection: 'column',
        height: props.open ? (0, _headerBarStyles.getSearchResultsHeight)() : 0,
        overflow: props.open ? undefined : 'hidden'
    });

    return _react2.default.createElement(
        _Paper2.default,
        { style: searchResultsWrap, onMouseEnter: function onMouseEnter() {
                return (0, _search.setHovering)(true);
            }, onMouseLeave: function onMouseLeave() {
                return (0, _search.setHovering)(false);
            } },
        _react2.default.createElement(
            'div',
            { style: { flex: 1, overflow: 'auto', padding: '1rem' } },
            searchResultBoxContent
        ),
        _react2.default.createElement(
            'div',
            { style: _headerBarStyles2.default.moreAppsButtonWrap },
            moreAppsButton
        )
    );
}

// Connect the store to the SearchResults component
// TODO: This means we can only have one search results at all times (Perhaps make this more dynamic?)
var SearchResultsWithState = (0, _withStateFrom2.default)(_search.searchStore$, (0, _addD2Context2.default)(SearchResults));

exports.default = SearchResultsWithState;