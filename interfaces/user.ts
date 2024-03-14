import { IRol, IEmpresa } from ".";
import { IAplicacion } from "./aplicacion";

export interface IUser {
    _id?: string;
    usuario: string;
    nombre: string;
    correo: string;        
    rol: IRol;
    aplicacion: IAplicacion;
    empresa: IEmpresa;
    estado?: boolean;
}