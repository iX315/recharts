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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
var react_1 = __importStar(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var lodash_1 = __importDefault(require("lodash"));
var DataUtils_1 = require("../util/DataUtils");
var Global_1 = require("../util/Global");
var ReactUtils_1 = require("../util/ReactUtils");
var DOMUtils_1 = require("../util/DOMUtils");
var BREAKING_SPACES = /[ \f\n\r\t\v\u2028\u2029]+/;
var calculateWordWidths = function (_a) {
    var children = _a.children, breakAll = _a.breakAll, style = _a.style;
    try {
        var words = [];
        if (!lodash_1.default.isNil(children)) {
            if (breakAll) {
                words = children.toString().split('');
            }
            else {
                words = children.toString().split(BREAKING_SPACES);
            }
        }
        var wordsWithComputedWidth = words.map(function (word) { return ({ word: word, width: DOMUtils_1.getStringSize(word, style).width }); });
        var spaceWidth = breakAll ? 0 : DOMUtils_1.getStringSize('\u00A0', style).width;
        return { wordsWithComputedWidth: wordsWithComputedWidth, spaceWidth: spaceWidth };
    }
    catch (e) {
        return null;
    }
};
var calculateWordsByLines = function (_a, initialWordsWithComputedWith, spaceWidth, lineWidth, scaleToFit) {
    var maxLines = _a.maxLines, children = _a.children, style = _a.style, breakAll = _a.breakAll;
    var shouldLimitLines = DataUtils_1.isNumber(maxLines);
    var text = children;
    var calculate = function (words) {
        if (words === void 0) { words = []; }
        return words.reduce(function (result, _a) {
            var word = _a.word, width = _a.width;
            var currentLine = result[result.length - 1];
            if (currentLine &&
                (lineWidth == null || scaleToFit || currentLine.width + width + spaceWidth < Number(lineWidth))) {
                currentLine.words.push(word);
                currentLine.width += width + spaceWidth;
            }
            else {
                var newLine = { words: [word], width: width };
                result.push(newLine);
            }
            return result;
        }, []);
    };
    var originalResult = calculate(initialWordsWithComputedWith);
    var findLongestLine = function (words) {
        return words.reduce(function (a, b) { return (a.width > b.width ? a : b); });
    };
    if (!shouldLimitLines) {
        return originalResult;
    }
    var suffix = '…';
    var checkOverflow = function (index) {
        var tempText = text.slice(0, index);
        var words = calculateWordWidths({
            breakAll: breakAll,
            style: style,
            children: tempText + suffix,
        }).wordsWithComputedWidth;
        var result = calculate(words);
        var doesOverflow = result.length > maxLines || findLongestLine(result).width > Number(lineWidth);
        return [doesOverflow, result];
    };
    var start = 0;
    var end = text.length - 1;
    var iterations = 0;
    var trimmedResult;
    while (start <= end && iterations <= text.length - 1) {
        var middle = Math.floor((start + end) / 2);
        var prev = middle - 1;
        var _b = checkOverflow(prev), doesPrevOverflow = _b[0], result = _b[1];
        var doesMiddleOverflow = checkOverflow(middle)[0];
        if (!doesPrevOverflow && !doesMiddleOverflow) {
            start = middle + 1;
        }
        if (doesPrevOverflow && doesMiddleOverflow) {
            end = middle - 1;
        }
        if (!doesPrevOverflow && doesMiddleOverflow) {
            trimmedResult = result;
            break;
        }
        iterations++;
    }
    return trimmedResult || originalResult;
};
var getWordsWithoutCalculate = function (children) {
    var words = !lodash_1.default.isNil(children) ? children.toString().split(BREAKING_SPACES) : [];
    return [{ words: words }];
};
var getWordsByLines = function (_a) {
    var width = _a.width, scaleToFit = _a.scaleToFit, children = _a.children, style = _a.style, breakAll = _a.breakAll, maxLines = _a.maxLines;
    if ((width || scaleToFit) && !Global_1.Global.isSsr) {
        var wordsWithComputedWidth = void 0, spaceWidth = void 0;
        var wordWidths = calculateWordWidths({ breakAll: breakAll, children: children, style: style });
        if (wordWidths) {
            var wcw = wordWidths.wordsWithComputedWidth, sw = wordWidths.spaceWidth;
            wordsWithComputedWidth = wcw;
            spaceWidth = sw;
        }
        else {
            return getWordsWithoutCalculate(children);
        }
        return calculateWordsByLines({ breakAll: breakAll, children: children, maxLines: maxLines, style: style }, wordsWithComputedWidth, spaceWidth, width, scaleToFit);
    }
    return getWordsWithoutCalculate(children);
};
var DEFAULT_FILL = '#808080';
var Text = function (_a) {
    var _b = _a.x, propsX = _b === void 0 ? 0 : _b, _c = _a.y, propsY = _c === void 0 ? 0 : _c, _d = _a.lineHeight, lineHeight = _d === void 0 ? '1em' : _d, _e = _a.capHeight, capHeight = _e === void 0 ? '0.71em' : _e, _f = _a.scaleToFit, scaleToFit = _f === void 0 ? false : _f, _g = _a.textAnchor, textAnchor = _g === void 0 ? 'start' : _g, _h = _a.verticalAnchor, verticalAnchor = _h === void 0 ? 'end' : _h, _j = _a.fill, fill = _j === void 0 ? DEFAULT_FILL : _j, props = __rest(_a, ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"]);
    var wordsByLines = react_1.useMemo(function () {
        return getWordsByLines({
            breakAll: props.breakAll,
            children: props.children,
            maxLines: props.maxLines,
            scaleToFit: scaleToFit,
            style: props.style,
            width: props.width,
        });
    }, [props.breakAll, props.children, props.maxLines, scaleToFit, props.style, props.width]);
    var dx = props.dx, dy = props.dy, angle = props.angle, className = props.className, breakAll = props.breakAll, textProps = __rest(props, ["dx", "dy", "angle", "className", "breakAll"]);
    if (!DataUtils_1.isNumOrStr(propsX) || !DataUtils_1.isNumOrStr(propsY)) {
        return null;
    }
    var x = propsX + (DataUtils_1.isNumber(dx) ? dx : 0);
    var y = propsY + (DataUtils_1.isNumber(dy) ? dy : 0);
    var startDy;
    switch (verticalAnchor) {
        case 'start':
            startDy = "calc(" + capHeight + ")";
            break;
        case 'middle':
            startDy = "calc(" + (wordsByLines.length - 1) / 2 + " * -" + lineHeight + " + (" + capHeight + " / 2))";
            break;
        default:
            startDy = "calc(" + (wordsByLines.length - 1) + " * -" + lineHeight + ")";
            break;
    }
    var transforms = [];
    if (scaleToFit) {
        var lineWidth = wordsByLines[0].width;
        var width = props.width;
        transforms.push("scale(" + (DataUtils_1.isNumber(width) ? width / lineWidth : 1) / lineWidth + ")");
    }
    if (angle) {
        transforms.push("rotate(" + angle + ", " + x + ", " + y + ")");
    }
    if (transforms.length) {
        textProps.transform = transforms.join(' ');
    }
    return (react_1.default.createElement("text", __assign({}, ReactUtils_1.filterProps(textProps, true), { x: x, y: y, className: classnames_1.default('recharts-text', className), textAnchor: textAnchor, fill: fill.includes('url') ? DEFAULT_FILL : fill }), wordsByLines.map(function (line, index) { return (react_1.default.createElement("tspan", { x: x, dy: index === 0 ? startDy : lineHeight, key: index }, line.words.join(breakAll ? '' : ' '))); })));
};
exports.Text = Text;
//# sourceMappingURL=Text.js.map