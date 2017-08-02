/// <reference path="jquery.mask.angular.d.ts" />
/// <reference path="jquery.mask.angular.eventHandler.ts" />

module AngularMaskPlugin
{
    export class MaskDirective implements ng.IDirective
    {        
        public restrict = 'A';
        public require = 'ngModel';
        public scope = {
            options: '=?maskOptions'
        };

        // To solve the minification problem
        static $inject = ["$scope", "element", "attrs", "ngModel"];

        public link($scope: IScopeMaskDirective, element: JQuery, attrs: IAttributesMaskDirective, ngModel: ng.INgModelController)
        {

            var options = {} as any;
            if ($scope.options){
                angular.copy($scope.options, options);
            }

            ngModel.$parsers.push(function (value) {
              if (!attrs.maskModelClean){
                return value;
              }else{
                return element.cleanVal();
              }
            });

            ngModel.$formatters.push(function (value) {
                if (!value){
                    element.unmask().mask(attrs.maskInput, options);
                    return value;
                }

                return element.masked(value);
            });

            var mapEvents = function(){
              if (attrs.maskEvents){
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
        }
    }
}

angular
    .module('angular-mask-plugin', [])
    .directive('maskInput', () => new AngularMaskPlugin.MaskDirective);