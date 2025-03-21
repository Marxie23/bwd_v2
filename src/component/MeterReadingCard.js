import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Button, Grid, Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getMeterReadingByDateAndMeterID } from "../actions/meterReading";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MeterReadingCard = ({id,accountN,fullName,meterNo,address,status,currentMonthYear,setIsEdit}) => {

  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [year, month] = currentMonthYear.split("-");
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  const [period, setPeriod] = useState("")
  const [readingDate, setReadingDate] = useState("")
  const [presReading, setPresReading] = useState("")
  const [prevReading, setPrevReading] = useState("")
  const [consumption, setConsumption] = useState("")
  const [paymentStatus, setPaymentStatus] = useState("")

  const [isPaid, setIsPaid] = useState(false)

  useEffect(() => {
    const fetchMeterReadingData = async () => {
      try{
        const result = await dispatch(getMeterReadingByDateAndMeterID(year,month,id,currentUser.id))
        const msg = result.message
        const isTrue = result.status
        
        if(isTrue){
          // setMessage(msg)
          // setSeverity("success")
          // setOpen(true)
          const meterReading = result.readings[0].MeterReading
          setPeriod(`${new Date(meterReading.PeriodStart).toLocaleDateString()} - ${new Date(meterReading.PeriodEnd).toLocaleDateString()}`);
          setReadingDate(new Date(meterReading.ReadingDate).toLocaleDateString());
          setPresReading(meterReading.PresentReading);
          setPrevReading(meterReading.PreviousReading);
          setConsumption(meterReading.Consumption);
          setPaymentStatus(result.readings[0].PaymentStatus)

          if(result.readings[0].PaymentStatus === "Paid"){
            setIsPaid(true)
          }
          else{
            setIsPaid(false)
          }
          return;
      }
      else{
          setMessage(msg)
          setSeverity("error")
          setOpen(true)

          setPeriod("------");
          setReadingDate("------");
          setPresReading("------");
          setPrevReading("------");
          setConsumption("------");
          return;
      }

      } catch(error){
        console.log(error)
      }
    }
    if(currentMonthYear  !== ""){
      fetchMeterReadingData()
    };
    if(currentUser.accessType === "CASHIER"){
      setIsAdmin(false)
    }
    else if(currentUser.accessType === "ADMIN"){
      setIsAdmin(true)
    }
  }, [id,currentMonthYear]);

  const handleSnackbar = () => {
    setOpen(false)
  }

  const handleEdit = async (e) => {
    if(!isAdmin){
      setOpen(true)
      setSeverity("warning")
      setMessage("You don`t have a permission to edit this!")
    }
    setIsEdit(true)
  };

  return (
    <Box sx={{display: "flex",justifyContent: "center",alignItems: "center",width: "100%",height: "80vh",backgroundColor: "#f5f5f5",padding: 3,}}>
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
      <Card sx={{width: "95%",maxWidth: "95%", minHeight: 750, boxShadow: 3,borderRadius: 2,backgroundColor: "#ffffff",}}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center" marginBottom={3}>
            Meter Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <Typography sx={{ fontWeight: "bold" }}>Meter Number:</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography sx={{ fontWeight: "600" }}>{meterNo}</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography sx={{ fontWeight: "bold" }}>Owner Name:</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography sx={{ fontWeight: "600" }}>{fullName}</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography sx={{ fontWeight: "bold" }}>Account Number:</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography sx={{ fontWeight: "600" }}>{accountN}</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography sx={{ fontWeight: "bold" }}>Address:</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography sx={{ fontWeight: "600" }}>{address}</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography sx={{ fontWeight: "bold" }}>Status:</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography sx={{ color: status === "Active" ? "green" : "red", fontWeight: "600" }}>{status}</Typography>
            </Grid>
          </Grid>
          <Typography variant="h5" fontWeight="bold" textAlign="center" marginBottom={3} marginTop={3}>
            Meter Reading
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <Typography sx={{ fontWeight: "bold" }}>Period:</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography sx={{ fontWeight: "600" }}>{period}</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography sx={{ fontWeight: "bold" }}>Reading Date:</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography sx={{ fontWeight: "600" }}>{readingDate}</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography sx={{ fontWeight: "bold" }}>Present Reading:</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography sx={{ fontWeight: "600" }}>{presReading}</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography sx={{ fontWeight: "bold" }}>Previous Reading:</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography sx={{ fontWeight: "600" }}>{prevReading}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography sx={{ fontWeight: "bold" }}>Consumption:</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography sx={{ fontWeight: "600" }}>{consumption}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography sx={{ fontWeight: "bold" }}>Payment Status:</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography sx={{ fontWeight: "600" }}>{paymentStatus}</Typography>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "right"}}>
            <Button variant="contained" color="primary" sx={{ padding: "10px 20px", textTransform: "none", fontWeight: "bold", marginRight: 2, }} 
              disabled={id === 0 || isPaid || id === ""}  startIcon={<EditIcon />}
              onClick={handleEdit}
              >
              Edit
            </Button>
            {/* <Button variant="contained" color="secondary" sx={{ padding: "10px 20px", textTransform: "none", fontWeight: "bold", }}
              disabled={id === 0 || id === ""}  startIcon={<DeleteIcon />}
              >
              Delete
            </Button> */}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
export default MeterReadingCard;