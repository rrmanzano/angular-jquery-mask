/// <reference path="../typings/index.d.ts" />

interface JQuery
{
    cleanVal();
    masked(value:any);
    mask(maskInput: string, options: any);
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