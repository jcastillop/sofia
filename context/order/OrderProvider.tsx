'use client'
import { FC, ReactNode, useEffect, useReducer } from 'react';

import { OrderContext, orderReducer } from '.';
import { IOrder, IOrderItem } from '@/interfaces';
import { formatDecimals } from '@/helpers';

export interface OrderState {
    isLoaded        : boolean;
    codigo          : string;
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
    codigo: "",
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
        
        const numberOfItems = state.orderItems.reduce( (prev, current) => current.cantidad + prev, 0 );
        const subTotal = state.orderItems.reduce( ( prev, current ) => current.valor_total + prev, 0 );
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
        console.log("setOrder")
        dispatch({ type: '[Order] - Clean order' });
        dispatch({ type: '[Order] - Set order', payload: order });
    }

    const addItemToOrder = ( item: IOrderItem ) => {
        const productInCart = state.orderItems.some( p => p._id === item._id );
        if ( !productInCart ) return dispatch({ type: '[Order] - Update items in order', payload: [...state.orderItems, item ] })
        const updatedProducts = state.orderItems.map( p => {
            if ( p._id !== item._id ) return p;
            // Actualizar la cantidad
            p.cantidad += item.cantidad;
            return p;
        });
        dispatch({ type: '[Order] - Update items in order', payload: updatedProducts });
    }

    const updateOrderItemQuantity = ( item: IOrderItem, newQuantityValue: number ) => {
        item.cantidad = newQuantityValue
        item.precio_total = formatDecimals(newQuantityValue * item.precio_unitario)
        item.valor_total = formatDecimals(newQuantityValue * item.valor_unitario)
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