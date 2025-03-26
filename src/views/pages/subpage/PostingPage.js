import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Dialog, DialogActions, DialogContent, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateNotification from '../../../component/CreateNotificationCard'
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getNotification } from '../../../actions/notifications';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import PostActivityPage from './PostActivity';
import postingService from '../../../services/posting.service';
import ASSETS_URL from '../../../API/ASSETS_URL';

const Posting = () => {

    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const [openAddNew, setOpenAddNew] = useState(false);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [notifications, setNotifications] = useState([]);
    const [activities, setActivities] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

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
        const fetchPosts = async () => {
          const resultActivities = await postingService.getPostByCategory('activities',currentUser.id)
          if(resultActivities.post.length > 0){
            const formattedActivities = resultActivities.post.map(activity =>({
              id: activity.PostID,
              title: activity.Title,
              description: activity.Description,
              category: activity.Category,
              imageUrl: activity.ImageURL
            }))
            setActivities(formattedActivities);
          }else{
            setActivities([]);
          }
          const resultNotification = await postingService.getPostByCategory('announcements',currentUser.id)
          if(resultNotification.post.length > 0){
            const formattedAnnouncements = resultNotification.post.map(announcement =>({
              id: announcement.PostID,
              title: announcement.Title,
              description: announcement.Description,
              category: announcement.Category,
              imageUrl: announcement.ImageURL
            }))
            setAnnouncements(formattedAnnouncements);
          }else{
            setAnnouncements([]);
          }
      }
      fetchPosts()
      },[isUploading])

      const handleCardClick = (post) => {
        setSelectedPost(post);
        setOpenEdit(true);
      };
    
      // Close Edit Dialog
      const handleCloseEdit = () => {
        setOpenEdit(false);
        setSelectedPost(null);
      };

      const handleDeleteClick = (post) => {
        setPostToDelete(post);
        setDeleteDialogOpen(true);
      };
      const confirmDelete = async () => {
        if (postToDelete) {
          try {
            const result = await postingService.deletePost(postToDelete.id, currentUser.id);
            console.log(result)
            setIsUploading((prev) => !prev);
            setDeleteDialogOpen(false);
          } catch (error) {
            console.error('Failed to delete post:', error);
          }
        }
      };

  return (
    <Box sx={{ padding: 1, mt:1}}>
      <Typography variant='h4' gutterBottom>
        Announcement & Activities
      </Typography>
      <Grid container minHeight={'80vh'}>
        <Grid item xs={12} lg={6} component={Paper}>
        <Box sx={{p:2}}>
          <Box
              sx={{
                height: '400px', // Adjust the height as needed
                overflowY: 'auto',
                padding: 2,
                border: '1px solid #ccc',
                borderRadius: '8px',
                mb:1
              }}
            >
            <Typography variant='h5' gutterBottom>
              Activities
            </Typography>
              <Grid container spacing={3}>
                {activities.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Card sx={{ maxWidth: 345, height: '100%',background:'#808080' }}>
                      {item.imageUrl && (
                        <CardMedia
                          component="img"
                          height="180"
                          image={`http://127.0.0.1:5000${item.imageUrl}`}
                          alt={item.title}
                        />
                      )}
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                        <Typography variant="caption" color="primary">
                          Category: {item.category}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                          <Button size="small" color="error" onClick={() => handleDeleteClick(item)}>
                            Delete
                          </Button>
                          <Button size="small" color="primary" onClick={() => handleCardClick(item)}>
                            Update
                          </Button>
                        </Box>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box
              sx={{
                height: '400px', // Adjust the height as needed
                overflowY: 'auto',
                padding: 2,
                border: '1px solid #ccc',
                borderRadius: '8px',
              }}
            >
            <Typography variant='h5' gutterBottom>
              Announcement
            </Typography> 
              <Grid container spacing={3}>
                {announcements.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Card sx={{ maxWidth: 345, height: '100%',background:'#808080' }}>
                      {item.imageUrl && (
                        <CardMedia
                          component="img"
                          height="180"
                          image={`http://127.0.0.1:5000${item.imageUrl}`}
                          alt={item.title}
                        />
                      )}
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                        <Typography variant="caption" color="primary">
                          Category: {item.category}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                          <Button size="small" color="error" onClick={() => handleDeleteClick(item)}>
                            Delete
                          </Button>
                          <Button size="small" color="primary" onClick={() => handleCardClick(item)}>
                            Update
                          </Button>
                        </Box>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
        </Box>
        </Grid>
        <Grid item lg={6} sx={{display:{lg:'unset', xs:'none'} }}>
          <Box component={Paper} sx={{mr:1, ml:1, p:2}}>
            <PostActivityPage setIsUploading={setIsUploading}/>
          </Box>
        </Grid>
              {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogContent>
          <Typography>Are you sure you want to delete this post?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
        {/* Edit Dialog */}
        <Dialog
          open={openEdit}
          onClose={handleCloseEdit}
          fullWidth
          maxWidth="md"
        >
          <DialogContent>
            {selectedPost && (
              <PostActivityPage
                post={selectedPost}
                setIsUploading={setIsUploading}
                handleClose={handleCloseEdit}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit}>Close</Button>
          </DialogActions>
        </Dialog>
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

export default Posting
