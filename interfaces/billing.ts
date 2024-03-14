import { IEmpresa, IUser } from ".";
import { ICliente } from "./cliente";
import { ISupplier } from "./supplier";

type ValidStates = 'CREATED'|'TRANSLATED'|'SIGNED'|'SEND'|'RESPONSE'|'ERROR'|'SUCCESS'|'INFO';

export interface IBilling {
    _id?: string;
    cliente?: ICliente|string;
    serie?: string;
    tipo_comprobante: string;
    tipo_facturacion: string;
    numeracion_comprobante?: string;
    fecha_emision: Date;
    tipo_moneda?: string;
    tipo_operacion?: string;
    tipo_nota?: string;
    tipo_documento_afectado?: string;
    numeracion_documento_afectado?: string;
    fecha_documento_afectado?: string;
    motivo_documento_afectado?: string;
    total_gravadas: number;
    total_igv: number;
    total_venta: number;
    monto_letras?: string;
    cadena_para_codigo_qr?: string;
    codigo_hash?: string;
    pdf_bytes?: string;
    url?: string;
    errors?: string;
    pago_tarjeta: number;
    pago_efectivo: number;
    pago_yape: number;
    items?: IBillingItem[];
    estados?: IBillingState[];
    usuario?: string;
    createdAt?: Date;
    updatedAt?: Date;           
}
export interface IBillingItem {
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
    fecha?: Date;
    usuario?: IUser|string;
}
export interface IBillingState {
    _id: string;
    request: string;
    response: string;
    intentos_total: number;
    intentos_actual: number;
    fecha_emision: Date;
    value: ValidStates;
    estado: string;
    user?: IUser;
    createdAt?: string;
    updatedAt?: string;       
}