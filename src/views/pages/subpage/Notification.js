import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, ListItemIcon, IconButton, Badge, Box, CardContent, Card, CardHeader } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNotificationById, getNotificationByUserId, updateNotificationById } from '../../../actions/notification';
import { getNotification } from '../../../actions/notifications';

const Notification = () => {

    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const getNotifications = async () => {
            try{
                const result = await dispatch(getNotification(currentUser.id,currentUser.id))
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
            } catch(error){
                console.log(error)
            }
        }
        getNotifications()
        
    },[])

    const handleMarkAsRead = async (id) => {
        setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
            notification.id === id ? { ...notification, isRead: true } : notification
        )
        );
        const result = await dispatch(updateNotificationById(id,currentUser.id))
        console.log(result)
    };

    const handleDelete = async (id) => {
        setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== id)
        );
        // const result = await dispatch(deleteNotificationById(id,currentUser.id))
        // console.log(result)
    };

    const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  return (
    <Container maxWidth= "md">
      <Card sx={{ marginTop: "2rem", backgroundColor: "white", borderRadius: "8px", boxShadow: 3, minHeight:'80vh' }}>
        <CardHeader
          title={
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h5">Notifications</Typography>
              <Badge badgeContent={unreadCount} color="primary">
                <NotificationsIcon />
              </Badge>
            </Box>
          }
        />
        <CardContent>
          <List>
            {notifications.map((notification) => (
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
                <IconButton edge="end" onClick={() => handleDelete(notification.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          {notifications.length === 0 && (
            <Typography variant="body1" color="textSecondary" align="center">
              No notifications to display.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Notification;
