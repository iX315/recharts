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
exports.LabelList = void 0;
var react_1 = __importStar(require("react"));
var lodash_1 = __importDefault(require("lodash"));
var Label_1 = require("./Label");
var Layer_1 = require("../container/Layer");
var ReactUtils_1 = require("../util/ReactUtils");
var ChartUtils_1 = require("../util/ChartUtils");
var defaultAccessor = function (entry) { return (lodash_1.default.isArray(entry.value) ? lodash_1.default.last(entry.value) : entry.value); };
function LabelList(_a) {
    var _b = _a.valueAccessor, valueAccessor = _b === void 0 ? defaultAccessor : _b, restProps = __rest(_a, ["valueAccessor"]);
    var data = restProps.data, dataKey = restProps.dataKey, clockWise = restProps.clockWise, id = restProps.id, textBreakAll = restProps.textBreakAll, others = __rest(restProps, ["data", "dataKey", "clockWise", "id", "textBreakAll"]);
    if (!data || !data.length) {
        return null;
    }
    return (react_1.default.createElement(Layer_1.Layer, { className: "recharts-label-list" }, data.map(function (entry, index) {
        var value = lodash_1.default.isNil(dataKey)
            ? valueAccessor(entry, index)
            : ChartUtils_1.getValueByDataKey(entry && entry.payload, dataKey);
        var idProps = lodash_1.default.isNil(id) ? {} : { id: id + "-" + index };
        return (react_1.default.createElement(Label_1.Label, __assign({}, ReactUtils_1.filterProps(entry, true), others, idProps, { parentViewBox: entry.parentViewBox, index: index, value: value, textBreakAll: textBreakAll, viewBox: Label_1.Label.parseViewBox(lodash_1.default.isNil(clockWise) ? entry : __assign(__assign({}, entry), { clockWise: clockWise })), key: "label-" + index })));
    })));
}
exports.LabelList = LabelList;
LabelList.displayName = 'LabelList';
function parseLabelList(label, data) {
    if (!label) {
        return null;
    }
    if (label === true) {
        return react_1.default.createElement(LabelList, { key: "labelList-implicit", data: data });
    }
    if (react_1.default.isValidElement(label) || lodash_1.default.isFunction(label)) {
        return react_1.default.createElement(LabelList, { key: "labelList-implicit", data: data, content: label });
    }
    if (lodash_1.default.isObject(label)) {
        return react_1.default.createElement(LabelList, __assign({ data: data }, label, { key: "labelList-implicit" }));
    }
    return null;
}
function renderCallByParent(parentProps, data, checkPropsLabel) {
    if (checkPropsLabel === void 0) { checkPropsLabel = true; }
    if (!parentProps || (!parentProps.children && checkPropsLabel && !parentProps.label)) {
        return null;
    }
    var children = parentProps.children;
    var explicitChildren = ReactUtils_1.findAllByType(children, LabelList).map(function (child, index) {
        return react_1.cloneElement(child, {
            data: data,
            key: "labelList-" + index,
        });
    });
    if (!checkPropsLabel) {
        return explicitChildren;
    }
    var implicitLabelList = parseLabelList(parentProps.label, data);
    return __spreadArrays([implicitLabelList], explicitChildren);
}
LabelList.renderCallByParent = renderCallByParent;
//# sourceMappingURL=LabelList.js.map