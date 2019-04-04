(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var BaseShape = /** @class */ (function () {
        function BaseShape(canvas) {
            this.ctx = canvas;
        }
        BaseShape.prototype.drawPixel = function (x, y) {
            this.ctx.fillRect(x, y, 1, 1);
        };
        BaseShape.prototype.draw = function () {
            throw new Error("You should implement draw function");
        };
        return BaseShape;
    }());
    exports["default"] = BaseShape;
});
