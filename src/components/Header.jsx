import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import logo from '../assets/logo.png'
import { Avatar } from '@mui/material';
import {
    Link as RouterLink, useNavigate
} from 'react-router-dom'
import { UserContext } from '../context/UserContext';

const buttonStyles = {
    color: 'white',
    mr: '20px',
}


const Header = () => {
    const navigate = useNavigate()

    const { userData, setUserData } = useContext(UserContext)

    const handleLogout = () => {
        localStorage.removeItem('userData')
        setUserData(null)
        navigate('/signin')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar >
                    <Avatar sx={{ ml: '50px' }} alt="logo" src={logo} />
                    <Typography variant="h6" component={RouterLink} to='/' sx={{ color: 'white', textDecoration: 'none', flexGrow: 1, pl: '10px' }}>
                        Okhati
                    </Typography>

                    {userData ?
                        <>
                            <IconButton
                                sx={{ color: 'white' }}
                                component={RouterLink} to='/account'
                            >
                                <AccountCircle />
                            </IconButton>
                            <Button sx={{ ...buttonStyles }} component={RouterLink} to='/account' >Account</Button>
                            <Button sx={{ ...buttonStyles, mr: '50px' }} onClick={handleLogout} >Logout</Button>
                        </>
                        :
                        <>
                            <Button sx={{ ...buttonStyles }} component={RouterLink} to='/signup' >Register</Button>
                            <Button sx={{ ...buttonStyles, mr: '50px' }} component={RouterLink} to='/signin' >Login</Button>
                        </>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header