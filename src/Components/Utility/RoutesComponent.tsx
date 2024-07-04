import { BrowserRouter, Route, Routes } from "react-router-dom";

// importing components
import Login from "../Pages/Login";
import Register from "../Pages/Register";

import { useNavigate } from "react-router-dom";

import { MainContext } from "./Context";
import { useContext } from "react";
import Profile from "../Pages/Profile";
import UserList from "../Pages/UserList";

// import {NavigateComponent}
// export let handleNavigate: (uri: string)=>void;

// Added routing
const RoutesComponent: React.FC = ()=>{
    // const navigate = useNavigate();

    // handleNavigate = (uri:string)=>{
    //     navigate(uri);
    // }

    // MainContext = useContext(MainContext);
    const{ activeUser, setActiveUser} =  useContext(MainContext);
    return(
        // <MainContext.Provider value={{ users, setUsers, admin, setAdmin }}>
            <BrowserRouter>
                {/* <NavigationComponent /> */}
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register/>} />
                    {/* <Route path="/profile/"{activeUser[0].username} element={<Register/>} /> */}
                    <Route path="/register" element={<Register/>} />
                    <Route path="/users" element={<UserList/>} />
                    <Route path="/profile/:username" element={<Profile />} />
                </Routes>
            </BrowserRouter>
        // </MainContext.Provider>
    );
};

export default RoutesComponent;