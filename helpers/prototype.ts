declare interface Number {
    format() : number;
}

Number.prototype.format = function(){ 
    return +((Math.round(+this * 10) / 10).toFixed(2));  
};

  /*
   *export const formatDecimals = (num: number) => {
   return +((Math.round(num * 10) / 10).toFixed(2))
}
  */