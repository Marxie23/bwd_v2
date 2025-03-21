import React, { useContext, useEffect, useState } from 'react'
import { Alert, Box, Grid, IconButton, Snackbar, Typography, useTheme } from '@mui/material'
import { Route, Routes, useNavigate } from 'react-router-dom'
import LoginView from '../views/LoginView'
import { DarkMode, LightMode } from '@mui/icons-material'
import { ColorModeContext } from '../theme'
import WelcomeView from '../views/WelcomeView'

const WelcomeLayout = ({ props }) => {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  useEffect(() => {
    const fetchUserFromLocalStorage = () => {
      const userData = localStorage.getItem('user');
      if(userData){
        try{
          navigate('/')
        }catch(error){
          console.error(error)
        }
      }
    }
    fetchUserFromLocalStorage()
  },[])

  const handleSnackbar = () => {
    setOpen(false)
  }

  return (
    <>
      <Snackbar sx={{ display: { xs: 'none', md: 'block' } }} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={open} autoHideDuration={4000} onClose={handleSnackbar} >
        <Alert onClose={handleSnackbar} severity="error">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar sx={{ display: { xs: 'block', md: 'none' } }} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={4000} onClose={handleSnackbar} >
        <Alert onClose={handleSnackbar} severity="error">
          {message}
        </Alert>
      </Snackbar>
      <Grid container height='100vh' sx={{ display: { xs: 'block', md: 'flex' }, justifyContent: { xs: 'center', md: 'center' }, alignItems: { xs: 'start', md: 'center' } }}>
        <Grid item xs={12} md={12}>
          <Routes>
            <Route path='/' element={<LoginView setOpen={setOpen} setMessage={setMessage} props={props} />} />
            <Route path='/landing' element={<WelcomeView setOpen={setOpen} props={props} />} />
          </Routes>
        </Grid>
      </Grid>
    </>
  )
}

export default WelcomeLayout