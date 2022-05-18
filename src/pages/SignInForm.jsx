import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const SignInForm = () => {
  const initialFormValues = { email: '', password: '' }

  const [formErrors, setFormErrors] = useState({})
  const [formValues, setFormValues] = useState(initialFormValues)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormValues({ ...formValues, [name]: value })
  }

  const validate = (values) => {
    let error = {}
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!values.email) {
      error.email = "Email cannot be empty"
    }
    else if (!regex.test(values.email)) {
      error.email = "Please enter a valid email address"
    }
    if (!values.password) {
      error.password = "Password cannot be empty"
    }

    return error
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setFormErrors(validate(formValues))
    setIsSubmitted(true)
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitted) {
      toast.success(`User Login Successful`)
      console.log(formValues)
    }
  }, [formErrors])

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Typography variant='h5'>Sign In </Typography>

          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{ mt: 2 }}
          >
            <TextField
              required
              margin='normal'
              name='email'
              label='Email Address'
              value={formValues.email}
              error={formErrors.email}
              helperText={formErrors.email}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              required
              margin='normal'
              name='password'
              type='password'
              label='Password'
              value={formValues.password}
              error={formErrors.password}
              helperText={formErrors.password}
              fullWidth
              onChange={handleChange}
            />
            <Button
              type='submit'
              variant='contained'
              fullWidth
              sx={{
                mt: 3,
                mb: 4
              }}
            >
              Sign In
            </Button>

          </Box>


        </Box>
      </Container >

    </>
  )
}

export default SignInForm