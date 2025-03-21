import { Box, Button, Card, Container, Grid, IconButton, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { tokens } from '../theme'
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material'
import {useDispatch} from 'react-redux';
import {login} from '../actions/auth'

const LoginView = ({setOpen, setMessage}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await dispatch(login(username, password))
        if(result.status === false){
          setMessage(result.message)
          setOpen(true);
        }
        else{
          navigate('/')
        }
        // .then((result)=>{
        //   if(result.status === false){
        //     setMessage(result.message)
        //     setOpen(true);
        //   }
        //   else{
        //     navigate('/')
        //   }
        // })
        // .catch((err)=>{
        //   console.log(err)
        //   setMessage("Some error occured!")
        //   setOpen(true);
        // })
    }

  return (
    <Box container spacing={2} sx={{justifyContent: "center",alignContent:'center', minHeight:'90vh'}}>
      <Card component='form' onSubmit={handleLogin} variant='outlined'
      sx={{
        p: 2,
        borderRadius: 0,
        borderWidth: '4px',
        background: "rgba(39, 141, 58, 0.15)",
        backdropFilter: "blur(10px)",
        color: "white",}}
        >
        <Typography variant='h6' fontWeight={600} gutterBottom textAlign='center'>Log in</Typography>
        <TextField onChange={(e) => setUsername(e.target.value)} sx={{ mb: 1 }} variant='filled' fullWidth placeholder='Username' required
          InputProps={{style:{color:'white'}}}/>
        <TextField onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }} variant='filled' fullWidth placeholder='Password' type={showPassword ? 'text' : 'password'} required
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
              ),
              style:{color:'white'}
        }}/>
        <Button type='submit' fullWidth variant='contained' sx={{ borderRadius: 0, textTransform: 'capitalize', backgroundColor: colors.primary[1000] }}>Login</Button>
        <IconButton sx={{mt:'10px', color:'white'}} onClick={() => navigate('/landing')}><ArrowBack /></IconButton>
      </Card>
    </Box>
  )
}

export default LoginView
