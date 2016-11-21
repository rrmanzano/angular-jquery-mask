/// <reference path="../typings/index.d.ts" />
/// <reference path="jquery.mask.angular.d.ts" />
/// <reference path="jquery.mask.angular.eventHandler.ts" />
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
        // To solve the minification problem
        MaskDirective.$inject = ["$scope", "element", "attrs", "ngModel"];
        return MaskDirective;
    }());
    AngularMaskPlugin.MaskDirective = MaskDirective;
})(AngularMaskPlugin || (AngularMaskPlugin = {}));
angular
    .module('angular-mask-plugin', [])
    .directive('maskInput', function () { return new AngularMaskPlugin.MaskDirective; });
//# sourceMappingURL=jquery.mask.angular.js.map