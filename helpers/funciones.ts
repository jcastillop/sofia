export const formatDecimals = (num: number) => {
   return +((Math.round(num * 10) / 10).toFixed(2))
}