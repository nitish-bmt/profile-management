import React from 'react';

import { useState } from 'react';
import { createContext, useContext } from 'react';

import Navbar from '../CommonComponents/Navbar';
import Routes from './RoutesComponent';
import RoutesComponent from './RoutesComponent';

const Storage:React.FC = ()=>{
    return(
        <>
            <Navbar/>
            <RoutesComponent/>
        </>
    );
}

export default Storage;