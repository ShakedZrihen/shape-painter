var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./components/circle"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var circle_1 = __importDefault(require("./components/circle"));
    var canvas = document.getElementById("canvas"); // Create new canvas
    var ctx = canvas.getContext("2d"); // Set canves to 2d canvac
    var canvasElement = document.getElementById("canvas");
    canvasElement.addEventListener("click", function (event) {
        var xposFirst = event.clientX;
        var yposFirst = event.clientY;
        var circle = new circle_1["default"](xposFirst, yposFirst, 25, ctx);
        circle.draw();
    });
});
