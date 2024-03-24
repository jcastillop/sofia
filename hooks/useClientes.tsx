'use client'

import useSWR, { SWRConfiguration } from "swr"
import { AxiosResponse } from "axios";

import { spaxionApi } from "@/api";
import { ICliente, IUser } from "@/interfaces";

interface Props {
    clientes: ICliente[];
    total: number;
}

export const useClientes = () => {   

    const fetcher = (urlFetcher: string) => spaxionApi.get(`${urlFetcher}`).then(res => res.data)

    const { data, error, isLoading, mutate } = useSWR<Props>(`/clientes/listar`, fetcher);

    const clientes = data?.clientes || [];

    return {
        hasErrorProduct: error,
        isLoadingProduct: isLoading,
        clientes,
        mutate
    }
}

interface PropsCliente {
    cliente: ICliente;
}

export const useCliente = (url: string) => {   

    const fetcher = (urlFetcher: string) => spaxionApi.get(`${urlFetcher}`).then(res => res.data)

    const { data, error, isLoading, mutate } = useSWR<PropsCliente>(`/clientes/obtener/${ url }`, fetcher);

    const cliente = data?.cliente;

    return {
        error,
        isLoading,
        cliente,
        mutate
    }
}

export const consultaRuc = async (numero_documento: string) => {   

    try {

        const { data: { message, hasError, razon_social, direccion } }: AxiosResponse<{message: string; hasError: boolean; razon_social: string; direccion: string}> = await spaxionApi.post(`/clientes/consultaruc`, { numero_documento });

        return {
            hasError,
            razon_social,
            direccion,
            message
        }    

    } catch (error: any) {
        
        return {
            hasError: true,
            message: error.toString()
        }        
    }

}

export const saveCliente = async (client: ICliente):Promise<{ hasError: boolean; message: string; cliente: ICliente| null; }> => {

    try {

        const { data: { messsage, hasError, cliente } }: AxiosResponse<{messsage: string; hasError: boolean; cliente: ICliente|null}> = await spaxionApi.post(`/clientes`, client);

        if(cliente){
            return {
                hasError: hasError,
                cliente: cliente,
                message: messsage
            }    
        }else{
            return {
                hasError: hasError,
                cliente: null,
                message: messsage
            } 
        }
    } catch (error: any) {
        console.log(error.toString())
        return {
            hasError: true,
            cliente: null,
            message: error.toString()
        }        
    }

}


export const updateCliente = async ( client: ICliente ):Promise<{ hasError: boolean; message: string; cliente?: ICliente| null; }> => {

    try {

        const { data: { messsage, hasError, cliente } }: AxiosResponse<{messsage: string; hasError: boolean; cliente: ICliente|null}> = await spaxionApi.post(`/clientes/actualizar`, client);

        if(cliente){
            return {
                hasError: hasError,
                cliente: cliente,
                message: messsage
            }    
        }else{
            return {
                hasError: hasError,
                cliente: null,
                message: messsage
            } 
        }     

    } catch (error: any) {
        
        return {
            hasError: true,
            message: error.toString()
        }        
    }

}
