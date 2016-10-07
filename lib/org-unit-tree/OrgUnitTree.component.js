'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LinearProgress = require('material-ui/LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

var _Model = require('d2/lib/model/Model');

var _Model2 = _interopRequireDefault(_Model);

var _TreeView = require('../tree-view/TreeView.component');

var _TreeView2 = _interopRequireDefault(_TreeView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
    progress: {
        position: 'absolute',
        display: 'inline-block',
        width: '100%',
        left: -8
    },
    progressBar: {
        height: 2,
        backgroundColor: 'transparent'
    },
    spacer: {
        position: 'relative',
        display: 'inline-block',
        width: '1.2rem',
        height: '1rem'
    },
    label: {
        display: 'inline-block'
    }
};

var OrgUnitTree = function (_React$Component) {
    _inherits(OrgUnitTree, _React$Component);

    function OrgUnitTree(props) {
        _classCallCheck(this, OrgUnitTree);

        var _this = _possibleConstructorReturn(this, (OrgUnitTree.__proto__ || Object.getPrototypeOf(OrgUnitTree)).call(this, props));

        _this.state = {
            children: props.root.children === false || Array.isArray(props.root.children) && props.root.children.length === 0 ? [] : undefined,
            loading: false
        };
        if (props.root.children && !Array.isArray(props.root.children.toArray) && typeof props.root.children.toArray === 'function') {
            _this.state.children = props.root.children.toArray()
            // Sort here since the API returns nested children in random order
            .sort(function (a, b) {
                return a.displayName.localeCompare(b.displayName);
            });
        }

        _this.loadChildren = _this.loadChildren.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }

    _createClass(OrgUnitTree, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.initiallyExpanded === this.props.root.id || this.props.initiallyExpanded.indexOf(this.props.root.id) >= 0) {
                this.loadChildren();
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            if (newProps.initiallyExpanded === newProps.root.id || newProps.initiallyExpanded.indexOf(newProps.root.id) >= 0 || newProps.idsThatShouldBeReloaded.indexOf(newProps.root.id) >= 0) {
                this.loadChildren();
            }
        }
    }, {
        key: 'loadChildren',
        value: function loadChildren() {
            var _this2 = this;

            if (this.state.children === undefined && !this.state.loading || this.props.idsThatShouldBeReloaded.indexOf(this.props.root.id) >= 0) {
                this.setState({ loading: true });

                var root = this.props.root;
                root.modelDefinition.get(root.id, {
                    fields: 'children[id,displayName,children::isNotEmpty,path,parent]'
                }).then(function (unit) {
                    _this2.setState({ children: unit.children.toArray(), loading: false });
                });
            }
        }
    }, {
        key: 'handleClick',
        value: function handleClick(e) {
            if (this.props.onClick) {
                this.props.onClick(e, this.props.root);
            }
            e.stopPropagation();
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            var _this3 = this;

            // If initiallyExpanded is an array, remove the current root id from it
            // If it's a string, pass it on unless it's the current root id
            var expandedProp = Array.isArray(this.props.initiallyExpanded) ? this.props.initiallyExpanded.filter(function (id) {
                return id !== _this3.props.root.id;
            }) : this.props.initiallyExpanded !== this.props.root.id && this.props.initiallyExpanded || [];

            if (Array.isArray(this.state.children) && this.state.children.length > 0) {
                return this.state.children.map(function (orgUnit) {
                    return _react2.default.createElement(OrgUnitTree, {
                        key: orgUnit.id,
                        root: orgUnit,
                        selected: _this3.props.selected,
                        initiallyExpanded: expandedProp,
                        onClick: _this3.props.onClick,
                        labelStyle: _this3.props.labelStyle,
                        selectedLabelStyle: _this3.props.selectedLabelStyle,
                        arrowSymbol: _this3.props.arrowSymbol,
                        emitModel: _this3.props.emitModel,
                        idsThatShouldBeReloaded: _this3.props.idsThatShouldBeReloaded
                    });
                });
            }

            if (this.state.loading || true) {
                return _react2.default.createElement(
                    'div',
                    { style: styles.progress },
                    _react2.default.createElement(_LinearProgress2.default, { style: styles.progressBar })
                );
            }

            return null;
        }
    }, {
        key: 'render',
        value: function render() {
            var root = this.props.root;

            var isClickable = !!this.props.onClick;
            var isSelected = this.props.selected === root.id || this.props.selected.indexOf(root.id) >= 0;
            var initiallyExpanded = this.props.initiallyExpanded === root.id || this.props.initiallyExpanded.indexOf(root.id) >= 0;

            var labelStyle = Object.assign({}, styles.label, {
                fontWeight: isSelected ? 700 : 300,
                color: isSelected ? 'orange' : 'inherit',
                cursor: isClickable ? 'pointer' : 'inherit'
            }, isSelected ? this.props.selectedLabelStyle : this.props.labelStyle);
            var label = _react2.default.createElement(
                'div',
                { style: labelStyle, onClick: isClickable && this.handleClick },
                root.displayName
            );

            if (this.state.children === undefined || Array.isArray(this.state.children) && this.state.children.length > 0) {
                return _react2.default.createElement(
                    _TreeView2.default,
                    {
                        label: label,
                        onExpand: this.loadChildren,
                        persistent: true,
                        initiallyExpanded: initiallyExpanded,
                        arrowSymbol: this.props.arrowSymbol
                    },
                    this.renderChildren()
                );
            }

            return _react2.default.createElement(
                'div',
                { onClick: this.handleClick },
                _react2.default.createElement('div', { style: styles.spacer }),
                label
            );
        }
    }]);

    return OrgUnitTree;
}(_react2.default.Component);

OrgUnitTree.propTypes = {
    /**
     * The root OrganisationUnit of the tree
     *
     * If the root OU is known to have no children, the `children` property of the root OU should be either
     * `false` or an empty array. If the children property is undefined, the children will be fetched from
     * the server when the tree is expanded.
     */
    root: _react2.default.PropTypes.instanceOf(_Model2.default).isRequired,

    /**
     * An array of IDs of selected OUs
     */
    selected: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string), _react2.default.PropTypes.string]),

    /**
     * An array of IDs of OUs that will be expanded automatically as soon as they are encountered
     *
     * Note that only IDs that are actually encountered during rendering are expanded. If you wish to expand
     * the tree until a specific OU, the IDs of all parent OUs of that OU will have to be included in the
     * initiallyExpanded array as well.
     */
    initiallyExpanded: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string), _react2.default.PropTypes.string]),

    /**
     * onClick callback, which is triggered when the label of an OU is clicked
     *
     * The onClick callback will receive two arguments: The original click event, and an object containing
     * the displayName and id of the OU that was clicked.
     */
    onClick: _react2.default.PropTypes.func,

    /**
     * Custom styling for OU labels
     */
    labelStyle: _react2.default.PropTypes.object,
    /**
     * Custom styling for the labels of selected OUs
     */
    selectedLabelStyle: _react2.default.PropTypes.object,
    /**
     * Custom arrow symbol
     */
    arrowSymbol: _react2.default.PropTypes.string,
    emitModel: _react2.default.PropTypes.bool
};

OrgUnitTree.defaultProps = {
    selected: [],
    initiallyExpanded: [],
    labelStyle: {},
    selectedLabelStyle: {},
    idsThatShouldBeReloaded: []
};

exports.default = OrgUnitTree;