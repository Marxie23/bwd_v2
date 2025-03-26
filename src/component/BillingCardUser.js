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
  Snackbar,
  Alert,
} from "@mui/material";

import Payments from "../views/pages/subpage/Payments";

const BillingCardUser = ({
  id,
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
  status,
  setIsUpdated,
  readerName,
  paymentDate,
  paymentTypes,
  billFCACharge,
  currentBill
}) => {
  const [checkout, setCheckout] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [description, setDescription] = useState("")
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const handleClick = async (clickType) => {
    if (!navigator.onLine) {
      setMessage("No internet connection detected. Please check your network.");
      setSeverity("error");
      setOpenSnackbar(true);
      return;
    }
    setPaymentType(clickType);
    const rMonth = new Date(readingDate)
    const month = await rMonth.getMonth();
    const monthName = await monthNames[month]
    setDescription(`Billing for the month of ${monthName}. Customer: ${customerName} | Meter No: ${meterNumber}`)
    setCheckout(true);
    console.log(`Billing for the month of ${monthName}.`)
  };

  const handleSnackbar = () => {
    setOpenSnackbar(false);
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
        padding: 1,
      }}
    >
      <Snackbar
        sx={{ display: { xs: "none", md: "block" } }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbar}
      >
        <Alert onClose={handleSnackbar} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        sx={{ display: { xs: "block", md: "none" } }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbar}
      >
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
          {checkout ? (
            <Box>
              <Payments id={id} paymentType={paymentType} amount={amountDue} description={description} setCheckout={setCheckout} setIsUpdated={setIsUpdated}/>
            </Box>
          ):(
            <Box>
              <Typography
            variant="h5"
            component="div"
            fontWeight="bold"
            textAlign="center"
            marginBottom={2}
          >
            Billing Information
          </Typography>
          <Table>
            <TableBody>
                            <TableRow>
                              <TableCell sx={{ fontWeight: "bold" }}>Customer Name:</TableCell>
                              <TableCell>{customerName}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ fontWeight: "bold" }}>Account Number:</TableCell>
                              <TableCell>{accountNumber}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ fontWeight: "bold" }}>Meter Number:</TableCell>
                              <TableCell>{meterNumber}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ fontWeight: "bold" }}>Period:</TableCell>
                              <TableCell>{period}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ fontWeight: "bold" }}>Due Date:</TableCell>
                              <TableCell>{dueDate}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ fontWeight: "bold" }}>Reading Date:</TableCell>
                              <TableCell>{readingDate}</TableCell>
                              <TableCell sx={{ fontWeight: "bold" }}>Reader Name:</TableCell>
                              <TableCell>{readerName}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ fontWeight: "bold" }}>Present Reading:</TableCell>
                              <TableCell>{presentReading}</TableCell>
                              <TableCell sx={{ fontWeight: "bold" }}>Previous Reading:</TableCell>
                              <TableCell>{previousReading}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ fontWeight: "bold" }}>FCA Charge:</TableCell>
                              <TableCell>{billFCACharge}</TableCell>
                              <TableCell sx={{ fontWeight: "bold" }}>Current Bill:</TableCell>
                              <TableCell>{currentBill}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ fontWeight: "bold" }}>Consumption:</TableCell>
                              <TableCell>{consumption}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ fontWeight: "bold" }}>Amount Due:</TableCell>
                              <TableCell>₱{amountDue}</TableCell>
                              <TableCell sx={{ fontWeight: "bold" }}>Amount After Due:</TableCell>
                              <TableCell>₱{amountAfterDue}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                              <TableCell>{status}</TableCell>
                            </TableRow>
                            {status === "Paid" && (
                              <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Payment Date:</TableCell>
                                <TableCell>{paymentDate}</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Payment Type:</TableCell>
                                <TableCell>{paymentTypes}</TableCell>
                              </TableRow>
                            )}

            </TableBody>
          </Table>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                marginTop: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 1,
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    padding: "10px 20px",
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                  onClick={() => handleClick("paymaya")}
                  disabled={!id || status === "Paid"}
                >
                  Pay Now
                </Button>
              </Box>
            </Box>
          </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default BillingCardUser;
