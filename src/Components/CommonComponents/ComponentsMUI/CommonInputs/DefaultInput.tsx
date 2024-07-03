import React from 'react';

import TextField from '@mui/material/TextField';

// Added routing
const DefaultInput: React.FC = ()=>{
    return(
        <TextField
          disabled
          id="outlined-disabled"
          label="Disabled"
          defaultValue="Hello World"
        />
    );
};

export default DefaultInput;