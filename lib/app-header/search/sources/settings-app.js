'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = addDeepLinksForSettings;

var _map = require('lodash/fp/map');

var _map2 = _interopRequireDefault(_map);

var _rx = require('rx');

var _getBaseUrlFromD2ApiUrl = require('../../getBaseUrlFromD2ApiUrl');

var _getBaseUrlFromD2ApiUrl2 = _interopRequireDefault(_getBaseUrlFromD2ApiUrl);

var _headerBar = require('../../headerBar.store');

var _d = require('d2/lib/d2');

var _settingsCategories = require('./settings-app/settingsCategories');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addTranslationLabel(label) {
    _d.config.i18n.strings.add(label);
}

// Register labels of settings categories for translation


// These files are copied from the settings app
// https://github.com/dhis2/settings-app/blob/master/src/settingsCategories.js
(0, _map2.default)(addTranslationLabel, Object.keys(_settingsCategories.categories).map(function (categoryName) {
    return _settingsCategories.categories[categoryName].pageLabel;
}));

var getMenuItemForCategory = function getMenuItemForCategory(categoryKey) {
    return {
        name: _settingsCategories.categories[categoryKey].pageLabel,
        defaultAction: '/dhis-web-settings/#/' + categoryKey,
        icon: '/icons/dhis-web-settings.png',
        description: '',
        parentApp: 'dhis-web-settings'
    };
};

var settingsCategoryItemMap = Object.keys(_settingsCategories.categories).map(getMenuItemForCategory);

function addDeepLinksForSettings(headerBarMenuItems) {
    var settingsItems$ = _rx.Observable.just(settingsCategoryItemMap);

    return _rx.Observable.combineLatest(_headerBar.translate$, settingsItems$, _headerBar.translateMenuItemNames).flatMap(function (items) {
        return _rx.Observable.fromPromise((0, _d.getInstance)().then(function (d2) {
            return (0, _headerBar.prepareMenuItems)((0, _getBaseUrlFromD2ApiUrl2.default)(d2), items);
        }));
    }).map(function (settingsMenuItems) {
        return [].concat(headerBarMenuItems, settingsMenuItems);
    });
}