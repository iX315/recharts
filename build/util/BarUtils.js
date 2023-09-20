"use strict";
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
exports.ActiveBar = void 0;
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importStar(require("react"));
var Bar_1 = require("../cartesian/Bar");
var Layer_1 = require("../container/Layer");
var ActiveBar = function (_a) {
    var option = _a.option, props = __rest(_a, ["option"]);
    var bar;
    if (react_1.isValidElement(option)) {
        bar = react_1.cloneElement(option, props);
    }
    else if (lodash_1.default.isFunction(option)) {
        bar = option(props);
    }
    else {
        bar = Bar_1.Bar.renderRectangle(props.shape, props);
    }
    return (react_1.default.createElement(Layer_1.Layer, { className: "recharts-active-bar", key: props.key }, bar));
};
exports.ActiveBar = ActiveBar;
//# sourceMappingURL=BarUtils.js.map