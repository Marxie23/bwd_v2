import React, { useState } from "react";
import {Box,Typography,Card,CardContent,Button,TextField,Grid, Snackbar, Alert, CircularProgress} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createMeterReading } from "../../actions/meterReading";
import { createNotification } from "../../actions/notifications"
import SendIcon from "@mui/icons-material/Send";
import io from "socket.io-client"
import SOCKET_API from "../../API/SOCKET_API"

const MeterReadingCardAdd = ({meterId,customerId,accountNum,customerFullname,meterNum,setUpdate,setOpen}) => {

  const dispatch = useDispatch();
  const socket = io.connect(SOCKET_API)

  const { user: currentUser } = useSelector((state) => state.auth);
  const [open, setOpenSnackbar] = useState(false)
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState("")

  const [periodStart, setPeriodStart] = useState("");
  const [periodEnd, setPeriodEnd] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [readingDate, setReadingDate] = useState("");
  const [presentReading, setPresentReading] = useState("");
  const [previousReading, setPreviousReading] = useState("");
  const [consumption, setConsumption] = useState("");
  const [amountDue, setAmountDue] = useState("");
  const [amountAfterDue, setAmountAfterDue] = useState("");
  const [readerName, setReaderName] = useState("");
  const [currentBill, setCurrentBill] = useState("");
  const [fcaCharge, setFcacharge] = useState(100);
  const [loading, setLoading] = useState(false)
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const receiverID = customerId

  const handleSnackbar = () => {
    setOpenSnackbar(false)
  }
  const handleReadingChange = (present, previous) => {
    setPresentReading(present);
    setPreviousReading(previous);
    if (present && previous) {
      setConsumption(present - previous);
      calculateCurrentBill(present - previous);
    }
  };

  const joinUser =() =>{
    if(receiverID){
      socket.emit("join_user", receiverID)
    }
  };

  const handleSubmit = async (e) => {
    joinUser();
    e.preventDefault()
    if (!meterId || !customerId || !periodStart || !periodEnd || !dueDate || !readingDate || !presentReading || !previousReading || !consumption || !amountDue || !amountAfterDue || !readerName) {
      setMessage("All fields must be filled out.")
      setSeverity("warning")
      setOpenSnackbar(true)
      return;
    }
    try{
      setLoading(true)
      const result = await dispatch(createMeterReading(periodStart, periodEnd, readingDate, presentReading, previousReading,consumption, meterId,customerId, amountDue, amountAfterDue, dueDate,fcaCharge,readerName,currentBill,currentUser.id));
      const msg = result.message
      const isTrue = result.status
      const meterReading = result.meterReading

      if(isTrue){
        const dateObject = new Date(readingDate)
        const month = dateObject.getMonth()
        const monthName = monthNames[month];
  
        const type = "BILLING";
        const content  =`You have a new billing for the month of ${monthName}.
                      \nPeriod: ${new Date(periodStart).toLocaleDateString()}-${new Date(periodEnd).toLocaleDateString()}
                      \nDue Date: ${new Date(dueDate).toLocaleDateString()}
                      \nReading Date: ${new Date(readingDate).toLocaleDateString()}
                      \nPres Reading: ${presentReading}
                      \nPrev Reading: ${previousReading}
                      \nConsumption: ${consumption}
                      \nCurrent Bill: ${currentBill}
                      \nFCA Charge: ${fcaCharge}
                      \nAmount Due: ${amountDue}
                      \nAmount After Due: ${amountAfterDue}
                      \nMeter Reader: ${readerName}`
        const contentId = meterReading.billingID;
        const visibleTo ="All"
        const recipients = [{id: result.meterReading.user.UserID,
          fullName: `${result.meterReading.user.Firstname} ${result.meterReading.user.Middlename}. ${result.meterReading.user.Lastname}`,
          userType: result.meterReading.user.AccessType,
          email:result.meterReading.user.Email}
        ]
        // const to = customerFullname;
        // const isRead = false;
        // const isRemoved = false;
        // const customer = customerId;

        setLoading(false)
        setMessage(msg)
        setSeverity("success")
        setOpenSnackbar(true)
        setOpen(true)
        setUpdate(true)

        // const newNotification = await dispatch(createNotification(type, content, contentId, to, isRead, isRemoved, customer,currentUser.id))
        // console.log(newNotification)
        const results = await dispatch(createNotification(type,content,contentId,recipients,visibleTo,currentUser.id))
        socket.emit("new_billing", {notifyMessage: content, receiverID})
        return
      }
      else{
        setMessage(msg)
        setSeverity("error")
        setOpenSnackbar(true)
        return;
      }
    }catch(error){
      console.log(error)
    }
  };

  function calculateAmountDue(currentBill,fcaCharge){
    if (currentBill && fcaCharge <= 0){
      setAmountDue(0);
    }
    const amount = currentBill + fcaCharge;
    setAmountDue(amount);
  }
  
  function calculateAmountAfterDue(originalAmount){
    if (originalAmount <= 0){
      setAmountAfterDue(0);
    }
    const increasedAmount = originalAmount * 1.10;
    setAmountAfterDue(parseFloat(increasedAmount.toFixed(2)));
  }
  function calculateCurrentBill(consumption){
    if (consumption <= 0){
      setCurrentBill(0);
    }
    const currentBill = consumption * 32;
    setCurrentBill(currentBill);
    calculateAmountDue(currentBill,fcaCharge);
    calculateAmountAfterDue(currentBill + fcaCharge);
  }

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
      <Card sx={{width: "95%",maxWidth: 900,boxShadow: 3,borderRadius: 2,backgroundColor: "#ffffff",}}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center" marginBottom={3}>
            Meter Reading Form
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontWeight: "bold" }}>Account Number:</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontWeight: "600" }}>{accountNum}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontWeight: "bold" }}>Customer Name:</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontWeight: "600" }}>{customerFullname}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontWeight: "bold" }}>Meter Number:</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontWeight: "600" }}>{meterNum}</Typography>
            </Grid>
            {/* Period */}
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontWeight: "bold" }}>Period:</Typography>
            </Grid>
            <Grid item xs={3} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Start"
                type="date"
                value={periodStart}
                onChange={(e) => setPeriodStart(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ fontWeight: "600" }}
                required
              />
            </Grid>
            <Grid item xs={3} md={3}>
              <TextField
                fullWidth
                size="small"
                label="End"
                type="date"
                value={periodEnd}
                required
                onChange={(e) => setPeriodEnd(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ fontWeight: "600" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontWeight: "bold" }}>Due Date:</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ fontWeight: "600" }}
                required
              />
            </Grid>
            {/* Reading Date */}
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontWeight: "bold" }}>Reading Date:</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                type="date"
                value={readingDate}
                onChange={(e) => setReadingDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ fontWeight: "600" }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontWeight: "bold" }}>Reader Name:</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                type="text"
                value={readerName}
                onChange={(e) => setReaderName(e.target.value)}
                sx={{ fontWeight: "600" }}
                required
              />
            </Grid>
            {/* Present Reading */}
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontWeight: "bold" }}>Present Reading:</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                type="number"
                value={presentReading}
                onChange={(e) => handleReadingChange(e.target.value, previousReading)}
                sx={{ fontWeight: "600" }}
                required
              />
            </Grid>
            {/* Previous Reading */}
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontWeight: "bold" }}>Previous Reading:</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                type="number"
                value={previousReading}
                onChange={(e) => handleReadingChange(presentReading, e.target.value)}
                sx={{ fontWeight: "600" }}
                required
              />
            </Grid>
            {/* Consumption */}
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontWeight: "bold" }}>Consumption:</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                type="number"
                disabled
                value={consumption}
                sx={{ fontWeight: "600" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontWeight: "bold" }}>Current Bill:</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                type="number"
                disabled
                value={currentBill}
                onChange={(e) => setCurrentBill(e.target.value)}
                sx={{ fontWeight: "600" }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontWeight: "bold" }}>FCA Charge:</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                type="number"
                disabled
                value={fcaCharge}
                onChange={(e) => setFcacharge(e.target.value)}
                sx={{ fontWeight: "600" }}
                required
              />
            </Grid>
            {/* Amount Due */}
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontWeight: "bold" }}>Amount Due:</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                type="number"
                disabled
                value={amountDue}
                onChange={(e) => setAmountDue(e.target.value)}
                sx={{ fontWeight: "600" }}
                required
              />
            </Grid>
            {/* Amount After Due */}
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontWeight: "bold" }}>Amount After Due:</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                type="number"
                disabled
                value={amountAfterDue}
                onChange={(e) => setAmountAfterDue(e.target.value)}
                sx={{ fontWeight: "600" }}
                required
              />
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
              disabled={!meterId || !customerId || loading} // Disable button during loading
              startIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <SendIcon />
                )
              }
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MeterReadingCardAdd;
