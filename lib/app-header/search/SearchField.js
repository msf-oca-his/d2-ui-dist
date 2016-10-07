'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _headerBarStyles = require('../header-bar-styles');

var _headerBarStyles2 = _interopRequireDefault(_headerBarStyles);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _search = require('./search.stores');

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _apps = require('material-ui/svg-icons/navigation/apps');

var _apps2 = _interopRequireDefault(_apps);

var _clear = require('material-ui/svg-icons/content/clear');

var _clear2 = _interopRequireDefault(_clear);

var _colors = require('material-ui/styles/colors');

var _d = require('d2/lib/d2');

var _addD2Context = require('../../component-helpers/addD2Context');

var _addD2Context2 = _interopRequireDefault(_addD2Context);

var _SearchResults = require('./SearchResults');

var _SearchResults2 = _interopRequireDefault(_SearchResults);

var _rx = require('rx');

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _withStateFrom = require('../../component-helpers/withStateFrom');

var _withStateFrom2 = _interopRequireDefault(_withStateFrom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_d.config.i18n.strings.add('app_search_placeholder');

var SearchField = function (_Component) {
    _inherits(SearchField, _Component);

    function SearchField() {
        var _ref;

        _classCallCheck(this, SearchField);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = SearchField.__proto__ || Object.getPrototypeOf(SearchField)).call.apply(_ref, [this].concat(args)));

        _this.state = {
            searchValue: ''
        };

        _this._setSearchValue = _this._setSearchValue.bind(_this);
        _this._focusSearchField = _this._focusSearchField.bind(_this);
        _this._onFocus = _this._onFocus.bind(_this);
        _this._onBlur = _this._onBlur.bind(_this);
        _this.clearSearchField = _this.clearSearchField.bind(_this);
        return _this;
    }

    _createClass(SearchField, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var isCtrlPressed = function isCtrlPressed(event) {
                return event.ctrlKey;
            };
            var isSpaceKey = function isSpaceKey(event) {
                return event.keyCode === 32 || event.key === 'Space';
            };
            var combineFilters = function combineFilters() {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                return function combinedFiltersFn(event) {
                    return args.map(function (filterFn) {
                        return filterFn(event);
                    }).every(function (filterResult) {
                        return filterResult === true;
                    });
                };
            };

            // When Ctrl+Space is pressed focus the search field in the header bar
            this.disposable = _rx.Observable.fromEvent(window, 'keyup') // TODO: Using the window global directly is bad for testability
            .filter(combineFilters(isCtrlPressed, isSpaceKey)).subscribe(this._focusSearchField, _loglevel2.default.error);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.disposable && this.disposable.dispose) {
                this.disposable.dispose();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { style: _headerBarStyles2.default.searchField },
                _react2.default.createElement(
                    'div',
                    { style: Object.assign({ width: this.state.hasFocus ? '100%' : '50%' }, _headerBarStyles2.default.searchFieldInnerWrap) },
                    _react2.default.createElement(_TextField2.default, {
                        fullWidth: true,
                        value: this.props.searchValue || '',
                        onChange: this._setSearchValue,
                        onFocus: this._onFocus,
                        onBlur: this._onBlur,
                        hintText: this.context.d2.i18n.getTranslation('app_search_placeholder'),
                        hintStyle: _headerBarStyles2.default.searchFieldHintText,
                        inputStyle: _headerBarStyles2.default.searchFieldInput,
                        onKeyUp: this._onKeyUp,
                        ref: 'searchBox',
                        underlineFocusStyle: { borderColor: _colors.white }
                    }),
                    this.props.searchValue ? _react2.default.createElement(_clear2.default, { style: _headerBarStyles2.default.clearIcon, color: _colors.white, onClick: this.clearSearchField }) : ''
                ),
                _react2.default.createElement(
                    _IconButton2.default,
                    { onClick: this._focusSearchField },
                    _react2.default.createElement(_apps2.default, { color: _colors.white })
                ),
                _react2.default.createElement(_SearchResults2.default, null)
            );
        }
    }, {
        key: '_focusSearchField',
        value: function _focusSearchField() {
            var searchField = (0, _reactDom.findDOMNode)(this.refs.searchBox);

            if (searchField && searchField !== document.activeElement) {
                searchField.querySelector('input').focus();
            }
        }
    }, {
        key: 'clearSearchField',
        value: function clearSearchField() {
            if (this.state.hasFocus) {
                this._focusSearchField();
            }
            (0, _search.search)('');
        }
    }, {
        key: '_setSearchValue',
        value: function _setSearchValue(event) {
            this.setState({ hasValue: Boolean(event.target.value) });
            (0, _search.search)(event.target.value);
        }
    }, {
        key: '_onFocus',
        value: function _onFocus() {
            this.setState({ hasFocus: true });
            (0, _search.setSearchFieldFocusTo)(true);
        }
    }, {
        key: '_onBlur',
        value: function _onBlur() {
            this.setState({ hasFocus: false });
            (0, _search.hideWhenNotHovering)();
        }
    }, {
        key: '_onKeyUp',
        value: function _onKeyUp(event) {
            (0, _search.handleKeyPress)(event, Math.floor(event.currentTarget.clientWidth / _headerBarStyles.MENU_ITEM_WIDTH));
        }
    }]);

    return SearchField;
}(_react.Component);

exports.default = (0, _withStateFrom2.default)(_search.searchStore$, (0, _addD2Context2.default)(SearchField));