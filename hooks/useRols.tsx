'use client'
import { AxiosResponse } from "axios";
import useSWR, { SWRConfiguration } from "swr"

import { spaxionApi } from "@/api";
import { IRol } from "@/interfaces";

interface PropsOrders {
    rol: IRol[];
    total: number;
}

export const useRols = () => {   

    const fetcher = (urlFetcher: string) => spaxionApi.get(`${urlFetcher}`).then(res => res.data)

    const { data, error, isLoading, mutate } = useSWR<PropsOrders>(`/roles/listar`, fetcher, { refreshInterval: 1000 });

    const rols = data?.rol || [];

    return {
        error: error,
        isLoading: isLoading,
        rols: rols,
        mutate
    }
}