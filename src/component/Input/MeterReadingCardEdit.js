import React, { useEffect, useState } from "react";
import {Box,Typography,Card,CardContent,Button,TextField,Grid, Snackbar, Alert, CircularProgress} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getMeterReadingByDateAndMeterID, updateMeterReadings } from "../../actions/meterReading";
import SendIcon from "@mui/icons-material/Send";

const MeterReadingCardEdit = ({id,accountN,fullName,meterNo,address,status,currentMonthYear,setIsEdit}) => {

  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const [open, setOpenSnackbar] = useState(false)
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState("")
  const [year, month] = currentMonthYear.split("-");

  const [periodStart, setPeriodStart] = useState("");
  const [periodEnd, setPeriodEnd] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [readingDate, setReadingDate] = useState("");
  const [presentReading, setPresentReading] = useState("");
  const [previousReading, setPreviousReading] = useState("");
  const [consumption, setConsumption] = useState("");
  const [amountDue, setAmountDue] = useState("");
  const [amountAfterDue, setAmountAfterDue] = useState("");
  const [loading, setLoading] = useState(false)
  const [meterReadingID, setMeterReadingID] = useState("")
  const [meterID, setMeterID] = useState("")
  const [customerID, setCustomerID] = useState("")
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

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
            setPeriodStart(new Date(meterReading.PeriodStart).toISOString().split('T')[0]);
            setPeriodEnd(new Date(meterReading.PeriodEnd).toISOString().split('T')[0])
            setReadingDate(new Date(meterReading.ReadingDate).toISOString().split('T')[0]);
            setDueDate(new Date(result.readings[0].DueDate).toISOString().split('T')[0])
            setPresentReading(meterReading.PresentReading);
            setPreviousReading(meterReading.PreviousReading);
            setConsumption(meterReading.Consumption);
            setAmountDue(result.readings[0].AmountDue)
            setAmountAfterDue(result.readings[0].AmountAfterDue)

            setMeterReadingID(result.readings[0].MeterReadingID)
            setCustomerID(result.readings[0].CustomerID)
            setMeterID(meterReading.MeterId)
            return;
        }
        else{
            setMessage(msg)
            setSeverity("error")
            setOpenSnackbar(true)
  
            setPeriodStart("------");
            setReadingDate("------");
            setPresentReading("------");
            setPreviousReading("------");
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
    }, [id,currentMonthYear]);

  const handleSnackbar = () => {
    setOpenSnackbar(false)
  }
  const handleReadingChange = (present, previous) => {
    setPresentReading(present);
    setPreviousReading(previous);
    if (present && previous) {
      setConsumption(present - previous);
    }
  };

  const handleCancel = async (e) => {
    setIsEdit(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!meterReadingID || !periodStart || !periodEnd || !dueDate || !readingDate || !presentReading || !previousReading || !consumption || !amountDue || !amountAfterDue) {
      setMessage("All fields must be filled out.")
      setSeverity("warning")
      setOpenSnackbar(true)
      return;
    }
    try{
      setLoading(true)
      const result = await dispatch(updateMeterReadings(meterReadingID,periodStart, periodEnd, readingDate, presentReading, previousReading,consumption, meterID,customerID, amountDue, amountAfterDue, dueDate,currentUser.id));
      const msg = result.message
      const isTrue = result.status

      console.log(result)

      
      if(isTrue){
        setLoading(false)
        setMessage(msg)
        setSeverity("success")
        setOpenSnackbar(true)

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
            Update Meter Reading
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                          <Typography sx={{ fontWeight: "bold" }}>Account Number:</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography sx={{ fontWeight: "600" }}>{accountN}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography sx={{ fontWeight: "bold" }}>Customer Name:</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography sx={{ fontWeight: "600" }}>{fullName}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography sx={{ fontWeight: "bold" }}>Meter Number:</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography sx={{ fontWeight: "600" }}>{meterNo}</Typography>
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
                        {/* Amount Due */}
                        <Grid item xs={12} md={6}>
                          <Typography sx={{ fontWeight: "bold" }}>Amount Due:</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            size="small"
                            type="number"
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
                            value={amountAfterDue}
                            onChange={(e) => setAmountAfterDue(e.target.value)}
                            sx={{ fontWeight: "600" }}
                            required
                          />
                        </Grid>
          </Grid>
          {/* Save Button */}
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3,gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                padding: "10px 20px",
                textTransform: "none",
                fontWeight: "bold",
              }}
              onClick={handleSubmit}
              disabled={!id || loading} // Disable button during loading
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
            <Button variant="contained"
              color="primary"
              sx={{
                padding: "10px 20px",
                textTransform: "none",
                fontWeight: "bold",
              }}
              onClick={handleCancel}
              disabled={loading} // Disable button during loading
              >
              Cancel
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MeterReadingCardEdit;
