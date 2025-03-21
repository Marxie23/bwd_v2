import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableRow, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomer, getCustomerById, updateCustomer } from "../actions/customer";

const CustomerInfoCard = ({id,status,setIsEdit,setUpdate}) => {

  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [accountNum, setAccountNum] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [contactNum, setContactNum] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [meterNum, setMeterNum] = useState("")
  const [installedDate, setInstalledDate] = useState("")

  useEffect(()=> {
    const fetchCustomerInfo = async () => {
      try{
        const result = await dispatch(getCustomerById(id,currentUser.id))
        const costumer = result.customer.customer;
        const meter = result.customer

        if(result.status === true){
          setAccountNum(costumer.AccountNum)
          setCustomerName(`${costumer.Firstname} ${costumer.Middlename} ${costumer.Lastname}`)
          setEmail(costumer.Email)
          setAddress(costumer.Address)
          setContactNum(costumer.ContactNum)
          setMeterNum(meter.meter.MeterNumber)
          setInstalledDate(new Date(meter.meter.InstallationDate).toLocaleDateString())
        }
      }catch(error){
        console.log(error)
      }
    }
    if(id !== 0){
      fetchCustomerInfo()
    }
  })

  // Function to handle payment options
  const handleClick = async (e) => {
    if(e === "edit"){
      setIsEdit(true)
      return
    }
    if(e === "delete"){
      const result = await dispatch(deleteCustomer(id, currentUser.id))
      console.log(result)
      if(result.status === true){
        setUpdate(true)
        window.location.reload()
      }
    }
  };

  return (
    <Box sx={{display: "flex",justifyContent: "center",alignItems: "center",width: "100%",height: "80vh",backgroundColor: "#f5f5f5",padding: 2,}}>
      <Card sx={{width: "95%",minWidth: "95%",minHeight:"78vh",boxShadow: 3,borderRadius: 2,backgroundColor: "#ffffff",}}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center" marginBottom={3}>
            Customer Information
          </Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Account Number:</TableCell>
                <TableCell sx={{ fontWeight: "600" }}>{accountNum}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Customer Name:</TableCell>
                <TableCell sx={{ fontWeight: "600" }}>{customerName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Contact Number:</TableCell>
                <TableCell sx={{ fontWeight: "600" }}>{contactNum}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Email:</TableCell>
                <TableCell sx={{ fontWeight: "600" }}>{email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Address:</TableCell>
                <TableCell sx={{ fontWeight: "600" }}>{address}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Meter Number:</TableCell>
                <TableCell sx={{ fontWeight: "600" }}>{meterNum}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Installed Date:</TableCell>
                <TableCell sx={{ fontWeight: "600" }}>{installedDate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
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
              onClick={() => handleClick("edit")}
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
              onClick={() => handleClick("delete")}
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