'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _RaisedButton = require('material-ui/RaisedButton/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _LinearProgress = require('material-ui/LinearProgress/LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

var _common = require('./common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var style = {
    button: {
        position: 'relative',
        top: 3,
        marginLeft: 16
    },
    progress: {
        height: 2,
        backgroundColor: 'rgba(0,0,0,0)',
        top: 46
    }
};
style.button1 = Object.assign({}, style.button, { marginLeft: 0 });

var OrgUnitSelectAll = function (_React$Component) {
    _inherits(OrgUnitSelectAll, _React$Component);

    function OrgUnitSelectAll(props, context) {
        _classCallCheck(this, OrgUnitSelectAll);

        var _this = _possibleConstructorReturn(this, (OrgUnitSelectAll.__proto__ || Object.getPrototypeOf(OrgUnitSelectAll)).call(this, props, context));

        _this.state = {
            loading: false,
            cache: null
        };

        _this.addToSelection = _common.addToSelection.bind(_this);

        _this.handleSelectAll = _this.handleSelectAll.bind(_this);
        _this.handleDeselectAll = _this.handleDeselectAll.bind(_this);

        _this.getTranslation = context.d2.i18n.getTranslation.bind(context.d2.i18n);
        return _this;
    }

    _createClass(OrgUnitSelectAll, [{
        key: 'handleSelectAll',
        value: function handleSelectAll() {
            var _this2 = this;

            if (Array.isArray(this.state.cache)) {
                this.props.onUpdateSelection(this.state.cache.slice());
            } else {
                this.setState({ loading: true });

                this.context.d2.models.organisationUnits.list({ fields: 'id', paging: false }).then(function (orgUnits) {
                    var ous = orgUnits.toArray().map(function (ou) {
                        return ou.id;
                    });
                    _this2.setState({
                        cache: ous,
                        loading: false
                    });

                    _this2.props.onUpdateSelection(ous.slice());
                }).catch(function (err) {
                    _this2.setState({ loading: false });
                    _loglevel2.default.error('Failed to load all org units:', err);
                });
            }
        }
    }, {
        key: 'handleDeselectAll',
        value: function handleDeselectAll() {
            this.props.onUpdateSelection([]);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_RaisedButton2.default, {
                    style: style.button1,
                    label: this.getTranslation('select_all'),
                    onClick: this.handleSelectAll,
                    disabled: this.state.loading
                }),
                _react2.default.createElement(_RaisedButton2.default, {
                    style: style.button,
                    label: this.getTranslation('deselect_all'),
                    onClick: this.handleDeselectAll,
                    disabled: this.state.loading
                })
            );
        }
    }]);

    return OrgUnitSelectAll;
}(_react2.default.Component);

OrgUnitSelectAll.propTypes = {
    // selected is an array of selected organisation unit IDs
    selected: _react2.default.PropTypes.array.isRequired,

    // Whenever the selection changes, onUpdateSelection will be called with
    // one argument: The new array of selected organisation units
    onUpdateSelection: _react2.default.PropTypes.func.isRequired
};

OrgUnitSelectAll.contextTypes = { d2: _react2.default.PropTypes.object.isRequired };

exports.default = OrgUnitSelectAll;