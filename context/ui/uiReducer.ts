"use client"
import { IAlerta } from '@/interfaces';
import { UiState } from './';
import { Constantes } from '@/helpers';

type UiActionType = 
   | { type: '[UI] - ToggleMenu' } 
   | { type: '[UI] - ShowAlert', payload: IAlerta } 
   | { type: '[UI] - HideAlert'} 

export const uiReducer = ( state: UiState, action: UiActionType ): UiState => {

   switch (action.type) {
      case '[UI] - ToggleMenu':
         return {
            ...state,
            isMenuOpen: !state.isMenuOpen
        }
      case '[UI] - ShowAlert':
         return {
            ...state,
            statusAlert: true,
            mensajeAlert: action.payload.mensaje,
            severityAlert: action.payload.severity?action.payload.severity:"success",
            timeAlert: action.payload.time?action.payload.time:Constantes.ALERT_DEFAULT_TIMER
        }      
        case '[UI] - HideAlert':  
        return {
         ...state,
         statusAlert: false,
         mensajeAlert: ""
     }         
       default:
          return state;
   }

}