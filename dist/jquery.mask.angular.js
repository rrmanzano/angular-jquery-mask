/**
 * angular-jquery-mask - v0.1
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
            var evMap = attrs.maskEvents.split(';');
            for (var i = 0; i < evMap.length; i++) {
                if (evMap[i].length > 0) {
                    var map = evMap[i].split(':');
                    var name = map[0];
                    var cb = map[1];

                    options[name] = function () {
                      var args = arguments;
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

                    };

                }
            }
          }
        }

        mapEvents();
        element.mask(attrs.maskInput, options);
      }
    };
  });