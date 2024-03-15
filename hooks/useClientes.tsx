'use client'

import useSWR, { SWRConfiguration } from "swr"
import { AxiosResponse } from "axios";

import { spaxionApi } from "@/api";
import { ICliente, IUser } from "@/interfaces";

interface PropsOrders {
    usuarios: IUser[];
    total: number;
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