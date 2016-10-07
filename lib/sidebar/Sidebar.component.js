'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _List = require('material-ui/List/List');

var _List2 = _interopRequireDefault(_List);

var _ListItem = require('material-ui/List/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _FontIcon = require('material-ui/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    container: {
        padding: '16px 32px 0 24px',
        position: 'relative',
        flex: 1
    },
    closeButton: {
        position: 'absolute',
        cursor: 'pointer',
        top: '2rem',
        right: '.75rem',
        fontSize: '1rem',
        color: '#AAA'
    },
    list: {
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: 'transparent',
        marginTop: 16
    },
    item: {
        fontSize: 14,
        borderRadius: 5,
        margin: '0 8px'
    },
    activeItem: {
        fontSize: 14,
        fontWeight: 700,
        color: '#2196f3',
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        margin: '0 8px'
    },
    sidebar: {
        backgroundColor: '#f3f3f3',
        overflowY: 'auto',
        width: 295
    }
};

var Sidebar = _react2.default.createClass({
    displayName: 'Sidebar',

    propTypes: {
        sections: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
            key: _react2.default.PropTypes.string,
            label: _react2.default.PropTypes.string,
            icon: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element])
        })).isRequired,
        currentSection: _react2.default.PropTypes.string,
        onChangeSection: _react2.default.PropTypes.func.isRequired,
        onSectionClick: _react2.default.PropTypes.func,
        showSearchField: _react2.default.PropTypes.bool,
        searchFieldLabel: _react2.default.PropTypes.string,
        onChangeSearchText: _react2.default.PropTypes.func,
        sideBarButtons: _react2.default.PropTypes.element,
        styles: _react2.default.PropTypes.shape({
            leftBar: _react2.default.PropTypes.object
        })
    },

    contextTypes: {
        d2: _react2.default.PropTypes.object,
        muiTheme: _react2.default.PropTypes.object
    },

    getDefaultProps: function getDefaultProps() {
        return {
            showSearchField: false,
            styles: {
                leftBar: {}
            },
            onSectionClick: function onSectionClick() {}
        };
    },
    getInitialState: function getInitialState() {
        return {
            currentSection: this.props.currentSection || this.props.sections[0] && this.props.sections[0].key,
            searchText: ''
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(props) {
        var _this = this;

        if (props.currentSection) {
            this.setState({ currentSection: props.currentSection });
        }

        if (props.searchText && props.searchText !== this.state.searchText) {
            this.setState({ searchText: props.searchText }, function () {
                _this.changeSearchText();
            });
        }
    },
    setSection: function setSection(key) {
        // TODO: Refactor as this behavior is sort of silly. The current version of the SideBar with managed state should
        // probably be a HoC and a simpler version of the header bar should be available for more dynamic scenarios.
        this.props.onSectionClick(key);

        if (key !== this.state.currentSection) {
            this.setState({ currentSection: key });
            this.props.onChangeSection(key);
        }
    },
    changeSearchText: function changeSearchText() {
        var _this2 = this;

        this.setState({ searchText: this.searchBox.getValue() }, function () {
            if (_this2.props.onChangeSearchText) {
                _this2.props.onChangeSearchText(_this2.state.searchText);
            }
        });
    },
    _clear: function _clear() {
        var _this3 = this;

        this.setState({ searchText: '' }, function () {
            if (_this3.props.onChangeSearchText) {
                _this3.props.onChangeSearchText(_this3.state.searchText);
            }
        });
    },
    clearSearchBox: function clearSearchBox() {
        this.setState({ searchText: '' });
    },
    renderSidebarButtons: function renderSidebarButtons() {
        if (this.props.sideBarButtons) {
            return _react2.default.createElement(
                'div',
                { style: { padding: '1rem 0 0' } },
                this.props.sideBarButtons
            );
        }
        return null;
    },
    renderSearchField: function renderSearchField() {
        var _this4 = this;

        var d2 = this.context.d2;

        if (this.props.showSearchField) {
            return _react2.default.createElement(
                'div',
                { style: styles.container },
                _react2.default.createElement(_TextField2.default, {
                    hintText: !!this.props.searchFieldLabel ? this.props.searchFieldLabel : d2.i18n.getTranslation('search'),
                    style: { width: '100%' },
                    value: this.state.searchText,
                    onChange: this.changeSearchText,
                    ref: function ref(_ref) {
                        _this4.searchBox = _ref;
                    }
                }),
                !!this.state.searchText ? _react2.default.createElement(
                    _FontIcon2.default,
                    { style: styles.closeButton, className: 'material-icons', onClick: this._clear },
                    'clear'
                ) : undefined
            );
        }

        return null;
    },
    renderSections: function renderSections() {
        var _this5 = this;

        return _react2.default.createElement(
            _List2.default,
            { style: styles.list },
            this.props.sections.map(function (section) {
                var listItemStyle = section.key === _this5.state.currentSection && !_this5.state.searchText ? styles.activeItem : styles.item;
                var icon = typeof section.icon === 'string' || section.icon instanceof String ? _react2.default.createElement(
                    _FontIcon2.default,
                    { className: 'material-icons' },
                    section.icon
                ) : section.icon;

                return _react2.default.createElement(_ListItem2.default, {
                    key: section.key,
                    primaryText: section.label,
                    onClick: _this5.setSection.bind(_this5, section.key),
                    style: listItemStyle,
                    leftIcon: icon
                });
            })
        );
    },
    render: function render() {
        return _react2.default.createElement(
            'div',
            { style: Object.assign(styles.sidebar, this.props.styles.leftBar), className: 'left-bar' },
            this.renderSidebarButtons(),
            this.renderSearchField(),
            this.renderSections()
        );
    }
});

exports.default = Sidebar;