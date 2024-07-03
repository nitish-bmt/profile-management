import React, { useContext } from 'react';

import {useState} from 'react';

import { UserData } from '../../Common/Interfaces/UserData';


import {MainContext} from './Context';

const Users:React.FC = ()=>{

    // interface MainContextType {
    //     users: UserData[];
    //     setUsers: React.Dispatch<React.SetStateAction<UserData[]>>;
    //     admin: UserData | null;
    //     setAdmin: React.Dispatch<React.SetStateAction<UserData | null>>;
    // }
    const context = useContext(MainContext);
    const { users, setUsers, admin, setAdmin } = useContext(MainContext);
    

    return(
        <>  
        <h1>hey</h1>
        </>
    );
}

export default Users;