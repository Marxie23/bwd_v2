import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Grid, Button, TextField, Snackbar, Alert } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerById, updateCustomer } from "../actions/customer";

const CustomerInfoEditCard = ({id,status,setIsEdit}) => {

    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState("")
    const [accountNumber, setAccountNumber] = useState("");
    const [customerLastname, setCustomerLastname] = useState("");
    const [customerFirstname, setCustomerFirstname] = useState("");
    const [customerMiddlename, setCustomerMiddlename] = useState("");
    const [meterNumber, setMeterNumber] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [address, setAddress] = useState("");
    const [installationDate, setInstallationDate] = useState("");
    const [email, setEmail] = useState("");

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

  useEffect(()=> {
    const fetchCustomerInfo = async () => {
      try{
        const result = await dispatch(getCustomerById(id,currentUser.id))
        const costumer = result.customer.customer;
        const meter = result.customer

        if(result.status === true){
          setAccountNumber(costumer.AccountNum)
          setCustomerLastname(costumer.Lastname)
          setCustomerFirstname(costumer.Firstname)
          setCustomerMiddlename(costumer.Middlename)
          setEmail(costumer.Email)
          setAddress(costumer.Address)
          setContactNumber(costumer.ContactNum)
          setMeterNumber(meter.meter.MeterNumber)
          setInstallationDate(new Date(meter.meter.InstallationDate).toISOString().split('T')[0])
        }
      }catch(error){
        console.log(error)
      }
    }
    if(id !== 0){
      fetchCustomerInfo()
    }
  },[id])

  // Function to handle payment options
  const handleClick = async (e) => {
    if(e === "cancel"){
      setIsEdit(false)
      return
    }

    if (!accountNumber || !customerFirstname || !customerMiddlename || !contactNumber || !meterNumber || !address || !installationDate || !email) {
      setMessage("All fields must be filled out.")
      setSeverity("warning")
      setOpen(true)
      return;
  }
    try{
      const result = await dispatch(updateCustomer(id,accountNumber, customerFirstname, customerMiddlename, customerLastname, contactNumber, meterNumber, address, installationDate,email, currentUser.id))
      console.log(result)
      if(result.status === true){
        setMessage(result.message)
        setSeverity("success")
        setOpen(true)
      }
    }catch(err){
      console.log(err)
    }
  };

  return (
    <Box sx={{display: "flex",justifyContent: "center",alignItems: "center",width: "100%",height: "80vh",backgroundColor: "#f5f5f5",padding: 2,}}>
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
      <Card sx={{width: "95%",minWidth: "95%",minHeight:"78vh",boxShadow: 3,borderRadius: 2,backgroundColor: "#ffffff",}}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center" marginBottom={3}>
            Edit Customer Information
          </Typography>
          <Grid container rowGap={1}>
                        <Grid item xs={12} lg={12} sx={{display:'flex', flexDirection:'column'}}>
                            <Typography sx={{ fontWeight: "bold" }}>Account Number:</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} lg={12} sx={{display:'flex', flexDirection:'column'}}>
                            <Typography sx={{ fontWeight: "bold" }}>Last Name:</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={customerLastname}
                                onChange={(e) => setCustomerLastname(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} lg={12} sx={{display:'flex', flexDirection:'column'}}>
                            <Typography sx={{ fontWeight: "bold" }}>First Name:</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={customerFirstname}
                                onChange={(e) => setCustomerFirstname(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} lg={12} sx={{display:'flex', flexDirection:'column'}}>
                        <Typography sx={{ fontWeight: "bold" }}>Middle Name:</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={customerMiddlename}
                                onChange={(e) => setCustomerMiddlename(e.target.value)}
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
                                onChange={handleEmailChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} lg={12} sx={{display:'flex', flexDirection:'column'}}>
                            <Typography sx={{ fontWeight: "bold" }}>Meter Number:</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={meterNumber}
                                onChange={(e) => setMeterNumber(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} lg={12} sx={{display:'flex', flexDirection:'column'}}>
                            <Typography sx={{ fontWeight: "bold" }}>Installation Date:</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                type="date"
                                value={installationDate}
                                onChange={(e) => setInstallationDate(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} lg={12} sx={{display:'flex', flexDirection:'column'}}>
                            <Typography sx={{ fontWeight: "bold" }}>Contact Number:</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} lg={12} sx={{display:'flex', flexDirection:'column'}}>
                            <Typography sx={{ fontWeight: "bold" }}>Address:</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </Grid>
                    </Grid>
          {/* Payment Buttons */}
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                padding: "10px 20px",
                textTransform: "none",
                fontWeight: "bold",
                marginRight: 2,
              }}
              onClick={() => handleClick("edit")}
              disabled={id === 0 || id === ""}  startIcon={<EditIcon />}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                padding: "10px 20px",
                textTransform: "none",
                fontWeight: "bold",
              }}
              onClick={() => handleClick("cancel")}
              disabled={id === 0 || id === ""}
            >
              Cancel
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
export default CustomerInfoEditCard;