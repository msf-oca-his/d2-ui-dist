'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleKeyPress = exports.searchStore$ = exports.search = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.setSearchValue = setSearchValue;
exports.setHovering = setHovering;
exports.setSearchFieldFocusTo = setSearchFieldFocusTo;
exports.hideWhenNotHovering = hideWhenNotHovering;

var _headerBar = require('../headerBar.store');

var _headerBar2 = _interopRequireDefault(_headerBar);

var _Action = require('../../action/Action');

var _Action2 = _interopRequireDefault(_Action);

var _Store = require('../../store/Store');

var _Store2 = _interopRequireDefault(_Store);

var _rx = require('rx');

var _maintenanceApp = require('./sources/maintenance-app');

var _maintenanceApp2 = _interopRequireDefault(_maintenanceApp);

var _settingsApp = require('./sources/settings-app');

var _settingsApp2 = _interopRequireDefault(_settingsApp);

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _fp = require('lodash/fp');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchResultBoxStateStore$ = _Store2.default.create({
    getInitialState: function getInitialState() {
        return {
            isSearchFieldFocused: false,
            open: false,
            searchValue: '',
            selected: 0,
            searchResults: []
        };
    }
});

var getParentApp = (0, _fp.get)('parentApp');
var hasParentApp = function hasParentApp(item) {
    return !!getParentApp(item);
};
var uniqueByName = (0, _fp.uniqBy)(function (item) {
    return item.name;
});
var filterByValue = (0, _fp.curry)(function (searchTerms, item) {
    return searchTerms.every(function (term) {
        return item.label.toLowerCase().includes(term);
    });
});
var isFullApp = function isFullApp(item) {
    return !hasParentApp(item);
};
var isNotAFullApp = function isNotAFullApp(item) {
    return !isFullApp(item);
};
// Only allow deep links for apps for which the user has access to the parentApp
var hasAvailableFullApp = (0, _fp.curry)(function (fullApps, item) {
    return fullApps.some(function (app) {
        return app.name === item.parentApp;
    });
});

function setSearchValue(searchValue) {
    var matchesSearchValue = filterByValue(searchValue.trim().toLowerCase().split(/\s+/));

    searchSourceStore$.take(1).subscribe(function (searchResults) {
        var fullApps = searchResults.filter(isFullApp);
        var fullAppsThatMatchSearchString = fullApps.filter(matchesSearchValue);
        var deepLinksThatMatchSearchString = searchResults.filter(matchesSearchValue).filter(isNotAFullApp).filter(hasAvailableFullApp(fullApps));

        // Determine which parent apps we need to show at the end of the list.
        // When we have deep links in the search results we should also shown their parent app.
        var parentAppsForMatchedItems = fullApps.filter(function (item) {
            return deepLinksThatMatchSearchString.map(getParentApp).some(function (parentApp) {
                return parentApp === item.name;
            });
        });

        // Combine all results
        // - Full applications that match the search string
        // - Deep links that match the search string
        // - Full apps for deep links that match the search string
        // As it might be possible that Full apps are in the results twice we only show the first one
        // by running the result list through unique by name.
        var allSearchResults = uniqueByName([].concat(fullAppsThatMatchSearchString, deepLinksThatMatchSearchString, parentAppsForMatchedItems));

        searchResultBoxStateStore$.setState(_extends({}, searchResultBoxStateStore$.getState(), {
            searchResults: allSearchResults,
            searchValue: searchValue
        }));
    });
}

function setHovering(isHoveringOverResults) {
    searchResultBoxStateStore$.setState(_extends({}, searchResultBoxStateStore$.getState(), {
        isHoveringOverResults: isHoveringOverResults
    }));
}

function setSearchFieldFocusTo(value) {
    searchResultBoxStateStore$.setState(_extends({}, searchResultBoxStateStore$.getState(), {
        isSearchFieldFocused: value
    }));
}

