'use client'
import useSWR from "swr"
import { AxiosResponse } from "axios";
import { spaxionApi } from "@/api";
import { IParametros } from "@/interfaces";

interface Props {
    parametros: IParametros;
}

export const useParametros = () => {   

    const fetcher = (urlFetcher: string) => spaxionApi.get(`${urlFetcher}`).then(res => res.data)

    const { data, error, isLoading, mutate } = useSWR<Props>(`/parametros`, fetcher);

    const parametros = data?.parametros;

    return {
        error,
        isLoading,
        parametros: parametros,
        mutate
    }
}


export const useParametross = async (aplicacion: string, empresa: string):Promise<{ hasError: boolean; message: string; parametros: IParametros|null; }> => {

    try {

        const { data: { messsage, hasError, parametros } }: AxiosResponse<{messsage: string; hasError: boolean; parametros: IParametros|null}> = await spaxionApi.post(`/parametros`);

        if(parametros){
            return {
                hasError: hasError,
                parametros: parametros,
                message: messsage
            }    
        }else{
            return {
                hasError: hasError,
                parametros: null,
                message: messsage
            } 
        }
    } catch (error: any) {
        console.log(error.toString())
        return {
            hasError: true,
            parametros: null,
            message: error.toString()
        }        
    }

}