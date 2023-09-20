"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartesianAxis = void 0;
var react_1 = __importStar(require("react"));
var lodash_1 = __importDefault(require("lodash"));
var classnames_1 = __importDefault(require("classnames"));
var ShallowEqual_1 = require("../util/ShallowEqual");
var Layer_1 = require("../container/Layer");
var Text_1 = require("../component/Text");
var Label_1 = require("../component/Label");
var DataUtils_1 = require("../util/DataUtils");
var types_1 = require("../util/types");
var ReactUtils_1 = require("../util/ReactUtils");
var getTicks_1 = require("./getTicks");
var CartesianAxis = (function (_super) {
    __extends(CartesianAxis, _super);
    function CartesianAxis(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { fontSize: '', letterSpacing: '' };
        return _this;
    }
    CartesianAxis.prototype.shouldComponentUpdate = function (_a, nextState) {
        var viewBox = _a.viewBox, restProps = __rest(_a, ["viewBox"]);
        var _b = this.props, viewBoxOld = _b.viewBox, restPropsOld = __rest(_b, ["viewBox"]);
        return (!ShallowEqual_1.shallowEqual(viewBox, viewBoxOld) ||
            !ShallowEqual_1.shallowEqual(restProps, restPropsOld) ||
            !ShallowEqual_1.shallowEqual(nextState, this.state));
    };
    CartesianAxis.prototype.componentDidMount = function () {
        var htmlLayer = this.layerReference;
        if (!htmlLayer)
            return;
        var tick = htmlLayer.getElementsByClassName('recharts-cartesian-axis-tick-value')[0];
        if (tick) {
            this.setState({
                fontSize: window.getComputedStyle(tick).fontSize,
                letterSpacing: window.getComputedStyle(tick).letterSpacing,
            });
        }
    };
    CartesianAxis.prototype.getTickLineCoord = function (data) {
        var _a = this.props, x = _a.x, y = _a.y, width = _a.width, height = _a.height, orientation = _a.orientation, tickSize = _a.tickSize, mirror = _a.mirror, tickMargin = _a.tickMargin;
        var x1, x2, y1, y2, tx, ty;
        var sign = mirror ? -1 : 1;
        var finalTickSize = data.tickSize || tickSize;
        var tickCoord = DataUtils_1.isNumber(data.tickCoord) ? data.tickCoord : data.coordinate;
        switch (orientation) {
            case 'top':
                x1 = x2 = data.coordinate;
                y2 = y + +!mirror * height;
                y1 = y2 - sign * finalTickSize;
                ty = y1 - sign * tickMargin;
                tx = tickCoord;
                break;
            case 'left':
                y1 = y2 = data.coordinate;
                x2 = x + +!mirror * width;
                x1 = x2 - sign * finalTickSize;
                tx = x1 - sign * tickMargin;
                ty = tickCoord;
                break;
            case 'right':
                y1 = y2 = data.coordinate;
                x2 = x + +mirror * width;
                x1 = x2 + sign * finalTickSize;
                tx = x1 + sign * tickMargin;
                ty = tickCoord;
                break;
            default:
                x1 = x2 = data.coordinate;
                y2 = y + +mirror * height;
                y1 = y2 + sign * finalTickSize;
                ty = y1 + sign * tickMargin;
                tx = tickCoord;
                break;
        }
        return { line: { x1: x1, y1: y1, x2: x2, y2: y2 }, tick: { x: tx, y: ty } };
    };
    CartesianAxis.prototype.getTickTextAnchor = function () {
        var _a = this.props, orientation = _a.orientation, mirror = _a.mirror;
        var textAnchor;
        switch (orientation) {
            case 'left':
                textAnchor = mirror ? 'start' : 'end';
                break;
            case 'right':
                textAnchor = mirror ? 'end' : 'start';
                break;
            default:
                textAnchor = 'middle';
                break;
        }
        return textAnchor;
    };
    CartesianAxis.prototype.getTickVerticalAnchor = function () {
        var _a = this.props, orientation = _a.orientation, mirror = _a.mirror;
        var verticalAnchor = 'end';
        switch (orientation) {
            case 'left':
            case 'right':
                verticalAnchor = 'middle';
                break;
            case 'top':
                verticalAnchor = mirror ? 'start' : 'end';
                break;
            default:
                verticalAnchor = mirror ? 'end' : 'start';
                break;
        }
        return verticalAnchor;
    };
    CartesianAxis.prototype.renderAxisLine = function () {
        var _a = this.props, x = _a.x, y = _a.y, width = _a.width, height = _a.height, orientation = _a.orientation, mirror = _a.mirror, axisLine = _a.axisLine;
        var props = __assign(__assign(__assign({}, ReactUtils_1.filterProps(this.props)), ReactUtils_1.filterProps(axisLine)), { fill: 'none' });
        if (orientation === 'top' || orientation === 'bottom') {
            var needHeight = +((orientation === 'top' && !mirror) || (orientation === 'bottom' && mirror));
            props = __assign(__assign({}, props), { x1: x, y1: y + needHeight * height, x2: x + width, y2: y + needHeight * height });
        }
        else {
            var needWidth = +((orientation === 'left' && !mirror) || (orientation === 'right' && mirror));
            props = __assign(__assign({}, props), { x1: x + needWidth * width, y1: y, x2: x + needWidth * width, y2: y + height });
        }
        return react_1.default.createElement("line", __assign({}, props, { className: classnames_1.default('recharts-cartesian-axis-line', lodash_1.default.get(axisLine, 'className')) }));
    };
    CartesianAxis.renderTickItem = function (option, props, value) {
        var tickItem;
        if (react_1.default.isValidElement(option)) {
            tickItem = react_1.default.cloneElement(option, props);
        }
        else if (lodash_1.default.isFunction(option)) {
            tickItem = option(props);
        }
        else {
            tickItem = (react_1.default.createElement(Text_1.Text, __assign({}, props, { className: "recharts-cartesian-axis-tick-value" }), value));
        }
        return tickItem;
    };
    CartesianAxis.prototype.renderTicks = function (ticks, fontSize, letterSpacing) {
        var _this = this;
        var _a = this.props, tickLine = _a.tickLine, stroke = _a.stroke, tick = _a.tick, tickFormatter = _a.tickFormatter, unit = _a.unit;
        var finalTicks = getTicks_1.getTicks(__assign(__assign({}, this.props), { ticks: ticks }), fontSize, letterSpacing);
        var textAnchor = this.getTickTextAnchor();
        var verticalAnchor = this.getTickVerticalAnchor();
        var axisProps = ReactUtils_1.filterProps(this.props);
        var customTickProps = ReactUtils_1.filterProps(tick);
        var tickLineProps = __assign(__assign(__assign({}, axisProps), { fill: 'none' }), ReactUtils_1.filterProps(tickLine));
        var items = finalTicks.map(function (entry, i) {
            var _a = _this.getTickLineCoord(entry), lineCoord = _a.line, tickCoord = _a.tick;
            var tickProps = __assign(__assign(__assign(__assign(__assign({ textAnchor: textAnchor,
                verticalAnchor: verticalAnchor }, axisProps), { stroke: 'none', fill: stroke }), customTickProps), tickCoord), { index: i, payload: entry, visibleTicksCount: finalTicks.length, tickFormatter: tickFormatter });
            return (react_1.default.createElement(Layer_1.Layer, __assign({ className: "recharts-cartesian-axis-tick", key: "tick-" + i }, types_1.adaptEventsOfChild(_this.props, entry, i)),
                tickLine && (react_1.default.createElement("line", __assign({}, tickLineProps, lineCoord, { className: classnames_1.default('recharts-cartesian-axis-tick-line', lodash_1.default.get(tickLine, 'className')) }))),
                tick &&
                    CartesianAxis.renderTickItem(tick, tickProps, "" + (lodash_1.default.isFunction(tickFormatter) ? tickFormatter(entry.value, i) : entry.value) + (unit || ''))));
        });
        return react_1.default.createElement("g", { className: "recharts-cartesian-axis-ticks" }, items);
    };
    CartesianAxis.prototype.render = function () {
        var _this = this;
        var _a = this.props, axisLine = _a.axisLine, width = _a.width, height = _a.height, ticksGenerator = _a.ticksGenerator, className = _a.className, hide = _a.hide;
        if (hide) {
            return null;
        }
        var _b = this.props, ticks = _b.ticks, noTicksProps = __rest(_b, ["ticks"]);
        var finalTicks = ticks;
        if (lodash_1.default.isFunction(ticksGenerator)) {
            finalTicks = ticks && ticks.length > 0 ? ticksGenerator(this.props) : ticksGenerator(noTicksProps);
        }
        if (width <= 0 || height <= 0 || !finalTicks || !finalTicks.length) {
            return null;
        }
        return (react_1.default.createElement(Layer_1.Layer, { className: classnames_1.default('recharts-cartesian-axis', className), ref: function (ref) {
                _this.layerReference = ref;
            } },
            axisLine && this.renderAxisLine(),
            this.renderTicks(finalTicks, this.state.fontSize, this.state.letterSpacing),
            Label_1.Label.renderCallByParent(this.props)));
    };
    CartesianAxis.displayName = 'CartesianAxis';
    CartesianAxis.defaultProps = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        viewBox: { x: 0, y: 0, width: 0, height: 0 },
        orientation: 'bottom',
        ticks: [],
        stroke: '#666',
        tickLine: true,
        axisLine: true,
        tick: true,
        mirror: false,
        minTickGap: 5,
        tickSize: 6,
        tickMargin: 2,
        interval: 'preserveEnd',
    };
    return CartesianAxis;
}(react_1.Component));
exports.CartesianAxis = CartesianAxis;
//# sourceMappingURL=CartesianAxis.js.map