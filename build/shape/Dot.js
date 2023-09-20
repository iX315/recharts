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
exports.Dot = void 0;
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var types_1 = require("../util/types");
var ReactUtils_1 = require("../util/ReactUtils");
var Dot = function (props) {
    var cx = props.cx, cy = props.cy, r = props.r, className = props.className;
    var layerClass = classnames_1.default('recharts-dot', className);
    if (cx === +cx && cy === +cy && r === +r) {
        return (react_1.default.createElement("circle", __assign({}, ReactUtils_1.filterProps(props), types_1.adaptEventHandlers(props), { className: layerClass, cx: cx, cy: cy, r: r })));
    }
    return null;
};
exports.Dot = Dot;
//# sourceMappingURL=Dot.js.map