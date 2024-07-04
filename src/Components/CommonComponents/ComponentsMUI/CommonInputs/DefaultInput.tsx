import React from 'react';
// import { RegisterOptions } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { UseFormRegister, FieldValues } from 'react-hook-form';
// import { useForm, SubmitHandler } from "react-hook-form";
// import { useForm } from "react-hook-form";
type Inputs = {
  username: string;
  password: string;
  roletype: string;
  name: string;
  address: string;
  phonenumber: string;
};

interface InputProps{
  label: string;
  type: string;
  register: UseFormRegister<FieldValues>;
}

// Added routing
const DefaultInput: React.FC<InputProps> = (props: InputProps)=>{

    return(
      <TextField
        label="Username"  
        type={props.type}
        variant="outlined"
        fullWidth
        {...props.register(props.label, { required: `${props.label} is required` })}
      />
    );
};

export default DefaultInput;