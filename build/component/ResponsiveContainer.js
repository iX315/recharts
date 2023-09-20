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
exports.ResponsiveContainer = void 0;
var classnames_1 = __importDefault(require("classnames"));
var react_1 = __importStar(require("react"));
var react_resize_detector_1 = __importDefault(require("react-resize-detector"));
var DataUtils_1 = require("../util/DataUtils");
var LogUtils_1 = require("../util/LogUtils");
exports.ResponsiveContainer = react_1.forwardRef(function (_a, ref) {
    var aspect = _a.aspect, _b = _a.initialDimension, initialDimension = _b === void 0 ? {
        width: -1,
        height: -1,
    } : _b, _c = _a.width, width = _c === void 0 ? '100%' : _c, _d = _a.height, height = _d === void 0 ? '100%' : _d, _e = _a.minWidth, minWidth = _e === void 0 ? 0 : _e, minHeight = _a.minHeight, maxHeight = _a.maxHeight, children = _a.children, _f = _a.debounce, debounce = _f === void 0 ? 0 : _f, id = _a.id, className = _a.className, onResize = _a.onResize, _g = _a.style, style = _g === void 0 ? {} : _g;
    var _h = react_1.useState({
        containerWidth: initialDimension.width,
        containerHeight: initialDimension.height,
    }), sizes = _h[0], setSizes = _h[1];
    var containerRef = react_1.useRef(null);
    react_1.useImperativeHandle(ref, function () { return containerRef; }, [containerRef]);
    var getContainerSize = react_1.useCallback(function () {
        if (!containerRef.current) {
            return null;
        }
        return {
            containerWidth: containerRef.current.clientWidth,
            containerHeight: containerRef.current.clientHeight,
        };
    }, []);
    var updateDimensionsImmediate = react_1.useCallback(function () {
        var newSize = getContainerSize();
        if (newSize) {
            var containerWidth_1 = newSize.containerWidth, containerHeight_1 = newSize.containerHeight;
            if (onResize)
                onResize(containerWidth_1, containerHeight_1);
            setSizes(function (currentSizes) {
                var oldWidth = currentSizes.containerWidth, oldHeight = currentSizes.containerHeight;
                if (containerWidth_1 !== oldWidth || containerHeight_1 !== oldHeight) {
                    return { containerWidth: containerWidth_1, containerHeight: containerHeight_1 };
                }
                return currentSizes;
            });
        }
    }, [getContainerSize, onResize]);
    var chartContent = react_1.useMemo(function () {
        var containerWidth = sizes.containerWidth, containerHeight = sizes.containerHeight;
        if (containerWidth < 0 || containerHeight < 0) {
            return null;
        }
        LogUtils_1.warn(DataUtils_1.isPercent(width) || DataUtils_1.isPercent(height), "The width(%s) and height(%s) are both fixed numbers,\n       maybe you don't need to use a ResponsiveContainer.", width, height);
        LogUtils_1.warn(!aspect || aspect > 0, 'The aspect(%s) must be greater than zero.', aspect);
        var calculatedWidth = DataUtils_1.isPercent(width) ? containerWidth : width;
        var calculatedHeight = DataUtils_1.isPercent(height) ? containerHeight : height;
        if (aspect && aspect > 0) {
            if (calculatedWidth) {
                calculatedHeight = calculatedWidth / aspect;
            }
            else if (calculatedHeight) {
                calculatedWidth = calculatedHeight * aspect;
            }
            if (maxHeight && calculatedHeight > maxHeight) {
                calculatedHeight = maxHeight;
            }
        }
        LogUtils_1.warn(calculatedWidth > 0 || calculatedHeight > 0, "The width(%s) and height(%s) of chart should be greater than 0,\n       please check the style of container, or the props width(%s) and height(%s),\n       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the\n       height and width.", calculatedWidth, calculatedHeight, width, height, minWidth, minHeight, aspect);
        return react_1.cloneElement(children, {
            width: calculatedWidth,
            height: calculatedHeight,
        });
    }, [aspect, children, height, maxHeight, minHeight, minWidth, sizes, width]);
    react_1.useEffect(function () {
        var size = getContainerSize();
        if (size) {
            setSizes(size);
        }
    }, [getContainerSize]);
    var styles = __assign(__assign({}, style), { width: width, height: height, minWidth: minWidth, minHeight: minHeight, maxHeight: maxHeight });
    return (react_1.default.createElement(react_resize_detector_1.default, { handleWidth: true, handleHeight: true, onResize: updateDimensionsImmediate, targetRef: containerRef, refreshMode: debounce > 0 ? 'debounce' : undefined, refreshRate: debounce },
        react_1.default.createElement("div", __assign({}, (id != null ? { id: "" + id } : {}), { className: classnames_1.default('recharts-responsive-container', className), style: styles, ref: containerRef }), chartContent)));
});
//# sourceMappingURL=ResponsiveContainer.js.map