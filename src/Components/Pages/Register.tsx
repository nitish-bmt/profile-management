// Register.tsx
import React, { useEffect } from 'react';
import {useContext} from 'react';
import {useState} from 'react';
import { useForm, SubmitHandler } from "react-hook-form";

// my local MUI imports
import { Button, MenuItem, Box, Typography, Container, Grid, TextField } from '../../Common/importsMUI';

// import { handleNavigate } from '../Utility/RoutesComponent';

import { UserData } from '../../Common/Interfaces/UserData';
import { time } from 'console';
import localforage from 'localforage';
import { MainContext } from '../Utility/Context';
import { useNavigate } from 'react-router-dom';

type Inputs = {
    username: string;
    password: string;
    roletype: string;
    name: string;
    address: string;
    phonenumber: string;
};

const Register: React.FC = () => {

    const {users, setUsers, admin, setAdmin} = useContext(MainContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<Inputs> = async(data: Inputs) => {

        let u:UserData[] = [];

        if(data.roletype=="admin"){
            u.push({...data, id: Date.now().toString() });
            await setAdmin(u);
            await localforage.setItem('admin', u);
            console.log(u);
        }
        else{        
            u = [...users];
            u.push({...data, id: Date.now().toString() });
            await setUsers(u);
            await localforage.setItem('users', u);
            console.log(u)  ;

        }

        // u = [...u, {...data, id: Date.now().toString()} ];

        navigate('/login');
        console.log(users);
    };

    useEffect(()=>{
        const updateLocalStorage = async () => {
            await localforage.setItem('users', users);
            await localforage.setItem('admin', admin);
        };
        updateLocalStorage();
    },[users, admin]);

    return (
        <Container maxWidth="sm">
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', margin: '0 auto' }}
                    >
                        <Typography variant="h4" component="h1" gutterBottom align="center">
                            Register
                        </Typography>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            {...register("username", { required: 'Username is required'})}
                            error={!!errors.username}
                            helperText={errors.username ? errors.username.message : ''}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            {...register("password", { required: 'Password is required' })}
                        />
                        <TextField
                            select
                            label="Role Type"
                            variant="outlined"
                            fullWidth
                            {...register("roletype", { required: 'Role type is required'})}
                            error={!!errors.roletype}
                            helperText={errors.roletype ? errors.roletype.message : ''}
                        >
                            <MenuItem value="admin" >Admin</MenuItem>
                            <MenuItem value="user">User</MenuItem>
                        </TextField>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            {...register("name", 
                                { 
                                    required: 'Name is required' 
                                })}
                            error={!!errors.name}
                            helperText={errors.name ? errors.name.message : ''}
                        />
                        <TextField
                            label="Address"
                            variant="outlined"
                            fullWidth
                            {...register("address", 
                                {
                                    required: 'Address is required' 
                                })}
                            error={!!errors.address}
                            helperText={errors.address ? errors.address.message : ''}
                        />
                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            {...register("phonenumber", 
                                { 
                                    required: 'Phone number is required', 
                                    pattern: /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g
                                })}
                            error={!!errors.phonenumber}
                            helperText={errors.phonenumber ? errors.phonenumber.message : ''}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Register
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;
