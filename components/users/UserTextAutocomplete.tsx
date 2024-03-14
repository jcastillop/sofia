import { FC, useContext, useRef, useState } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";
import { deleteOrderItemUser, updateOrderItemUser, useOrders } from "@/hooks";
import { IUser } from "@/interfaces";
import { UiContext } from "@/context";

interface Props {
  item_id: string;
  usuario: IUser|null;
  usuarios: IUser[];
}

export const UserTextAutocomplete: FC<Props> = ({ item_id = '', usuario, usuarios }) => {

  const { showAlert } = useContext( UiContext );

  const handleChange = async (event: any, values: any) => {
    const user_id = (values as IUser)?._id
    if(user_id){
      const { hasError, message } = await updateOrderItemUser(item_id, user_id)
      showAlert({mensaje: message, severity: hasError? 'error':'success', time: 1500})  
    }else{
      const { hasError, message } = await deleteOrderItemUser(item_id)
      showAlert({mensaje: message, severity: hasError? 'error':'success', time: 1500})  
    }
    
  }
  
  return(
      <Autocomplete
          id="country-select-demo"
          sx={{ width: 250, paddingRight:4 }}
          options={usuarios}
          autoHighlight
          getOptionLabel={(option: IUser) => option?option.usuario:''}
          isOptionEqualToValue={(option, value) =>
            option.usuario === value.usuario}
          defaultValue={usuario}
          onChange={handleChange}
          // renderOption={(props, option) => (
          // <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          //     {/* <img
          //     loading="lazy"
          //     width="20"
          //     srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
          //     src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
          //     alt=""
          //     /> */}
          //     {option.label}
          // </Box>
          // )}
          renderInput={(params) => (
          <TextField
              {...params}
              inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
              }}
              variant="standard"
          />
          )}
    />
  )
}