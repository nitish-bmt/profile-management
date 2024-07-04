import React, { useContext } from 'react';
import { Container, Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { MainContext } from '../Utility/Context';
import { UserData } from '../../Common/Interfaces/UserData';

const UserList: React.FC = () => {
    const { users } = useContext(MainContext);

    return (
        <Container maxWidth="md" sx={{ marginTop: '90px' }}>
            <Grid container spacing={4}>
                {users.map((user: UserData) => (
                    <Grid item xs={12} key={user.id}>
                        <Card sx={{width:'100%'}}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {user.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Username: {user.username}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Address: {user.address}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Phone: {user.phonenumber}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Role: {user.roletype}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" href={`/profile/${user.username}`}>Edit</Button>
                                {/* <Button size="small">Delete</Button> */}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default UserList;