import { IEmpresa, IAplicacion, ICategoria } from '.';

export interface IProducto {
    uid?: string;
    nombre: string; 
    codigo: string;
    codigo_sunat: string;
    descuento: number;
    descripcion: string;
    precio_unitario: number;
    unidad_medida: string;
    valor_unitario: number;

    categoria: ICategoria;
    aplicacion: IAplicacion;
    empresa: IEmpresa;    

    creado?: string;
    actualizado?: string;     
}

export interface IProductoStorage {
    uid?: string;
    nombre: string; 
    codigo: string;
    codigo_sunat: string;
    descuento: number;
    descripcion: string;
    precio_unitario: number;
    unidad_medida: string;
    valor_unitario: number;

    categoria: string;
    aplicacion: string;
    empresa: string;    

    creado?: string;
    actualizado?: string;     
}

export type ICategory = 'product'|'service';