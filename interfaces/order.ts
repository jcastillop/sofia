import { IUser } from ".";
import { IClient } from "./client";

export interface IOrder {

    uid? : string;
    client?: IClient;
    orderItems: IOrderItem[];
    shippingAddress?: ShippingAddress;
    
    numberOfItems: number;
    subTotal     : number;
    tax          : number;
    total        : number;

    isPaid  : boolean;
    placa? : string;

    user?: IUser;
    createdAt?: string;
    updatedAt?: string;
    state:number;
}

export interface IOrderItem {
    uid?: string;
    name: string;
    category: string;
    code: string;
    sunat_code: string;
    discount: number;
    description: string;
    unit_price: number;
    unit_value: number;
    unit_measure: string;
    tot_price: number;
    tot_value: number;
    total: number;
    quantity: number;

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