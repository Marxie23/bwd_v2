import { Box, Button, Card, CardContent, Container, Dialog, DialogActions, DialogContent, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateNotification from '../../../component/CreateNotificationCard'
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getNotification } from '../../../actions/notifications';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

const Notifications = () => {

    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const [openAddNew, setOpenAddNew] = useState(false);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [notifications, setNotifications] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
      const handleAddNewOpen = () => {
        setOpenAddNew(true);
      };
      const handleAddNewClose = () => {
        setOpenAddNew(false);
      };

      useEffect(() => {
        const fetchNotifications = async () => {
          const result = await dispatch(getNotification(currentUser.id,currentUser.id));
          console.log(result)
          const notification = result.notification
          const isTrue = result.status
          if(isTrue){
            const mappedNotifications = notification.map((notification,index)=> ({
                id: notification.Notifications.id,
                message: notification.Notifications.content,
                isRead: notification.Notifications.isRead
            }));
            setNotifications(mappedNotifications)
        }else{
            setNotifications([])
        }
        }
        fetchNotifications()
      },[])

          const handleMarkAsRead = async (id) => {
              setNotifications((prevNotifications) =>
              prevNotifications.map((notification) =>
                  notification.id === id ? { ...notification, isRead: true } : notification
              )
              );
          };

      const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  return (
    <Box sx={{ padding: 1, mt:1}}>
      <Typography variant='h4' gutterBottom>
        Notification
      </Typography>
      <Grid container minHeight={'80vh'}>
        <Grid item xs={12} lg={6} component={Paper}>
        <Card sx={{minHeight:'90vh'}}>
          <Box sx={{display:{md:'none',sm:'unset'}}}>
          <IconButton onClick={() => setOpenAddNew(true)} sx={{height:'50px', width:'50px',}}>
              <AddCircleOutlinedIcon sx={{fontSize:'30px', color:'#013195'}}/>
            </IconButton>
          </Box>
                      <CardContent>
                        <List>
                          {notifications.map((notification) =>(
                            <ListItem
                            key={notification.id}
                            sx={{
                              backgroundColor: notification.isRead ? "#f5f5f5" : "#e3f2fd",
                              marginBottom: "8px",
                              borderRadius: "4px",
                            }}
                            >
                              <ListItemIcon>
                  <NotificationsIcon color={notification.isRead ? "disabled" : "primary"} />
                </ListItemIcon>
                <ListItemText
                  primary={notification.message}
                  onClick={() => handleMarkAsRead(notification.id)}
                  sx={{ cursor: "pointer" }}
                />

                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
        </Grid>
        <Grid item lg={6} sx={{display:{lg:'unset', xs:'none'} }}>
          <Box component={Paper} sx={{mr:1, ml:1, p:2}}>
            <CreateNotification/>
          </Box>
        </Grid>
        {!isXs && (
            <React.Fragment>
            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              sx={{display:{lg:'none', xs:'unset'}}}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogContent>
                <Grid item xs={12} lg={6}>
                  <Box component={Paper} sx={{ mr: 1, ml: 1, p: 1, display:{lg:'none', xs:'unset'}}}>
                    <Card>
                      <CardContent>
                        <List>
                          {notifications.map((notification) =>(
                            <ListItem
                            key={notification.id}
                            sx={{
                              backgroundColor: notification.isRead ? "#f5f5f5" : "#e3f2fd",
                              marginBottom: "8px",
                              borderRadius: "4px",
                            }}
                            >
                              <ListItemIcon>
                  <NotificationsIcon color={notification.isRead ? "disabled" : "primary"} />
                </ListItemIcon>
                <ListItemText
                  primary={notification.message}
                  sx={{ cursor: "pointer" }}
                />
                <IconButton edge="end">
                  <DeleteIcon />
                </IconButton>

                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
          )}
          <React.Fragment>
            <Dialog
              fullScreen={fullScreen}
              open={openAddNew}
              onClose={handleAddNewClose}
            >
              <DialogContent>
                <Grid item xs={12} lg={12}>
                  <Box component={Paper} sx={{ mr: 1, ml: 1, p: 2}}>
                  <CreateNotification/>
                  </Box>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleAddNewClose}>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
      </Grid>
    </Box>
  )
}

export default Notifications
