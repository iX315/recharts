"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessibilityManager = void 0;
var AccessibilityManager = (function () {
    function AccessibilityManager() {
        this.activeIndex = 0;
        this.coordinateList = [];
        this.layout = 'horizontal';
    }
    AccessibilityManager.prototype.setDetails = function (_a) {
        var _b = _a.coordinateList, coordinateList = _b === void 0 ? [] : _b, _c = _a.container, container = _c === void 0 ? null : _c, _d = _a.layout, layout = _d === void 0 ? null : _d, _e = _a.offset, offset = _e === void 0 ? null : _e, _f = _a.mouseHandlerCallback, mouseHandlerCallback = _f === void 0 ? null : _f;
        this.coordinateList = coordinateList !== null && coordinateList !== void 0 ? coordinateList : this.coordinateList;
        this.container = container !== null && container !== void 0 ? container : this.container;
        this.layout = layout !== null && layout !== void 0 ? layout : this.layout;
        this.offset = offset !== null && offset !== void 0 ? offset : this.offset;
        this.mouseHandlerCallback = mouseHandlerCallback !== null && mouseHandlerCallback !== void 0 ? mouseHandlerCallback : this.mouseHandlerCallback;
        this.activeIndex = Math.min(Math.max(this.activeIndex, 0), this.coordinateList.length - 1);
    };
    AccessibilityManager.prototype.focus = function () {
        this.spoofMouse();
    };
    AccessibilityManager.prototype.keyboardEvent = function (e) {
        if (this.coordinateList.length === 0) {
            return;
        }
        switch (e.key) {
            case 'ArrowRight': {
                if (this.layout !== 'horizontal') {
                    return;
                }
                this.activeIndex = Math.min(this.activeIndex + 1, this.coordinateList.length - 1);
                this.spoofMouse();
                break;
            }
            case 'ArrowLeft': {
                if (this.layout !== 'horizontal') {
                    return;
                }
                this.activeIndex = Math.max(this.activeIndex - 1, 0);
                this.spoofMouse();
                break;
            }
            default: {
                break;
            }
        }
    };
    AccessibilityManager.prototype.spoofMouse = function () {
        if (this.layout !== 'horizontal') {
            return;
        }
        if (this.coordinateList.length === 0) {
            return;
        }
        var _a = this.container.getBoundingClientRect(), x = _a.x, y = _a.y, height = _a.height;
        var coordinate = this.coordinateList[this.activeIndex].coordinate;
        var pageX = x + coordinate;
        var pageY = y + this.offset.top + height / 2;
        this.mouseHandlerCallback({ pageX: pageX, pageY: pageY });
    };
    return AccessibilityManager;
}());
exports.AccessibilityManager = AccessibilityManager;
//# sourceMappingURL=AccessibilityManager.js.map