"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BreakablePromise = /** @class */ (function () {
    function BreakablePromise(promise) {
        this.unbroken = true;
        this.promise = promise;
    }
    BreakablePromise.prototype.then = function (handler) {
        var _this = this;
        this.promise = this.promise.then(function (result) {
            if (_this.unbroken)
                return handler(result);
        });
        return this;
    };
    BreakablePromise.prototype.catch = function (handler) {
        var _this = this;
        this.promise = this.promise.catch(function (result) {
            if (_this.unbroken)
                return handler(result);
        });
        return this;
    };
    BreakablePromise.prototype.break = function (handler) {
        var _this = this;
        this.promise = this.promise.catch(function (result) {
            if (_this.unbroken) {
                _this.unbroken = false;
                return handler(result);
            }
        });
        return this;
    };
    BreakablePromise.prototype.broken = function (handler) {
        var _this = this;
        this.promise = this.promise.then(function (result) {
            if (!_this.unbroken) {
                return handler(result);
            }
        });
        return this;
    };
    return BreakablePromise;
}());
exports.BreakablePromise = BreakablePromise;
//# sourceMappingURL=breakable-promise.js.map