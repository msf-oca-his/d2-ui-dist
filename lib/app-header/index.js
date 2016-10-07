var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import { render } from 'react-dom';
import { init } from 'd2/lib/d2';
import HeaderBar from './HeaderBar';
import withStateFrom from '../component-helpers/withStateFrom';
import headerBarStore$ from './headerBar.store';
import D2UIApp from '../app/D2UIApp';

function getBaseUrl(predefLocation) {
    if (predefLocation) {
        return predefLocation;
    }

    return '../api';
}

export function initHeaderBar(domElement, apiLocation) {
    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { noSchemas: true };

    var baseUrl = getBaseUrl(apiLocation);
    var noLoadingIndicator = config.noLoadingIndicator;

    var d2ConfigKeys = _objectWithoutProperties(config, ['noLoadingIndicator']);

    var d2Config = _extends({}, d2ConfigKeys, {
        baseUrl: baseUrl
    });

    // Mock d2 for offline header-bar
    var d2Context = {
        currentUser: { userSettings: {} },
        i18n: {
            getTranslation: function getTranslation(v) {
                return v;
            }
        }
    };

    var HeaderBarWithState = withStateFrom(headerBarStore$, HeaderBar);

    var HeaderBarWithContext = React.createClass({
        displayName: 'HeaderBarWithContext',

        childContextTypes: {
            d2: React.PropTypes.object
        },

        getChildContext: function getChildContext() {
            return {
                d2: d2Context
            };
        },
        render: function render() {
            return React.createElement(
                D2UIApp,
                null,
                React.createElement(HeaderBarWithState, { noLoadingIndicator: noLoadingIndicator })
            );
        }
    });

    return init(d2Config).then(function (d2) {
        d2Context = d2;

        render(React.createElement(HeaderBarWithContext, null), domElement);
        return Promise.resolve();
    }, function (err) {
        render(React.createElement(HeaderBarWithContext, null), domElement);
        return Promise.reject(err);
    });
}

export default initHeaderBar;