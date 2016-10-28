# Angular-jquery-mask directive

A simple wrapper for jquery.mask.js by @igorescobar.
This directive allows you to add a mask based on jquery.mask.js plugin.

## Requirements

- AngularJS
- JQuery
- [jQuery-Mask-Plugin](http://igorescobar.github.io/jQuery-Mask-Plugin/)

## Oficial jQuery-Mask-Plugin page

[jQuery-Mask-Plugin](https://github.com/igorescobar/jQuery-Mask-Plugin)

### Installation

Because this is just a wrapper for jquery.mask.js, you need to have it and all of its dependencies installed as a prerequisite.

Add angular-mask-plugin as a dependency to your application:

```
angular.module('app', ['angular-mask-plugin']);
```

### Usage

Minimal example

```
<input type="text" ng-model="maskedPhoneValue" mask-input="0000-0000" />
```

Clear mask

```
<input type="text" ng-model="maskedPhoneUSCleanValue" mask-model-clean="true" mask-input="(000) 000-0000" />
```

Add options

```
<input type="text" ng-model="maskedDatePlaceholder" mask-options="{placeholder: '__/__/____'}" mask-input="00/00/0000" />
```

Set value programmatically

```
<input type="text" ng-model="maskedCurrencyValue" mask-input="#'##0" mask-model-clean="true" mask-options="{reverse: true}" />
```

```
$scope.submit = function() { $scope.maskedCurrencyValue = 200000; };
```

Subscribe to an event

```
<input type="text" ng-model="maskedEventValue" mask-events="onChange:onChangeValue;" mask-input="00:00:00" />
```

```
$scope.onChangeValue = function() { console.log("onChange event"); };
```
