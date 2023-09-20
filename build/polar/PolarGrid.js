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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolarGrid = void 0;
var react_1 = __importDefault(require("react"));
var PolarUtils_1 = require("../util/PolarUtils");
var ReactUtils_1 = require("../util/ReactUtils");
var getPolygonPath = function (radius, cx, cy, polarAngles) {
    var path = '';
    polarAngles.forEach(function (angle, i) {
        var point = PolarUtils_1.polarToCartesian(cx, cy, radius, angle);
        if (i) {
            path += "L " + point.x + "," + point.y;
        }
        else {
            path += "M " + point.x + "," + point.y;
        }
    });
    path += 'Z';
    return path;
};
var PolarAngles = function (props) {
    var cx = props.cx, cy = props.cy, innerRadius = props.innerRadius, outerRadius = props.outerRadius, polarAngles = props.polarAngles, radialLines = props.radialLines;
    if (!polarAngles || !polarAngles.length || !radialLines) {
        return null;
    }
    var polarAnglesProps = __assign({ stroke: '#ccc' }, ReactUtils_1.filterProps(props));
    return (react_1.default.createElement("g", { className: "recharts-polar-grid-angle" }, polarAngles.map(function (entry, i) {
        var start = PolarUtils_1.polarToCartesian(cx, cy, innerRadius, entry);
        var end = PolarUtils_1.polarToCartesian(cx, cy, outerRadius, entry);
        return (react_1.default.createElement("line", __assign({}, polarAnglesProps, { key: "line-" + i, x1: start.x, y1: start.y, x2: end.x, y2: end.y })));
    })));
};
var ConcentricCircle = function (props) {
    var cx = props.cx, cy = props.cy, radius = props.radius, index = props.index;
    var concentricCircleProps = __assign(__assign({ stroke: '#ccc' }, ReactUtils_1.filterProps(props)), { fill: 'none' });
    return (react_1.default.createElement("circle", __assign({}, concentricCircleProps, { className: "recharts-polar-grid-concentric-circle", key: "circle-" + index, cx: cx, cy: cy, r: radius })));
};
var ConcentricPolygon = function (props) {
    var radius = props.radius, index = props.index;
    var concentricPolygonProps = __assign(__assign({ stroke: '#ccc' }, ReactUtils_1.filterProps(props)), { fill: 'none' });
    return (react_1.default.createElement("path", __assign({}, concentricPolygonProps, { className: "recharts-polar-grid-concentric-polygon", key: "path-" + index, d: getPolygonPath(radius, props.cx, props.cy, props.polarAngles) })));
};
var ConcentricPath = function (props) {
    var polarRadius = props.polarRadius, gridType = props.gridType;
    if (!polarRadius || !polarRadius.length) {
        return null;
    }
    return (react_1.default.createElement("g", { className: "recharts-polar-grid-concentric" }, polarRadius.map(function (entry, i) {
        var key = i;
        if (gridType === 'circle')
            return react_1.default.createElement(ConcentricCircle, __assign({ key: key }, props, { radius: entry, index: i }));
        return react_1.default.createElement(ConcentricPolygon, __assign({ key: key }, props, { radius: entry, index: i }));
    })));
};
var PolarGrid = function (_a) {
    var _b = _a.cx, cx = _b === void 0 ? 0 : _b, _c = _a.cy, cy = _c === void 0 ? 0 : _c, _d = _a.innerRadius, innerRadius = _d === void 0 ? 0 : _d, _e = _a.outerRadius, outerRadius = _e === void 0 ? 0 : _e, _f = _a.gridType, gridType = _f === void 0 ? 'polygon' : _f, _g = _a.radialLines, radialLines = _g === void 0 ? true : _g, props = __rest(_a, ["cx", "cy", "innerRadius", "outerRadius", "gridType", "radialLines"]);
    if (outerRadius <= 0) {
        return null;
    }
    return (react_1.default.createElement("g", { className: "recharts-polar-grid" },
        react_1.default.createElement(PolarAngles, __assign({ cx: cx, cy: cy, innerRadius: innerRadius, outerRadius: outerRadius, gridType: gridType, radialLines: radialLines }, props)),
        react_1.default.createElement(ConcentricPath, __assign({ cx: cx, cy: cy, innerRadius: innerRadius, outerRadius: outerRadius, gridType: gridType, radialLines: radialLines }, props))));
};
exports.PolarGrid = PolarGrid;
exports.PolarGrid.displayName = 'PolarGrid';
//# sourceMappingURL=PolarGrid.js.map