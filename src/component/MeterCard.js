import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Button, Grid, Snackbar, Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MeterCard = ({id,accountN,fullName,meterNo,address,status,currentMonthYear}) => {

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState("")

  const handleSnackbar = () => {
    setOpen(false)
  }

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
      <Card sx={{width: "90%",minWidth: "90%", minHeight: 700, boxShadow: 3,borderRadius: 2,backgroundColor: "#ffffff",}}>
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
          {/* <Box sx={{ display: "flex", justifyContent: "right", mt:2}}>
            <Button variant="contained" color="primary" sx={{ padding: "10px 20px", textTransform: "none", fontWeight: "bold", marginRight: 2, }}
            disabled={id === 0 || id === ""}  startIcon={<EditIcon />}>
              Edit
            </Button>
            <Button variant="contained" color="secondary" sx={{ padding: "10px 20px", textTransform: "none", fontWeight: "bold", }}
            disabled={id === 0 || id === ""}  startIcon={<DeleteIcon />}>
              Delete
            </Button>
          </Box> */}
        </CardContent>
      </Card>
    </Box>
  );
}
export default MeterCard;