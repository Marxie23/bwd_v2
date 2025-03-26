import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableRow, Button, Snackbar, Alert } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";

const BillingInfoCardAdmin = ({id,customerName,accountNumber,meterNumber,period,
    dueDate,readingDate,presentReading,previousReading,consumption,amountDue,
    amountAfterDue,status,setIsEdit,readerName,paymentDate,paymentType,billFCACharge,currentBill}) => {

    const { user: currentUser } = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
    
        if(currentUser.accessType === "CASHIER"){
          setIsAdmin(false)
        }
        else if(currentUser.accessType === "ADMIN"){
          setIsAdmin(true)
        }
      }, [id]);

  const handleClick = (clickType) => {

    if (clickType === "edit") {
      if(!isAdmin){
        setOpen(true)
        setSeverity("warning")
        setMessage("You don`t have a permission to edit this!")
        return
      }
      console.log(`ID: ${id} | Name: ${customerName}`)
      setIsEdit(true)
    }

  };

  const handleSnackbar = () => {
    setOpen(false)
  }

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    const printContent = `
      <html>
        <head>
          <title>Billing Information</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            h2 {
              text-align: center;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            table, th, td {
              border: 1px solid black;
            }
            th, td {
              padding: 10px;
              text-align: left;
            }
          </style>
        </head>
        <body>
          <h2>Billing Information</h2>
          <table>
            <tr><th>Customer Name</th><td>${customerName}</td></tr>
            <tr><th>Account Number</th><td>${accountNumber}</td></tr>
            <tr><th>Meter Number</th><td>${meterNumber}</td></tr>
            <tr><th>Period</th><td>${period}</td></tr>
            <tr><th>Due Date</th><td>${dueDate}</td></tr>
            <tr><th>Reading Date</th><td>${readingDate}</td><th>Reader Name</th><td>${readerName}</td></tr>
            <tr><th>Present Reading</th><td>${presentReading}</td></tr>
            <tr><th>Previous Reading</th><td>${previousReading}</td></tr>
            <tr><th>FCA Charge</th><td>₱${parseFloat(billFCACharge).toFixed(2)}</td><th>Current Bill</th><td>₱${parseFloat(currentBill).toFixed(2)}</td></tr>
            <tr><th>Consumption</th><td>${consumption}</td></tr>
            <tr><th>Amount Due</th><td>₱${parseFloat(amountDue).toFixed(2)}</td><th>Amount After Due</th><td>₱${parseFloat(amountAfterDue).toFixed(2)}</td></tr>
            <tr><th>Status</th><td>${status}</td></tr>
            ${status === "Paid" ? `<tr><th>Payment Date</th><td>${paymentDate}</td><th>Payment Type</th><td>${paymentType}</td></tr>` : ''}
          </table>
        </body>
      </html>
    `;
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
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
              {/* <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Payment Date:</TableCell>
                <TableCell>{paymentDate}</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Payment Type:</TableCell>
                <TableCell>{paymentType}</TableCell>
              </TableRow> */}
              {status === "Paid" && (
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Payment Date:</TableCell>
                  <TableCell>{paymentDate}</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Payment Type:</TableCell>
                  <TableCell>{paymentType}</TableCell>
                </TableRow>
              )}

            </TableBody>
          </Table>

          {/* Payment Buttons */}
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{padding: "10px 20px",textTransform: "none",fontWeight: "bold",marginRight: 2,}}
              onClick={() => handleClick("edit")}
              disabled={id === 0 || id === "" || status === "Paid"}  startIcon={<EditIcon />}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ padding: "10px 20px", textTransform: "none", fontWeight: "bold" }}
              onClick={handlePrint}
            >
              Print Billing Info
            </Button>

          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
export default BillingInfoCardAdmin;