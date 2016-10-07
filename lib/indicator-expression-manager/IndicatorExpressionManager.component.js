'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ExpressionDescription = require('./ExpressionDescription.component');

var _ExpressionDescription2 = _interopRequireDefault(_ExpressionDescription);

var _ExpressionOperators = require('./ExpressionOperators.component');

var _ExpressionOperators2 = _interopRequireDefault(_ExpressionOperators);

var _ExpressionFormula = require('./ExpressionFormula.component');

var _ExpressionFormula2 = _interopRequireDefault(_ExpressionFormula);

var _DataElementOperandSelector = require('./DataElementOperandSelector.component');

var _DataElementOperandSelector2 = _interopRequireDefault(_DataElementOperandSelector);

var _Tabs = require('material-ui/Tabs/Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _Tab = require('material-ui/Tabs/Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _Paper = require('material-ui/Paper/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _d = require('d2/lib/d2');

var _ProgramOperandSelector = require('./ProgramOperandSelector');

var _ProgramOperandSelector2 = _interopRequireDefault(_ProgramOperandSelector);

var _Heading = require('../headings/Heading.component');

var _Heading2 = _interopRequireDefault(_Heading);

var _OrganisationUnitGroupSelector = require('./OrganisationUnitGroupSelector.component');

var _OrganisationUnitGroupSelector2 = _interopRequireDefault(_OrganisationUnitGroupSelector);

var _ConstantSelector = require('./ConstantSelector.component');

var _ConstantSelector2 = _interopRequireDefault(_ConstantSelector);

var _addD2Context = require('../component-helpers/addD2Context');

var _addD2Context2 = _interopRequireDefault(_addD2Context);

var _Action = require('../action/Action');

var _Action2 = _interopRequireDefault(_Action);

var _rx = require('rx');

var _layout = require('../layout');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_d.config.i18n.strings.add('data_elements');
_d.config.i18n.strings.add('description');
_d.config.i18n.strings.add('organisation_unit_counts');
_d.config.i18n.strings.add('program_tracked_entity_attributes');
_d.config.i18n.strings.add('program_indicators');
_d.config.i18n.strings.add('program_data_elements');
_d.config.i18n.strings.add('constants');
_d.config.i18n.strings.add('this_field_is_required');
_d.config.i18n.strings.add('programs');

var styles = {
    expressionDescription: {
        padding: '1rem',
        margin: '1rem 0'
    },

    expressionMessage: {
        valid: {
            padding: '1rem',
            color: '#006400'
        },
        invalid: {
            padding: '1rem',
            color: '#8B0000'
        }
    },

    list: {
        width: '100%',
        outline: 'none',
        border: 'none',
        padding: '0rem 1rem'
    },

    expressionFormulaWrap: {
        padding: '1rem',
        maxWidth: '650px',
        marginRight: '1rem'
    },

    expressionValueOptionsWrap: {
        minHeight: 395
    }
};

var IndicatorExpressionManager = function (_Component) {
    _inherits(IndicatorExpressionManager, _Component);

    function IndicatorExpressionManager(props, context) {
        _classCallCheck(this, IndicatorExpressionManager);

        var _this = _possibleConstructorReturn(this, (IndicatorExpressionManager.__proto__ || Object.getPrototypeOf(IndicatorExpressionManager)).call(this, props, context));

        _this.descriptionChange = function (newDescription) {
            _this.setState({
                description: newDescription
            }, function () {
                _this.props.indicatorExpressionChanged({
                    formula: _this.state.formula,
                    description: _this.state.description,
                    expressionStatus: _this.state.expressionStatus
                });
            });
        };

        _this.formulaChange = function (newFormula) {
            _this.setState({
                formula: newFormula
            }, function () {
                _this.requestExpressionStatus();
            });
        };

        _this.addOperatorToFormula = function (operator) {
            _this.appendToFormula(operator);
        };

        _this.programOperandSelected = function (programFormulaPart) {
            _this.appendToFormula(programFormulaPart);
        };

        _this.appendToFormula = function (partToAppend) {
            _this.setState({
                formula: [_this.state.formula, partToAppend].join('')
            }, function () {
                _this.requestExpressionStatus();
            });
        };

        _this.dataElementOperandSelected = function (dataElementOperandId) {
            var dataElementOperandFormula = ['#{', dataElementOperandId, '}'].join('');

            _this.appendToFormula(dataElementOperandFormula);
        };

        _this.requestExpressionStatus = function () {
            _this.requestExpressionStatusAction(_this.state.formula);
        };

        _this.state = {
            formula: _this.props.formulaValue,
            description: _this.props.descriptionValue,
            expressionStatus: {
                description: '',
                isValid: false
            }
        };

        _this.i18n = _this.context.d2.i18n;
        _this.requestExpressionStatusAction = _Action2.default.create('requestExpressionStatus');
        return _this;
    }

    _createClass(IndicatorExpressionManager, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            if (!this.props.expressionStatusStore) {
                return true;
            }

            var first = true;

            this.disposable = this.props.expressionStatusStore.subscribe(function (expressionStatus) {
                _this2.setState({
                    expressionStatus: {
                        description: expressionStatus.description,
                        isValid: expressionStatus.status === 'OK',
                        message: expressionStatus.message
                    }
                }, function () {
                    if (first) {
                        first = false;
                        return;
                    }

                    _this2.props.indicatorExpressionChanged({
                        formula: _this2.state.formula,
                        description: _this2.state.description,
                        expressionStatus: _this2.state.expressionStatus
                    });
                });
            }, function (error) {
                return _loglevel2.default.error(error);
            });

            this.expressionStatusDisposable = this.requestExpressionStatusAction.throttle(500).map(function (action) {
                var formula = action.data;
                var url = 'expressions/description?expression=' + formula;

                return _rx.Observable.fromPromise(_this2.context.d2.Api.getApi().get(url));
            }).concatAll().subscribe(function (response) {
                return _this2.props.expressionStatusStore.setState(response);
            }, function (error) {
                return _loglevel2.default.error(error);
            });

            if (this.props.formulaValue.trim()) {
                this.requestExpressionStatus();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.disposable && this.disposable.dispose();
            this.expressionStatusDisposable && this.expressionStatusDisposable.dispose();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var isDescriptionValid = function isDescriptionValid() {
                return _this3.state.description && _this3.state.description.trim();
            };

            return _react2.default.createElement(
                _layout.Column,
                null,
                _react2.default.createElement(_Heading2.default, { level: 3, text: this.props.titleText }),
                _react2.default.createElement(
                    _layout.Row,
                    null,
                    _react2.default.createElement(
                        _Paper2.default,
                        { style: styles.expressionFormulaWrap },
                        _react2.default.createElement(
                            _layout.Column,
                            null,
                            _react2.default.createElement(_ExpressionDescription2.default, {
                                descriptionValue: this.state.description,
                                descriptionLabel: this.i18n.getTranslation('description'),
                                onDescriptionChange: this.descriptionChange,
                                errorText: !isDescriptionValid() ? this.i18n.getTranslation('this_field_is_required') : undefined,
                                onBlur: this.requestExpressionStatus
                            }),
                            _react2.default.createElement(_ExpressionFormula2.default, {
                                onFormulaChange: this.formulaChange,
                                formula: this.state.formula
                            }),
                            _react2.default.createElement(_ExpressionOperators2.default, { operatorClicked: this.addOperatorToFormula })
                        )
                    ),
                    _react2.default.createElement(
                        _Paper2.default,
                        { style: styles.expressionValueOptionsWrap },
                        _react2.default.createElement(
                            _Tabs2.default,
                            null,
                            _react2.default.createElement(
                                _Tab2.default,
                                { label: this.i18n.getTranslation('data_elements') },
                                _react2.default.createElement(_DataElementOperandSelector2.default, {
                                    listStyle: styles.list,
                                    onItemDoubleClick: this.dataElementOperandSelected
                                })
                            ),
                            _react2.default.createElement(
                                _Tab2.default,
                                { label: this.i18n.getTranslation('programs') },
                                _react2.default.createElement(_ProgramOperandSelector2.default, { programOperandSelected: this.programOperandSelected })
                            ),
                            _react2.default.createElement(
                                _Tab2.default,
                                { label: this.i18n.getTranslation('organisation_unit_counts') },
                                _react2.default.createElement(_OrganisationUnitGroupSelector2.default, {
                                    listStyle: styles.list,
                                    onSelect: this.appendToFormula
                                })
                            ),
                            _react2.default.createElement(
                                _Tab2.default,
                                { label: this.i18n.getTranslation('constants') },
                                _react2.default.createElement(_ConstantSelector2.default, {
                                    listStyle: styles.list,
                                    onSelect: this.appendToFormula
                                })
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    _layout.Column,
                    null,
                    _react2.default.createElement(
                        _Paper2.default,
                        { style: styles.expressionDescription },
                        this.state.expressionStatus.description
                    ),
                    _react2.default.createElement(
                        'div',
                        {
                            style: this.state.expressionStatus.isValid ? styles.expressionMessage.valid : styles.expressionMessage.invalid
                        },
                        this.state.expressionStatus.message
                    )
                )
            );
        }
    }]);

    return IndicatorExpressionManager;
}(_react.Component);

IndicatorExpressionManager.propTypes = {
    descriptionLabel: _react.PropTypes.string.isRequired,
    expressionStatusStore: _react.PropTypes.object.isRequired,
    indicatorExpressionChanged: _react.PropTypes.func.isRequired,
    descriptionValue: _react.PropTypes.string.isRequired,
    formulaValue: _react.PropTypes.string.isRequired,
    titleText: _react.PropTypes.string.isRequired
};

exports.default = (0, _addD2Context2.default)(IndicatorExpressionManager);