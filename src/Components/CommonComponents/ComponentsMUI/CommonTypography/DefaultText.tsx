import React from 'react';

import {Typography} from '../../../../Common/importsMUI';
import { SxProps } from '@mui/system';

type Styling = {
    text: string;
}
const DefaultText:React.FC<Styling> = (props)=>{
    return(
        <>
            <Typography variant="h6">
                {props.text}
            </Typography>
        </>
    );
}

export default DefaultText;