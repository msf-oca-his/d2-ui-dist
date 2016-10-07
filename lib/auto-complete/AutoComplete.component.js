'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Action = require('../action/Action');

var _Action2 = _interopRequireDefault(_Action);

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _d = require('d2/lib/d2');

var _d2 = _interopRequireDefault(_d);

var _List = require('material-ui/List/List');

var _List2 = _interopRequireDefault(_List);

var _ListItem = require('material-ui/List/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Translate = require('../i18n/Translate.mixin');

var _Translate2 = _interopRequireDefault(_Translate);

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

_d.config.i18n.strings.add('members');
_d.config.i18n.strings.add('search_for_user_groups');

function searchByForModel(searchBy, modelTypeToSearch, valueToSearchFor) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    if (!Boolean(modelTypeToSearch) || !Boolean(valueToSearchFor)) {
        _loglevel2.default.warn('forType property and value should be provided to be able to show results');

        return _rx.Observable.just([]);
    }

    var searchQueryRequest = _d2.default.getInstance().then(function (d2) {
        return d2.models[modelTypeToSearch];
    }).then(function (modelType) {
        return modelType.filter().on(searchBy).ilike(valueToSearchFor);
    }).then(function (modelTypeWithFilter) {
        return modelTypeWithFilter.list(options);
    }).then(function (collection) {
        return collection.toArray();
    }).catch(function (error) {
        return _loglevel2.default.error(error);
    });

    return _rx.Observable.fromPromise(searchQueryRequest);
}

var AutoComplete = (0, _react.createClass)({
    propTypes: {
        actions: _react.PropTypes.object,
        forType: _react.PropTypes.string.isRequired,
        onSuggestionClicked: _react.PropTypes.func.isRequired,
        closeOnItemClicked: _react.PropTypes.bool,
        clearValueOnItemClicked: _react.PropTypes.bool,
        filterForSuggestions: _react.PropTypes.func
    },

    mixins: [_Translate2.default],

    getDefaultProps: function getDefaultProps() {
        return {
            actions: _Action2.default.createActionsFromNames(['loadAutoCompleteSuggestions']),
            debounceTime: 500,
            propertyToSearchBy: 'displayName',
            scheduler: _rx.Scheduler.default,
            closeOnItemClicked: true,
            clearValueOnItemClicked: true
        };
    },

    //
    getInitialState: function getInitialState() {
        return {
            showAutoComplete: false,
            autoCompleteValues: [],
            loadingSuggestions: false
        };
    },
    componentWillMount: function componentWillMount() {
        var _this = this;

        var _props = this.props;
        var actions = _props.actions;
        var forType = _props.forType;

        var searchValue = void 0;

        this.disposable = actions.loadAutoCompleteSuggestions.map(function (_ref) {
            var args = _ref.data;
            return args[1];
        }).tap(function (value) {
            searchValue = value;
            _this.setState({
                loadingSuggestions: true,
                showAutoComplete: Boolean(value),
                value: searchValue
            });
        }).debounce(this.props.debounceTime, this.props.scheduler).distinctUntilChanged()
        // TODO: Do not hardcore these fields to search for
        .map(function (valueToSearchFor) {
            return searchByForModel(_this.props.propertyToSearchBy, forType, valueToSearchFor, { fields: 'id,displayName|rename(name),users::size', pageSize: 10 });
        }).concatAll().map(function (suggestions) {
            return Array.isArray(suggestions) ? suggestions.filter(_this.props.filterForSuggestions || _rx.helpers.identity) : [];
        }).map(function (suggestions) {
            return suggestions.slice(0, 5);
        }).subscribe(function (autoCompleteValues) {
            return _this.setState({
                autoCompleteValues: autoCompleteValues,
                loadingSuggestions: false,
                value: searchValue
            });
        }, function (errorMessage) {
            return _loglevel2.default.error(errorMessage);
        });
    },
    componentWillUnmount: function componentWillUnmount() {
        this.disposable && this.disposable.dispose();
    },
    onSuggestionClick: function onSuggestionClick(item) {
        var _this2 = this;

        return function (event) {
            var _props2 = _this2.props;
            var closeOnItemClicked = _props2.closeOnItemClicked;
            var clearValueOnItemClicked = _props2.clearValueOnItemClicked;
            var onSuggestionClicked = _props2.onSuggestionClicked;


            if (closeOnItemClicked) {
                _this2.refs.autoCompleteField.focus();
            }

            if (clearValueOnItemClicked) {
                _this2.props.actions.loadAutoCompleteSuggestions({
                    target: { value: '' }
                });
            }

            _this2.setState({
                showAutoComplete: !closeOnItemClicked,
                value: clearValueOnItemClicked ? '' : _this2.state.value
            });

            if (onSuggestionClicked) {
                onSuggestionClicked(item, event);
            }
        };
    },


    // TODO: Allow the component user to specify how to render the list items or at least the primary and secondary texts
    renderAutoCompleteSuggestions: function renderAutoCompleteSuggestions() {
        var _this3 = this;

        return _react2.default.createElement(
            'div',
            { style: { position: 'absolute', zIndex: 100 } },
            _react2.default.createElement(
                _Paper2.default,
                null,
                _react2.default.createElement(
                    _List2.default,
                    null,
                    this.state.autoCompleteValues.map(function (userGroup) {
                        return _react2.default.createElement(_ListItem2.default, {
                            primaryText: userGroup.name,
                            secondaryText: userGroup.users + ' ' + _this3.getTranslation('members'),
                            innerDivStyle: { paddingTop: '.5rem', paddingBottom: '.5rem' },
                            onClick: _this3.onSuggestionClick(userGroup)
                        });
                    })
                )
            )
        );
    },
    render: function render() {
        var _props3 = this.props;
        var actions = _props3.actions;
        var forType = _props3.forType;

        var other = _objectWithoutProperties(_props3, ['actions', 'forType']);

        return _react2.default.createElement(
            'div',
            { style: { position: 'relative' }, onClick: function onClick(event) {
                    return event.stopPropagation();
                } },
            _react2.default.createElement(_TextField2.default, _extends({
                ref: 'autoCompleteField' }, other, {
                onChange: actions.loadAutoCompleteSuggestions,
                hintText: this.getTranslation('search_for_user_groups'),
                value: this.state.value,
                fullWidth: true
            })),
            this.state.showAutoComplete && !this.state.loadingSuggestions ? this.renderAutoCompleteSuggestions() : null
        );
    }
});

exports.default = AutoComplete;