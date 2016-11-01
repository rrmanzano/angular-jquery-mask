/**
 * angular-jquery-mask - v0.2
 * A simple wrapper for jquery.mask.js by @igorescobar. This directive allows you to add a mask based on jquery.mask.js plugin.
 * https://github.com/rrmanzano/angular-jquery-mask
 * License: MIT http://opensource.org/licenses/MIT
 */
angular
  .module('angular-mask-plugin', [])
  .directive('maskInput', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        options: '=?maskOptions'
      },
      link: function(scope, element, attrs, ngModel) {

        var options = {};
        if (scope.options){
          options = scope.$eval(attrs.maskOptions);
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
            var events = scope.$eval(attrs.maskEvents);
            for (var prop in events) {
                if (events[prop]) {
                    (function () {
                        var propName = prop;
                        function action() {
                          var args = arguments;
                          var cb = events[propName];
                          var fn = scope.$parent.$eval(cb);
                          if (!fn)
                          {
                            return;
                          }

                          if (!scope.$root.$$phase) {
                              scope.$parent.$apply(function () {
                                  fn.apply(scope.$parent, args);
                              });
                          } else {
                              fn.apply(scope.$parent, args);
                          }
                        }

                        options[prop] = action;
                    } ());
                }
            }
          }
        }

        mapEvents();
        element.mask(attrs.maskInput, options);
      }
    };
  });