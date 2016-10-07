'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FloatingActionButton = require('material-ui/FloatingActionButton/FloatingActionButton');

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _add = require('material-ui/svg-icons/content/add');

var _add2 = _interopRequireDefault(_add);

var _DataTable = require('../data-table/DataTable.component');

var _DataTable2 = _interopRequireDefault(_DataTable);

var _EditLegendItem = require('./EditLegendItem.component');

var _EditLegendItem2 = _interopRequireDefault(_EditLegendItem);

var _LegendItem = require('./LegendItem.store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LegendItems = function (_Component) {
    _inherits(LegendItems, _Component);

    function LegendItems() {
        var _ref;

        _classCallCheck(this, LegendItems);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = LegendItems.__proto__ || Object.getPrototypeOf(LegendItems)).call.apply(_ref, [this].concat(args)));

        _this.onAddLegendItem = function () {
            var model = _this.context.d2.models.legend.create();
            model.color = '#FFA500'; // Orange is default

            (0, _LegendItem.openEditDialogFor)(model);
        };

        _this.state = {
            editDialogOpen: false
        };
        return _this;
    }

    _createClass(LegendItems, [{
        key: 'render',
        value: function render() {
            var props = this.props;

            var actions = {
                edit: _LegendItem.openEditDialogFor,
                delete: props.deleteItem
            };

            var styles = {
                component: {
                    position: 'relative'
                },
                button: {
                    float: 'right',
                    position: 'absolute',
                    right: 20,
                    top: -29
                }
            };

            var orderedItems = props.items.sort(function (left, right) {
                return Number(left.startValue) > Number(right.startValue);
            });

            return _react2.default.createElement(
                'div',
                { style: styles.component },
                _react2.default.createElement(
                    _FloatingActionButton2.default,
                    { style: styles.button, onClick: this.onAddLegendItem },
                    _react2.default.createElement(_add2.default, null)
                ),
                _react2.default.createElement(_DataTable2.default, {
                    rows: orderedItems,
                    columns: ['name', 'startValue', 'endValue', 'color'],
                    primaryAction: function primaryAction() {},
                    contextMenuActions: actions
                }),
                _react2.default.createElement(_EditLegendItem2.default, { onItemUpdate: function onItemUpdate() {
                        return props.updateItem(props.items);
                    } })
            );
        }
    }]);

    return LegendItems;
}(_react.Component);

exports.default = LegendItems;


LegendItems.contextTypes = {
    d2: _react.PropTypes.object
};

LegendItems.propTypes = {
    items: _react.PropTypes.array.isRequired
};