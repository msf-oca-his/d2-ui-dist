'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.appsMenuSource$ = exports.profileSource$ = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _rx = require('rx');

var _d = require('d2/lib/d2');

var _getBaseUrlFromD2ApiUrl = require('./getBaseUrlFromD2ApiUrl');

var _getBaseUrlFromD2ApiUrl2 = _interopRequireDefault(_getBaseUrlFromD2ApiUrl);

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Profile menu
_d.config.i18n.strings.add('settings');
_d.config.i18n.strings.add('profile');
_d.config.i18n.strings.add('account');
_d.config.i18n.strings.add('help');
_d.config.i18n.strings.add('log_out');
_d.config.i18n.strings.add('about_dhis2');

var profileMenuData = [{
    name: 'settings',
    namespace: '/dhis-web-user-profile',
    defaultAction: '/dhis-web-user-profile/#/settings',
    icon: '/icons/usersettings.png',
    description: ''
}, {
    name: 'profile',
    namespace: '/dhis-web-user-profile',
    defaultAction: '/dhis-web-user-profile/#/profile',
    icon: '/icons/function-profile.png',
    description: ''
}, {
    name: 'account',
    namespace: '/dhis-web-user-profile',
    defaultAction: '/dhis-web-user-profile/#/account',
    icon: '/icons/function-account.png',
    description: ''
}, {
    name: 'help',
    namespace: '/dhis-web-commons-about',
    defaultAction: 'https://dhis2.github.io/dhis2-docs/master/en/user/html/dhis2_user_manual_en.html',
    icon: '/icons/function-account.png',
    description: ''
}, {
    name: 'about_dhis2',
    namespace: '/dhis-web-commons-about',
    defaultAction: '/dhis-web-commons-about/about.action',
    icon: '/icons/function-about-dhis2.png',
    description: ''
}];

function addHelpLinkToProfileData() {
    return (0, _d.getInstance)().then(function (d2) {
        return d2.system.settings.get('helpPageLink');
    })
    // When the request for the system setting fails we return false to not set the help link
    .catch(function () {
        return false;
    }).then(function (helpPageLink) {
        return profileMenuData.map(function (profileMenuItem) {
            // Override the defaultAction with the helpPageLink when one was found.
            if (helpPageLink && profileMenuItem.name === 'help') {
                return Object.assign({}, profileMenuItem, { defaultAction: helpPageLink });
            }

            return profileMenuItem;
        });
    });
}

var profileSource$ = exports.profileSource$ = _rx.Observable.fromPromise(addHelpLinkToProfileData(profileMenuData));

// TODO: Remove this when we have proper support for `displayName` from the getModules.action.
function getTranslationsForMenuItems(_ref) {
    var modules = _ref.modules;

    return (0, _d.getInstance)().then(function (d2) {
        var api = d2.Api.getApi();

        var moduleNames = modules.map(function (module) {
            return module.name;
        });

        return api.post('i18n', moduleNames);
    }).then(function (translations) {
        var translatedModules = modules.map(function (module) {
            return Object.assign(_extends({}, module), { displayName: translations[module.name] || module.name });
        });

        return { modules: translatedModules };
    }).catch(function () {
        _loglevel2.default.warn('Could not load translations for modules, defaulting back to English');

        return { modules: modules };
    });
}

/**
 * Module management is available though the More Apps button. We therefore do not display it in the menu as a separate item.
 *
 * @param modules
 * @returns {{modules: [module]}}
 */
function removeMenuManagementModule(_ref2) {
    var modules = _ref2.modules;

    return {
        modules: modules.filter(function (module) {
            return module.name !== 'dhis-web-menu-management';
        })
    };
}

function loadMenuItems() {
    return (0, _d.getInstance)().then(function (d2) {
        var api = d2.Api.getApi();
        var baseUrl = (0, _getBaseUrlFromD2ApiUrl2.default)(d2);

        // This path is only correct when the manifest has '..' as the baseUrl and a versioned api endpoint is used
        // TODO: This should have a proper API endpoint
        return api.get(baseUrl + '/dhis-web-commons/menu/getModules.action');
    }).then(getTranslationsForMenuItems).then(removeMenuManagementModule).then(function (_ref3) {
        var modules = _ref3.modules;
        return modules;
    });
}

var appsMenuSource$ = exports.appsMenuSource$ = _rx.Observable.fromPromise(loadMenuItems()).catch(_rx.Observable.just([]));