'use client'
import { AxiosResponse } from "axios";
import useSWR, { SWRConfiguration } from "swr"

import { spaxionApi } from "@/api";
import { IBilling, ICliente, IReprteServiciosCantidad } from "@/interfaces";
import { ICierre } from "@/interfaces/cierre";

interface PropsOrders {
    comprobantes: IBilling[];
    total: number;
}

export const reporteVentas = async ( fechaInicio: Date|null, fechaFin: Date|null, usuario: string, ruc: string, tipo_comprobante: string ):Promise<{ hasError: boolean; message: string; comprobantes: IBilling[]; }> => {

    const data = { fechaInicio, fechaFin, usuario, ruc, tipo_comprobante }

    try {

        const { data: { messsage, hasError, comprobantes } }: AxiosResponse<{messsage: string; hasError: boolean; comprobantes: IBilling[]}> = await spaxionApi.post(`/reportes/ventas`, data);

        if(comprobantes){
            return {
                hasError: hasError,
                comprobantes: comprobantes,
                message: messsage
            }    
        }else{
            return {
                hasError: hasError,
                comprobantes: [],
                message: messsage
            } 
        }
    } catch (error: any) {
        
        return {
            hasError: true,
            comprobantes: [],
            message: error.toString()
        }        
    }

}

interface PropsCierres {
    cierres: ICierre[];
    total: number;
}
/*
export const useHistorico = ( idUsuario: string, config: SWRConfiguration = {}, offset: string = "0", limit: string = "10"  ) => {    

    const { data, error, isLoading } = useSWR<Props>(`${process.env.NEXT_PUBLIC_URL_RESTSERVER}/api/comprobantes/historico?idUsuario=${idUsuario}&offset=${ offset }&limit=${ limit }`, config);

*/
export const useReporteCierreTurnos = (fechaInicio: string, fechaFin: string) => {   

    const fetcher = (urlFetcher: string) => spaxionApi.get(`${urlFetcher}`).then(res => res.data)

    const { data, error, isLoading, mutate } = useSWR<PropsCierres>(`/reportes/cierresturno?fechaInicio=${fechaInicio}&fechaFin=${ fechaFin }`, fetcher);

    const cierres = data?.cierres || [];

    return {
        hasError: error,
        isLoading: isLoading,
        cierres: cierres,
        mutate
    }
}

interface PropsUsuarios {
    messsage: string;
    servicios: IReprteServiciosCantidad[];
    hasError: boolean;
}

export const useReporteUsuariosServicios = (fechaInicio: Date, fechaFin: Date) => {   

    const fetcher = (urlFetcher: string) => spaxionApi.get(`${urlFetcher}`).then(res => res.data)

    const { data, error, isLoading, mutate } = useSWR<PropsUsuarios>(`/reportes/serviciosusuario?fechaInicio=${fechaInicio}&fechaFin=${ fechaFin }`, fetcher);

    const servicios = data?.servicios || [];

    return {
        hasError: error && data?.hasError,
        isLoading: isLoading,
        servicios: servicios,
        mutate
    }
}