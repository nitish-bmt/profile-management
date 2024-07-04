import React from 'react';

import { useState } from 'react';
import { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Navbar from '../CommonComponents/Navbar';
import RoutesComponent from './RoutesComponent';
import Context from './Context';

const Main:React.FC = ()=>{
    return(
        <>
            <Navbar/>
            <Context/>
            <ToastContainer />
            {/* <RoutesComponent/> */}
        </>
    );
}

export default Main;