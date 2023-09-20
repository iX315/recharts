"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicks = exports.getNumberIntervalTicks = exports.getEveryNThTick = void 0;
var lodash_1 = __importDefault(require("lodash"));
var DataUtils_1 = require("../util/DataUtils");
var DOMUtils_1 = require("../util/DOMUtils");
var Global_1 = require("../util/Global");
var getEveryNthWithCondition_1 = require("../util/getEveryNthWithCondition");
var CartesianUtils_1 = require("../util/CartesianUtils");
function getEveryNThTick(ticks) {
    var N = 1;
    var previous = getEveryNthWithCondition_1.getEveryNthWithCondition(ticks, N, function (tickItem) { return tickItem.isShow; });
    while (N <= ticks.length) {
        if (previous !== undefined) {
            return previous;
        }
        N++;
        previous = getEveryNthWithCondition_1.getEveryNthWithCondition(ticks, N, function (tickItem) { return tickItem.isShow; });
    }
    return ticks.slice(0, 1);
}
exports.getEveryNThTick = getEveryNThTick;
function getNumberIntervalTicks(ticks, interval) {
    return getEveryNthWithCondition_1.getEveryNthWithCondition(ticks, interval + 1);
}
exports.getNumberIntervalTicks = getNumberIntervalTicks;
function getAngledTickWidth(contentSize, unitSize, angle) {
    var size = { width: contentSize.width + unitSize.width, height: contentSize.height + unitSize.height };
    return CartesianUtils_1.getAngledRectangleWidth(size, angle);
}
function getTicksEnd(_a) {
    var angle = _a.angle, ticks = _a.ticks, tickFormatter = _a.tickFormatter, viewBox = _a.viewBox, orientation = _a.orientation, minTickGap = _a.minTickGap, unit = _a.unit, fontSize = _a.fontSize, letterSpacing = _a.letterSpacing;
    var x = viewBox.x, y = viewBox.y, width = viewBox.width, height = viewBox.height;
    var sizeKey = orientation === 'top' || orientation === 'bottom' ? 'width' : 'height';
    var unitSize = unit && sizeKey === 'width' ? DOMUtils_1.getStringSize(unit, { fontSize: fontSize, letterSpacing: letterSpacing }) : { width: 0, height: 0 };
    var result = (ticks || []).slice();
    var len = result.length;
    var sign = len >= 2 ? DataUtils_1.mathSign(result[1].coordinate - result[0].coordinate) : 1;
    var start, end;
    if (sign === 1) {
        start = sizeKey === 'width' ? x : y;
        end = sizeKey === 'width' ? x + width : y + height;
    }
    else {
        start = sizeKey === 'width' ? x + width : y + height;
        end = sizeKey === 'width' ? x : y;
    }
    for (var i = len - 1; i >= 0; i--) {
        var entry = result[i];
        var content = lodash_1.default.isFunction(tickFormatter) ? tickFormatter(entry.value, len - i - 1) : entry.value;
        var size = sizeKey === 'width'
            ? getAngledTickWidth(DOMUtils_1.getStringSize(content, { fontSize: fontSize, letterSpacing: letterSpacing }), unitSize, angle)
            : DOMUtils_1.getStringSize(content, { fontSize: fontSize, letterSpacing: letterSpacing })[sizeKey];
        if (i === len - 1) {
            var gap = sign * (entry.coordinate + (sign * size) / 2 - end);
            result[i] = entry = __assign(__assign({}, entry), { tickCoord: gap > 0 ? entry.coordinate - gap * sign : entry.coordinate });
        }
        else {
            result[i] = entry = __assign(__assign({}, entry), { tickCoord: entry.coordinate });
        }
        var isShow = sign * (entry.tickCoord - (sign * size) / 2 - start) >= 0 &&
            sign * (entry.tickCoord + (sign * size) / 2 - end) <= 0;
        if (isShow) {
            end = entry.tickCoord - sign * (size / 2 + minTickGap);
            result[i] = __assign(__assign({}, entry), { isShow: true });
        }
    }
    return result;
}
function getTicksStart(_a, preserveEnd) {
    var angle = _a.angle, ticks = _a.ticks, tickFormatter = _a.tickFormatter, viewBox = _a.viewBox, orientation = _a.orientation, minTickGap = _a.minTickGap, unit = _a.unit, fontSize = _a.fontSize, letterSpacing = _a.letterSpacing;
    var x = viewBox.x, y = viewBox.y, width = viewBox.width, height = viewBox.height;
    var sizeKey = orientation === 'top' || orientation === 'bottom' ? 'width' : 'height';
    var result = (ticks || []).slice();
    var unitSize = unit && sizeKey === 'width' ? DOMUtils_1.getStringSize(unit, { fontSize: fontSize, letterSpacing: letterSpacing }) : { width: 0, height: 0 };
    var len = result.length;
    var sign = len >= 2 ? DataUtils_1.mathSign(result[1].coordinate - result[0].coordinate) : 1;
    var start, end;
    if (sign === 1) {
        start = sizeKey === 'width' ? x : y;
        end = sizeKey === 'width' ? x + width : y + height;
    }
    else {
        start = sizeKey === 'width' ? x + width : y + height;
        end = sizeKey === 'width' ? x : y;
    }
    if (preserveEnd) {
        var tail = ticks[len - 1];
        var tailContent = lodash_1.default.isFunction(tickFormatter) ? tickFormatter(tail.value, len - 1) : tail.value;
        var tailSize = sizeKey === 'width'
            ? getAngledTickWidth(DOMUtils_1.getStringSize(tailContent, { fontSize: fontSize, letterSpacing: letterSpacing }), unitSize, angle)
            : DOMUtils_1.getStringSize(tailContent, { fontSize: fontSize, letterSpacing: letterSpacing })[sizeKey];
        var tailGap = sign * (tail.coordinate + (sign * tailSize) / 2 - end);
        result[len - 1] = tail = __assign(__assign({}, tail), { tickCoord: tailGap > 0 ? tail.coordinate - tailGap * sign : tail.coordinate });
        var isTailShow = sign * (tail.tickCoord - (sign * tailSize) / 2 - start) >= 0 &&
            sign * (tail.tickCoord + (sign * tailSize) / 2 - end) <= 0;
        if (isTailShow) {
            end = tail.tickCoord - sign * (tailSize / 2 + minTickGap);
            result[len - 1] = __assign(__assign({}, tail), { isShow: true });
        }
    }
    var count = preserveEnd ? len - 1 : len;
    for (var i = 0; i < count; i++) {
        var entry = result[i];
        var content = lodash_1.default.isFunction(tickFormatter) ? tickFormatter(entry.value, i) : entry.value;
        var size = sizeKey === 'width'
            ? getAngledTickWidth(DOMUtils_1.getStringSize(content, { fontSize: fontSize, letterSpacing: letterSpacing }), unitSize, angle)
            : DOMUtils_1.getStringSize(content, { fontSize: fontSize, letterSpacing: letterSpacing })[sizeKey];
        if (i === 0) {
            var gap = sign * (entry.coordinate - (sign * size) / 2 - start);
            result[i] = entry = __assign(__assign({}, entry), { tickCoord: gap < 0 ? entry.coordinate - gap * sign : entry.coordinate });
        }
        else {
            result[i] = entry = __assign(__assign({}, entry), { tickCoord: entry.coordinate });
        }
        var isShow = sign * (entry.tickCoord - (sign * size) / 2 - start) >= 0 &&
            sign * (entry.tickCoord + (sign * size) / 2 - end) <= 0;
        if (isShow) {
            start = entry.tickCoord + sign * (size / 2 + minTickGap);
            result[i] = __assign(__assign({}, entry), { isShow: true });
        }
    }
    return result;
}
function getTicks(props, fontSize, letterSpacing) {
    var tick = props.tick, ticks = props.ticks, viewBox = props.viewBox, minTickGap = props.minTickGap, orientation = props.orientation, interval = props.interval, tickFormatter = props.tickFormatter, unit = props.unit, angle = props.angle;
    if (!ticks || !ticks.length || !tick) {
        return [];
    }
    if (DataUtils_1.isNumber(interval) || Global_1.Global.isSsr) {
        return getNumberIntervalTicks(ticks, typeof interval === 'number' && DataUtils_1.isNumber(interval) ? interval : 0);
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
            letterSpacing: letterSpacing,
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
            letterSpacing: letterSpacing,
        }, interval === 'preserveStartEnd');
    }
    else {
        candidates = getTicksEnd({
            angle: angle,
            ticks: ticks,
            tickFormatter: tickFormatter,
            viewBox: viewBox,
            orientation: orientation,
            minTickGap: minTickGap,
            unit: unit,
            fontSize: fontSize,
            letterSpacing: letterSpacing,
        });
    }
    return candidates.filter(function (entry) { return entry.isShow; });
}
exports.getTicks = getTicks;
//# sourceMappingURL=getTicks.js.map