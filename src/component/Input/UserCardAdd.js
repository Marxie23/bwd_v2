import React, { useState } from "react";
import {Box,Typography,Card,CardContent,Button,TextField,Grid, Snackbar, Alert, IconButton, Select, MenuItem, easing} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material'
import { addUser } from "../../actions/users";
import SendIcon from "@mui/icons-material/Send";

const UserCardAdd = ({setUpdate, setOpenAddNew}) => {

    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState("")

    const [userLastname, setUserLastname] = useState("");
    const [userFirstname, setUserFirstname] = useState("");
    const [userMiddlename, setUserMiddlename] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [userType, setUserType] = useState("")

    const [error, setError] = useState(false);

    const validateEmail = (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format regex
      return emailRegex.test(value);
    };
  
    const handleEmailChange = (e) => {
      const value = e.target.value;
      setEmail(value);
      setError(!validateEmail(value));
    };

    const handleSnackbar = () => {
        setOpen(false)
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userLastname || !userFirstname || !userMiddlename || !username || !email || !password || !userType) {
            setMessage("All fields must be filled out.")
            setSeverity("warning")
            setOpen(true)
            return;
        }
        try{
            const result = await dispatch(addUser(userLastname,userFirstname,userMiddlename,username,email,password,userType,currentUser.id));
            const msg = result.message
            const isTrue = result.status
            console.log(result)
            if(isTrue){
                setMessage(msg)
                setSeverity("success")
                setOpen(true)
                setUpdate(true)
                setOpenAddNew(false)
                return;
            }
            else{
                setMessage(msg)
                setSeverity("error")
                setOpen(true)
                return;
            }
        }
        catch(error){
            console.log(error)
        }
    };

    return (
        <Box sx={{display: "flex",justifyContent: "center",alignItems: "center",minWidth: "100%",height: "80vh",backgroundColor: "#f5f5f5",padding: 1,}}>
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
            <Card sx={{width: "90%",boxShadow: 3,borderRadius: 2,backgroundColor: "#ffffff",}}>
                <CardContent>
                    <Typography variant="h5" component="div" fontWeight="bold" textAlign="center" marginBottom={3} color={"primary"}>
                        User Form
                    </Typography>
                    <Grid container rowGap={1}>
                        <Grid item xs={12} lg={12} sx={{display:'flex', flexDirection:'column'}}>
                            <Typography sx={{ fontWeight: "bold" }}>Last Name:</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={userLastname}
                                onChange={(e) => setUserLastname(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} lg={12} sx={{display:'flex', flexDirection:'column'}}>
                            <Typography sx={{ fontWeight: "bold" }}>First Name:</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={userFirstname}
                                onChange={(e) => setUserFirstname(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} lg={12} sx={{display:'flex', flexDirection:'column'}}>
                        <Typography sx={{ fontWeight: "bold" }}>Middle Name:</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={userMiddlename}
                                onChange={(e) => setUserMiddlename(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} lg={12} sx={{display:'flex', flexDirection:'column'}}>
                            <Typography sx={{ fontWeight: "bold" }}>Username:</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} lg={12} sx={{display:'flex', flexDirection:'column'}}>
                        <Typography sx={{ fontWeight: "bold" }}>Email Address:</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                type="email"
                                value={email}
                                error={error}
                                helperText={error ? "Please enter a valid email address" : ""}
                                required
                                onChange={handleEmailChange}
                            />
                        </Grid>
                        <Grid item xs={12} lg={12} sx={{display:'flex', flexDirection:'column'}}>
                            <Typography sx={{ fontWeight: "bold" }}>Password:</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                required
                                InputProps={{
                                    endAdornment: (
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Access Type:</Typography>
                            <Select
                                fullWidth
                                size="small"
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                                required
                                displayEmpty
                            >
                                <MenuItem value="" disabled>
                                    Select Access Type
                                </MenuItem>
                                <MenuItem value="ADMIN">ADMIN</MenuItem>
                                <MenuItem value="CASHIER">CASHIER</MenuItem>
                                <MenuItem value="CLERK">CLERK</MenuItem>
                                <MenuItem value="CUSTOMER">CUSTOMER</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    {/* Save Button */}
                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
                        <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            padding: "10px 20px",
                            textTransform: "none",
                            fontWeight: "bold",
                        }}
                        onClick={handleSubmit}
                        startIcon={
                            <SendIcon/>
                        }
                        >
                        Submit
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UserCardAdd;
