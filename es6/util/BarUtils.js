import _isFunction from "lodash/isFunction";
var _excluded = ["option"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { isValidElement, cloneElement } from 'react';
import { Bar } from '../cartesian/Bar';
import { Layer } from '../container/Layer';
export var ActiveBar = function ActiveBar(_ref) {
  var option = _ref.option,
    props = _objectWithoutProperties(_ref, _excluded);
  var bar;
  if ( /*#__PURE__*/isValidElement(option)) {
    bar = /*#__PURE__*/cloneElement(option, props);
  } else if (_isFunction(option)) {
    bar = option(props);
  } else {
    bar = Bar.renderRectangle(props.shape, props);
  }
  return /*#__PURE__*/React.createElement(Layer, {
    className: "recharts-active-bar",
    key: props.key
  }, bar);
};