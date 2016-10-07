'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _headerBarStyles = require('../header-bar-styles');

var _headerBarStyles2 = _interopRequireDefault(_headerBarStyles);

var _HeaderMenuItems = require('./HeaderMenuItems');

var _HeaderMenuItems2 = _interopRequireDefault(_HeaderMenuItems);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeaderMenu = function (_Component) {
    _inherits(HeaderMenu, _Component);

    function HeaderMenu() {
        var _ref;

        _classCallCheck(this, HeaderMenu);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = HeaderMenu.__proto__ || Object.getPrototypeOf(HeaderMenu)).call.apply(_ref, [this].concat(args)));

        _this.state = {};

        _this._mouseEnter = _this._mouseEnter.bind(_this);
        _this._mouseLeave = _this._mouseLeave.bind(_this);
        _this._onScroll = _this._onScroll.bind(_this);
        return _this;
    }

    _createClass(HeaderMenu, [{
        key: 'render',
        value: function render() {
            var itemsPerRow = this.props.rowItemCount;
            var menuWidth = itemsPerRow * _headerBarStyles.MENU_ITEM_WIDTH;
            var _props = this.props;
            var name = _props.name;
            var children = _props.children;

            var menuStyle = Object.assign({}, _headerBarStyles2.default.dropDownWrap, {
                display: this.state.open ? 'flex' : 'none',
                right: this.state.showScrollBar ? 20 : _headerBarStyles2.default.dropDownWrap.right,
                width: this.state.showScrollBar ? menuWidth + 55 : menuWidth + 35
            }, this.props.menuStyle);

            var useScrollAfterNumberOfRows = this.props.columnItemCount * _headerBarStyles.MENU_ITEM_WIDTH;
            var calculatedHeight = Math.ceil(children.length / itemsPerRow) * _headerBarStyles.MENU_ITEM_WIDTH;
            var innerMenuProps = {
                height: calculatedHeight > useScrollAfterNumberOfRows ? useScrollAfterNumberOfRows : calculatedHeight,
                width: this.state.showScrollBar ? menuWidth + 35 : menuWidth + 55,
                marginRight: this.state.showScrollBar ? 0 : -30,
                onScroll: this._onScroll.bind(this),
                padding: this.props.padding
            };

            return _react2.default.createElement(
                'div',
                {
                    style: _headerBarStyles2.default.headerMenu,
                    onMouseEnter: this._mouseEnter,
                    onMouseLeave: this._mouseLeave
                },
                name,
                _react2.default.createElement(
                    'div',
                    { style: { paddingTop: 55 } },
                    _react2.default.createElement(
                        _Paper2.default,
                        { style: menuStyle },
                        _react2.default.createElement(
                            _HeaderMenuItems2.default,
                            innerMenuProps,
                            children
                        ),
                        this.props.rightSide,
                        this.props.moreButton
                    )
                )
            );
        }
    }, {
        key: '_mouseEnter',
        value: function _mouseEnter(event) {
            this.setState({
                anchor: event.target,
                open: true
            });
        }
    }, {
        key: '_mouseLeave',
        value: function _mouseLeave() {
            this.setState({
                open: false
            });
        }
    }, {
        key: '_onScroll',
        value: function _onScroll(event) {
            this.setState({
                showScrollBar: event.target.scrollTop > 1
            });
        }
    }]);

    return HeaderMenu;
}(_react.Component);

exports.default = HeaderMenu;