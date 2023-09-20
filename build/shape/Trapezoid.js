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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trapezoid = void 0;
var react_1 = __importStar(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var react_smooth_1 = __importDefault(require("react-smooth"));
var ReactUtils_1 = require("../util/ReactUtils");
var getTrapezoidPath = function (x, y, upperWidth, lowerWidth, height) {
    var widthGap = upperWidth - lowerWidth;
    var path;
    path = "M " + x + "," + y;
    path += "L " + (x + upperWidth) + "," + y;
    path += "L " + (x + upperWidth - widthGap / 2) + "," + (y + height);
    path += "L " + (x + upperWidth - widthGap / 2 - lowerWidth) + "," + (y + height);
    path += "L " + x + "," + y + " Z";
    return path;
};
var defaultProps = {
    x: 0,
    y: 0,
    upperWidth: 0,
    lowerWidth: 0,
    height: 0,
    isUpdateAnimationActive: false,
    animationBegin: 0,
    animationDuration: 1500,
    animationEasing: 'ease',
};
var Trapezoid = function (props) {
    var trapezoidProps = __assign(__assign({}, defaultProps), props);
    var pathRef = react_1.useRef();
    var _a = react_1.useState(-1), totalLength = _a[0], setTotalLength = _a[1];
    react_1.useEffect(function () {
        if (pathRef.current && pathRef.current.getTotalLength) {
            try {
                var pathTotalLength = pathRef.current.getTotalLength();
                if (pathTotalLength) {
                    setTotalLength(pathTotalLength);
                }
            }
            catch (err) {
            }
        }
    }, []);
    var x = trapezoidProps.x, y = trapezoidProps.y, upperWidth = trapezoidProps.upperWidth, lowerWidth = trapezoidProps.lowerWidth, height = trapezoidProps.height, className = trapezoidProps.className;
    var animationEasing = trapezoidProps.animationEasing, animationDuration = trapezoidProps.animationDuration, animationBegin = trapezoidProps.animationBegin, isUpdateAnimationActive = trapezoidProps.isUpdateAnimationActive;
    if (x !== +x ||
        y !== +y ||
        upperWidth !== +upperWidth ||
        lowerWidth !== +lowerWidth ||
        height !== +height ||
        (upperWidth === 0 && lowerWidth === 0) ||
        height === 0) {
        return null;
    }
    var layerClass = classnames_1.default('recharts-trapezoid', className);
    if (!isUpdateAnimationActive) {
        return (react_1.default.createElement("g", null,
            react_1.default.createElement("path", __assign({}, ReactUtils_1.filterProps(trapezoidProps, true), { className: layerClass, d: getTrapezoidPath(x, y, upperWidth, lowerWidth, height) }))));
    }
    return (react_1.default.createElement(react_smooth_1.default, { canBegin: totalLength > 0, from: { upperWidth: 0, lowerWidth: 0, height: height, x: x, y: y }, to: { upperWidth: upperWidth, lowerWidth: lowerWidth, height: height, x: x, y: y }, duration: animationDuration, animationEasing: animationEasing, isActive: isUpdateAnimationActive }, function (_a) {
        var currUpperWidth = _a.upperWidth, currLowerWidth = _a.lowerWidth, currHeight = _a.height, currX = _a.x, currY = _a.y;
        return (react_1.default.createElement(react_smooth_1.default, { canBegin: totalLength > 0, from: "0px " + (totalLength === -1 ? 1 : totalLength) + "px", to: totalLength + "px 0px", attributeName: "strokeDasharray", begin: animationBegin, duration: animationDuration, easing: animationEasing },
            react_1.default.createElement("path", __assign({}, ReactUtils_1.filterProps(trapezoidProps, true), { className: layerClass, d: getTrapezoidPath(currX, currY, currUpperWidth, currLowerWidth, currHeight), ref: pathRef }))));
    }));
};
exports.Trapezoid = Trapezoid;
//# sourceMappingURL=Trapezoid.js.map