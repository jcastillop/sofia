'use client'
import { AxiosResponse } from "axios";
import useSWR from "swr"

import { spaxionApi } from "@/api";
import { IProducto } from "@/interfaces";

interface Props {
    productos: IProducto[];
    total: number;
}

export const useProducts = () => {   

    const fetcher = (urlFetcher: string) => spaxionApi.get(`${urlFetcher}`).then(res => res.data)

    const { data, error, isLoading, mutate } = useSWR<Props>(`/productos/listar`, fetcher);

    const productos = data?.productos || [];

    return {
        hasErrorProduct: error,
        isLoadingProduct: isLoading,
        products: productos,
        mutate
    }
}

export const saveProduct = async (product: IProducto):Promise<{ hasError: boolean; message: string; producto: IProducto| null; }> => {

    try {

        const { data: { messsage, hasError, producto } }: AxiosResponse<{messsage: string; hasError: boolean; producto: IProducto|null}> = await spaxionApi.post(`/productos`, product);

        if(producto){
            return {
                hasError: hasError,
                producto: producto,
                message: messsage
            }    
        }else{
            return {
                hasError: hasError,
                producto: null,
                message: messsage
            } 
        }
    } catch (error: any) {
        console.log(error.toString())
        return {
            hasError: true,
            producto: null,
            message: error.toString()
        }        
    }

}


export const updateProduct = async ( product: IProducto ):Promise<{ hasError: boolean; message: string; producto?: IProducto| null; }> => {

    try {

        const { data: { messsage, hasError, producto } }: AxiosResponse<{messsage: string; hasError: boolean; producto: IProducto|null}> = await spaxionApi.post(`/productos/actualizar`, product);

        if(producto){
            return {
                hasError: hasError,
                producto: producto,
                message: messsage
            }    
        }else{
            return {
                hasError: hasError,
                producto: null,
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
