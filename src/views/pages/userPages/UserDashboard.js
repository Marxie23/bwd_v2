import { Alert, Badge, Box, Card, Grid, Icon, Snackbar, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import { AccessTime} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import io from "socket.io-client"
import SOCKET_API from "../../../API/SOCKET_API"
import { useDispatch } from 'react-redux'
import { getNotificationByUserId } from "../../../actions/notification"
import TransactionPage from '../userPages/TransactionPage';
import PostAddIcon from '@mui/icons-material/PostAdd';

const UserDashboard = () => {

    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);

    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0)
    const [open, setOpenSnackbar] = useState(false)
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState("")
    const handleSnackbar = () => {
      setOpenSnackbar(false)
    }

    const socket = io.connect(SOCKET_API)
    const receiverID = currentUser.customerID

    useEffect(() => {
      const joinUser = () =>{
        if(receiverID){
          socket.emit("join_user", receiverID)
        }
      };
      const getNotification = async () => {
        const newNotification = await dispatch(getNotificationByUserId(currentUser.customerID,currentUser.id))
        const unreadNotifications = newNotification.notifications.filter(notification => !notification.isRead)
        setNotificationCount(unreadNotifications.length)
      }
      joinUser()
      socket.on("receive_notification",(data)=>{
        getNotification()
        setMessage(data.notifyMessage)
        setSeverity("info")
        setOpenSnackbar(true)
      })
    },[socket])

      useEffect(() => {
          const getNotification = async () => {
              try{
                  const result = await dispatch(getNotificationByUserId(currentUser.customerID,currentUser.id))
                  const notification = result.notifications
                  const isTrue = result.status
                  if(isTrue){
                      const mappedNotifications = notification.map((notification,index)=> ({
                          id: notification.notification_ID,
                          message: notification.notification_content,
                          isRead: notification.notification_status
                      }));
                      setNotifications(mappedNotifications)
                  }else{
                      setNotifications([])
                  }
              } catch(error){
                  console.log(error)
              }
          }
          getNotification()
          
      },[])
      const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  return (
    <Box sx={{ padding: 1, mt:1}}>
      <Snackbar sx={{ display: { xs: 'none', md: 'block' } }} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={open} autoHideDuration={4000} onClose={handleSnackbar} >
        <Alert onClose={handleSnackbar} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <Snackbar sx={{ display: { xs: 'block', md: 'none' } }} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={4000} onClose={handleSnackbar} >
      <Alert onClose={handleSnackbar} severity={severity}>
          {message}
      </Alert>
      </Snackbar>
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
                <Typography sx={{fontSize:{md:'16px', sm:'14px'}, fontWeight:500}}>Billing</Typography>
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

export default UserDashboard
