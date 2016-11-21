/**
 * angular-jquery-mask - v0.4
 * A simple wrapper for jquery.mask.js by @igorescobar. This directive allows you to add a mask based on jquery.mask.js plugin.
 * https://github.com/rrmanzano/angular-jquery-mask
 * License: MIT http://opensource.org/licenses/MIT
 **/
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
var AngularMaskPlugin;
(function (AngularMaskPlugin) {
    var MaskDirective = (function () {
        function MaskDirective() {
            this.restrict = 'A';
            this.require = 'ngModel';
            this.scope = {
                options: '=?maskOptions'
            };
        }
        MaskDirective.prototype.link = function ($scope, element, attrs, ngModel) {
            var options = {};
            if ($scope.options) {
                angular.copy($scope.options, options);
            }
            ngModel.$parsers.push(function (value) {
                if (!attrs.maskModelClean) {
                    return value;
                }
                else {
                    return element.cleanVal();
                }
            });
            ngModel.$formatters.push(function (value) {
                return element.masked(value);
            });
            var mapEvents = function () {
                if (attrs.maskEvents) {
                    var events = $scope.$eval(attrs.maskEvents);
                    for (var prop in events) {
                        if (events[prop]) {
                            var event = new AngularMaskPluginUtils.EventHandler($scope);
                            event.propertyName = events[prop];
                            options[prop] = event.action;
                        }
                    }
                }
            };
            mapEvents();
            element.mask(attrs.maskInput, options);
        };
        MaskDirective.$inject = ["$scope", "element", "attrs", "ngModel"];
        return MaskDirective;
    }());
    AngularMaskPlugin.MaskDirective = MaskDirective;
})(AngularMaskPlugin || (AngularMaskPlugin = {}));
angular
    .module('angular-mask-plugin', [])
    .directive('maskInput', function () { return new AngularMaskPlugin.MaskDirective; });
