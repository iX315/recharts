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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polygon = void 0;
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var ReactUtils_1 = require("../util/ReactUtils");
var isValidatePoint = function (point) {
    return point && point.x === +point.x && point.y === +point.y;
};
var getParsedPoints = function (points) {
    if (points === void 0) { points = []; }
    var segmentPoints = [[]];
    points.forEach(function (entry) {
        if (isValidatePoint(entry)) {
            segmentPoints[segmentPoints.length - 1].push(entry);
        }
        else if (segmentPoints[segmentPoints.length - 1].length > 0) {
            segmentPoints.push([]);
        }
    });
    if (isValidatePoint(points[0])) {
        segmentPoints[segmentPoints.length - 1].push(points[0]);
    }
    if (segmentPoints[segmentPoints.length - 1].length <= 0) {
        segmentPoints = segmentPoints.slice(0, -1);
    }
    return segmentPoints;
};
var getSinglePolygonPath = function (points, connectNulls) {
    var segmentPoints = getParsedPoints(points);
    if (connectNulls) {
        segmentPoints = [
            segmentPoints.reduce(function (res, segPoints) {
                return __spreadArrays(res, segPoints);
            }, []),
        ];
    }
    var polygonPath = segmentPoints
        .map(function (segPoints) {
        return segPoints.reduce(function (path, point, index) {
            return "" + path + (index === 0 ? 'M' : 'L') + point.x + "," + point.y;
        }, '');
    })
        .join('');
    return segmentPoints.length === 1 ? polygonPath + "Z" : polygonPath;
};
var getRanglePath = function (points, baseLinePoints, connectNulls) {
    var outerPath = getSinglePolygonPath(points, connectNulls);
    return (outerPath.slice(-1) === 'Z' ? outerPath.slice(0, -1) : outerPath) + "L" + getSinglePolygonPath(baseLinePoints.reverse(), connectNulls).slice(1);
};
var Polygon = function (props) {
    var points = props.points, className = props.className, baseLinePoints = props.baseLinePoints, connectNulls = props.connectNulls, others = __rest(props, ["points", "className", "baseLinePoints", "connectNulls"]);
    if (!points || !points.length) {
        return null;
    }
    var layerClass = classnames_1.default('recharts-polygon', className);
    if (baseLinePoints && baseLinePoints.length) {
        var hasStroke = others.stroke && others.stroke !== 'none';
        var rangePath = getRanglePath(points, baseLinePoints, connectNulls);
        return (react_1.default.createElement("g", { className: layerClass },
            react_1.default.createElement("path", __assign({}, ReactUtils_1.filterProps(others, true), { fill: rangePath.slice(-1) === 'Z' ? others.fill : 'none', stroke: "none", d: rangePath })),
            hasStroke ? (react_1.default.createElement("path", __assign({}, ReactUtils_1.filterProps(others, true), { fill: "none", d: getSinglePolygonPath(points, connectNulls) }))) : null,
            hasStroke ? (react_1.default.createElement("path", __assign({}, ReactUtils_1.filterProps(others, true), { fill: "none", d: getSinglePolygonPath(baseLinePoints, connectNulls) }))) : null));
    }
    var singlePath = getSinglePolygonPath(points, connectNulls);
    return (react_1.default.createElement("path", __assign({}, ReactUtils_1.filterProps(others, true), { fill: singlePath.slice(-1) === 'Z' ? others.fill : 'none', className: layerClass, d: singlePath })));
};
exports.Polygon = Polygon;
//# sourceMappingURL=Polygon.js.map