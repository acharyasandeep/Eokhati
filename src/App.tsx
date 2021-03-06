import React from 'react';
import { Toaster } from 'react-hot-toast'
import SignUpForm from './pages/SignUpForm';
import SignInForm from './pages/SignInForm';
import Account from './pages/Account';
import Header from './components/Header';
import Home from './pages/Home'
import { UserContextProvider } from './context/UserContext';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material';
import Footer from './components/Footer';

const theme = createTheme(
  {
    palette: {
      primary: {
        main: "#00960a"
      }
    },
  }
)

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <UserContextProvider>
            <Header />
            <Toaster />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/signin' element={<SignInForm />} />
              <Route path='/signup' element={<SignUpForm />} />
              <Route path='/account' element={<Account />} />
            </Routes>
            <Footer />
          </UserContextProvider>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
