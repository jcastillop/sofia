"use client"
import { createContext } from 'react';
import { IAlerta } from '@/interfaces';
import { AlertColor } from "@mui/material";


interface ContextProps {
    isMenuOpen: boolean;
    mensajeAlert: string;
    severityAlert: AlertColor;
    statusAlert: boolean;
    timeAlert: number;
    toggleSideMenu: () => void;
    showAlert: (alerta: IAlerta) => void;
    hideAlert: () => void;
}


export const UiContext = createContext<ContextProps>({} as ContextProps );