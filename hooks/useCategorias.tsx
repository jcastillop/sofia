'use client'
import useSWR from "swr"

import { spaxionApi } from "@/api";
import { ICategoria } from "@/interfaces";

interface Props {
    categorias: ICategoria[];
    total: number;
}

export const useCategorias = () => {   

    const fetcher = (urlFetcher: string) => spaxionApi.get(`${urlFetcher}`).then(res => res.data)

    const { data, error, isLoading } = useSWR<Props>(`/categorias`, fetcher);

    const categorias = data?.categorias || [];

    return {
        hasErrorProduct: error,
        isLoadingCategoria: isLoading,
        categorias: categorias
    }
}