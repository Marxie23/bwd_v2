import React from "react";
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableRow, Button } from "@mui/material";

const BillingPage = () => {
  // Sample billing data
  const billingData = {
    customerName: "Marxie Mukim",
    accountNumber: "123456789",
    meterNumber: "987654321",
    period: "October 11, 2024 - November 11, 2024",
    dueDate: "November 15, 2024",
    readingDate: "November 09, 2024",
    presentReading: 2500, // Water meter reading in cubic meters
    previousReading: 2450, // Previous reading
    consumption: 50, // Difference between present and previous readings
    amountDue: 500.0, // Amount to pay before due date
    amountAfterDue: 550.0, // Amount with late fees
  };

  // Function to handle payment options
  const handlePayment = (paymentMethod) => {
    let paymentUrl = "";

    if (paymentMethod === "paypal") {
      // PayPal URL (Replace with your PayPal.Me link)
      paymentUrl = "https://www.paypal.com/paypalme/yourusername";
    } else if (paymentMethod === "gcash") {
      // GCash URL or QR Code link (Replace with your GCash payment link or QR code)
      paymentUrl = "https://www.gcash.com/qr/gcash-payment-link";
    }

    // Open payment URL in a new tab
    window.open(paymentUrl, "_blank");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 3,
      }}
    >
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

          {/* Customer and Billing Information Table */}
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Customer Name:</TableCell>
                <TableCell>{billingData.customerName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Account Number:</TableCell>
                <TableCell>{billingData.accountNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Meter Number:</TableCell>
                <TableCell>{billingData.meterNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Period:</TableCell>
                <TableCell>{billingData.period}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Due Date:</TableCell>
                <TableCell>{billingData.dueDate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Reading Date:</TableCell>
                <TableCell>{billingData.readingDate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Present Reading:</TableCell>
                <TableCell>{billingData.presentReading} m³</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Previous Reading:</TableCell>
                <TableCell>{billingData.previousReading} m³</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Consumption:</TableCell>
                <TableCell>{billingData.consumption} m³</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Amount Due:</TableCell>
                <TableCell>₱{billingData.amountDue.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Amount After Due:</TableCell>
                <TableCell>₱{billingData.amountAfterDue.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

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
              onClick={() => handlePayment("paypal")}
            >
              Pay Now with PayPal
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                padding: "10px 20px",
                textTransform: "none",
                fontWeight: "bold",
              }}
              onClick={() => handlePayment("gcash")}
            >
              Pay Now with GCash
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BillingPage;
