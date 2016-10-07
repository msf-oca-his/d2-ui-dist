'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// This file is copied from the maintenance app
// https://github.com/dhis2/maintenance-app/blob/master/src/config/maintenance-models.js


exports.default = addDeepLinksForMaintenance;

var _fp = require('lodash/fp');

var _rx = require('rx');

var _headerBar = require('../../headerBar.store');

var _d2 = require('d2/lib/d2');

var _camelCaseToUnderscores = require('d2-utilizr/lib/camelCaseToUnderscores');

var _camelCaseToUnderscores2 = _interopRequireDefault(_camelCaseToUnderscores);

var _maintenanceModels = require('./maintenance-app/maintenance-models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var maintenanceSections = (0, _maintenanceModels.getSideBarConfig)();

function addToTranslationConfig(modelName) {
    _d2.config.i18n.strings.add(modelName);
}

(0, _fp.map)(addToTranslationConfig, (0, _fp.map)(_camelCaseToUnderscores2.default, (0, _fp.flatten)((0, _fp.map)('items', maintenanceSections))));

var getMenuItemsFromModelName = (0, _fp.curry)(function (section, modelName) {
    return {
        name: (0, _camelCaseToUnderscores2.default)(modelName),
        defaultAction: '/dhis-web-maintenance/#/list/' + section + '/' + modelName,
        icon: '/icons/dhis-web-maintenance.png',
        description: '',
        parentApp: 'dhis-web-maintenance'
    };
});

var toKeyValueArray = function toKeyValueArray(obj) {
    return Object.keys(obj).map(function (key) {
        return [key, obj[key]];
    });
};

var filterOutEmptyValueLists = function filterOutEmptyValueLists(_ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var key = _ref2[0];
    var value = _ref2[1];
    return value.length;
};
var getMapOfModelsPerSection = (0, _fp.mapValues)('items', maintenanceSections);
var sectionsWithModels = (0, _fp.filter)(filterOutEmptyValueLists, toKeyValueArray(getMapOfModelsPerSection));
var getMenuItemConfigsForSection = function getMenuItemConfigsForSection(_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2);

    var section = _ref4[0];
    var models = _ref4[1];
    return (0, _fp.map)(getMenuItemsFromModelName(section), models);
};
var createAppsListForMenu = (0, _fp.compose)(_fp.flatten, (0, _fp.map)(getMenuItemConfigsForSection));

// Replace this with a proper source for there values
function addDeepLinksForMaintenance(apps) {
    var maintenanceDeepLinks$ = _rx.Observable.just(createAppsListForMenu(sectionsWithModels));

    return _rx.Observable.combineLatest(_headerBar.translate$, maintenanceDeepLinks$, _headerBar.translateMenuItemNames).flatMap(function (items) {
        return _rx.Observable.fromPromise((0, _d2.getInstance)().then(function (d2) {
            return (0, _headerBar.prepareMenuItems)((0, _headerBar.getBaseUrlFromD2)(d2), items);
        }));
    }).map(function (maintenanceItems) {
        return [].concat(apps, maintenanceItems);
    });
}