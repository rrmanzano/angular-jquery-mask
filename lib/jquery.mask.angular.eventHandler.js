/// <reference path="../typings/index.d.ts" />
/// <reference path="jquery.mask.angular.d.ts" />
var AngularMaskPluginUtils;
(function (AngularMaskPluginUtils) {
    var EventHandler = (function () {
        function EventHandler($scope) {
            var _this = this;
            this.foo = function (args) { };
            this.action = function () {
                var items = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    items[_i - 0] = arguments[_i];
                }
                var fn = _this.$scope.$parent.$eval(_this.propertyName);
                if (!fn) {
                    return;
                }
                if (!_this.$scope.$root.$$phase) {
                    _this.$scope.$parent.$apply(function () {
                        fn.apply(_this.$scope.$parent, items);
                    });
                }
                else {
                    fn.apply(_this.$scope.$parent, items);
                }
            };
            this.$scope = $scope;
        }
        return EventHandler;
    }());
    AngularMaskPluginUtils.EventHandler = EventHandler;
})(AngularMaskPluginUtils || (AngularMaskPluginUtils = {}));
//# sourceMappingURL=jquery.mask.angular.eventHandler.js.map