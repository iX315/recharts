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
exports.Curve = void 0;
var react_1 = __importDefault(require("react"));
var d3_shape_1 = require("victory-vendor/d3-shape");
var classnames_1 = __importDefault(require("classnames"));
var lodash_1 = __importDefault(require("lodash"));
var types_1 = require("../util/types");
var ReactUtils_1 = require("../util/ReactUtils");
var DataUtils_1 = require("../util/DataUtils");
var CURVE_FACTORIES = {
    curveBasisClosed: d3_shape_1.curveBasisClosed,
    curveBasisOpen: d3_shape_1.curveBasisOpen,
    curveBasis: d3_shape_1.curveBasis,
    curveBumpX: d3_shape_1.curveBumpX,
    curveBumpY: d3_shape_1.curveBumpY,
    curveLinearClosed: d3_shape_1.curveLinearClosed,
    curveLinear: d3_shape_1.curveLinear,
    curveMonotoneX: d3_shape_1.curveMonotoneX,
    curveMonotoneY: d3_shape_1.curveMonotoneY,
    curveNatural: d3_shape_1.curveNatural,
    curveStep: d3_shape_1.curveStep,
    curveStepAfter: d3_shape_1.curveStepAfter,
    curveStepBefore: d3_shape_1.curveStepBefore,
};
var defined = function (p) { return p.x === +p.x && p.y === +p.y; };
var getX = function (p) { return p.x; };
var getY = function (p) { return p.y; };
var getCurveFactory = function (type, layout) {
    if (lodash_1.default.isFunction(type)) {
        return type;
    }
    var name = "curve" + lodash_1.default.upperFirst(type);
    if ((name === 'curveMonotone' || name === 'curveBump') && layout) {
        return CURVE_FACTORIES["" + name + (layout === 'vertical' ? 'Y' : 'X')];
    }
    return CURVE_FACTORIES[name] || d3_shape_1.curveLinear;
};
var getPath = function (_a) {
    var _b = _a.type, type = _b === void 0 ? 'linear' : _b, _c = _a.points, points = _c === void 0 ? [] : _c, baseLine = _a.baseLine, layout = _a.layout, _d = _a.connectNulls, connectNulls = _d === void 0 ? false : _d;
    var curveFactory = getCurveFactory(type, layout);
    var formatPoints = connectNulls ? points.filter(function (entry) { return defined(entry); }) : points;
    var lineFunction;
    if (lodash_1.default.isArray(baseLine)) {
        var formatBaseLine_1 = connectNulls ? baseLine.filter(function (base) { return defined(base); }) : baseLine;
        var areaPoints = formatPoints.map(function (entry, index) { return (__assign(__assign({}, entry), { base: formatBaseLine_1[index] })); });
        if (layout === 'vertical') {
            lineFunction = d3_shape_1.area()
                .y(getY)
                .x1(getX)
                .x0(function (d) { return d.base.x; });
        }
        else {
            lineFunction = d3_shape_1.area()
                .x(getX)
                .y1(getY)
                .y0(function (d) { return d.base.y; });
        }
        lineFunction.defined(defined).curve(curveFactory);
        return lineFunction(areaPoints);
    }
    if (layout === 'vertical' && DataUtils_1.isNumber(baseLine)) {
        lineFunction = d3_shape_1.area().y(getY).x1(getX).x0(baseLine);
    }
    else if (DataUtils_1.isNumber(baseLine)) {
        lineFunction = d3_shape_1.area().x(getX).y1(getY).y0(baseLine);
    }
    else {
        lineFunction = d3_shape_1.line().x(getX).y(getY);
    }
    lineFunction.defined(defined).curve(curveFactory);
    return lineFunction(formatPoints);
};
var Curve = function (props) {
    var className = props.className, points = props.points, path = props.path, pathRef = props.pathRef;
    if ((!points || !points.length) && !path) {
        return null;
    }
    var realPath = points && points.length ? getPath(props) : path;
    return (react_1.default.createElement("path", __assign({}, ReactUtils_1.filterProps(props), types_1.adaptEventHandlers(props), { className: classnames_1.default('recharts-curve', className), d: realPath, ref: pathRef })));
};
exports.Curve = Curve;
//# sourceMappingURL=Curve.js.map