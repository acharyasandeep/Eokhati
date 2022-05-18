import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const SignUpForm = () => {

    const initialFormValues = { email: '', password: '', confirmPassword: '' }
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormValues({ ...formValues, [name]: value })
    }

    const validate = (values) => {
        const errors = {}
        const { email, password, confirmPassword } = values
        const EmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const numRegex = /[0-9]/
        const alphaRegex = /[a-z]/i
        if (!email) {
            errors.email = 'Email cannot be empty'
        }
        else if (!EmailRegex.test(email)) {
            errors.email = 'Please Enter a valid email address'
        }

        if (password < 8) {
            errors.password = 'Password must be at least eight character long'
        }
        else if (!alphaRegex.test(password) || !numRegex.test(password)) {
            errors.password = 'Password must contain at least one alphabet and a number'
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = 'Confirm password must be same as password'
        }
        return errors

    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setFormErrors(validate(formValues))
        setIsSubmitted(true)
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitted) {
            toast.success('Registration Successfull')
            console.log(formValues)
        }
    }, [formErrors])

    return (
        <Container component='main' maxWidth='xs'>
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
            >
                <Typography variant='h5'>
                    Sign Up
                </Typography>
                <Box component='form' onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        required
                        margin='normal'
                        name='email'
                        label='Email Address'
                        value={formValues.email}
                        error={formErrors.email}
                        helperText={formErrors.email}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        required
                        margin='normal'
                        name='password'
                        type='password'
                        label='Password'
                        value={formValues.password}
                        error={formErrors.password}
                        helperText={formErrors.password}
                        onChange={handleChange}

                    />
                    <TextField
                        fullWidth
                        required
                        margin='normal'
                        name='confirmPassword'
                        type='password'
                        label='Confirm Password'
                        value={formValues.confirmPassword}
                        error={formErrors.confirmPassword}
                        helperText={formErrors.confirmPassword}
                        onChange={handleChange}

                    />
                    <Button
                        fullWidth
                        type='submit'
                        sx={{
                            mt: 2
                        }}
                        variant='contained'
                    >
                        Sign Up
                    </Button>

                </Box>
            </Box>
        </Container>
    )
}

export default SignUpForm