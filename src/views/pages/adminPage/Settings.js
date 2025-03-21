import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Typography, Card, CardContent, Grid, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Visibility, VisibilityOff } from '@mui/icons-material'
import userService from "../../../services/user.service"
import {changePassword, getUserInfo} from "../../../actions/users"
import assetsULR from "../../../API/ASSETS_URL"

const Settings = () => {

  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);


  const [customer, setCustomer] = useState([]);

  const [accountNo, setAccountNo] = useState("");
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [meterNo, setMeterNo] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [picturePath, setPicturePath] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [oldPassword, setOldPassword] = useState("")

  const [image, setImage] = useState(null)
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(customer);
  const [isChangingPicture, setIsChangingPicture] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState(picturePath);

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const handleSnackbar = () => {
    setOpenSnackbar(false)
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      const result = await dispatch(getUserInfo(currentUser.id,currentUser.id));
      const isTrue = result.status
      if(isTrue){
        const user = result.users;
        if (user.customerDetails){
          setAccountNo(user.customerDetails.customer_accountNumber);
          setFullname(user.customerDetails.customer_fullName)
          setAddress(user.customerDetails.customer_address)
          setMeterNo(user.customerDetails.customer_meterNo)
        }else{
          setAccountNo("-----");
          setFullname(user.user_fullName)
          setAddress(user.user_email)
        }
        setUsername(user.user_username)
        setEmail(user.user_email)
        setPicturePath(`${assetsULR}${user.user_profilePicture}`)
      }
      
    }
    fetchUserInfo()
  },[])

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault()
    if (!newPassword || !oldPassword) {
      setMessage("All fields must be filled out.")
      setSeverity("warning")
      setOpenSnackbar(true)
      setIsEditing(true);
      return;
    }
    try{
      const userId = currentUser.id
      const result = await dispatch(changePassword(username,newPassword,oldPassword,userId,currentUser.id))
      const message = result.message
      const isTrue = result.status
      if(isTrue){
        setMessage(message)
        setSeverity("success")
        setOpenSnackbar(true)
        setIsEditing(false);
      }else{
        setMessage(message)
        setSeverity("warning")
        setOpenSnackbar(true)
        setIsEditing(true);
      }

    }catch(error){
      console.log(error)
    }

  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChangePictureClick = () => {
    setIsChangingPicture(true);
  };

  const handlePictureSave = async () => {
    setPicturePath(newProfilePicture)
    setIsChangingPicture(false);
    const formData = new FormData();
    formData.append("profilePicture", image);
    try{
      const result = await userService.changePicture(formData,currentUser.id)
      const isTrue = result.status
      if(isTrue){
        setPicturePath(`${assetsULR}${result.pictureURL}`)
      }
    }catch(error){
      console.log(error)
    }
  };

  const handlePictureCancel = () => {
    setNewProfilePicture(customer.profilePicture);
    setIsChangingPicture(false);
  };

  const handlePictureUpload = (event) => {
    const file = event.target.files[0];
    setImage(file)
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{display: "flex",justifyContent: "center",alignItems: "center",width: "100%",height: "100vh",backgroundColor: "#f5f5f5",padding: 2,}}>
            <Snackbar sx={{ display: { xs: 'none', md: 'block' } }} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={openSnackbar} autoHideDuration={4000} onClose={handleSnackbar} >
              <Alert onClose={handleSnackbar} severity={severity}>
                {message}
              </Alert>
            </Snackbar>
            <Snackbar sx={{ display: { xs: 'block', md: 'none' } }} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openSnackbar} autoHideDuration={4000} onClose={handleSnackbar} >
              <Alert onClose={handleSnackbar} severity={severity}>
                {message}
              </Alert>
            </Snackbar>
      <Card sx={{maxWidth:'md',boxShadow: 3,borderRadius: 2,backgroundColor: "#ffffff"}}>
        <CardContent>
          <Box sx={{display: "flex",flexDirection: "column",alignItems: "center", gap: 2,justifyContent: "flex-start",paddingTop: 3,paddingLeft: 2}}>
            <Typography variant="h5" width="100%" component="div" fontWeight="bold" align="left">
              Settings
            </Typography>
            <Avatar
              alt={fullname}
              src={picturePath}
              sx={{width: 150,height: 150, marginTop: 2,
              }}/>
            <Button variant="outlined" color="primary" sx={{ marginTop: 2 }} onClick={handleChangePictureClick}>
              Change Profile Picture
            </Button>
            {/* Account Information in Grid */}
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              {/* <Grid item xs={6}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Account No:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  {accountNo}
                </Typography>
              </Grid> */}

              <Grid item xs={6}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Full Name:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  {fullname}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Email Address:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  {address}
                </Typography>
              </Grid>
              {/* <Grid item xs={6}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Meter No:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  {meterNo}
                </Typography>
              </Grid> */}
              <Typography
                width="100%"
                fontWeight="bold"
                mt={3}
                textAlign="center"
              >
                Login Details
              </Typography>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Username:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  {username}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Password:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  {newPassword}
                </Typography>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginTop: 3,
                textTransform: "none",
              }}
              onClick={handleEditClick}
            >
              Edit Login Credentials
            </Button>
          </Box>
        </CardContent>
      </Card>
      {/* Edit Dialog */}
      <Dialog open={isEditing} onClose={handleCancel} fullWidth maxWidth="sm">
        <DialogTitle>Edit Login Credentials</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
                        endAdornment: (
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                          ),
                    }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                ),
          }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Change Profile Picture Dialog */}
      <Dialog open={isChangingPicture} onClose={handlePictureCancel} fullWidth maxWidth="xs">
        <DialogTitle>Change Profile Picture</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              marginTop: 2,
            }}
          >
            <Avatar
              alt="New Profile Picture"
              src={newProfilePicture}
              sx={{ width: 200, height: 200 }}
            />
            <Button
              variant="outlined"
              component="label"
              sx={{ textTransform: "none" }}
            >
              Upload New Picture
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handlePictureUpload}
              />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePictureCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handlePictureSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings;
