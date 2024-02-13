"use client"
import { FC, ReactNode, useReducer, useState } from 'react';
import { UiContext, uiReducer } from './';
import { AlertColor } from '@mui/material';
import { IAlerta } from '@/interfaces';
import { Constantes } from '@/helpers';
import { Alerta } from '../../components/ui/Alerta';


interface Props{
    children?: ReactNode;
}

export interface UiState {
    children?: React.ReactNode;
    isMenuOpen: boolean;
    mensajeAlert: string;
    severityAlert: AlertColor;
    statusAlert: boolean;
    timeAlert: number;
}


const UI_INITIAL_STATE: UiState = {
    isMenuOpen: false,
    mensajeAlert: '',
    severityAlert: 'success',
    statusAlert: false,
    timeAlert: Constantes.ALERT_DEFAULT_TIMER
}

export const UiProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( uiReducer , UI_INITIAL_STATE );
  
    const toggleSideMenu = () => {
        dispatch({ type: '[UI] - ToggleMenu' });
    }

    const showAlert = (alerta: IAlerta) => {
        dispatch({ type: '[UI] - ShowAlert', payload: alerta });
    }

    const hideAlert = () => {
        dispatch({ type: '[UI] - HideAlert' });
    }

    return (
        <UiContext.Provider value={{
            ...state,
            // Methods
            toggleSideMenu,
            showAlert,
            hideAlert,
        }}>
            { children }
        </UiContext.Provider>
    )
};