var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./point", "./base_shape"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var point_1 = require("./point");
    var base_shape_1 = __importDefault(require("./base_shape"));
    var Circle = /** @class */ (function (_super) {
        __extends(Circle, _super);
        function Circle(x, y, radios, canvas) {
            var _this = _super.call(this, canvas) || this;
            _this.center = new point_1.Point(x, y);
            _this.radius = radios;
            return _this;
        }
        Circle.prototype.draw = function () {
            console.log("printing circle");
            var x = this.radius;
            var y = 0;
            var radiusError = 1 - x;
            while (x >= y) {
                this.drawPixel(x + this.center.x, y + this.center.y);
                this.drawPixel(y + this.center.x, x + this.center.y);
                this.drawPixel(-x + this.center.x, y + this.center.y);
                this.drawPixel(-y + this.center.x, x + this.center.y);
                this.drawPixel(-x + this.center.x, -y + this.center.y);
                this.drawPixel(-y + this.center.x, -x + this.center.y);
                this.drawPixel(x + this.center.x, -y + this.center.y);
                this.drawPixel(y + this.center.x, -x + this.center.y);
                y++;
                if (radiusError < 0) {
                    radiusError += 2 * y + 1;
                }
                else {
                    x--;
                    radiusError += 2 * (y - x + 1);
                }
            }
        };
        return Circle;
    }(base_shape_1["default"]));
    exports["default"] = Circle;
});
