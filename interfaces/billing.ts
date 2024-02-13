import { IUser } from ".";
import { IClient } from "./client";
import { ISupplier } from "./supplier";

type ValidStates = 'CREATED'|'SEND'|'ERROR'|'SUCCESS'|'INFO';

export interface IBilling {
    id?: number;
    cliente: IClient;
    emisor: ISupplier;
    tipo_comprobante: string;
    numeracion_comprobante: string;
    fecha_emision: Date;
    moneda: string;
    tipo_operacion: string;
    tipo_nota: string;
    tipo_documento_afectado: string;
    numeracion_documento_afectado: string;
    fecha_documento_afectado: string;
    motivo_documento_afectado: string;
    gravadas: number;
    total_igv: number;
    total_venta: number;
    monto_letras: string;
    cadena_para_codigo_qr: string;
    codigo_hash: string;
    pdf: string;
    url: string;
    errors: string;
    id_abastecimiento: number;
    pistola: number;
    codigo_combustible: string;
    dec_combustible: string;
    volumen: number;
    fecha_abastecimiento: string;    
    tiempo_abastecimiento: number;
    volumen_tanque: number;
    comentario: string;    
    tarjeta: number;
    efectivo: number;
    placa: string;
    billete: number;
    ruc: string;
    yape: number;
    prefijo?: string;
    items: IBillingItem[];

    user?: IUser;
    createdAt?: string;
    updatedAt?: string;           
}
export interface IBillingItem {
    cantidad: number;
    precio: number;
    valor: number;
    igv: number;
    valor_venta: number;
    precio_venta: number;
    descripcion: string;
    codigo_producto: string;
    medida: string;

    user?: IUser;
    createdAt?: string;
    updatedAt?: string;           
}
export interface IBillingState {
    uid: string;
    envio: string;
    respuesta: string;
    estado: ValidStates;
    user?: IUser;
    createdAt?: string;
    updatedAt?: string;       
}