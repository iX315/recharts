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
exports.Sector = void 0;
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var ReactUtils_1 = require("../util/ReactUtils");
var PolarUtils_1 = require("../util/PolarUtils");
var DataUtils_1 = require("../util/DataUtils");
var getDeltaAngle = function (startAngle, endAngle) {
    var sign = DataUtils_1.mathSign(endAngle - startAngle);
    var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 359.999);
    return sign * deltaAngle;
};
var getTangentCircle = function (_a) {
    var cx = _a.cx, cy = _a.cy, radius = _a.radius, angle = _a.angle, sign = _a.sign, isExternal = _a.isExternal, cornerRadius = _a.cornerRadius, cornerIsExternal = _a.cornerIsExternal;
    var centerRadius = cornerRadius * (isExternal ? 1 : -1) + radius;
    var theta = Math.asin(cornerRadius / centerRadius) / PolarUtils_1.RADIAN;
    var centerAngle = cornerIsExternal ? angle : angle + sign * theta;
    var center = PolarUtils_1.polarToCartesian(cx, cy, centerRadius, centerAngle);
    var circleTangency = PolarUtils_1.polarToCartesian(cx, cy, radius, centerAngle);
    var lineTangencyAngle = cornerIsExternal ? angle - sign * theta : angle;
    var lineTangency = PolarUtils_1.polarToCartesian(cx, cy, centerRadius * Math.cos(theta * PolarUtils_1.RADIAN), lineTangencyAngle);
    return { center: center, circleTangency: circleTangency, lineTangency: lineTangency, theta: theta };
};
var getSectorPath = function (_a) {
    var cx = _a.cx, cy = _a.cy, innerRadius = _a.innerRadius, outerRadius = _a.outerRadius, startAngle = _a.startAngle, endAngle = _a.endAngle;
    var angle = getDeltaAngle(startAngle, endAngle);
    var tempEndAngle = startAngle + angle;
    var outerStartPoint = PolarUtils_1.polarToCartesian(cx, cy, outerRadius, startAngle);
    var outerEndPoint = PolarUtils_1.polarToCartesian(cx, cy, outerRadius, tempEndAngle);
    var path = "M " + outerStartPoint.x + "," + outerStartPoint.y + "\n    A " + outerRadius + "," + outerRadius + ",0,\n    " + +(Math.abs(angle) > 180) + "," + +(startAngle > tempEndAngle) + ",\n    " + outerEndPoint.x + "," + outerEndPoint.y + "\n  ";
    if (innerRadius > 0) {
        var innerStartPoint = PolarUtils_1.polarToCartesian(cx, cy, innerRadius, startAngle);
        var innerEndPoint = PolarUtils_1.polarToCartesian(cx, cy, innerRadius, tempEndAngle);
        path += "L " + innerEndPoint.x + "," + innerEndPoint.y + "\n            A " + innerRadius + "," + innerRadius + ",0,\n            " + +(Math.abs(angle) > 180) + "," + +(startAngle <= tempEndAngle) + ",\n            " + innerStartPoint.x + "," + innerStartPoint.y + " Z";
    }
    else {
        path += "L " + cx + "," + cy + " Z";
    }
    return path;
};
var getSectorWithCorner = function (_a) {
    var cx = _a.cx, cy = _a.cy, innerRadius = _a.innerRadius, outerRadius = _a.outerRadius, cornerRadius = _a.cornerRadius, forceCornerRadius = _a.forceCornerRadius, cornerIsExternal = _a.cornerIsExternal, startAngle = _a.startAngle, endAngle = _a.endAngle;
    var sign = DataUtils_1.mathSign(endAngle - startAngle);
    var _b = getTangentCircle({
        cx: cx,
        cy: cy,
        radius: outerRadius,
        angle: startAngle,
        sign: sign,
        cornerRadius: cornerRadius,
        cornerIsExternal: cornerIsExternal,
    }), soct = _b.circleTangency, solt = _b.lineTangency, sot = _b.theta;
    var _c = getTangentCircle({
        cx: cx,
        cy: cy,
        radius: outerRadius,
        angle: endAngle,
        sign: -sign,
        cornerRadius: cornerRadius,
        cornerIsExternal: cornerIsExternal,
    }), eoct = _c.circleTangency, eolt = _c.lineTangency, eot = _c.theta;
    var outerArcAngle = cornerIsExternal
        ? Math.abs(startAngle - endAngle)
        : Math.abs(startAngle - endAngle) - sot - eot;
    if (outerArcAngle < 0) {
        if (forceCornerRadius) {
            return "M " + solt.x + "," + solt.y + "\n        a" + cornerRadius + "," + cornerRadius + ",0,0,1," + cornerRadius * 2 + ",0\n        a" + cornerRadius + "," + cornerRadius + ",0,0,1," + -cornerRadius * 2 + ",0\n      ";
        }
        return getSectorPath({
            cx: cx,
            cy: cy,
            innerRadius: innerRadius,
            outerRadius: outerRadius,
            startAngle: startAngle,
            endAngle: endAngle,
        });
    }
    var path = "M " + solt.x + "," + solt.y + "\n    A" + cornerRadius + "," + cornerRadius + ",0,0," + +(sign < 0) + "," + soct.x + "," + soct.y + "\n    A" + outerRadius + "," + outerRadius + ",0," + +(outerArcAngle > 180) + "," + +(sign < 0) + "," + eoct.x + "," + eoct.y + "\n    A" + cornerRadius + "," + cornerRadius + ",0,0," + +(sign < 0) + "," + eolt.x + "," + eolt.y + "\n  ";
    if (innerRadius > 0) {
        var _d = getTangentCircle({
            cx: cx,
            cy: cy,
            radius: innerRadius,
            angle: startAngle,
            sign: sign,
            isExternal: true,
            cornerRadius: cornerRadius,
            cornerIsExternal: cornerIsExternal,
        }), sict = _d.circleTangency, silt = _d.lineTangency, sit = _d.theta;
        var _e = getTangentCircle({
            cx: cx,
            cy: cy,
            radius: innerRadius,
            angle: endAngle,
            sign: -sign,
            isExternal: true,
            cornerRadius: cornerRadius,
            cornerIsExternal: cornerIsExternal,
        }), eict = _e.circleTangency, eilt = _e.lineTangency, eit = _e.theta;
        var innerArcAngle = cornerIsExternal
            ? Math.abs(startAngle - endAngle)
            : Math.abs(startAngle - endAngle) - sit - eit;
        if (innerArcAngle < 0 && cornerRadius === 0) {
            return path + "L" + cx + "," + cy + "Z";
        }
        path += "L" + eilt.x + "," + eilt.y + "\n      A" + cornerRadius + "," + cornerRadius + ",0,0," + +(sign < 0) + "," + eict.x + "," + eict.y + "\n      A" + innerRadius + "," + innerRadius + ",0," + +(innerArcAngle > 180) + "," + +(sign > 0) + "," + sict.x + "," + sict.y + "\n      A" + cornerRadius + "," + cornerRadius + ",0,0," + +(sign < 0) + "," + silt.x + "," + silt.y + "Z";
    }
    else {
        path += "L" + cx + "," + cy + "Z";
    }
    return path;
};
var defaultProps = {
    cx: 0,
    cy: 0,
    innerRadius: 0,
    outerRadius: 0,
    startAngle: 0,
    endAngle: 0,
    cornerRadius: 0,
    forceCornerRadius: false,
    cornerIsExternal: false,
};
var Sector = function (sectorProps) {
    var props = __assign(__assign({}, defaultProps), sectorProps);
    var cx = props.cx, cy = props.cy, innerRadius = props.innerRadius, outerRadius = props.outerRadius, cornerRadius = props.cornerRadius, forceCornerRadius = props.forceCornerRadius, cornerIsExternal = props.cornerIsExternal, startAngle = props.startAngle, endAngle = props.endAngle, className = props.className;
    if (outerRadius < innerRadius || startAngle === endAngle) {
        return null;
    }
    var layerClass = classnames_1.default('recharts-sector', className);
    var deltaRadius = outerRadius - innerRadius;
    var cr = DataUtils_1.getPercentValue(cornerRadius, deltaRadius, 0, true);
    var path;
    if (cr > 0 && Math.abs(startAngle - endAngle) < 360) {
        path = getSectorWithCorner({
            cx: cx,
            cy: cy,
            innerRadius: innerRadius,
            outerRadius: outerRadius,
            cornerRadius: Math.min(cr, deltaRadius / 2),
            forceCornerRadius: forceCornerRadius,
            cornerIsExternal: cornerIsExternal,
            startAngle: startAngle,
            endAngle: endAngle,
        });
    }
    else {
        path = getSectorPath({ cx: cx, cy: cy, innerRadius: innerRadius, outerRadius: outerRadius, startAngle: startAngle, endAngle: endAngle });
    }
    return react_1.default.createElement("path", __assign({}, ReactUtils_1.filterProps(props, true), { className: layerClass, d: path, role: "img" }));
};
exports.Sector = Sector;
//# sourceMappingURL=Sector.js.map