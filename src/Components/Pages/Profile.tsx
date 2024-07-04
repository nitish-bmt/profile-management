import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, MenuItem, Box, Typography, Container, Grid, TextField } from '../../Common/importsMUI';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MainContext } from '../Utility/Context';
import localforage from 'localforage';
import { UserData } from '../../Common/Interfaces/UserData';
import { Bounce, toast } from 'react-toastify';

type Inputs = {
    username: string;
    password: string;
    roletype: string;
    name: string;
    address: string;
    phonenumber: string;
};

const Profile: React.FC = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Inputs>();
    const { username } = useParams<{ username: string }>();
    const [details, setDetails] = useState<UserData[]>([]);
    
    const { users, setUsers, activeUser, setActiveUser, admin, setAdmin } = useContext(MainContext);
    const navigate = useNavigate();

    const fetchLocalStorage = async() => {

        setAdmin(await localforage.getItem<UserData[]>('admin')||[]);
        setActiveUser(await localforage.getItem<UserData[]>('activeUser')||[]);
        const localUsers = (await localforage.getItem<UserData[]>('users')||[]);
        setUsers(localUsers);
        console.log('called 1')
        return {
            localUsers,
        };
      
    };

    const setVal = (det: UserData[]) => {
        setValue("username", det[0].username);
        setValue("password", "88888888");
        setValue("roletype", det[0].roletype);
        setValue("name", det[0].name);
        setValue("address", det[0].address);
        setValue("phonenumber", det[0].phonenumber);
    };

    const dataLoader = async (localUsers: UserData[]) => {
        console.log("users state:", localUsers);
        const det = localUsers.filter((user) => user.username === username);
        setDetails(det);

        if (det.length === 0) {
            toast.error('Data not available!', {
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
        } else {
            setVal(det);
        }

        if(!activeUser || activeUser?.length === 0){
            return null;
        }
        if (activeUser?.length > 0 && activeUser[0]?.roletype === 'admin') {
            navigate('/userList');
        } else {
            navigate('/');
        }
    };   

    const initialisePageLoad = async () => {
        const {localUsers } = await fetchLocalStorage();
        await dataLoader(localUsers);
    }
    
    useEffect(() => {
        initialisePageLoad();
        console.log('users : ', users)
    }, [username]);

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        const updatedUsers = users.map(user => user.username === username ? { ...user, ...data } : user);
        localforage.setItem('users', updatedUsers).then(() => {
            setUsers(updatedUsers);
            navigate('/users');
            console.log(updatedUsers);
        });
    };

    return (
        <Container maxWidth="sm">
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    {details.length > 0 &&
                        <Box
                            component="form"
                            onSubmit={handleSubmit(onSubmit)}
                            sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', margin: '0 auto' }}
                        >
                            <Typography variant="h4" component="h1" gutterBottom align="center">
                                {username}'s Profile Data
                            </Typography>
                            <TextField
                                label="Username"
                                variant="outlined"
                                fullWidth
                                disabled
                                defaultValue={details[0].username}
                                {...register("username", { required: 'Username is required' })}
                                error={!!errors.username}
                                helperText={errors.username ? errors.username.message : ''}
                            />
                            <TextField
                                type="password"
                                disabled
                                variant="outlined"
                                fullWidth
                                {...register("password", { required: 'Password is required' })}
                            />
                            <TextField
                                select
                                label="Role Type"
                                disabled
                                value={details[0].roletype}
                                variant="outlined"
                                fullWidth
                                {...register("roletype", { required: 'Role type is required' })}
                                error={!!errors.roletype}
                                helperText={errors.roletype ? errors.roletype.message : ''}
                            >
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="user">User</MenuItem>
                            </TextField>
                            <TextField
                                label="Name"
                                variant="outlined"
                                fullWidth
                                {...register("name", { required: 'Name is required' })}
                                error={!!errors.name}
                                helperText={errors.name ? errors.name.message : ''}
                            />
                            <TextField
                                label="Address"
                                variant="outlined"
                                fullWidth
                                {...register("address", { required: 'Address is required' })}
                                error={!!errors.address}
                                helperText={errors.address ? errors.address.message : ''}
                            />
                            <TextField
                                label="Phone Number"
                                variant="outlined"
                                fullWidth
                                {...register("phonenumber", {
                                    required: 'Phone number is required',
                                    pattern: /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g
                                })}
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Save
                            </Button>
                        </Box>
                    }
                </Grid>
            </Grid>
        </Container>
    );
}

export default Profile;
