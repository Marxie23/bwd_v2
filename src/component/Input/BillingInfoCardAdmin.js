import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableRow, Button, Snackbar, Alert } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";

const BillingInfoCardAdmin = ({id,customerName,accountNumber,meterNumber,period,
    dueDate,readingDate,presentReading,previousReading,consumption,amountDue,amountAfterDue,status,setIsEdit }) => {

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
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Present Reading:</TableCell>
                <TableCell>{presentReading}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Previous Reading:</TableCell>
                <TableCell>{previousReading}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Consumption:</TableCell>
                <TableCell>{consumption}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Amount Due:</TableCell>
                <TableCell>₱{amountDue}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Amount After Due:</TableCell>
                <TableCell>₱{amountAfterDue}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell>{status}</TableCell>
              </TableRow>
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
            {/* <Button
              variant="contained"
              color="secondary"
              sx={{padding: "10px 20px",textTransform: "none",fontWeight: "bold",}}
              onClick={() => handleClick("save")}
              disabled={id === 0 || id === "" || status === "Paid"}
            >
              Save
            </Button> */}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
export default BillingInfoCardAdmin;