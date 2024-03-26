import { IRol, IEmpresa } from ".";
import { IAplicacion } from "./aplicacion";

export interface IUser {
    _id?: string;
    usuario: string;
    nombre: string;
    correo: string;        
    password?: string;  
    rol?: IRol | string;
    aplicacion?: IAplicacion | string;
    empresa?: IEmpresa | string;
    estado?: boolean;
}