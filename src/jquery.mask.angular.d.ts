interface JQuery
{
    cleanVal(): any;
    masked(value:any): any;
    mask(maskInput: string, options: any): any;
    unmask():any;
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