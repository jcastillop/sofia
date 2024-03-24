'use client'
import { AxiosResponse } from "axios";
import useSWR, { SWRConfiguration } from "swr"

import { spaxionApi } from "@/api";
import { IOrder, IOrderItem, IProducto } from "@/interfaces";

interface PropsOrders {
    ordenes: IOrder[];
    total: number;
}

export const useOrders = () => {   

    const fetcher = (urlFetcher: string) => spaxionApi.get(`${urlFetcher}`).then(res => res.data)

    const { data, error, isLoading } = useSWR<PropsOrders>(`/ordenes/listar`, fetcher, { refreshInterval: 1000 });

    const ordenes = data?.ordenes || [];

    return {
        error: error,
        isLoading: isLoading,
        ordenes: ordenes
    }
}

interface PropsOrder {
    orden: IOrder;
    total: number;
}

export const useOrder = (url: string) => {   

    const fetcher = (urlFetcher: string) => spaxionApi.get(`${urlFetcher}`).then(res => res.data)

    const { data, error, isLoading, mutate } = useSWR<PropsOrder>(`/ordenes/obtener/${ url }`, fetcher, { refreshInterval: 1000 });

    const orden = data?.orden;

    return {
        error: error,
        isLoading: isLoading,
        orden: orden,
        mutate
    }
}

export const saveOrder = async (order: IOrder):Promise<{ hasError: boolean; message: string; orden: IOrder| null; }> => {

    try {

        const { data: { messsage, hasError, orden } }: AxiosResponse<{messsage: string; hasError: boolean; orden: IOrder|null}> = await spaxionApi.post(`/ordenes`, order);

        if(order){
            return {
                hasError: hasError,
                orden: orden,
                message: messsage
            }    
        }else{
            return {
                hasError: hasError,
                orden: null,
                message: messsage
            } 
        }
    } catch (error: any) {
        console.log(error.toString())
        return {
            hasError: true,
            orden: null,
            message: error.toString()
        }        
    }

}

export const saveOrderItem = async (orden: string, producto: string, ordenitem: IOrderItem ):Promise<{ hasError: boolean; message: string; ordenProducto: IOrder| null; }> => {

    try {
        ordenitem.fecha = new Date()
        console.log(ordenitem.fecha)
        const body = {
            orden,
            producto, 
            ...ordenitem
        }

        const { data: { messsage, hasError, ordenProducto } }: AxiosResponse<{messsage: string; hasError: boolean; ordenProducto: IOrder|null}> = await spaxionApi.post(`/ordenitem`, body);

        if(ordenProducto){
            return {
                hasError: hasError,
                ordenProducto: ordenProducto,
                message: messsage
            }    
        }else{
            return {
                hasError: hasError,
                ordenProducto: ordenProducto,
                message: messsage
            } 
        }
    } catch (error: any) {

        return {
            hasError: true,
            ordenProducto: null,
            message: error.toString()
        }        
    }

}
export const updateOrderItem = async (orden: string, ordenitem: string, cantidad: number ):Promise<{ hasError: boolean; message: string; }> => {

    try {

        const body = {
            orden,
            ordenitem, 
            cantidad
        }

        const { data: { messsage, hasError, order } }: AxiosResponse<{messsage: string; hasError: boolean; order: IOrder|null}> = await spaxionApi.post(`/ordenitem/actualizar`, body);
        console.log(order)
        return {
            hasError: hasError,
            message: messsage
        }

    } catch (error: any) {

        return {
            hasError: true,
            message: error.toString()
        }        
    }

}//
export const updateOrderItemUser = async (ordenitem: string, usuario: string ):Promise<{ hasError: boolean; message: string; }> => {

    try {

        const body = {
            ordenitem, 
            usuario
        }

        const { data: { messsage, hasError } }: AxiosResponse<{messsage: string; hasError: boolean; order: IOrder|null}> = await spaxionApi.post(`/ordenitem/actualizar/usuario`, body);
        return {
            hasError: hasError,
            message: messsage
        }

    } catch (error: any) {

        return {
            hasError: true,
            message: error.toString()
        }        
    }

}
export const deleteOrderItemUser = async (ordenitem: string ):Promise<{ hasError: boolean; message: string; }> => {

    try {

        const body = {
            ordenitem
        }

        const { data: { messsage, hasError } }: AxiosResponse<{messsage: string; hasError: boolean; order: IOrder|null}> = await spaxionApi.post(`/ordenitem/eliminar/usuario`, body);
        return {
            hasError: hasError,
            message: messsage
        }

    } catch (error: any) {

        return {
            hasError: true,
            message: error.toString()
        }        
    }

}
export const deleteOrderItem = async (orden: string, ordenitem: string):Promise<{ hasError: boolean; message: string; }> => {

    try {

        const body = {
            orden,
            ordenitem
        }

        const { data: { messsage, hasError } }: AxiosResponse<{messsage: string; hasError: boolean; ordenProducto: IOrder|null}> = await spaxionApi.post(`/ordenitem/eliminar`, body);

        return {
            hasError: hasError,
            message: messsage
        }

    } catch (error: any) {

        return {
            hasError: true,
            message: error.toString()
        }        
    }

}