const constantes = Object.freeze({
    ALERT_DEFAULT_TIMER: 3000, //Valor por defecto para el tiempo de las alertas
    SeriesProposito: {//Tienen que ser valores unicos
        PRINCIPAL_BILL:    "FACTURAS_BOLETAS_NC_INTERNA",
    },
    TipoComprobante: {
        Factura:        "01",
        Boleta:         "03",
        NotaCredito:    "07",
        NotaDespacho:   "50",
        Calibracion:    "51",
        Interno:        "52"
    },    
});

export default constantes;
