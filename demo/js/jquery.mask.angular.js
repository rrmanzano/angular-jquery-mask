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

        var options = {}, mappedEvents = new Array();
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

        var callEvent = function(){
          var args = arguments;
          var cb = args[0];
          args = args[1];

          var mapped = mappedEvents.find(function(x) { return x.fn == cb });
          if (!mapped){
            return;
          }

          var fn = scope.$parent.$eval(mapped.fn);
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

        var mapEvents = function(){
          if (attrs.maskEvents){
            var evMap = attrs.maskEvents.split(';');
            for (var i = 0; i < evMap.length; i++) {
                if (evMap[i].length > 0) {
                    var map = evMap[i].split(':');
                    var name = map[0];
                    var cb = map[1];

                    mappedEvents.push({ name:name, fn: cb });
                    options[name] = function () {
                      callEvent(cb, arguments);
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