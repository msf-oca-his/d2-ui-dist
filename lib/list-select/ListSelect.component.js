'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ListSelect;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ListSelect(props) {
    function listItemDoubleClicked(event) {
        var clickedItemValue = event.target.value;

        if (props.onItemDoubleClick) {
            props.onItemDoubleClick(clickedItemValue);
        }
    }

    var options = props.source.map(function (item) {
        return _react2.default.createElement(
            'option',
            {
                key: item.value,
                style: { padding: '.25rem' },
                onDoubleClick: listItemDoubleClicked,
                value: item.value
            },
            item.label
        );
    });

    return _react2.default.createElement(
        'div',
        { className: 'list-select' },
        _react2.default.createElement(
            'select',
            { size: props.size || 15, style: Object.assign({ overflowX: 'auto' }, props.listStyle) },
            options
        )
    );
}
ListSelect.propTypes = {
    source: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        label: _react.PropTypes.string,
        value: _react.PropTypes.string
    })).isRequired,
    onItemDoubleClick: _react.PropTypes.func.isRequired,
    listStyle: _react.PropTypes.object,
    size: _react.PropTypes.number
};