import React from 'react'
import { Typography } from '@mui/material'

const Footer = () => {
    return (
        <>
            <Typography variant="body2" align="center">
                {'Copyright © OKhati Solutions '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </>
    )
}

export default Footer