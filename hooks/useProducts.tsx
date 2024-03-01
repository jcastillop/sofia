'use client'
import { AxiosResponse } from "axios";
import useSWR, { SWRConfiguration } from "swr"

import { spaxionApi } from "@/api";
import { IProducto } from "@/interfaces";
import { Session } from "next-auth";
import { ProductoStorage } from "@/class";


interface Props {
    productos: IProducto[];
    total: number;
}

export const useProducts = () => {   

    const fetcher = (urlFetcher: string) => spaxionApi.get(`${urlFetcher}`).then(res => res.data)

    const { data, error, isLoading } = useSWR<Props>(`/productos/listar`, fetcher);

    const productos = data?.productos || [];

    return {
        hasErrorProduct: error,
        isLoadingProduct: isLoading,
        products: productos
    }
}

export const saveProduct = async (product: IProducto):Promise<{ hasError: boolean; message: string; producto: IProducto| null; }> => {

    try {

        const { data: { messsage, hasError, producto }}: AxiosResponse<{messsage: string; hasError: boolean; producto: IProducto|null}> = await spaxionApi.post(`/productos`, new ProductoStorage(product));

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
            producto: null,
            message: error.toString()
        }        
    }

}


export const updateProduct = async ( producto: IProducto):Promise<{ hasError: boolean; message: string; producto?: IProducto; }> => {

    try {

        const { data } = await spaxionApi.post(`${process.env.NEXT_PUBLIC_URL_RESTSERVER}/api/productos/`, producto);

        return {
            hasError: data.hasError,
            producto: data.producto,
            message: data.message
        }        

    } catch (error: any) {
        
        return {
            hasError: true,
            message: error.toString()
        }        
    }

}
