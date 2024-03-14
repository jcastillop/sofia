import { IUser } from ".";
import { ICliente } from "./cliente";

export interface IOrder {

    _id?        : string;
    codigo      : string;
    fecha       : Date;
    subTotal    : number;
    igv         : number;
    total       : number;
    comentario  : string;
    isPaid      : boolean;
    numeroitems : number;
    orderitems  : IOrderItem[];
    estado?     : boolean;

    cliente?    : ICliente;
    usuario     : string;

    createdAt?  : string;
    updatedAt?  : string;
    
}

export interface IOrderItem {
    _id?: string;

    nombre: string;
    categoria: string;
    codigo: string;
    codigo_sunat: string;
    cantidad: number;
    descripcion: string;
    precio_unitario: number;
    valor_unitario: number;
    unidad_medida: string;
    precio_total: number;
    valor_total: number;
    igv: number;
    igv_total: number;
    descuento: number;
    producto?: string;
    fecha?: Date;
    fecha_actualizacion?: Date;
    estado?: boolean;
    usuario?: string|IUser;

    createdAt?: string;
    updatedAt?: string;    
}

export interface ShippingAddress {
    firstName: string;
    lastName : string;
    address  : string;
    address2?: string;
    zip      : string;
    city     : string;
    country  : string;
    phone    : string;

    createdAt?: string;
    updatedAt?: string;    
}