/// <reference path="../typings/index.d.ts" />

/**
 * angular-jquery-mask - v0.3
 * A simple wrapper for jquery.mask.js by @igorescobar. This directive allows you to add a mask based on jquery.mask.js plugin.
 * https://github.com/rrmanzano/angular-jquery-mask
 * License: MIT http://opensource.org/licenses/MIT
 */

interface JQuery
{
    cleanVal();
    masked(value:any);
}

interface IScopeMaskDirective extends ng.IScope
{
    options: string;
}

interface IAttributesMaskDirective extends ng.IAttributes
{
    options: string;
    maskOptions: string;
    maskModelClean: string;
    maskEvents: string;
    maskInput: string;
}

interface JQuery
{
    cleanVal();
    masked(value:any);
    mask(maskInput: string, options: any);
}
