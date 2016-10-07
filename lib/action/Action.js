'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fp = require('lodash/fp');

var _rx = require('rx');

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class Action
 * @extends Rx.Subject
 *
 * @description
 * Action is an observable that can be subscribed to. When a action is executed all subscribers
 * to the action will receive a notification.
 *
 * @see https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/subjects/subject.md
 *
 */
var Action = {
    /**
     * @method create
     *
     * @param {String} [name=AnonymousAction]
     *
     * @description
     * A name can be provided that will be used to generate the Action.id Symbol identifier.
     */
    create: function create() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'AnonymousAction';

        var subject = Object.assign(function () {
            for (var _len = arguments.length, actionArgs = Array(_len), _key = 0; _key < _len; _key++) {
                actionArgs[_key] = arguments[_key];
            }

            _loglevel2.default.trace('Firing action: ' + subject.id.toString());

            return _rx.Observable.fromPromise(new Promise(function (resolve, reject) {
                subject.onNext({
                    // Pass one argument if there is just one else pass the arguments as an array
                    data: actionArgs.length === 1 ? actionArgs[0] : [].concat(actionArgs),
                    // Callback to complete the action
                    complete: function complete() {
                        resolve.apply(undefined, arguments);
                        _loglevel2.default.trace('Completed action: ' + subject.id.toString());
                    },
                    // Callback to error the action
                    error: function error() {
                        reject.apply(undefined, arguments);
                        _loglevel2.default.debug('Errored action: ' + subject.id.toString());
                    }
                });
            }));
        }, _rx.Observable.prototype, _rx.Subject.prototype);

        Object.defineProperty(subject, 'id', { value: Symbol(name) });

        _rx.Subject.call(subject);

        return subject;
    },


    /**
     * @method createActionsFromNames
     *
     * @param {String[]} [actionNames=[]] Names of the actions to create.
     * @param {String} [prefix] Prefix to prepend to all the action identifiers.
     *
     * @returns {{}}
     *
     * @description
     * Returns an object with the given names as keys and instanced of the Action class as actions.
     */
    createActionsFromNames: function createActionsFromNames() {
        var _this = this;

        var actionNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        var actions = {};
        var actionPrefix = prefix;

        if (prefix && (0, _fp.isString)(prefix)) {
            actionPrefix = prefix + '.';
        } else {
            actionPrefix = '';
        }

        actionNames.forEach(function (actionName) {
            actions[actionName] = _this.create(actionPrefix + actionName);
        });

        return actions;
    }
};

exports.default = Action;