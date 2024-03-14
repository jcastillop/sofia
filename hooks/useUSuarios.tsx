'use client'
import { AxiosResponse } from "axios";
import useSWR, { SWRConfiguration } from "swr"

import { spaxionApi } from "@/api";
import { IUser } from "@/interfaces";

interface PropsOrders {
    usuarios: IUser[];
    total: number;
}

export const useUsuarios = () => {   

    const fetcher = (urlFetcher: string) => spaxionApi.get(`${urlFetcher}`).then(res => res.data)

    const { data, error, isLoading } = useSWR<PropsOrders>(`/usuarios/listar`, fetcher, { refreshInterval: 1000 });

    const usuarios = data?.usuarios || [];

    return {
        error: error,
        isLoading: isLoading,
        usuarios: usuarios
    }
}