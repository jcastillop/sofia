'use client'
import { FC, ReactNode, useEffect, useReducer } from 'react';
import axios from 'axios';



import { CartContext, cartReducer } from './';
import { spaxionApi } from '@/api';
import { ICartProduct, ShippingAddress, IOrder } from '@/interfaces';

export interface CartState {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    shippingAddress?: ShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    shippingAddress: undefined
}

interface Props {
    children?: ReactNode;
}


export const CartProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( cartReducer , CART_INITIAL_STATE );

    // // Efecto
    // useEffect(() => {
    //     try {
    //         const cookieProducts = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ): []
    //         dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
    //     } catch (error) {
    //         dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
    //     }
    // }, []);


    // useEffect(() => {

    //     if ( Cookie.get('firstName')){
    //         const shippingAddress = {
    //             firstName : Cookie.get('firstName') || '',
    //             lastName  : Cookie.get('lastName') || '',
    //             address   : Cookie.get('address') || '',
    //             address2  : Cookie.get('address2') || '',
    //             zip       : Cookie.get('zip') || '',
    //             city      : Cookie.get('city') || '',
    //             country   : Cookie.get('country') || '',
    //             phone     : Cookie.get('phone') || '',
    //         }
            
    //         dispatch({ type:'[Cart] - LoadAddress from Cookies', payload: shippingAddress })
    //     }
    // }, [])
    


    
    // useEffect(() => {
    //   Cookie.set('cart', JSON.stringify( state.cart ));
    // }, [state.cart]);


    useEffect(() => {
        
        const numberOfItems = state.cart.reduce( ( prev, current ) => current.quantity + prev , 0 );
        const subTotal = +(state.cart.reduce( ( prev, current ) => (current.unit_value * current.quantity) + prev, 0 )).toFixed(2);
        const taxRate =  Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    
        const orderSummary = {
            numberOfItems,
            subTotal,
            tax: +(subTotal * taxRate).toFixed(2),
            total: +(subTotal * ( taxRate + 1 )).toFixed(2)
        }

        dispatch({ type: '[Cart] - Update order summary', payload: orderSummary });
    }, [state.cart]);



    const addProductToCart = ( product: ICartProduct ) => {

        //! Nivel Final
        const productInCart = state.cart.some( p => p.uid === product.uid );
        if ( !productInCart ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product ] })

        // Acumular
        const updatedProducts = state.cart.map( p => {
            if ( p.uid !== product.uid ) return p;

            // Actualizar la cantidad
            //p.quantity += product.quantity;
            p.quantity++;
            return p;
        });

        dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });

    }

    const lessProductToCart = ( product: ICartProduct ) => {

        //! Nivel Final
        const productInCart = state.cart.some( p => p.uid === product.uid );
        if ( !productInCart ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product ] })

        // Acumular
        const updatedProducts = state.cart.map( p => {
            if ( p.uid !== product.uid ) return p;

            // Actualizar la cantidad
            //p.quantity += product.quantity;
            p.quantity--;
            return p;
        });

        dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });

    }    

    const updateCartQuantity = ( product: ICartProduct ) => {
        dispatch({ type: '[Cart] - Change cart quantity', payload: product });
    }

    const removeCartProduct = ( product: ICartProduct ) => {
        dispatch({ type: '[Cart] - Remove product in cart', payload: product });
    }

    const updateAddress = ( address: ShippingAddress ) => {
        // Cookie.set('firstName',address.firstName);
        // Cookie.set('lastName',address.lastName);
        // Cookie.set('address',address.address);
        // Cookie.set('address2',address.address2 || '');
        // Cookie.set('zip',address.zip);
        // Cookie.set('city',address.city);
        // Cookie.set('country',address.country);
        // Cookie.set('phone',address.phone);

        dispatch({ type: '[Cart] - Update Address', payload: address });
    }


    const createOrder = async():Promise<{ hasError: boolean; message: string; }> => {

        if ( !state.shippingAddress ) {
            throw new Error('No hay dirección de entrega');
        }

        const body: IOrder = {
            orderItems: state.cart.map( p => ({
                ...p,
                title: p.name!
            })),
            shippingAddress: state.shippingAddress,
            numberOfItems: state.numberOfItems,
            subTotal: state.subTotal,
            tax: state.tax,
            total: state.total,
            isPaid: false
        }


        try {
            
            const { data } = await spaxionApi.post<IOrder>('/orders', body);

            dispatch({ type: '[Cart] - Order complete' });

            return {
                hasError: false,
                message: data.uid!
            }


        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }
            return {
                hasError: true,
                message : 'Error no controlado, hable con el administrador'
            }
        }

    }


    return (
        <CartContext.Provider value={{
            ...state,

            // Methods
            addProductToCart,
            lessProductToCart,
            removeCartProduct,
            updateCartQuantity,
            updateAddress,

            // Orders
            createOrder,
        }}>
            { children }
        </CartContext.Provider>
    )
};