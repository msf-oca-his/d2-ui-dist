'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createFlexContainer = require('./helpers/createFlexContainer');

var _createFlexContainer2 = _interopRequireDefault(_createFlexContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultRowStyle = { flexDirection: 'row', justifyContent: 'space-between' };

exports.default = (0, _createFlexContainer2.default)(defaultRowStyle, 'Row');