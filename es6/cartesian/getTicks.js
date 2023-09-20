import _isFunction from "lodash/isFunction";
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { mathSign, isNumber } from '../util/DataUtils';
import { getStringSize } from '../util/DOMUtils';
import { Global } from '../util/Global';
import { getEveryNthWithCondition } from '../util/getEveryNthWithCondition';
import { getAngledRectangleWidth } from '../util/CartesianUtils';

/**
 * Given an array of ticks, find N, the lowest possible number for which every
 * nTH tick in the ticks array isShow == true and return the array of every nTh tick.
 * @param {CartesianTickItem[]} ticks An array of CartesianTickItem with the
 * information whether they can be shown without overlapping with their neighbour isShow.
 * @returns {CartesianTickItem[]} Every nTh tick in an array.
 */
export function getEveryNThTick(ticks) {
  var N = 1;
  var previous = getEveryNthWithCondition(ticks, N, function (tickItem) {
    return tickItem.isShow;
  });
  while (N <= ticks.length) {
    if (previous !== undefined) {
      return previous;
    }
    N++;
    previous = getEveryNthWithCondition(ticks, N, function (tickItem) {
      return tickItem.isShow;
    });
  }
  return ticks.slice(0, 1);
}
export function getNumberIntervalTicks(ticks, interval) {
  return getEveryNthWithCondition(ticks, interval + 1);
}
function getAngledTickWidth(contentSize, unitSize, angle) {
  var size = {
    width: contentSize.width + unitSize.width,
    height: contentSize.height + unitSize.height
  };
  return getAngledRectangleWidth(size, angle);
}
function getTicksEnd(_ref) {
  var angle = _ref.angle,
    ticks = _ref.ticks,
    tickFormatter = _ref.tickFormatter,
    viewBox = _ref.viewBox,
    orientation = _ref.orientation,
    minTickGap = _ref.minTickGap,
    unit = _ref.unit,
    fontSize = _ref.fontSize,
    letterSpacing = _ref.letterSpacing;
  var x = viewBox.x,
    y = viewBox.y,
    width = viewBox.width,
    height = viewBox.height;
  var sizeKey = orientation === 'top' || orientation === 'bottom' ? 'width' : 'height';
  // we need add the width of 'unit' only when sizeKey === 'width'
  var unitSize = unit && sizeKey === 'width' ? getStringSize(unit, {
    fontSize: fontSize,
    letterSpacing: letterSpacing
  }) : {
    width: 0,
    height: 0
  };
  var result = (ticks || []).slice();
  var len = result.length;
  var sign = len >= 2 ? mathSign(result[1].coordinate - result[0].coordinate) : 1;
  var start, end;
  if (sign === 1) {
    start = sizeKey === 'width' ? x : y;
    end = sizeKey === 'width' ? x + width : y + height;
  } else {
    start = sizeKey === 'width' ? x + width : y + height;
    end = sizeKey === 'width' ? x : y;
  }
  for (var i = len - 1; i >= 0; i--) {
    var entry = result[i];
    var content = _isFunction(tickFormatter) ? tickFormatter(entry.value, len - i - 1) : entry.value;
    // Recharts only supports angles when sizeKey === 'width'
    var size = sizeKey === 'width' ? getAngledTickWidth(getStringSize(content, {
      fontSize: fontSize,
      letterSpacing: letterSpacing
    }), unitSize, angle) : getStringSize(content, {
      fontSize: fontSize,
      letterSpacing: letterSpacing
    })[sizeKey];
    if (i === len - 1) {
      var gap = sign * (entry.coordinate + sign * size / 2 - end);
      result[i] = entry = _objectSpread(_objectSpread({}, entry), {}, {
        tickCoord: gap > 0 ? entry.coordinate - gap * sign : entry.coordinate
      });
    } else {
      result[i] = entry = _objectSpread(_objectSpread({}, entry), {}, {
        tickCoord: entry.coordinate
      });
    }
    var isShow = sign * (entry.tickCoord - sign * size / 2 - start) >= 0 && sign * (entry.tickCoord + sign * size / 2 - end) <= 0;
    if (isShow) {
      end = entry.tickCoord - sign * (size / 2 + minTickGap);
      result[i] = _objectSpread(_objectSpread({}, entry), {}, {
        isShow: true
      });
    }
  }
  return result;
}
function getTicksStart(_ref2, preserveEnd) {
  var angle = _ref2.angle,
    ticks = _ref2.ticks,
    tickFormatter = _ref2.tickFormatter,
    viewBox = _ref2.viewBox,
    orientation = _ref2.orientation,
    minTickGap = _ref2.minTickGap,
    unit = _ref2.unit,
    fontSize = _ref2.fontSize,
    letterSpacing = _ref2.letterSpacing;
  var x = viewBox.x,
    y = viewBox.y,
    width = viewBox.width,
    height = viewBox.height;
  var sizeKey = orientation === 'top' || orientation === 'bottom' ? 'width' : 'height';
  var result = (ticks || []).slice();
  // we need add the width of 'unit' only when sizeKey === 'width'
  var unitSize = unit && sizeKey === 'width' ? getStringSize(unit, {
    fontSize: fontSize,
    letterSpacing: letterSpacing
  }) : {
    width: 0,
    height: 0
  };
  var len = result.length;
  var sign = len >= 2 ? mathSign(result[1].coordinate - result[0].coordinate) : 1;
  var start, end;
  if (sign === 1) {
    start = sizeKey === 'width' ? x : y;
    end = sizeKey === 'width' ? x + width : y + height;
  } else {
    start = sizeKey === 'width' ? x + width : y + height;
    end = sizeKey === 'width' ? x : y;
  }
  if (preserveEnd) {
    // Try to guarantee the tail to be displayed
    var tail = ticks[len - 1];
    var tailContent = _isFunction(tickFormatter) ? tickFormatter(tail.value, len - 1) : tail.value;
    // Recharts only supports angles when sizeKey === 'width'
    var tailSize = sizeKey === 'width' ? getAngledTickWidth(getStringSize(tailContent, {
      fontSize: fontSize,
      letterSpacing: letterSpacing
    }), unitSize, angle) : getStringSize(tailContent, {
      fontSize: fontSize,
      letterSpacing: letterSpacing
    })[sizeKey];
    var tailGap = sign * (tail.coordinate + sign * tailSize / 2 - end);
    result[len - 1] = tail = _objectSpread(_objectSpread({}, tail), {}, {
      tickCoord: tailGap > 0 ? tail.coordinate - tailGap * sign : tail.coordinate
    });
    var isTailShow = sign * (tail.tickCoord - sign * tailSize / 2 - start) >= 0 && sign * (tail.tickCoord + sign * tailSize / 2 - end) <= 0;
    if (isTailShow) {
      end = tail.tickCoord - sign * (tailSize / 2 + minTickGap);
      result[len - 1] = _objectSpread(_objectSpread({}, tail), {}, {
        isShow: true
      });
    }
  }
  var count = preserveEnd ? len - 1 : len;
  for (var i = 0; i < count; i++) {
    var entry = result[i];
    var content = _isFunction(tickFormatter) ? tickFormatter(entry.value, i) : entry.value;
    var size = sizeKey === 'width' ? getAngledTickWidth(getStringSize(content, {
      fontSize: fontSize,
      letterSpacing: letterSpacing
    }), unitSize, angle) : getStringSize(content, {
      fontSize: fontSize,
      letterSpacing: letterSpacing
    })[sizeKey];
    if (i === 0) {
      var gap = sign * (entry.coordinate - sign * size / 2 - start);
      result[i] = entry = _objectSpread(_objectSpread({}, entry), {}, {
        tickCoord: gap < 0 ? entry.coordinate - gap * sign : entry.coordinate
      });
    } else {
      result[i] = entry = _objectSpread(_objectSpread({}, entry), {}, {
        tickCoord: entry.coordinate
      });
    }
    var isShow = sign * (entry.tickCoord - sign * size / 2 - start) >= 0 && sign * (entry.tickCoord + sign * size / 2 - end) <= 0;
    if (isShow) {
      start = entry.tickCoord + sign * (size / 2 + minTickGap);
      result[i] = _objectSpread(_objectSpread({}, entry), {}, {
        isShow: true
      });
    }
  }
  return result;
}
export function getTicks(props, fontSize, letterSpacing) {
  var tick = props.tick,
    ticks = props.ticks,
    viewBox = props.viewBox,
    minTickGap = props.minTickGap,
    orientation = props.orientation,
    interval = props.interval,
    tickFormatter = props.tickFormatter,
    unit = props.unit,
    angle = props.angle;
  if (!ticks || !ticks.length || !tick) {
    return [];
  }
  if (isNumber(interval) || Global.isSsr) {
    return getNumberIntervalTicks(ticks, typeof interval === 'number' && isNumber(interval) ? interval : 0);
  }
  var candidates = [];
  if (interval === 'equidistantPreserveStart') {
    candidates = getTicksStart({
      angle: angle,
      ticks: ticks,
      tickFormatter: tickFormatter,
      viewBox: viewBox,
      orientation: orientation,
      minTickGap: minTickGap,
      unit: unit,
      fontSize: fontSize,
      letterSpacing: letterSpacing
    });
    return getEveryNThTick(candidates);
  }
  if (interval === 'preserveStart' || interval === 'preserveStartEnd') {
    candidates = getTicksStart({
      angle: angle,
      ticks: ticks,
      tickFormatter: tickFormatter,
      viewBox: viewBox,
      orientation: orientation,
      minTickGap: minTickGap,
      unit: unit,
      fontSize: fontSize,
      letterSpacing: letterSpacing
    }, interval === 'preserveStartEnd');
  } else {
    candidates = getTicksEnd({
      angle: angle,
      ticks: ticks,
      tickFormatter: tickFormatter,
      viewBox: viewBox,
      orientation: orientation,
      minTickGap: minTickGap,
      unit: unit,
      fontSize: fontSize,
      letterSpacing: letterSpacing
    });
  }
  return candidates.filter(function (entry) {
    return entry.isShow;
  });
}