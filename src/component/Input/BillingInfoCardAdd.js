import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  TextField,
  Grid
} from "@mui/material";

const BillingInfoFormAdd = ({customerId,customerFullname,accountNum,meterNum,meterId}) => {

  const [customerName, setCustomerName] = useState(customerFullname);
  const [accountNumber, setAccountNumber] = useState(accountNum);
  const [meterNumber, setMeterNumber] = useState(meterNum);
  const [metersId, setMetersId] = useState(meterId);
  const [period, setPeriod] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [readingDate, setReadingDate] = useState("");
  const [presentReading, setPresentReading] = useState("");
  const [previousReading, setPreviousReading] = useState("");
  const [consumption, setConsumption] = useState("");
  const [amountDue, setAmountDue] = useState("");
  const [amountAfterDue, setAmountAfterDue] = useState("");
  
  const handleSubmit = () => {
    const billingData = {
      customerName,
      accountNumber,
      meterNumber,
      period,
      dueDate,
      readingDate,
      presentReading,
      previousReading,
      consumption,
      amountDue,
      amountAfterDue,
    };
    console.log("Submitted Billing Data:", billingData);
  };

  return (
    <Box sx={{display: "flex",justifyContent: "center",alignItems: "center",minWidth: "100%",height: "80vh",backgroundColor: "#f5f5f5",padding: 1,}}>
      <Card sx={{width: "95%",maxWidth: 900,boxShadow: 3,borderRadius: 2,backgroundColor: "#ffffff",}}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center" marginBottom={3}>
            Billing Form
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
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                type="date"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ fontWeight: "600" }}
              />
            </Grid>

            {/* Due Date */}
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
                onChange={(e) => setPresentReading(e.target.value)}
                sx={{ fontWeight: "600" }}
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
                onChange={(e) => setPreviousReading(e.target.value)}
                sx={{ fontWeight: "600" }}
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
                value={consumption}
                onChange={(e) => setConsumption(e.target.value)}
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
            >
              Submit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BillingInfoFormAdd;
