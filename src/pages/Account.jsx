import React, { useContext, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { Box, Paper, Typography, Container } from '@mui/material'
import SignInForm from './SignInForm'

const Account = () => {
    const navigate = useNavigate()
    const { userData } = useContext(UserContext)

    return (
        <>
            {userData ?
                <Container component='main' maxWidth='xs'>
                    <Box sx={{
                        mt: 8,
                        textAlign: 'center',
                    }}>
                        <Typography variant='h5'>Welcome to Okhati</Typography>
                        <Paper elevation={3} sx={{
                            p: 8,
                            mt: 4

                        }}>
                            <Typography>Email: {userData?.email}</Typography>
                        </Paper>
                    </Box>
                </Container>
                :
                <>
                    <SignInForm />
                </>
            }
        </>
    )
}

export default Account