import { ICliente, IOrder, IOrderItem, IProducto, PrintComprobanteTicketProps } from "@/interfaces";
import { IBilling } from '../interfaces/billing';


interface ISlot{
    id: number;
    description: string;
    capacity: number;
    crew: number;
    height: number;
    long: number;
}
interface IPageTemplate{
    title?: string;
    slots: ISlot[]
}
interface IPages{
    id: number;
    name: string;
    description: string;
    link: string;
    isHomeLink: boolean;
    isDefault: boolean;
    order: number;
    template?: IPageTemplate; //Por revisar su utilidad, aca es como pre registrar las camillas
}
interface ICompanyParams{
    company: string
    description: string
    pages: IPages[]
}

interface SeedData {
    params: ICompanyParams;
}

export var initialData: SeedData= {
    params:{
        company: "EL PAISA",
        description: "Servicio de lavado de carros",
        pages: [
            { id: 1, name: "Ordenes", order: 1, description: "Registro de ordenes a realizar", link:"/", isHomeLink: true, isDefault : true },
            { id: 2, name: "Histórico", order: 2, description: "Historico de servicios realizados", link:"/historico", isHomeLink: true, isDefault : false },
            { id: 3, name: "Perfil", order: 1, description: "Perfil del operador", link:"/profile", isHomeLink: false, isDefault : false },
            { id: 4, name: "Productos", order: 2, description: "Perfil del operador", link:"/products", isHomeLink: false, isDefault : false },
        ]
    },

}

const bill: ICliente = {
    tipo_documento: 0,
    numero_documento: "",
    razon_social: "",
    direccion: "",
    vehiculos: ""
}

export const initialDataPrintComprobanteTicket: PrintComprobanteTicketProps = {
    bill: {
        tipo_comprobante: "",
        fecha_emision: new Date(),
        total_gravadas: 0,
        total_igv: 0,
        total_venta: 0,
        pago_tarjeta: 0,
        pago_efectivo: 0,
        pago_yape: 0,
        tipo_facturacion: ""
    },
    client: {
        tipo_documento: 0,
        numero_documento: "",
        razon_social: "",
        direccion: "",
        vehiculos: ""
    }
}