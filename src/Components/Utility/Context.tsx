import React from 'react';

import { useState } from 'react';
import { useEffect } from 'react';
import { createContext, useContext } from 'react';

import Navbar from '../CommonComponents/Navbar';
import RoutesComponent from './RoutesComponent';

import { UserData } from '../../Common/Interfaces/UserData';

import Login from '../Pages/Login';
import Profile from '../Pages/Profile';
import Register from '../Pages/Register';
import UserList from '../Pages/UserList';
import { RouterProvider } from 'react-router-dom';

import localforage from 'localforage';

interface MainContextType {
    users: UserData[];
    setUsers: React.Dispatch<React.SetStateAction<UserData[]>>;
    admin: UserData[];
    setAdmin: React.Dispatch<React.SetStateAction<UserData[]>>;    
    activeUser: UserData[];
    setActiveUser: React.Dispatch<React.SetStateAction<UserData[]>>;
}

export const MainContext = createContext<MainContextType>({
    users: [],
    setUsers: () => {},
    admin: [],
    setAdmin: () => {},
    activeUser: [],
    setActiveUser: () => {},
});

const Context:React.FC = ()=>{

    const [users, setUsers] = useState<UserData[]>([]);
    const [admin, setAdmin] = useState<UserData[]>([]);
    const [activeUser, setActiveUser] = useState<UserData[]>([]);

    useEffect(()=>{
        fun();
        console.log();
    },[]);

    const fun = async()=>{
        const usr:UserData[]|null = await localforage.getItem('users');
        if(usr){
            setUsers(usr);
        }

        const adm:UserData[]|null = await localforage.getItem('admin');
        if(adm){
            setAdmin(adm);
        }
    }

    // const temp: MainContextType = { users, setUsers, admin, setAdmin };
    // const MainContext = createContext(temp);

    return(
        <>
            <MainContext.Provider value={{ users, setUsers, admin, setAdmin, activeUser, setActiveUser}}>

                <RoutesComponent/>
                
            </MainContext.Provider>
        </>
    );
}

export default Context;