import { IUser } from ".";

export interface IClient {
    id_receptor: number;
    tipo_documento: number;
    numero_documento: string;
    razon_social: string;
    direccion: string;
    correo: string;
    placa?: string;
    
    user?: IUser;
    createdAt?: string;
    updatedAt?: string;    
}

export interface IClientPlaca {

    createdAt?: string;
    updatedAt?: string;        
}