function setSelectedIndex(selected) {
    var numberOfItems = searchResultBoxStateStore$.getState().searchResults.length;

    if (searchResultBoxStateStore$.getState().selected + selected >= numberOfItems) {
        return;
    }

    if (searchResultBoxStateStore$.getState().selected + selected < 0) {
        return;
    }

    searchResultBoxStateStore$.setState(_extends({}, searchResultBoxStateStore$.getState(), {
        selected: searchResultBoxStateStore$.getState().selected + selected
    }));
}

function hideWhenNotHovering() {
    if (searchResultBoxStateStore$.getState() && !searchResultBoxStateStore$.getState().isHoveringOverResults) {
        setSearchFieldFocusTo(false);
    }
}

var search = exports.search = _Action2.default.create('Search Apps');
search.map(function (action) {
    return action.data || '';
}).subscribe(setSearchValue);

var searchSourceStore$ = _headerBar2.default.map(function (headerBarState) {
    return [].concat(headerBarState.appItems, headerBarState.profileItems);
}).flatMap(_maintenanceApp2.default).flatMap(_settingsApp2.default);

var searchStore$ = exports.searchStore$ = _rx.Observable.combineLatest(searchResultBoxStateStore$, _headerBar.appsMenuItems$, function (searchResult, appsMenuItems) {
    if (!searchResult.searchValue) {
        return _extends({}, searchResult, {
            searchResults: appsMenuItems
        });
    }

    return searchResult;
}).map(function (resultState) {
    return _extends({}, resultState, {
        searchResults: resultState.searchResults.map(function (item, index) {
            return Object.assign({}, item, { selected: resultState.selected === index });
        }),
        open: Boolean(resultState.isSearchFieldFocused)
    });
});

var handleKeyPress = exports.handleKeyPress = _Action2.default.create();
var keyPress$ = handleKeyPress.map(function (action) {
    return action.data;
});

// Handle an enter key press to go the location of the first item
keyPress$.filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1);

    var event = _ref2[0];
    return event.keyCode === 13 || event.key === 'Enter';
}).flatMap(function () {
    return searchResultBoxStateStore$.take(1);
})
// Find the selected menu item in the search results list by the `selected` index
.map(function (state) {
    return state.searchResults.find(function (item, index) {
        return index === state.selected;
    });
}).filter(_rx.helpers.identity).subscribe(function (itemToGoTo) {
    return window.location = itemToGoTo.action;
}, _loglevel2.default.error);

// When the right arrow is pressed move the selected item to the next one
keyPress$.map(function (actionData) {
    return actionData[0];
}).filter(function (event) {
    return event.keyCode === 39 || event.key === 'ArrowRight';
}).subscribe(function (event) {
    return setSelectedIndex(1);
});

// When the left arrow is pressed move the selected item to the next one
keyPress$.map(function (actionData) {
    return actionData[0];
}).filter(function (event) {
    return event.keyCode === 37 || event.key === 'ArrowLeft';
}).subscribe(function () {
    return setSelectedIndex(-1);
});

// When the left arrow is pressed move the selected item to the next row
keyPress$.filter(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2);

    var event = _ref4[0];
    var itemsOnRow = _ref4[1];
    return event.keyCode === 38 || event.key === 'ArrowUp';
}).subscribe(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2);

    var _ = _ref6[0];
    var itemsOnRow = _ref6[1];
    return setSelectedIndex(-itemsOnRow);
});

// When the left arrow is pressed move the selected item to the previous row
keyPress$.filter(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2);

    var event = _ref8[0];
    var itemsOnRow = _ref8[1];
    return event.keyCode === 40 || event.key === 'ArrowDown';
}).subscribe(function (_ref9) {
    var _ref10 = _slicedToArray(_ref9, 2);

    var _ = _ref10[0];
    var itemsOnRow = _ref10[1];
    return setSelectedIndex(itemsOnRow);
});