import React from 'react';

import { useState } from 'react';
import { createContext, useContext } from 'react';

import Navbar from '../CommonComponents/Navbar';
import RoutesComponent from './RoutesComponent';
import Context from './Context';

const Main:React.FC = ()=>{
    return(
        <>
            <Navbar/>
            <Context/>
            {/* <RoutesComponent/> */}
        </>
    );
}

export default Main;