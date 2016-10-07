'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.appsMenuItems$ = exports.prepareMenuItems = exports.getBaseUrlFromD2 = exports.translate$ = undefined;
exports.translateMenuItemNames = translateMenuItemNames;

var _d = require('d2/lib/d2');

var _fp = require('lodash/fp');

var _settings = require('./settings/settings.store');

var _settings2 = _interopRequireDefault(_settings);

var _menuSources = require('./menu-sources');

var _rx = require('rx');

var _getBaseUrlFromD2ApiUrl = require('./getBaseUrlFromD2ApiUrl');

var _getBaseUrlFromD2ApiUrl2 = _interopRequireDefault(_getBaseUrlFromD2ApiUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var translate = (0, _fp.curry)(function translate(d2, key) {
    return d2.i18n.getTranslation(key);
});

var d2Offline = { currentUser: { userSettings: {} } };
var d2$ = _rx.Observable.fromPromise((0, _d.getInstance)()).catch(_rx.Observable.just(d2Offline));
var currentUser$ = d2$.map((0, _fp.get)('currentUser'));

var translate$ = exports.translate$ = _rx.Observable.combineLatest(d2$, _rx.Observable.just(translate), function (d2, translateFn) {
    return translateFn(d2);
});

function translateMenuItemNames(trans, items) {
    return items.map(function (item) {
        return Object.assign({}, item, { name: trans(item.name) });
    });
}

var removePrefix = function removePrefix(word) {
    return word.replace(/^\.\./, '');
};
var isAbsoluteUrl = function isAbsoluteUrl(url) {
    return (/^(?:https?:)?\/\//.test(url)
    );
};
var getBaseUrlFromD2 = exports.getBaseUrlFromD2 = _getBaseUrlFromD2ApiUrl2.default;

var addBaseUrlWhenNotAnAbsoluteUrl = (0, _fp.curry)(function (baseUrl, url) {
    return isAbsoluteUrl(url) ? url : baseUrl + removePrefix(url);
});
var getIconUrl = function getIconUrl(item) {
    return item.icon || '/icons/program.png';
};
var adjustIconUrl = (0, _fp.curry)(function (baseUrl, item) {
    return Object.assign({}, item, { icon: addBaseUrlWhenNotAnAbsoluteUrl(baseUrl, getIconUrl(item)) });
});
var adjustDefaultActionUrl = (0, _fp.curry)(function (baseUrl, item) {
    return Object.assign({}, item, { action: addBaseUrlWhenNotAnAbsoluteUrl(baseUrl, item.defaultAction) });
});
var adjustMenuItemsUrls = function adjustMenuItemsUrls(baseUrl) {
    return (0, _fp.compose)(adjustIconUrl(baseUrl), adjustDefaultActionUrl(baseUrl));
};
var getLabelFromName = function getLabelFromName(item) {
    return Object.assign({}, item, { label: item.displayName || item.name });
};
var extractMenuProps = (0, _fp.pick)(['action', 'icon', 'description', 'label', 'name', 'parentApp']);
var prepareMenuItem = function prepareMenuItem(baseUrl) {
    return (0, _fp.compose)(extractMenuProps, adjustMenuItemsUrls(baseUrl), getLabelFromName);
};
var prepareMenuItems = exports.prepareMenuItems = function prepareMenuItems(baseUrl, items) {
    return (0, _fp.map)(prepareMenuItem(baseUrl), items);
};

var profileMenuItems$ = _rx.Observable.combineLatest(translate$, _menuSources.profileSource$, translateMenuItemNames).combineLatest(d2$, function (items, d2) {
    return { items: items, d2: d2 };
}).map(function (_ref) {
    var items = _ref.items;
    var d2 = _ref.d2;
    return prepareMenuItems(getBaseUrlFromD2(d2), items);
}).catch(_rx.Observable.just([]));

var appsMenuItems$ = exports.appsMenuItems$ = _menuSources.appsMenuSource$.combineLatest(d2$, function (items, d2) {
    return { items: items, d2: d2 };
}).map(function (_ref2) {
    var items = _ref2.items;
    var d2 = _ref2.d2;
    return prepareMenuItems(getBaseUrlFromD2(d2), items);
}).catch(_rx.Observable.just([]));

var headerBarStore$ = _rx.Observable.combineLatest(appsMenuItems$, profileMenuItems$, currentUser$, _settings2.default, function (appItems, profileItems, currentUser, settings) {
    return { appItems: appItems, profileItems: profileItems, currentUser: currentUser, settings: settings };
});

exports.default = headerBarStore$;