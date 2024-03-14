import { IUser } from ".";

export interface ICliente {
    _id?: string;
    tipo_documento: number;
    numero_documento: string;
    nombre_comercial?: string;
    razon_social: string;
    ubigeo?: string;
    direccion: string;
    correo?: string;
    telefonos?: string[]|string;
    vehiculos: IClienteVehiculo[]|string;
    
    user?: IUser;
    createdAt?: string;
    updatedAt?: string;    
}

export interface IClienteVehiculo {
    placa: string;

    user?: IUser;
    createdAt?: string;
    updatedAt?: string;        
}
