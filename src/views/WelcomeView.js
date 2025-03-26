import React, { useState } from 'react';
import { Alert, Box, Button, Card, CardContent, Container, Grid, Snackbar, Typography, useTheme } from '@mui/material';
import { tokens } from '../theme';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginView from '../views/LoginView';
import LandingView from '../views/LandingView';
import RegisterView from '../views/RegisterView';

const WelcomeView = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")

  const handleSnackbar = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative', minHeight:'100vh'}}>
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          background: "linear-gradient(135deg, #2C2376, #6A5ACD)",
          p: 1
        }}
      >
        <Grid container>
          <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center',p:1 }}>
            <Box sx={{ height: { xs: '60px', md: '80px' },ml: {xs:0, md:1} }} onClick={() => navigate('/landing')}>
              <img src='https://res.cloudinary.com/dbfirdbxh/image/upload/v1742576822/Water_District_gmlfs2.png' alt='Logo' style={{ height: '100%' }} />
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block'}, ml:1 }} onClick={() => navigate('/landing')}>
              <Typography variant='h4' fontWeight={600} color='white'>
                Bongao Water District Web-Based Billing System
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: 1, alignItems:'center' }}> 
            <Button
              variant='outlined'
              sx={{ borderRadius: 0, textTransform: 'capitalize', backgroundColor: colors.grey[100] }}
              onClick={() => navigate('/landing/login')}
            >
              Sign In
            </Button>
            <Button
              variant='outlined'
              sx={{ borderRadius: 0, textTransform: 'capitalize', backgroundColor: colors.grey[100] }}
              onClick={() => navigate('/landing/register')}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          width: '100%',
          backgroundImage:'url("https://res.cloudinary.com/dbfirdbxh/image/upload/v1742576528/bg_tdbdbq.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Routes>
          <Route path='/*' element={<LandingView />} />
          <Route path='/login' element={<LoginView setOpen={setOpen} setMessage={setMessage} />} />
          <Route path='/register' element={<RegisterView setOpen={setOpen} setMessage={setMessage}/>} />
        </Routes>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom:'10px',
          position: 'fixed', // Keeps footer at the bottom
          bottom: 0, // Aligns footer to bottom
          left: 0,
          zIndex: 1, // Pushes footer behind other content
        }}
      >
        <Typography variant='body2' color='white' fontWeight={500}>
          © 2025 Bongao Water District Web-Based Billing. All rights reserved.
        </Typography>
      </Box>

    </Box>
  );
};


export default WelcomeView;
