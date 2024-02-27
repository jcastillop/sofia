'use client';
import { spaxionApi } from "@/api";
import { IProduct } from "@/interfaces";
import useSWR, { SWRConfiguration } from "swr"


interface Props {
    products: IProduct[];
    total: number;
}

export const useProducts = ( config: SWRConfiguration = {} ) => {    

    const { data, error, isLoading } = useSWR<Props>(`${process.env.NEXT_PUBLIC_URL_RESTSERVER}/api/productos/`, config);

    const products = data?.products || [];

    return {
        hasErrorProduct: error,
        isLoadingProduct: isLoading,
        products: products
    }
}

export const saveProduct = async ( producto: IProduct) => {

    try {

        const { data } = await spaxionApi.put(`${process.env.NEXT_PUBLIC_URL_RESTSERVER}/api/productos/`, producto);

        return {
            hasError: data.hasError,
            producto: data.producto,
            message: data.message
        }        

    } catch (error: any) {
        
        return {
            hasError: true,
            producto: null,
            message: error.toString()
        }        
    }

}


export const updateProduct = async ( producto: IProduct):Promise<{ hasError: boolean; message: string; producto?: IProduct; }> => {

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