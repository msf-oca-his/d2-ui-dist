'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SelectField = require('material-ui/SelectField/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Translate = require('../i18n/Translate.mixin');

var _Translate2 = _interopRequireDefault(_Translate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
    displayName: 'LocaleSelector.component',

    propTypes: {
        value: _react2.default.PropTypes.string,
        locales: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
            name: _react2.default.PropTypes.string.isRequired,
            locale: _react2.default.PropTypes.string.isRequired
        })).isRequired,
        onChange: _react2.default.PropTypes.func.isRequired
    },

    mixins: [_Translate2.default],

    render: function render() {
        var localeMenuItems = [{ payload: '', text: '' }].concat(this.props.locales).map(function (locale, index) {
            return _react2.default.createElement(_MenuItem2.default, {
                key: index,
                primaryText: locale.name,
                value: locale.locale
            });
        });

        return _react2.default.createElement(
            _SelectField2.default,
            _extends({
                fullWidth: true
            }, this.props, {
                value: this.state && this.state.locale,
                hintText: this.getTranslation('select_locale'),
                onChange: this._localeChange
            }),
            localeMenuItems
        );
    },
    _localeChange: function _localeChange(event, index, locale) {
        this.setState({
            locale: locale
        });

        this.props.onChange(locale, event);
    }
});