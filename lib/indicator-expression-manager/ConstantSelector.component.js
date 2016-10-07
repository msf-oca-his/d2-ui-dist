'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ListSelectWithLocalSearch = require('../list-select/ListSelectWithLocalSearch.component');

var _ListSelectWithLocalSearch2 = _interopRequireDefault(_ListSelectWithLocalSearch);

var _withPropsFromObservable = require('../component-helpers/withPropsFromObservable');

var _withPropsFromObservable2 = _interopRequireDefault(_withPropsFromObservable);

var _dataHelpers = require('../data-helpers');

var _rx = require('rx');

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var constantSelectorProps$ = _rx.Observable.fromPromise((0, _dataHelpers.getAllObjectsWithFields)('constant')).map(function (constants) {
    return {
        source: constants.map(function (model) {
            return { value: model.id, label: model.displayName };
        }),
        onItemDoubleClick: function onItemDoubleClick(value) {
            var constFormula = ['C{', value, '}'].join('');

            // `this` is the react component props object
            if ((0, _lodash.isFunction)(this.onSelect)) {
                this.onSelect(constFormula);
            }
        }
    };
});

exports.default = (0, _withPropsFromObservable2.default)(constantSelectorProps$, _ListSelectWithLocalSearch2.default);