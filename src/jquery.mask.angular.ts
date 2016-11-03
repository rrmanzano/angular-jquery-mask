/// <reference path="../typings/index.d.ts" />
/// <reference path="jquery.mask.angular.d.ts" />

/**
 * angular-jquery-mask - v0.3
 * A simple wrapper for jquery.mask.js by @igorescobar. This directive allows you to add a mask based on jquery.mask.js plugin.
 * https://github.com/rrmanzano/angular-jquery-mask
 * License: MIT http://opensource.org/licenses/MIT
 */

module AngularMaskPlugin
{
    export class MaskDirective implements ng.IDirective
    {        
        public restrict = 'A';
        public require = 'ngModel';
        public scope = {
            options: '=?maskOptions'
        };

        public link($scope: IScopeMaskDirective, element: JQuery, attrs: IAttributesMaskDirective, ngModel: ng.INgModelController)
        {

            var options = {};
            if ($scope.options){
                options = $scope.$eval(attrs.maskOptions);
            }

            ngModel.$parsers.push(function (value) {
              if (!attrs.maskModelClean){
                return value;
              }else{
                return element.cleanVal();
              }
            });

            ngModel.$formatters.push(function (value) {
              return element.masked(value);
            });

            var mapEvents = function(){
              if (attrs.maskEvents){
                var events = $scope.$eval(attrs.maskEvents);
                for (var prop in events) {
                    if (events[prop]) {
                        var event = new EventHandler($scope);
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

    export class EventHandler {
        private $scope: IScopeMaskDirective;
        public propertyName: string;
        public foo = (args: any) => {};

        constructor($scope: IScopeMaskDirective){
            this.$scope = $scope;
        }

        public action = (...items: any[]):void =>
        {
            var fn = this.$scope.$parent.$eval(this.propertyName);
            if (!fn)
            {
                return;
            }

            if (!this.$scope.$root.$$phase) {
                this.$scope.$parent.$apply(() => {
                    fn.apply(this.$scope.$parent, items);
                });
            } else {
                fn.apply(this.$scope.$parent, items);
            }
        }

    }
}

angular
    .module('angular-mask-plugin', [])
    .directive('maskInput', () => new AngularMaskPlugin.MaskDirective);