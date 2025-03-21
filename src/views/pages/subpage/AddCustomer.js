import React, { useState } from "react";
import {Box,TextField,Typography,IconButton,Grid,Paper, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import BillingInfoCardAdd from "../../../component/Input/BillingInfoCardAdd"
import BillingInfoCardAdmin from "../../../component/Input/BillingInfoCardAdmin";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from 'react-router-dom';

const sampleBills = [
    {
      id: "12345",
      customerName: "Marxie Mukim",
      accountNumber: "123456789",
      meterNumber: "987654321",
      period: "January 2024",
      dueDate: "2024-02-10",
      readingDate: "2024-01-01",
      presentReading: 150,
      previousReading: 120,
      consumption: 30,
      amountDue: 100,
      amountAfterDue: 120,
      address:"Bongao, Tawi-Tawi",
      status: "Active"
    },
    {
      id: "67890",
      customerName: "Lita Gomez",
      accountNumber: "987654321",
      meterNumber: "123456789",
      period: "February 2024",
      dueDate: "2024-03-10",
      readingDate: "2024-02-01",
      presentReading: 200,
      previousReading: 180,
      consumption: 20,
      amountDue: 80,
      amountAfterDue: 100,
      address:"Bongao, Tawi-Tawi",
      status: "Active"
    },
  ];

const AddCustomer = () => {

    const navigate = useNavigate();
    const theme = useTheme();
      const isXs = useMediaQuery(theme.breakpoints.down('xs'));
      const [open, setOpen] = useState(false);
      const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    
      const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
    
      const [addNew, setAddNew] = useState(false)
    
      const handleOpenAddNew = () => {
        setAddNew(true)
      }
      const handleCloseAddNew = () => {
        setAddNew(false)
      }
    
      const [searchId, setSearchId] = useState(""); 
      const [filteredBills, setFilteredBills] = useState(sampleBills);
      const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setSearchId(searchValue);
    
        if (searchValue) {
          const filtered = sampleBills.filter((bill) =>
            bill.id.toLowerCase().includes(searchValue) ||
            bill.customerName.toLowerCase().includes(searchValue) ||
            bill.accountNumber.toLowerCase().includes(searchValue)
          );
          setFilteredBills(filtered);
        } else {
          setFilteredBills(sampleBills);
        }
      };
    
      const handleEdit = (id) => {
        alert(`Edit Bill with ID: ${id}`);
      };
    
      const columns = [
        { field: "accountNumber", headerName: "Account Number", flex: 1 },
        { field: "customerName", headerName: "Name", flex: 1 },
        { field: "meterNumber", headerName: "Meter Number", flex: 1 },
        { field: "address", headerName: "Address", flex: 1 },
        { field: "status", headerName: "Status", flex: 0.5 }
      ];
    
      const handleCellClick = (params) => {
        // console.log("Cell clicked:", params);
        // alert(`Cell clicked: Row ID = ${params.id}, Field = ${params.field}`);
        handleClickOpen()
      };
    
    return (
        <Box sx={{ padding: 1}}>
            <Box sx={{display:'flex', alignItems:'center'}}>
                <IconButton onClick={() => navigate(-1)} color="primary" sx={{ fontWeight:'30px'}}>
                    <ArrowBackIcon/>
                </IconButton>
                <Typography variant="h4">
                    Add Customer
                </Typography>
            </Box>
          <Grid container>
            <Grid item xs={12} lg={6} sx={{display:'flex', justifyContent:'center'}}>
              <TextField
                label="Search by Customer ID or Name"
                variant="outlined"
                fullWidth
                value={searchId}
                onChange={handleSearch}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
          </Grid>
          <Grid container>
              <Grid item xs={12} lg={6} component={Paper}>
                <DataGrid
                rows={filteredBills}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                disableSelectionOnClick
                sx={{height:'80vh'}}
                onCellClick={handleCellClick}
              />
              </Grid>
              <Grid item lg={6} sx={{display:{lg:'unset', xs:'none'} }}>
                <Box component={Paper} sx={{mr:1, ml:1, p:2}}>
                    <BillingInfoCardAdd/>
                </Box>
              </Grid>
              {!isXs && (
                <React.Fragment>
                <Dialog
                  fullScreen={fullScreen}
                  open={open}
                  onClose={handleClose}
                  sx={{display:{lg:'none', xs:'unset'}}}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogContent>
                    <Grid item xs={12} lg={6}>
                      <Box component={Paper} sx={{ mr: 1, ml: 1, p: 2, display:{lg:'none', xs:'unset'}}}>
                        <BillingInfoCardAdd/>
                      </Box>
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </React.Fragment>
              )}
            </Grid>
        </Box>
      );
};

export default AddCustomer;