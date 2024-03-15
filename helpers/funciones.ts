export const formatDecimals = (num: number) => {
   return +((Math.round(num * 10) / 10).toFixed(2))
}

export const getDescripcionTipocomprobante = (tipo_comprobante: string) => {

   let retorno = ''
   switch (tipo_comprobante) {
      case '01':
         retorno = 'FACTURA ELECTRÓNICA'
         break;
      case '03':
         retorno = 'BOLETA DE VENTA ELECTRÓNICA'
         break;
      case '07':
         retorno = 'NOTA DE CRÉDITO ELECTRÓNICA'
         break;
      case '08':
         retorno = 'NOTA DE DÉBITO ELECTRÓNICA'
         break;
      case '52':
         retorno = 'COMPROBANTE INTERNO'
         break;          
      default:
         break;
   }
   return retorno;
}