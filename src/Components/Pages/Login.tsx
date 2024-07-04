// Login.tsx
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { useContext } from 'react';


// my local MUI imports
import { Button, Box, Typography, Container, Grid, TextField } from '../../Common/importsMUI';
import localforage from 'localforage';

// import { handleNavigate } from '../Utility/Routes';
import { UserData } from '../../Common/Interfaces/UserData';

import { MainContext } from '../Utility/Context';
import { useNavigate } from 'react-router-dom';

import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Inputs = {
    userid: string;
    pass: string;
};

const Login: React.FC = () => {
    const navigate = useNavigate();

    const {users, setUsers, admin, setAdmin, activeUser, setActiveUser} = useContext(MainContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async(data: Inputs) => {
        
        console.log(users);
        
        let active:UserData[] = users.filter((user)=>(user.username==data.userid && user.password==data.pass));
        console.log(active);
        
        if(active.length==0 && admin.length!=0){
            if( admin[0].username == data.userid && admin[0].password==data.pass){
                active = admin;
            }
        }
        await setActiveUser(active);

        if(active.length>0){

            console.log(active);
            console.log("Successfully signed in");
            // toast('Successfully logged in!');
            toast.success('Successfully logged in!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });

            await localforage.setItem('activeUser', active);
            if(active[0].roletype=='user'){
                navigate(`/profile/${active[0].username}`);
            }
            else{
                navigate(`/users`);
            }

        }
        else{

            toast.error('Invalid Credentials!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
        }
    };

    // on reload
    useEffect(()=>{
        fun();
        console.log();
    },[]);

    const fun = async()=>{
        const actUsr:UserData[]|null = await localforage.getItem('activeUser');
        if(actUsr){
            setActiveUser(actUsr);
        }
    }
    const logout = ()=>{
        setActiveUser([]);
    }
    useEffect(()=>{
        localforage.setItem('activeUser', activeUser);
    }, [activeUser]);


    if(activeUser.length == 0){
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
                            Login
                        </Typography>
                        <TextField
                            label="User ID"
                            variant="outlined"
                            fullWidth
                            {...register("userid", { required: 'User ID is required' })}
                            error={!!errors.userid}
                            helperText={errors.userid ? errors.userid.message : ''}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            {...register("pass", { required: 'Password is required' })}
                            error={!!errors.pass}
                            helperText={errors.pass ? errors.pass.message : ''}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Login
                        </Button>
                        <Button variant="outlined" color="primary" href='/register' fullWidth>
                            Register
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
    }
    else{
        return(
            <>
            <Typography variant="h4" component="h1" gutterBottom align="center" sx={{m:12}}>
                Already Logged in as "{activeUser[0].username}"!
            </Typography>
            <Button variant="outlined" color="primary" onClick={logout} fullWidth>
                Log Out
            </Button>
            </>
        );
    }
};

export default Login;
