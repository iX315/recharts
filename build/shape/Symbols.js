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
exports.Symbols = void 0;
var react_1 = __importDefault(require("react"));
var lodash_1 = __importDefault(require("lodash"));
var d3_shape_1 = require("victory-vendor/d3-shape");
var classnames_1 = __importDefault(require("classnames"));
var ReactUtils_1 = require("../util/ReactUtils");
var symbolFactories = {
    symbolCircle: d3_shape_1.symbolCircle,
    symbolCross: d3_shape_1.symbolCross,
    symbolDiamond: d3_shape_1.symbolDiamond,
    symbolSquare: d3_shape_1.symbolSquare,
    symbolStar: d3_shape_1.symbolStar,
    symbolTriangle: d3_shape_1.symbolTriangle,
    symbolWye: d3_shape_1.symbolWye,
};
var RADIAN = Math.PI / 180;
var getSymbolFactory = function (type) {
    var name = "symbol" + lodash_1.default.upperFirst(type);
    return symbolFactories[name] || d3_shape_1.symbolCircle;
};
var calculateAreaSize = function (size, sizeType, type) {
    if (sizeType === 'area') {
        return size;
    }
    switch (type) {
        case 'cross':
            return (5 * size * size) / 9;
        case 'diamond':
            return (0.5 * size * size) / Math.sqrt(3);
        case 'square':
            return size * size;
        case 'star': {
            var angle = 18 * RADIAN;
            return 1.25 * size * size * (Math.tan(angle) - Math.tan(angle * 2) * Math.pow(Math.tan(angle), 2));
        }
        case 'triangle':
            return (Math.sqrt(3) * size * size) / 4;
        case 'wye':
            return ((21 - 10 * Math.sqrt(3)) * size * size) / 8;
        default:
            return (Math.PI * size * size) / 4;
    }
};
var registerSymbol = function (key, factory) {
    symbolFactories["symbol" + lodash_1.default.upperFirst(key)] = factory;
};
var Symbols = function (_a) {
    var _b = _a.type, type = _b === void 0 ? 'circle' : _b, _c = _a.size, size = _c === void 0 ? 64 : _c, _d = _a.sizeType, sizeType = _d === void 0 ? 'area' : _d, rest = __rest(_a, ["type", "size", "sizeType"]);
    var props = __assign(__assign({}, rest), { type: type, size: size, sizeType: sizeType });
    var getPath = function () {
        var symbolFactory = getSymbolFactory(type);
        var symbol = d3_shape_1.symbol().type(symbolFactory).size(calculateAreaSize(size, sizeType, type));
        return symbol();
    };
    var className = props.className, cx = props.cx, cy = props.cy;
    var filteredProps = ReactUtils_1.filterProps(props, true);
    if (cx === +cx && cy === +cy && size === +size) {
        return (react_1.default.createElement("path", __assign({}, filteredProps, { className: classnames_1.default('recharts-symbols', className), transform: "translate(" + cx + ", " + cy + ")", d: getPath() })));
    }
    return null;
};
exports.Symbols = Symbols;
exports.Symbols.registerSymbol = registerSymbol;
//# sourceMappingURL=Symbols.js.map