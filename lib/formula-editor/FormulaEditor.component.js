'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _draftJs2 = _interopRequireDefault(_draftJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var convertFromRaw = _draftJs2.default.convertFromRaw;
var convertToRaw = _draftJs2.default.convertToRaw;
var CompositeDecorator = _draftJs2.default.CompositeDecorator;
var ContentState = _draftJs2.default.ContentState;
var Editor = _draftJs2.default.Editor;
var EditorState = _draftJs2.default.EditorState;
var Entity = _draftJs2.default.Entity;
var Modifier = _draftJs2.default.Modifier;
var DraftEntity = _draftJs2.default.DraftEntity;


var rawContent = {
    blocks: [{
        text: 'This is an "immutable" entity: Superman. Deleting any ' + 'characters will delete the entire entity. Adding characters ' + 'will remove the entity from the range.',
        type: 'unstyled',
        entityRanges: []
    }],

    entityMap: {
        dataElement: {
            type: 'TOKEN',
            mutability: 'IMMUTABLE'
        }
    }
};

var EntityEditorExample = function (_React$Component) {
    _inherits(EntityEditorExample, _React$Component);

    function EntityEditorExample(props) {
        _classCallCheck(this, EntityEditorExample);

        var _this = _possibleConstructorReturn(this, (EntityEditorExample.__proto__ || Object.getPrototypeOf(EntityEditorExample)).call(this, props));

        var blocks = convertFromRaw(rawContent);

        _this.state = {
            editorState: EditorState.createWithContent(ContentState.createFromBlockArray(blocks), decorator)
        };

        _this.focus = function () {
            return _this.refs.editor.focus();
        };
        _this.onChange = function (editorState) {
            return _this.setState({ editorState: editorState });
        };
        _this.logState = function () {
            var content = _this.state.editorState.getCurrentContent();
            console.log(convertToRaw(content));
        };

        _this.addEntity = function () {

            var currentState = _this.state.editorState.getCurrentContent();
            var newCurrentState = Modifier.insertText(currentState, _this.state.editorState.getSelection(), _this.state.dataElementName, undefined, Entity.create('dataElement', 'IMMUTABLE'));

            _this.setState({
                editorState: EditorState.createWithContent(newCurrentState, decorator)
            });
        };

        _this.setName = function (event) {
            _this.setState({
                dataElementName: event.currentTarget.value
            });
        };
        return _this;
    }

    _createClass(EntityEditorExample, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { style: styles.root },
                _react2.default.createElement(
                    'div',
                    { style: styles.editor, onClick: this.focus },
                    _react2.default.createElement(Editor, {
                        editorState: this.state.editorState,
                        onChange: this.onChange,
                        placeholder: 'Your formulae goes here...',
                        ref: 'editor'
                    })
                ),
                _react2.default.createElement('input', {
                    onClick: this.logState,
                    style: styles.button,
                    type: 'button',
                    value: 'Log State'
                }),
                _react2.default.createElement('input', { type: 'text', onChange: this.setName }),
                _react2.default.createElement(
                    'button',
                    { onClick: this.addEntity },
                    'Add Tag with "Mark"'
                )
            );
        }
    }]);

    return EntityEditorExample;
}(_react2.default.Component);

exports.default = EntityEditorExample;


function getEntityStrategy(mutability) {
    return function (contentBlock, callback) {
        contentBlock.findEntityRanges(function (character) {
            var entityKey = character.getEntity();
            if (entityKey === null) {
                return false;
            }
            return Entity.get(entityKey).getMutability() === mutability;
        }, callback);
    };
}

function getDecoratedStyle(mutability) {
    switch (mutability) {
        case 'IMMUTABLE':
            return styles.immutable;
        case 'MUTABLE':
            return styles.mutable;
        case 'SEGMENTED':
            return styles.segmented;
        default:
            return null;
    }
}

var TokenSpan = function TokenSpan(props) {
    console.log(Entity.get(props.entityKey));

    var style = getDecoratedStyle(Entity.get(props.entityKey).getMutability());
    return _react2.default.createElement(
        'span',
        _extends({}, props, { style: style }),
        props.children
    );
};

var decorator = new CompositeDecorator([{
    strategy: getEntityStrategy('IMMUTABLE'),
    component: TokenSpan
}, {
    strategy: getEntityStrategy('MUTABLE'),
    component: TokenSpan
}, {
    strategy: getEntityStrategy('SEGMENTED'),
    component: TokenSpan
}]);

var styles = {
    root: {
        fontFamily: '\'Helvetica\', sans-serif',
        padding: 20,
        width: 600
    },
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10
    },
    button: {
        marginTop: 10,
        textAlign: 'center'
    },
    immutable: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: '2px 0'
    },
    mutable: {
        backgroundColor: 'rgba(204, 204, 255, 1.0)',
        padding: '2px 0'
    },
    segmented: {
        backgroundColor: 'rgba(248, 222, 126, 1.0)',
        padding: '2px 0'
    }
};

function FormulaEditor(props, context) {
    return _react2.default.createElement(
        'div',
        null,
        'Formula Editor here'
    );
}

// export default FormulaEditor;