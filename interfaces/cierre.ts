import { IUser } from ".";

export interface ICierre {
    _id?: string;
    usuario: IUser;
    total: Number;
    fecha: Date;
    tarjeta: Number;
    efectivo: Number;
    yape: Number;
    estado?: boolean;   
}