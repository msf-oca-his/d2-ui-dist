'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _headerBarStyles = require('../header-bar-styles');

var _headerBarStyles2 = _interopRequireDefault(_headerBarStyles);

var _search = require('../search/search.stores');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var onMouseUp = function onMouseUp(link) {
    return function () {
        (0, _search.search)('');
        (0, _search.setSearchFieldFocusTo)(false);
        window.location = link;
    };
};

var HeaderMenuItem = function (_Component) {
    _inherits(HeaderMenuItem, _Component);

    function HeaderMenuItem() {
        _classCallCheck(this, HeaderMenuItem);

        var _this = _possibleConstructorReturn(this, (HeaderMenuItem.__proto__ || Object.getPrototypeOf(HeaderMenuItem)).call(this));

        _this.state = {
            hovering: false
        };

        _this.onMouseEnter = _this.onMouseEnter.bind(_this);
        _this.onMouseLeave = _this.onMouseLeave.bind(_this);
        return _this;
    }

    _createClass(HeaderMenuItem, [{
        key: 'render',
        value: function render() {
            var props = this.props;

            var itemStyle = Object.assign({
                backgroundColor: props.selected || this.state.hovering ? '#F5F5F5' : 'transparent'
            }, _headerBarStyles2.default.menuItemLink);

            return _react2.default.createElement(
                'a',
                { href: props.action, onMouseUp: onMouseUp(props.action), style: itemStyle, onMouseEnter: this.onMouseEnter, onMouseLeave: this.onMouseLeave },
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('img', { style: _headerBarStyles2.default.menuItemIcon, src: props.icon })
                ),
                _react2.default.createElement(
                    'div',
                    { style: { textAlign: 'center' } },
                    props.label
                )
            );
        }
    }, {
        key: 'onMouseEnter',
        value: function onMouseEnter() {
            this.setState({
                hovering: true
            });
        }
    }, {
        key: 'onMouseLeave',
        value: function onMouseLeave() {
            this.setState({
                hovering: false
            });
        }
    }]);

    return HeaderMenuItem;
}(_react.Component);

exports.default = HeaderMenuItem;

HeaderMenuItem.propTypes = {
    action: _react.PropTypes.string.isRequired,
    label: _react.PropTypes.string.isRequired,
    icon: _react.PropTypes.string
};