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
exports.DefaultTooltipContent = void 0;
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var DataUtils_1 = require("../util/DataUtils");
function defaultFormatter(value) {
    return lodash_1.default.isArray(value) && DataUtils_1.isNumOrStr(value[0]) && DataUtils_1.isNumOrStr(value[1]) ? value.join(' ~ ') : value;
}
var DefaultTooltipContent = function (props) {
    var _a = props.separator, separator = _a === void 0 ? ' : ' : _a, _b = props.contentStyle, contentStyle = _b === void 0 ? {} : _b, _c = props.itemStyle, itemStyle = _c === void 0 ? {} : _c, _d = props.labelStyle, labelStyle = _d === void 0 ? {} : _d, payload = props.payload, formatter = props.formatter, itemSorter = props.itemSorter, wrapperClassName = props.wrapperClassName, labelClassName = props.labelClassName, label = props.label, labelFormatter = props.labelFormatter;
    var renderContent = function () {
        if (payload && payload.length) {
            var listStyle = { padding: 0, margin: 0 };
            var items = (itemSorter ? lodash_1.default.sortBy(payload, itemSorter) : payload).map(function (entry, i) {
                if (entry.type === 'none') {
                    return null;
                }
                var finalItemStyle = __assign({ display: 'block', paddingTop: 4, paddingBottom: 4, color: entry.color || '#000' }, itemStyle);
                var finalFormatter = entry.formatter || formatter || defaultFormatter;
                var value = entry.value, name = entry.name;
                var finalValue = value;
                var finalName = name;
                if (finalFormatter && finalValue != null && finalName != null) {
                    var formatted = finalFormatter(value, name, entry, i, payload);
                    if (Array.isArray(formatted)) {
                        finalValue = formatted[0], finalName = formatted[1];
                    }
                    else {
                        finalValue = formatted;
                    }
                }
                return (react_1.default.createElement("li", { className: "recharts-tooltip-item", key: "tooltip-item-" + i, style: finalItemStyle },
                    DataUtils_1.isNumOrStr(finalName) ? react_1.default.createElement("span", { className: "recharts-tooltip-item-name" }, finalName) : null,
                    DataUtils_1.isNumOrStr(finalName) ? react_1.default.createElement("span", { className: "recharts-tooltip-item-separator" }, separator) : null,
                    react_1.default.createElement("span", { className: "recharts-tooltip-item-value" }, finalValue),
                    react_1.default.createElement("span", { className: "recharts-tooltip-item-unit" }, entry.unit || '')));
            });
            return (react_1.default.createElement("ul", { className: "recharts-tooltip-item-list", style: listStyle }, items));
        }
        return null;
    };
    var finalStyle = __assign({ margin: 0, padding: 10, backgroundColor: '#fff', border: '1px solid #ccc', whiteSpace: 'nowrap' }, contentStyle);
    var finalLabelStyle = __assign({ margin: 0 }, labelStyle);
    var hasLabel = !lodash_1.default.isNil(label);
    var finalLabel = hasLabel ? label : '';
    var wrapperCN = classnames_1.default('recharts-default-tooltip', wrapperClassName);
    var labelCN = classnames_1.default('recharts-tooltip-label', labelClassName);
    if (hasLabel && labelFormatter && payload !== undefined && payload !== null) {
        finalLabel = labelFormatter(label, payload);
    }
    return (react_1.default.createElement("div", { className: wrapperCN, style: finalStyle },
        react_1.default.createElement("p", { className: labelCN, style: finalLabelStyle }, react_1.default.isValidElement(finalLabel) ? finalLabel : "" + finalLabel),
        renderContent()));
};
exports.DefaultTooltipContent = DefaultTooltipContent;
//# sourceMappingURL=DefaultTooltipContent.js.map