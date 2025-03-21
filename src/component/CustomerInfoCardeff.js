import React, { useEffect } from "react";
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableRow, Button, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CustomerInfoCard = ({id,username,fullName,email,accessType,status,profilePicture}) => {

  useEffect(()=> {
    const fetchCustomerInfo = async () => {

      try{

      }catch(error){
        console.log(error)
      }
    }

    fetchCustomerInfo()
  })
  // Function to handle payment options
  const handlePayment = (paymentMethod) => {
    let paymentUrl = "";

  };

  return (
    <Box sx={{display: "flex",justifyContent: "center",alignItems: "center",width: "100%",height: "80vh",backgroundColor: "#f5f5f5",padding: 2,}}>
      <Card sx={{width: "95%",minWidth: "95%",minHeight:"78vh",boxShadow: 3,borderRadius: 2,backgroundColor: "#ffffff",}}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center" marginBottom={3}>
            User Information
          </Typography>
          <Box sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center", paddingLeft: 2, // Add padding to the left for better alignment
            }}>
            <Avatar
                alt={fullName}
                src={profilePicture}
                sx={{
                    width: 200,
                    height: 200,
                    marginTop: 2, // Space between the title and avatar
                }}
                />
          </Box>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Username:</TableCell>
                <TableCell sx={{ fontWeight: "600" }}>{username}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Fullname:</TableCell>
                <TableCell sx={{ fontWeight: "600" }}>{fullName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Email:</TableCell>
                <TableCell sx={{ fontWeight: "600" }}>{email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>User Type:</TableCell>
                <TableCell sx={{ fontWeight: "600" }}>{accessType}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Status:</TableCell>
                <TableCell sx={{ color: status === "Active" ? "green" : "red", fontWeight:"600" }}>{status}</TableCell>
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
              disabled={id === 0 || id === ""}  startIcon={<EditIcon />}
            >
              Edit
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
              disabled={id === 0 || id === ""}  startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
export default CustomerInfoCard;