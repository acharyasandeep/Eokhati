import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography
} from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import toast from 'react-hot-toast'
import bcrypt from 'bcryptjs'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const SignInForm = () => {
  const navigate = useNavigate()

  const { userData, setUserData } = useContext(UserContext)

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

  const signUserIn = async (values) => {
    let allUsers = JSON.parse(localStorage.getItem('allUsers')) || []
    const foundUser = allUsers.find((user) => user.email === values.email)
    if (foundUser) {
      const isPasswordMatched = await bcrypt.compare(values.password, foundUser.password)
      if (isPasswordMatched) {
        toast.success(`User Login Successful`)
        setUserData(foundUser)
        localStorage.setItem('userData', JSON.stringify(foundUser))
        navigate('/account')
      }
      else {
        toast.error('Incorrect password, Please try again')
      }
    }
    else {
      toast.error('Account not found, Please register first')
    }

  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitted) {
      signUserIn(formValues)
    }
  }, [formErrors])

  useEffect(() => {
    if (userData) {
      navigate('/')
    }
  }, [userData])

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