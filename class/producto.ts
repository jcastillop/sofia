import { Session } from "next-auth";
import { IProducto, IProductoStorage } from "@/interfaces";

export class ProductoStorage implements IProductoStorage{
    uid?: string | undefined;
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
    creado?: string | undefined;
    actualizado?: string | undefined;
    constructor(producto: IProducto) {
        this.nombre = producto.nombre
        this.codigo = producto.codigo
        this.codigo_sunat = producto.codigo_sunat
        this.descuento = producto.descuento
        this.descripcion = producto.descripcion
        this.precio_unitario = producto.precio_unitario
        this.unidad_medida = producto.unidad_medida
        this.valor_unitario = producto.valor_unitario
        this.categoria = producto.categoria.nombre
        this.aplicacion = producto.aplicacion.uid?producto.aplicacion.uid:""
        this.empresa = producto.empresa.uid?producto.empresa.uid:""
      }    
}