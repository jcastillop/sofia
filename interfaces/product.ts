export interface IProduct {
    uid?: string;
    name: string;
    category: ICategory;
    code: string;
    sunat_code: string;
    discount: number;
    description: string;
    unit_price: number;
    unit_value: number;
    unit_measure: string;

    createdAt?: string;
    updatedAt?: string; 
}

export type ICategory = 'product'|'service';