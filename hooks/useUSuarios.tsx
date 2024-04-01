'use client'
import { AxiosResponse } from "axios";
import useSWR, { SWRConfiguration } from "swr"

import { spaxionApi } from "@/api";
import { IUser } from "@/interfaces";
import { Constantes } from "@/helpers";

interface PropsOrders {
    usuarios: IUser[];
    total: number;
}
/*Modidifando para git*/
export const useUsuarios = () => {   

    const fetcher = (urlFetcher: string) => spaxionApi.get(`${urlFetcher}`).then(res => res.data)

    const { data, error, isLoading, mutate } = useSWR<PropsOrders>(`/usuarios/listar`, fetcher, { refreshInterval: 1000 });

    const usuarios = data?.usuarios || [];

    return {
        error: error,
        isLoading: isLoading,
        usuarios: usuarios,
        mutate
    }
}

export const saveUsuario = async ( user: IUser ):Promise<{ usuario: IUser|null; hasError: boolean; message: string; }> => {

    user.password = Constantes.DEFAULT_PASSWORD

    try {
    
        const { data: { usuario, message, hasError } }: AxiosResponse<{usuario: IUser; message: string; hasError: boolean}> = await spaxionApi.post(`/usuarios`, user);


        if(usuario){
            return {
                hasError: hasError,
                usuario: usuario,
                message: message
            }    
        }else{
            return {
                hasError: hasError,
                usuario: null,
                message: message
            } 
        }
    } catch (error: any) {
        console.log(error.toString())
        return {
            hasError: true,
            usuario: null,
            message: error.toString()
        }        
    }

}

export const updateUsuario = async ( user: IUser ):Promise<{ usuario: IUser|null; hasError: boolean; message: string; }> => {

    try {
    
        const { data: { usuario, message, hasError } }: AxiosResponse<{usuario: IUser; message: string; hasError: boolean}> = await spaxionApi.post(`/usuarios/actualizar`, user);


        if(usuario){
            return {
                hasError: hasError,
                usuario: usuario,
                message: message
            }    
        }else{
            return {
                hasError: hasError,
                usuario: null,
                message: message
            } 
        }
    } catch (error: any) {
        console.log(error.toString())
        return {
            hasError: true,
            usuario: null,
            message: error.toString()
        }        
    }

}

export const CambiarPassword = async ( id: string, password: string ):Promise<{ hasError: boolean; message: string; }> => {
    
    const { data: { message, hasError } }: AxiosResponse<{message: string; hasError: boolean}> = await spaxionApi.post(`/usuarios/cambiar`, { id, password });


    return {
        message,
        hasError
    }
}

export const ReiniciarPassword = async ( id: string ):Promise<{ hasError: boolean; message: string; }> => {
    
    const { data: { message, hasError } }: AxiosResponse<{message: string; hasError: boolean}> = await spaxionApi.post(`/usuarios/reiniciar`, { id });


    return {
        message,
        hasError
    }
}