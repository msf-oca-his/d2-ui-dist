'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllObjectsWithFields = getAllObjectsWithFields;

var _d = require('d2/lib/d2');

/**
 * Retrieve a list of objects from the api. Will load all objects (without paging) from the api.
 * This can be used a utility method to load all objects as options for a dropdown or similar.
 *
 * @param {String} schemaName
 * @param {String} [fields] Comma separated list of fields to be passed with the API request
 * @returns {Promise.<Array>|Promise<Array>}
 *
 * TODO: Throw more sensible error when the schemaName is not an existing schema.
 */
function getAllObjectsWithFields(schemaName) {
  var fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id,displayName';

  return (0, _d.getInstance)().then(function (d2) {
    return d2.models[schemaName].list({ paging: false, fields: fields });
  }).then(function (collection) {
    return collection.toArray();
  });
}