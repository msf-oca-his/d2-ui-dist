'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderControls = exports.renderDropdown = exports.handleChangeSelection = exports.removeFromSelection = exports.addToSelection = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DropDown = require('../form-fields/DropDown.component');

var _DropDown2 = _interopRequireDefault(_DropDown);

var _RaisedButton = require('material-ui/RaisedButton/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _LinearProgress = require('material-ui/LinearProgress/LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function addToSelection(orgUnits) {
    var res = orgUnits;
    this.props.selected.forEach(function (orgUnitId) {
        if (res.indexOf(orgUnitId) === -1) {
            res.push(orgUnitId);
        }
    });
    this.props.onUpdateSelection(res);
}

function removeFromSelection(orgUnits) {
    this.props.onUpdateSelection(this.props.selected.filter(function (orgUnit) {
        return orgUnits.indexOf(orgUnit) === -1;
    }));
}

function handleChangeSelection(event) {
    this.setState({ selection: event.target.value });
}

function renderDropdown(menuItems, label) {
    return _react2.default.createElement(
        'div',
        { style: { position: 'relative', minHeight: 89 } },
        _react2.default.createElement(_DropDown2.default, {
            value: this.state.selection,
            menuItems: menuItems,
            onChange: this.handleChangeSelection,
            floatingLabelText: this.getTranslation(label),
            disabled: this.state.loading
        }),
        this.renderControls()
    );
};

function renderControls() {
    var disabled = this.state.loading || !this.state.selection;

    return _react2.default.createElement(
        'div',
        { style: { position: 'absolute', display: 'inline-block', top: 24, marginLeft: 16 } },
        this.state.loading && _react2.default.createElement(_LinearProgress2.default, { size: 0.5, style: style.progress }),
        _react2.default.createElement(_RaisedButton2.default, {
            label: this.getTranslation('select'),
            style: style.button1,
            onClick: this.handleSelect,
            disabled: disabled
        }),
        _react2.default.createElement(_RaisedButton2.default, {
            label: this.getTranslation('deselect'),
            style: style.button,
            onClick: this.handleDeselect,
            disabled: disabled
        })
    );
}

exports.addToSelection = addToSelection;
exports.removeFromSelection = removeFromSelection;
exports.handleChangeSelection = handleChangeSelection;
exports.renderDropdown = renderDropdown;
exports.renderControls = renderControls;