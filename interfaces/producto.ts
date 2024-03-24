import { IEmpresa, IAplicacion, ICategoria } from '.';

export interface IProducto {
    _id?: string;
    nombre: string; 
    codigo: string;
    codigo_sunat: string;
    descuento: number;
    descripcion: string;
    precio_unitario: number;
    unidad_medida: string;
    valor_unitario: number;

    categoria: ICategoria|string;

    img?: string;
    creado?: string;
    actualizado?: string;     
}

export type ICategory = 'product'|'service';