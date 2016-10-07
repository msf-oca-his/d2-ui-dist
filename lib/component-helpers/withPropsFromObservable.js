'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = withPropsFromObservable;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CircularProgress = require('material-ui/CircularProgress/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _getDisplayName = require('recompose/getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function withPropsFromObservable(observable, BaseComponent) {
    var WithPropsFromComponent = function (_Component) {
        _inherits(WithPropsFromComponent, _Component);

        function WithPropsFromComponent(props, context) {
            _classCallCheck(this, WithPropsFromComponent);

            var _this = _possibleConstructorReturn(this, (WithPropsFromComponent.__proto__ || Object.getPrototypeOf(WithPropsFromComponent)).call(this, props, context));

            _this.state = {
                isLoading: true
            };
            return _this;
        }

        _createClass(WithPropsFromComponent, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _this2 = this;

                this.disposable = observable.subscribe(function (props) {
                    return _this2.setState(_extends({ isLoading: false }, props));
                }, function (error) {
                    _loglevel2.default.error('Failed to receive props for ' + BaseComponent.displayName);_loglevel2.default.error(error);
                });
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
                var _state = this.state;
                var isLoading = _state.isLoading;

                var componentProps = _objectWithoutProperties(_state, ['isLoading']);

                if (this.state.isLoading) {
                    return _react2.default.createElement(_CircularProgress2.default, null);
                }

                return _react2.default.createElement(BaseComponent, _extends({}, componentProps, this.props));
            }
        }]);

        return WithPropsFromComponent;
    }(_react.Component);

    WithPropsFromComponent.displayName = 'withPropsFrom(' + (0, _getDisplayName2.default)(BaseComponent) + ')';

    return WithPropsFromComponent;
}