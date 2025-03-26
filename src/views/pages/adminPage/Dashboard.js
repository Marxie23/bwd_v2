import { Box, Card, Grid, Icon, Typography, useTheme } from '@mui/material'
import React from 'react'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import { AccessTime} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import TransactionPage from '../subpage/TransactionPage';
import PostAddIcon from '@mui/icons-material/PostAdd';

const Dashboard = () => {

  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 1, mt:1}}>
      <Typography variant='h4' gutterBottom>
        Dashboard
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6} md={3}>
            <Card sx={{display:'flex', alignItems:'center', flexDirection: {lg:'row', sm:'column'}, p:'10px', gap:'10px', borderRadius: 3, borderWidth: '4px', background: "rgba(39, 141, 58, 0.15)", backdropFilter: 'blur(10px)'}} onClick={() => navigate('profile')}>
              <Box>
                <AccountCircleOutlinedIcon sx={{color:"#013195",width:{md:'90px', xs:'50px'}, height:{md:'90px', xs:'50px'}}}/>
              </Box>
              <Box sx={{display:'flex', alignItems:'center', flexDirection:'column', justifyContent: 'space-around'}}>
                <Typography sx={{fontSize:{md:'16px', sm:'14px'}, fontWeight:500}}>My Profile</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card sx={{display:'flex', alignItems:'center', flexDirection: {lg:'row', sm:'column'}, p:'10px', gap:'10px', borderRadius: 3, borderWidth: '4px', background: "rgba(39, 141, 58, 0.15)", backdropFilter: 'blur(10px)'}}  onClick={() => navigate('notification')}>
              <Box>
                <CircleNotificationsOutlinedIcon sx={{color:"#0077B6",width:{md:'90px', xs:'50px'}, height:{md:'90px', xs:'50px'}}}/>
              </Box>
              <Box sx={{display:'flex', flexDirection:'column', justifyContent: 'space-around'}}>
                <Typography sx={{fontSize:{md:'16px', sm:'14px'}, fontWeight:500}}>Notifications</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card sx={{display:'flex', alignItems:'center', flexDirection: {lg:'row', sm:'column'}, p:'10px', gap:'10px', borderRadius: 3, borderWidth: '4px', background: "rgba(39, 141, 58, 0.15)", backdropFilter: 'blur(10px)'}} onClick={() => navigate('billing')}>
              <Box>
                <PaymentOutlinedIcon sx={{color:"#01C488",width:{md:'90px', xs:'50px'}, height:{md:'90px', xs:'50px'}}}/>
              </Box>
              <Box sx={{display:'flex', flexDirection:'column', justifyContent: 'space-around'}}>
                <Typography sx={{fontSize:{md:'16px', sm:'14px'}, fontWeight:500}}>BIlling
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card sx={{display:'flex', alignItems:'center', flexDirection: {lg:'row', sm:'column'}, p:'10px', gap:'10px', borderRadius: 3, borderWidth: '4px', background: "rgba(39, 141, 58, 0.15)", backdropFilter: 'blur(10px)'}} onClick={() => navigate('posting')}>
              <Box>
                <PostAddIcon sx={{color:"#CDA5B0",width:{md:'90px', xs:'50px'}, height:{md:'90px', xs:'50px'}}}/>
              </Box>
              <Box sx={{display:'flex', flexDirection:'column', justifyContent: 'space-around'}}>
                <Typography sx={{fontSize:{md:'16px', sm:'14px'}, fontWeight:500}}>Announcement & Activities</Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{backgroundColor: theme.palette.background.paper, borderTopLeftRadius:'10px', borderTopRightRadius:'10px', mt:'20px'}}>
        <Box sx={{display:'flex', flexDirection:'row', gap:'10px', p:'10px', alignItems:'center'}}>
          <Icon sx={{height:'50px', width:'50px'}}>
            <AccessTime sx={{width:'100%', height:'100%'}}/>
          </Icon>
          <Typography variant='h3' sx={{fontWeight:500}}>Recent Transaction</Typography>
        </Box>
        <Box>
        <TransactionPage/>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
