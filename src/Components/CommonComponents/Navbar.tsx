import React from "react";

import {AppBar, Toolbar} from '../../Common/importsMUI';
import DefaultText from './ComponentsMUI/CommonTypography/DefaultText';

import { useNavigate } from "react-router-dom";



const Navbar: React.FC = ()=>{
    return(
        <>
           <AppBar>
                <Toolbar>
                    <DefaultText text='Bigg Boss ka ghar!'/>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;