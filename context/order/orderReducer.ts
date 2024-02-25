'use client'
import { OrderState } from '.';
import { ICartProduct, IOrder, IOrderItem, ShippingAddress } from '../../interfaces';


type CartActionType = 
   | { type: '[Order] - Update items in order', payload: IOrderItem[] }
   | { type: '[Order] - Change order item quantity', payload: IOrderItem  }
   | { type: '[Order] - Set order', payload: IOrder  }
   | { type: '[Order] - Clean order' }
   | { 
      type: '[Order] - Update order summary', 
      payload: {
         numberOfItems: number;
         subTotal: number;
         tax: number;
         total: number;
      }
   }   
   // | { type: '[Order] - LoadCart from cookies | storage', payload: ICartProduct[] } 
   // | { type: '[Order] - Update products in cart', payload: ICartProduct[] }
   // | { type: '[Order] - Change cart quantity', payload: ICartProduct }
   // | { type: '[Order] - Remove product in cart', payload: ICartProduct }
   // | { type: '[Order] - LoadAddress from Cookies', payload: ShippingAddress }
   // | { type: '[Order] - Update Address', payload: ShippingAddress }
   // | { 
   //    type: '[Order] - Update order summary', 
   //    payload: {
   //       numberOfItems: number;
   //       subTotal: number;
   //       tax: number;
   //       total: number;
   //    }
   // }
   // | { type: '[Order] - Order complete' }

export const orderReducer = ( state: OrderState, action: CartActionType ): OrderState => {

   switch (action.type) {
      // case '[Order] - LoadCart from cookies | storage':
      //    return {
      //       ...state,
      //       isLoaded: true,
      //       order: [...action.payload]
      //     }


      case '[Order] - Update items in order':
         return {
            ...state,
            orderItems: [ ...action.payload ]
         }

      case '[Order] - Change order item quantity':
         return {
            ...state,
            orderItems: state.orderItems.map( item => {
               if ( item.uid !== action.payload.uid ) return item;
               return action.payload;
            })
         }

      case '[Order] - Set order':
         //return { ...action.payload, isLoaded: state.isLoaded };
         return { 
            isLoaded: true, 
            ...action.payload 
         };

      case '[Order] - Clean order':
         return {
            ...state,
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

      case '[Order] - Update order summary':
         return {
            ...state,
            ...action.payload
         }
      // case '[Order] - Remove product in cart':
      //    return {
      //       ...state,
      //       cart: state.cart.filter( product => !(product.uid === action.payload.uid ))
      //    }

      // case '[Order] - Update order summary':
      //    return {
      //       ...state,
      //       ...action.payload
      //    }


      // case '[Order] - Update Address':
      // case '[Order] - LoadAddress from Cookies':
      //    return {
      //       ...state,
      //       shippingAddress: action.payload
      //    }


      // case '[Order] - Order complete':
      //    return {
      //       ...state,
      //       cart: [],
      //       numberOfItems: 0,
      //       subTotal: 0,
      //       tax: 0,
      //       total: 0
      //    }

       default:
          return state;
   }

}