'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TextField = require('material-ui/TextField/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ExpressionDescription = _react2.default.createClass({
    displayName: 'ExpressionDescription',

    propTypes: {
        descriptionLabel: _react2.default.PropTypes.string,
        descriptionValue: _react2.default.PropTypes.string,
        onDescriptionChange: _react2.default.PropTypes.func.isRequired,
        errorText: _react2.default.PropTypes.string
    },

    render: function render() {
        var _props = this.props;
        var descriptionLabel = _props.descriptionLabel;
        var descriptionValue = _props.descriptionValue;
        var onDescriptionChange = _props.onDescriptionChange;

        var textFieldProps = _objectWithoutProperties(_props, ['descriptionLabel', 'descriptionValue', 'onDescriptionChange']);

        return _react2.default.createElement(
            'div',
            { className: 'expression-description' },
            _react2.default.createElement(_TextField2.default, _extends({}, textFieldProps, {
                value: this.props.descriptionValue,
                floatingLabelText: this.props.descriptionLabel,
                onChange: this.handleDescriptionChange,
                fullWidth: true,
                errorText: this.props.errorText
            }))
        );
    },
    handleDescriptionChange: function handleDescriptionChange(event) {
        var descriptionValue = event.target.value;
        this.props.onDescriptionChange(descriptionValue);
    }
});

exports.default = ExpressionDescription;