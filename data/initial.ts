import { IProducto } from "@/interfaces";

export const nuevoProducto: IProducto = {
    nombre: "",
    codigo: "",
    codigo_sunat: "",
    descuento: 0,
    descripcion: "",
    precio_unitario: 0,
    unidad_medida: "",
    valor_unitario: 0,
    categoria: {
        nombre: "",
        descripcion: "",
        empresa: ""
    },
    img: ""
}