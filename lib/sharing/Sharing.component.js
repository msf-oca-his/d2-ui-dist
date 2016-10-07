'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Heading = require('../headings/Heading.component');

var _Heading2 = _interopRequireDefault(_Heading);

var _CreatedBy = require('./CreatedBy.component');

var _CreatedBy2 = _interopRequireDefault(_CreatedBy);

var _ExternalAccess = require('./ExternalAccess.component');

var _ExternalAccess2 = _interopRequireDefault(_ExternalAccess);

var _PublicAccess = require('./PublicAccess.component');

var _PublicAccess2 = _interopRequireDefault(_PublicAccess);

var _sharing = require('./sharing.actions');

var _sharing2 = _interopRequireDefault(_sharing);

var _sharing3 = require('./sharing.store');

var _sharing4 = _interopRequireDefault(_sharing3);

var _UserGroupAccesses = require('./UserGroupAccesses.component');

var _UserGroupAccesses2 = _interopRequireDefault(_UserGroupAccesses);

var _LoadingMask = require('../loading-mask/LoadingMask.component');

var _LoadingMask2 = _interopRequireDefault(_LoadingMask);

var _AutoComplete = require('../auto-complete/AutoComplete.component');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

var _d = require('d2/lib/d2');

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_d.config.i18n.strings.add('external_access');
_d.config.i18n.strings.add('public_access');

function noop() {}

exports.default = (0, _react.createClass)({
    propTypes: {
        objectToShare: _react.PropTypes.shape({
            name: _react.PropTypes.string.isRequired,
            user: _react.PropTypes.object.isRequired
        }).isRequired
    },

    getInitialState: function getInitialState() {
        return {
            objectToShare: null
        };
    },
    componentWillMount: function componentWillMount() {
        var _this = this;

        _sharing2.default.loadObjectSharingState(this.props.objectToShare).subscribe(noop, function (error) {
            _loglevel2.default.error(error.message);
        });

        this.disposable = _sharing4.default.subscribe(function (newState) {
            _this.setState({
                objectToShare: newState
            });
        });
    },
    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        _sharing2.default.loadObjectSharingState(newProps.objectToShare);
    },
    componentWillUnmount: function componentWillUnmount() {
        this.disposable && this.disposable.dispose();
    },
    render: function render() {
        var _this2 = this;

        var loadingMaskStyle = {
            position: 'relative'
        };

        if (!this.state.objectToShare) {
            return _react2.default.createElement(_LoadingMask2.default, { style: loadingMaskStyle, size: 1 });
        }

        function doesNotContainItemWithId() {
            var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            return function checkForItemWithId() {
                var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                return collection.every(function (item) {
                    return item.id !== object.id;
                });
            };
        }

        var canSetExternalAccess = function canSetExternalAccess() {
            return Boolean(_this2.state.objectToShare.meta && _this2.state.objectToShare.meta.allowExternalAccess);
        };

        var canSetPublicAccess = function canSetPublicAccess() {
            return Boolean(_this2.state.objectToShare.meta && _this2.state.objectToShare.meta.allowPublicAccess);
        };

        // TODO: Is it true that the user should not be able to see externalAccess when he/she can not set it?
        var getExternalAccessValue = function getExternalAccessValue() {
            if (canSetExternalAccess()) {
                return _this2.state.objectToShare.externalAccess;
            }
            return false;
        };

        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_Heading2.default, { text: this.props.objectToShare.name, level: 2 }),
            _react2.default.createElement(_CreatedBy2.default, { user: this.state.objectToShare.user }),
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_AutoComplete2.default, { forType: 'userGroup',
                    onSuggestionClicked: this.addUserGroup,
                    filterForSuggestions: doesNotContainItemWithId(this.state.objectToShare.userGroupAccesses)
                })
            ),
            _react2.default.createElement(_ExternalAccess2.default, { disabled: !canSetExternalAccess(), externalAccess: getExternalAccessValue(), onChange: this.updatedExternalAccess }),
            _react2.default.createElement(_PublicAccess2.default, { disabled: !canSetPublicAccess(), publicAccess: this.state.objectToShare.publicAccess, onChange: this.updatePublicAccess }),
            _react2.default.createElement(_UserGroupAccesses2.default, { userGroupAccesses: this.state.objectToShare.userGroupAccesses, onChange: this.updateUserGroupAccesses })
        );
    },
    addUserGroup: function addUserGroup(userGroup) {
        _sharing2.default.userGroupAcessesChanged(this.state.objectToShare.userGroupAccesses.concat(userGroup));
    },
    updateUserGroupAccesses: function updateUserGroupAccesses(userGroupAccesses) {
        _sharing2.default.userGroupAcessesChanged(userGroupAccesses);
    },
    updatePublicAccess: function updatePublicAccess(publicAccessValue) {
        _sharing2.default.publicAccessChanged(publicAccessValue);
    },
    updatedExternalAccess: function updatedExternalAccess(externalAccessValue) {
        _sharing2.default.externalAccessChanged(externalAccessValue);
    }
});