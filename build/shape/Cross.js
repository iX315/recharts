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
exports.Cross = void 0;
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var DataUtils_1 = require("../util/DataUtils");
var ReactUtils_1 = require("../util/ReactUtils");
var getPath = function (x, y, width, height, top, left) {
    return "M" + x + "," + top + "v" + height + "M" + left + "," + y + "h" + width;
};
var Cross = function (_a) {
    var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c, _d = _a.top, top = _d === void 0 ? 0 : _d, _e = _a.left, left = _e === void 0 ? 0 : _e, _f = _a.width, width = _f === void 0 ? 0 : _f, _g = _a.height, height = _g === void 0 ? 0 : _g, className = _a.className, rest = __rest(_a, ["x", "y", "top", "left", "width", "height", "className"]);
    var props = __assign({ x: x, y: y, top: top, left: left, width: width, height: height }, rest);
    if (!DataUtils_1.isNumber(x) || !DataUtils_1.isNumber(y) || !DataUtils_1.isNumber(width) || !DataUtils_1.isNumber(height) || !DataUtils_1.isNumber(top) || !DataUtils_1.isNumber(left)) {
        return null;
    }
    return (react_1.default.createElement("path", __assign({}, ReactUtils_1.filterProps(props, true), { className: classnames_1.default('recharts-cross', className), d: getPath(x, y, width, height, top, left) })));
};
exports.Cross = Cross;
//# sourceMappingURL=Cross.js.map