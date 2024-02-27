import { IOrder, IOrderItem, IProduct } from "@/interfaces";
import { IClient } from "@/interfaces/client";

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
    orders: IOrder[];
    products: IProduct[];
    params: ICompanyParams;
}

export var initialData: SeedData= {
    params:{
        company: "EL PAISA",
        description: "Servicio de lavado de carros",
        pages: [
            { id: 1, name: "Ordenes", order: 1, description: "Registro de ordenes a realizar", link:"/", isHomeLink: true, isDefault : true },
            { id: 2, name: "Histórico", order: 2, description: "Historico de servicios realizados", link:"/history", isHomeLink: true, isDefault : false },
            { id: 3, name: "Perfil", order: 1, description: "Perfil del operador", link:"/profile", isHomeLink: false, isDefault : false },
            { id: 4, name: "Productos", order: 2, description: "Perfil del operador", link:"/products", isHomeLink: false, isDefault : false },
        ]
    },
    products:[
        {
            uid: "1",
            name: "Servicio de lavado de carros 1",
            category: "service",
            code: "123",
            sunat_code: "123",
            discount: 0,
            description: "Servicio de lavado de carros autos",
            unit_price: 123,
            unit_value: 123,
            unit_measure: "NIU"
        },
        {
            uid: "2",
            name: "Aromatizador para vehiculo 2",
            category: "product",
            code: "123",
            sunat_code: "123",
            discount: 0,
            description: "Aromatizador para vehiculo pino",
            unit_price: 123,
            unit_value: 123,
            unit_measure: "NIU"
        },        
        {
            uid: "3",
            name: "Liquido refrigerante",
            category: "product",
            code: "123",
            sunat_code: "123",
            discount: 0,
            description: "Servicio de lavado de carros autos",
            unit_price: 123,
            unit_value: 123,
            unit_measure: "NIU"
        },
        {
            uid: "4",
            name: "Aromatizador para vehiculo 4",
            category: "product",
            code: "123",
            sunat_code: "123",
            discount: 0,
            description: "Aromatizador para vehiculo pino",
            unit_price: 123,
            unit_value: 123,
            unit_measure: "NIU"
        }, 
        {
            uid: "5",
            name: "Servicio de lavado de carros 5",
            category: "service",
            code: "123",
            sunat_code: "123",
            discount: 0,
            description: "Servicio de lavado de carros autos",
            unit_price: 123,
            unit_value: 123,
            unit_measure: "NIU"
        },
        {
            uid: "6",
            name: "Aromatizador para vehiculo 6",
            category: "product",
            code: "123",
            sunat_code: "123",
            discount: 0,
            description: "Aromatizador para vehiculo pino",
            unit_price: 123,
            unit_value: 123,
            unit_measure: "NIU"
        },        
        {
            uid: "7",
            name: "Cambio de aceite",
            category: "service",
            code: "123",
            sunat_code: "123",
            discount: 0,
            description: "Servicio de lavado de carros autos",
            unit_price: 123,
            unit_value: 123,
            unit_measure: "NIU"
        },
        {
            uid: "8",
            name: "Aromatizador para vehiculo 8",
            category: "product",
            code: "123",
            sunat_code: "123",
            discount: 0,
            description: "Aromatizador para vehiculo pino",
            unit_price: 123,
            unit_value: 123,
            unit_measure: "NIU"
        }, 
    ],
    orders: [
        {
            uid: 'OR001',
            numberOfItems: 3,
            subTotal: 123,
            tax: 321,
            placa:'B9S-432',
            client: {
                id_receptor: 1,
                tipo_documento: 3,
                numero_documento: "42187637",
                razon_social: "JORGE CASTILLO",
                direccion: "CALLE 5",
                correo: "JORGE@GMAIL",
                placas:[{placa: 'B9S-432'}],
            },
            total: 333,
            isPaid: false,
            state: 0,
            orderItems: [
                {
                    uid: '1',
                    name: "Servicio de lavado de carros 1",
                    category: "service",
                    code: "123",
                    sunat_code: "123",
                    discount: 123,
                    description: "123",
                    unit_price: 123,
                    unit_value: 123,
                    tot_price: 123,
                    tot_value: 123,                    
                    unit_measure: "123",
                    quantity: 10,
                    total: 123
                },
                {
                    uid: '2',
                    name: "Aromatizador para vehiculo 2",
                    category: "product",
                    code: "123",
                    sunat_code: "123",
                    discount: 123,
                    description: "123",
                    unit_price: 123,
                    unit_value: 123,
                    tot_price: 123,
                    tot_value: 123,                                        
                    unit_measure: "123",
                    quantity: 10,
                    total: 123
                },
                {
                    uid: '3',
                    name: "Liquido refrigerante",
                    category: "product",
                    code: "123",
                    sunat_code: "123",
                    discount: 123,
                    description: "123",
                    unit_price: 123,
                    unit_value: 123,
                    tot_price: 123,
                    tot_value: 123,                                        
                    unit_measure: "123",
                    quantity: 10,
                    total: 123
                }                               
            ]
        },
        {
            uid: 'OR002',
            numberOfItems: 3,
            subTotal: 123,
            tax: 321,
            placa:'D6T-565',
            client: {
                id_receptor: 2,
                tipo_documento: 3,
                numero_documento: "08811389",
                razon_social: "ROSA PEÑARANDA",
                direccion: "CALLE 5",
                correo: "JORGE@GMAIL",
                placas:[{placa: 'D6T-565'}],
            },
            total: 333,
            isPaid: false,
            state: 0,
            orderItems: [
                {
                    uid: "1",
                    name: "Servicio de lavado de carros 1",
                    category: "service",
                    code: "123",
                    sunat_code: "123",
                    discount: 123,
                    description: "123",
                    unit_price: 123,
                    unit_value: 123,
                    tot_price: 123,
                    tot_value: 123,                                        
                    unit_measure: "123",
                    quantity: 10,
                    total: 123
                },
                {
                    uid: "7",
                    name: "Cambio de aceite",
                    category: "service",
                    code: "123",
                    sunat_code: "123",
                    discount: 123,
                    description: "123",
                    unit_price: 123,
                    unit_value: 123,
                    tot_price: 123,
                    tot_value: 123,                                        
                    unit_measure: "123",
                    quantity: 10,
                    total: 123
                }                
            ]
        },
        {
            uid: 'OR003',
            numberOfItems: 3,
            subTotal: 123,
            tax: 321,
            placa:'D6T-565',
            client: {
                id_receptor: 2,
                tipo_documento: 3,
                numero_documento: "08811389",
                razon_social: "ROSA PEÑARANDA",
                direccion: "CALLE 5",
                correo: "JORGE@GMAIL",
                placas:[{placa: 'D6T-565'}],
            },
            total: 333,
            isPaid: false,
            state: 0,
            orderItems: [
                {
                    uid: "1",
                    name: "Servicio de lavado de carros 1",
                    category: "service",
                    code: "123",
                    sunat_code: "123",
                    discount: 123,
                    description: "123",
                    unit_price: 123,
                    unit_value: 123,
                    unit_measure: "123",
                    tot_price: 123,
                    tot_value: 123,                                        
                    quantity: 10,
                    total: 123
                },
                {
                    uid: "7",
                    name: "Cambio de aceite",
                    category: "service",
                    code: "123",
                    sunat_code: "123",
                    discount: 123,
                    description: "123",
                    unit_price: 123,
                    unit_value: 123,
                    tot_price: 123,
                    tot_value: 123,                                        
                    unit_measure: "123",
                    quantity: 3,
                    total: 123
                }                
            ]
        },
        {
            uid: 'OR004',
            numberOfItems: 3,
            subTotal: 123,
            tax: 321,
            placa:'D6T-565',
            client: {
                id_receptor: 2,
                tipo_documento: 3,
                numero_documento: "08811389",
                razon_social: "ROSA PEÑARANDA",
                direccion: "CALLE 5",
                correo: "JORGE@GMAIL",
                placas:[{placa: 'D6T-565'}],
            },
            total: 333,
            isPaid: false,
            state: 0,
            orderItems: [
                {
                    uid: "1",
                    name: "Servicio de lavado de carros 1",
                    category: "service",
                    code: "123",
                    sunat_code: "123",
                    discount: 123,
                    description: "123",
                    unit_price: 123,
                    unit_value: 123,
                    tot_price: 123,
                    tot_value: 123,                                        
                    unit_measure: "123",
                    quantity: 1,
                    total: 123
                },
                {
                    uid: "7",
                    name: "Cambio de aceite",
                    category: "service",
                    code: "123",
                    sunat_code: "123",
                    discount: 123,
                    description: "123",
                    unit_price: 123,
                    unit_value: 123,
                    tot_price: 123,
                    tot_value: 123,                                        
                    unit_measure: "123",
                    quantity: 2,
                    total: 123
                }                
            ]
        }   
    ]

}