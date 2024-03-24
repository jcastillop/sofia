'use client'
import { AxiosResponse } from "axios";
import useSWR, { SWRConfiguration } from "swr"

import { spaxionApi } from "@/api";
import { IBilling, ICliente } from "@/interfaces";

interface PropsOrders {
    comprobantes: IBilling[];
    total: number;
}

export const useComprobantes = () => {   

    const fetcher = (urlFetcher: string) => spaxionApi.get(`${urlFetcher}`).then(res => res.data)

    const { data, error, isLoading } = useSWR<PropsOrders>(`/comprobantes/listar`, fetcher, { refreshInterval: 1000 });

    const comprobantes = data?.comprobantes || [];

    return {
        error: error,
        isLoading: isLoading,
        comprobantes: comprobantes
    }
}

export const saveComprobante = async (billing: IBilling, client?: ICliente):Promise<{ hasError: boolean; message: string; comprobante: IBilling| null; }> => {

    const data = { billing, client }

    try {

        const { data: { messsage, hasError, comprobante } }: AxiosResponse<{messsage: string; hasError: boolean; comprobante: IBilling|null}> = await spaxionApi.post(`/comprobantes`, data);

        if(comprobante){
            return {
                hasError: hasError,
                comprobante: comprobante,
                message: messsage
            }    
        }else{
            return {
                hasError: hasError,
                comprobante: null,
                message: messsage
            } 
        }
    } catch (error: any) {
        
        return {
            hasError: true,
            comprobante: null,
            message: error.toString()
        }        
    }

}