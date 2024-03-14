import { IBillingItem, IOrderItem, IUser } from "@/interfaces";

export class BillingItem implements IBillingItem{

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
    fecha?: Date;
    usuario?: string | IUser;

    constructor(orderitem: IOrderItem) {
      this.nombre = orderitem.nombre;
      this.categoria = orderitem.categoria;
      this.codigo = orderitem.codigo;
      this.codigo_sunat = orderitem.codigo_sunat;
      this.cantidad = orderitem.cantidad;
      this.descripcion = orderitem.descripcion;
      this.precio_unitario = orderitem.precio_unitario;
      this.valor_unitario = orderitem.valor_unitario;
      this.unidad_medida = orderitem.unidad_medida;    
      this.precio_total = orderitem.precio_total;    
      this.valor_total = orderitem.valor_total;    
      this.igv = orderitem.igv;    
      this.igv_total = orderitem.igv_total;    
      this.descuento = orderitem.descuento;    
      this.fecha = new Date()
    }
}