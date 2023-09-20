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
exports.Rectangle = exports.isInRectangle = void 0;
var react_1 = __importStar(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var react_smooth_1 = __importDefault(require("react-smooth"));
var ReactUtils_1 = require("../util/ReactUtils");
var getRectanglePath = function (x, y, width, height, radius) {
    var maxRadius = Math.min(Math.abs(width) / 2, Math.abs(height) / 2);
    var ySign = height >= 0 ? 1 : -1;
    var xSign = width >= 0 ? 1 : -1;
    var clockWise = (height >= 0 && width >= 0) || (height < 0 && width < 0) ? 1 : 0;
    var path;
    if (maxRadius > 0 && radius instanceof Array) {
        var newRadius = [0, 0, 0, 0];
        for (var i = 0, len = 4; i < len; i++) {
            newRadius[i] = radius[i] > maxRadius ? maxRadius : radius[i];
        }
        path = "M" + x + "," + (y + ySign * newRadius[0]);
        if (newRadius[0] > 0) {
            path += "A " + newRadius[0] + "," + newRadius[0] + ",0,0," + clockWise + "," + (x + xSign * newRadius[0]) + "," + y;
        }
        path += "L " + (x + width - xSign * newRadius[1]) + "," + y;
        if (newRadius[1] > 0) {
            path += "A " + newRadius[1] + "," + newRadius[1] + ",0,0," + clockWise + ",\n        " + (x + width) + "," + (y + ySign * newRadius[1]);
        }
        path += "L " + (x + width) + "," + (y + height - ySign * newRadius[2]);
        if (newRadius[2] > 0) {
            path += "A " + newRadius[2] + "," + newRadius[2] + ",0,0," + clockWise + ",\n        " + (x + width - xSign * newRadius[2]) + "," + (y + height);
        }
        path += "L " + (x + xSign * newRadius[3]) + "," + (y + height);
        if (newRadius[3] > 0) {
            path += "A " + newRadius[3] + "," + newRadius[3] + ",0,0," + clockWise + ",\n        " + x + "," + (y + height - ySign * newRadius[3]);
        }
        path += 'Z';
    }
    else if (maxRadius > 0 && radius === +radius && radius > 0) {
        var newRadius = Math.min(maxRadius, radius);
        path = "M " + x + "," + (y + ySign * newRadius) + "\n            A " + newRadius + "," + newRadius + ",0,0," + clockWise + "," + (x + xSign * newRadius) + "," + y + "\n            L " + (x + width - xSign * newRadius) + "," + y + "\n            A " + newRadius + "," + newRadius + ",0,0," + clockWise + "," + (x + width) + "," + (y + ySign * newRadius) + "\n            L " + (x + width) + "," + (y + height - ySign * newRadius) + "\n            A " + newRadius + "," + newRadius + ",0,0," + clockWise + "," + (x + width - xSign * newRadius) + "," + (y + height) + "\n            L " + (x + xSign * newRadius) + "," + (y + height) + "\n            A " + newRadius + "," + newRadius + ",0,0," + clockWise + "," + x + "," + (y + height - ySign * newRadius) + " Z";
    }
    else {
        path = "M " + x + "," + y + " h " + width + " v " + height + " h " + -width + " Z";
    }
    return path;
};
var isInRectangle = function (point, rect) {
    if (!point || !rect) {
        return false;
    }
    var px = point.x, py = point.y;
    var x = rect.x, y = rect.y, width = rect.width, height = rect.height;
    if (Math.abs(width) > 0 && Math.abs(height) > 0) {
        var minX = Math.min(x, x + width);
        var maxX = Math.max(x, x + width);
        var minY = Math.min(y, y + height);
        var maxY = Math.max(y, y + height);
        return px >= minX && px <= maxX && py >= minY && py <= maxY;
    }
    return false;
};
exports.isInRectangle = isInRectangle;
var defaultProps = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    radius: 0,
    isAnimationActive: false,
    isUpdateAnimationActive: false,
    animationBegin: 0,
    animationDuration: 1500,
    animationEasing: 'ease',
};
var Rectangle = function (rectangleProps) {
    var props = __assign(__assign({}, defaultProps), rectangleProps);
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
    var x = props.x, y = props.y, width = props.width, height = props.height, radius = props.radius, className = props.className;
    var animationEasing = props.animationEasing, animationDuration = props.animationDuration, animationBegin = props.animationBegin, isAnimationActive = props.isAnimationActive, isUpdateAnimationActive = props.isUpdateAnimationActive;
    if (x !== +x || y !== +y || width !== +width || height !== +height || width === 0 || height === 0) {
        return null;
    }
    var layerClass = classnames_1.default('recharts-rectangle', className);
    if (!isUpdateAnimationActive) {
        return (react_1.default.createElement("path", __assign({}, ReactUtils_1.filterProps(props, true), { className: layerClass, d: getRectanglePath(x, y, width, height, radius) })));
    }
    return (react_1.default.createElement(react_smooth_1.default, { canBegin: totalLength > 0, from: { width: width, height: height, x: x, y: y }, to: { width: width, height: height, x: x, y: y }, duration: animationDuration, animationEasing: animationEasing, isActive: isUpdateAnimationActive }, function (_a) {
        var currWidth = _a.width, currHeight = _a.height, currX = _a.x, currY = _a.y;
        return (react_1.default.createElement(react_smooth_1.default, { canBegin: totalLength > 0, from: "0px " + (totalLength === -1 ? 1 : totalLength) + "px", to: totalLength + "px 0px", attributeName: "strokeDasharray", begin: animationBegin, duration: animationDuration, isActive: isAnimationActive, easing: animationEasing },
            react_1.default.createElement("path", __assign({}, ReactUtils_1.filterProps(props, true), { className: layerClass, d: getRectanglePath(currX, currY, currWidth, currHeight, radius), ref: pathRef }))));
    }));
};
exports.Rectangle = Rectangle;
//# sourceMappingURL=Rectangle.js.map