import { IUser } from ".";

export interface ICartProduct {
    uid: string;
    name: string;
    category: string;
    code: string;
    sunat_code: string;
    discount: number;
    description: string;
    unit_price: number;
    unit_value: number;
    unit_measure: string;
    quantity: number;

    user?: IUser;
    createdAt?: string;
    updatedAt?: string;       
}
