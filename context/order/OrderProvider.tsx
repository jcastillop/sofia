'use client'
import { FC, ReactNode, useEffect, useReducer } from 'react';
import axios from 'axios';



import { OrderContext, orderReducer } from '.';
import { spaxionApi } from '@/api';
import { ICartProduct, ShippingAddress, IOrder, IOrderItem } from '@/interfaces';
import { IClientPlaca } from '../../interfaces/client';
import { formatDecimals } from '@/helpers';

export interface OrderState {
    isLoaded        : boolean;
    placa           : string;
    numberOfItems   : number;
    subTotal        : number;
    tax             : number;
    total           : number;
    isPaid          : boolean;
    state           : number;
    orderItems      : IOrderItem[];

    // shippingAddress?: ShippingAddress;
}

const ORDER_INITIAL_STATE: OrderState = {
    isLoaded: false,
    placa: "",
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    isPaid: false,
    state: 0,
    orderItems: []
}

interface Props {
    children?: ReactNode;
}


export const OrderProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( orderReducer , ORDER_INITIAL_STATE );

    useEffect(() => {
        const numberOfItems = state.orderItems.reduce( (prev, current) => current.quantity + prev, 0 )
        const subTotal = state.orderItems.reduce( ( prev, current ) => current.tot_price + prev, 0 );
        const taxRate =  Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

        const orderSummary = {
            numberOfItems,
            subTotal,
            tax: formatDecimals(subTotal * taxRate),
            total: formatDecimals(subTotal * ( taxRate + 1 ))
        }
        
        dispatch({ type: '[Order] - Update order summary', payload: orderSummary });

    }, [state.orderItems])
    

    const setOrder = (order: IOrder) => {
        dispatch({ type: '[Order] - Clean order' });
        dispatch({ type: '[Order] - Set order', payload: order });
    }

    const addItemToOrder = ( item: IOrderItem ) => {
        const productInCart = state.orderItems.some( p => p.uid === item.uid );
        if ( !productInCart ) return dispatch({ type: '[Order] - Update items in order', payload: [...state.orderItems, item ] })
        // Acumular
        const updatedProducts = state.orderItems.map( p => {
            if ( p.uid !== item.uid ) return p;
            // Actualizar la cantidad
            p.quantity += item.quantity;
            return p;
        });
        dispatch({ type: '[Order] - Update items in order', payload: updatedProducts });
    }

    const updateOrderItemQuantity = ( item: IOrderItem, newQuantityValue: number ) => {
        item.quantity = newQuantityValue
        item.tot_price = formatDecimals(newQuantityValue * item.unit_price)
        item.tot_value = formatDecimals(newQuantityValue * item.unit_value)
        dispatch({ type: '[Order] - Change order item quantity', payload: item });
    }    

    return (
        <OrderContext.Provider value={{
            ...state,
            // Methods
            addItemToOrder,
            updateOrderItemQuantity,
            setOrder
        }}>
            { children }
        </OrderContext.Provider>
    )
};