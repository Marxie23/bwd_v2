import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableRow,Grid, Button, Snackbar, Alert, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { updateBillings } from "../../actions/billing";

const BillingInfoCardAdminEdit = ({id,customerName,accountNumber,meterNumber,period,
    dueDate,readingDate,presentReading,previousReading,consumption,amountDue,amountAfterDue,status,setIsEdit}) => {

    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    
    const [periodStart, setPeriodStart] = useState("");
    const [periodEnd, setPeriodEnd] = useState("");
    const [dueDates, setDueDate] = useState(new Date(dueDate).toISOString().split('T')[0]);
    const [readingDates, setReadingDate] = useState(new Date(readingDate).toISOString().split('T')[0]);
    const [presentReadings, setPresentReading] = useState(presentReading);
    const [previousReadings, setPreviousReading] = useState(previousReading);
    const [consumptions, setConsumption] = useState(consumption);
    const [amountDues, setAmountDue] = useState(amountDue);
    const [amountAfterDues, setAmountAfterDue] = useState(amountAfterDue);

    useEffect(() => {
      const [start, end] = period.split(" - ");
      setPeriodStart(new Date(start).toISOString().split('T')[0]);
      setPeriodEnd(new Date(end).toISOString().split('T')[0]);
    }, []);

    useEffect(() => {
    
        if(currentUser.accessType === "CASHIER"){
          setIsAdmin(false)
        }
        else if(currentUser.accessType === "ADMIN"){
          setIsAdmin(true)
        }
      }, [id]);

  const handleClick = async (clickType) => {

    if (clickType === "save") {
      try{
        const result = await dispatch(updateBillings(id,readingDate, dueDates, amountDues, "", status, presentReadings, previousReadings, consumptions,amountAfterDues,currentUser.id))
        console.log(result)
        if(result.data.status === true){
          setMessage(result.data.message)
          setSeverity("success")
          setOpen(true)
          window.location.reload()
        }
        else{
          setMessage(result.data.message)
          setSeverity("warning")
          setOpen(true)
        }

      }catch(error){
        console.log(error)
      }

      setIsEdit(false)

    }
    if (clickType === "cancel") {
      setIsEdit(false)

    }

  };

  const handleSnackbar = () => {
    setOpen(false)
  }

  const handleReadingChange = (present, previous) => {
    setPresentReading(present);
    setPreviousReading(previous);
    if (present && previous) {
      setConsumption(present - previous);
    }
  };
  

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "80vh",
        backgroundColor: "#f5f5f5",
        padding: 3,
      }}
    >
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
      <Card
        sx={{
          width: "80%",
          maxWidth: 900,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#ffffff",
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" fontWeight="bold" textAlign="center" marginBottom={3}>
            Billing Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                          <Typography sx={{ fontWeight: "bold" }}>Account Number:</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography sx={{ fontWeight: "600" }}>{accountNumber}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography sx={{ fontWeight: "bold" }}>Customer Name:</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography sx={{ fontWeight: "600" }}>{customerName}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography sx={{ fontWeight: "bold" }}>Meter Number:</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography sx={{ fontWeight: "600" }}>{meterNumber}</Typography>
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
                            value={dueDates}
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
                            value={readingDates}
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
                            value={presentReadings}
                            onChange={(e) => handleReadingChange(e.target.value, previousReadings)}
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
                            value={previousReadings}
                            onChange={(e) => handleReadingChange(presentReadings, e.target.value)}

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
                            value={consumptions}
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
                            value={amountDues}
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
                            value={amountAfterDues}
                            onChange={(e) => setAmountAfterDue(e.target.value)}
                            sx={{ fontWeight: "600" }}
                            required
                          />
                        </Grid>
          </Grid>

          {/* Payment Buttons */}
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{padding: "10px 20px",textTransform: "none",fontWeight: "bold",marginRight: 2,}}
              onClick={() => handleClick("save")}
              disabled={id === 0 || id === "" || status === "Paid"}  startIcon={<EditIcon />}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{padding: "10px 20px",textTransform: "none",fontWeight: "bold",marginRight: 2,}}
              onClick={() => handleClick("cancel")}
              disabled={id === 0 || id === "" || status === "Paid"}
            >
              Cancel
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
export default BillingInfoCardAdminEdit;