'use client'

import useSWR, { SWRConfiguration } from "swr"
import { AxiosResponse } from "axios";

import { spaxionApi } from "@/api";
import { ICliente, IUser } from "@/interfaces";
import { ICierre } from "@/interfaces/cierre";

interface PropsCierre {
    cierres: ICierre[];
    cierre: ICierre;
}

export const useCierres = (url: string) => {   
    //const { data, error, isLoading, mutate } = useSWR<PropsOrder>(`/ordenes/obtener/${ url }`, fetcher, { refreshInterval: 1000 });
    const fetcher = (urlFetcher: string) => spaxionApi.get(`${urlFetcher}`).then(res => res.data)

    const { data, error, isLoading } = useSWR<PropsCierre>(`/cierres/listar/${ url }`, fetcher, { refreshInterval: 1000 });

    const cierres = data?.cierres;
    const cierre = data?.cierre;

    return {
        error,
        isLoading,
        cierres,
        cierre,
    }

}

export const saveCierre = async ( usuario: string, fecha: Date ):Promise<{ hasError: boolean; message: string; cierre: ICierre|null }> => {

    try {

        const { data: { messsage, hasError, cierre } }: AxiosResponse<{messsage: string; hasError: boolean; cierre: ICierre|null;}> = await spaxionApi.post(`/cierres`, { usuario, fecha });

        if(cierre){
            return {
                hasError: hasError,
                message: messsage,
                cierre: cierre
            }     
        }else{
            return {
                hasError: hasError,
                message: messsage,
                cierre: null
            } 
        }
    } catch (error: any) {

        return {
            hasError: true,
            message: error.toString(),
            cierre: null
        }        
    }

}