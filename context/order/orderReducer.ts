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


export const orderReducer = ( state: OrderState, action: CartActionType ): OrderState => {

   switch (action.type) {
      case '[Order] - Update items in order':
         return {
            ...state,
            orderItems: [ ...action.payload ]
         }

      case '[Order] - Change order item quantity':
         return {
            ...state,
            orderItems: state.orderItems.map( item => {
               if ( item._id !== action.payload._id ) return item;
               return action.payload;
            })
         }

      case '[Order] - Set order':
         //return { ...action.payload, isLoaded: state.isLoaded };
         // const order =  { ...action.payload } 
         // const orderitem: IOrderItem[] = []
         // order.orderitems = order.orderitems?order.orderitems:orderitem
         state.isLoaded = true
         return { 
            ...state,
            ...action.payload
         };

      case '[Order] - Clean order':
         return {
            ...state,
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