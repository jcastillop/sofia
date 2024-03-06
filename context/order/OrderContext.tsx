'use client'
import { createContext } from 'react';
import { ICartProduct, IOrder, IOrderItem, ShippingAddress } from '../../interfaces';


interface ContextProps {
    isLoaded        : boolean;
    codigo          : string;
    numberOfItems   : number;
    subTotal        : number;
    tax             : number;
    total           : number;
    isPaid          : boolean;
    state           : number;
    orderItems      : IOrderItem[];

    // cart: ICartProduct[];
    // numberOfItems: number;
    // subTotal: number;
    // tax: number;
    // total: number;

    // shippingAddress?: ShippingAddress,

    // Methods
    setOrder: (order: IOrder) => void;
    addItemToOrder: (item: IOrderItem) => void;
    updateOrderItemQuantity: (item: IOrderItem, newQuantityValue: number) => void;

    // addProductToCart: (product: ICartProduct) => void;
    // lessProductToCart: (product: ICartProduct) => void;
    // updateCartQuantity: (product: ICartProduct) => void;
    // removeCartProduct: (product: ICartProduct) => void;
    // updateAddress: (address: ShippingAddress) => void;

    // Orders
    // createOrder: () => Promise<{ hasError: boolean; message: string; }>;
}


export const OrderContext = createContext({} as ContextProps );