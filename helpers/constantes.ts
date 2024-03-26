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
    Empresas:{
        ELPAISA : "64e4bb49eb9067df62d106db",
        SPAXION : "64acc6d680d17c210fd9f1b0"
    },
    DEFAULT_PASSWORD: "123456"
});

export default constantes;
