import { IAplicacion } from './aplicacion';
import { IEmpresa } from './empresa';

export interface IParametros {
    aplicacion  : IAplicacion;
    empresa     : IEmpresa;
    company     : string;
    descripcion : string;
    paginas     : IPage[];
    estado?     : boolean;
}

export interface IPage {
    _id?        : string;
    nombre      : string;
    orden       : number;
    descripcion : string;
    link        : string;
    ishomelink  : boolean;
    isdefault   : boolean;
    estado?     : boolean;    
}