import React, { useEffect, useState } from "react";
import {Box,TextField,Typography,IconButton,Grid,Paper, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import BillingInfoCardAdd from "../../../component/Input/BillingInfoCardAdd"
import BillingInfoCardAdmin from "../../../component/Input/BillingInfoCardAdmin";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { getCustomer } from "../../../actions/customer";

const AddBilling = () => {

      const navigate = useNavigate();
      const dispatch = useDispatch();
      const theme = useTheme();
      const isXs = useMediaQuery(theme.breakpoints.down('xs'));
      const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
      const [transformedCustomers, setTransformedCustomers] = useState([])
      const [searchQuery, setSearchQuery] = useState("");
      const [filteredCustomers, setFilteredCustomers] = useState([]);
      const [selectedCustomer, setSelectedCustomer] = useState(null);
      const [openAddNew, setOpenAddNew] = useState(false);
      const [open, setOpen] = useState(false);
      const [update, setUpdate] = useState(false);

      useEffect(() => {
        const fetchCustomers = async () => {
          try {
            const result = await dispatch(getCustomer());
            const customers = result.customers
            const mappedCustomer = customers.map((customer, index) => ({
              id: customer.CustomerID,
              accountNo: customer.AccountNum,
              fullName: `${customer.Firstname} ${customer.Middlename} ${customer.Lastname}`,
              meterNo: customer.Meters && customer.Meters.length > 0 ? customer.Meters[0].MeterNumber : "N/A",
              meterId: customer.Meters && customer.Meters.length > 0 ? customer.Meters[0].MeterID : 0,
              address: customer.Address,
              status: customer.Status == 1 ? 'Active' : 'Inactive'
            }));
            setFilteredCustomers(mappedCustomer)
            setTransformedCustomers(mappedCustomer)
          } catch (error) {
            console.log(error);
          }
        };
        fetchCustomers();
      }, [update]);

      const columns = [
        { field: "accountNo", headerName: "Account No", flex: 0.8 },
        { field: "fullName", headerName: "Name", flex: 1.5 },
        { field: "meterNo", headerName: "Meter No", flex: 0.7 },
        { field: "address", headerName: "Address", flex: 1.8 },
        { field: "status", headerName: "Status", flex: 0.5 }
      ];

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
  const handleCellClick = (params) => {
    // console.log("Cell clicked:", params);
    // alert(`Cell clicked: Row ID = ${params.id}, Field = ${params.field}`);
    const customer = transformedCustomers.find((cust) => cust.id === params.id)
    if (customer){
      setSelectedCustomer(customer)
    }
    handleClickOpen()
  };
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    if (query) {
      const filtered = transformedCustomers.filter((customer) => {
        return (
          customer.accountNo.includes(query) ||
          customer.fullName.toLowerCase().includes(query.toLowerCase())
        );
      });
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers(transformedCustomers);
    }
  };

  const handleEdit = (id) => {
    alert(`Edit Bill with ID: ${id}`);
  };
    
    return (
        <Box sx={{ padding: 1}}>
            <Box sx={{display:'flex', alignItems:'center'}}>
                <IconButton onClick={() => navigate(-1)} color="primary" sx={{ fontWeight:'30px'}}>
                    <ArrowBackIcon fontSize="30px" />
                </IconButton>
                <Typography variant="h4">
                    Add Billing
                </Typography>
            </Box>
          <Grid container>
            <Grid item xs={12} lg={6} sx={{display:'flex', justifyContent:'center'}}>
              <TextField
                label="Search by Customer ID or Name"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleSearch}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
          </Grid>
          <Grid container>
              <Grid item xs={12} lg={6} component={Paper}>
                <DataGrid
                rows={filteredCustomers}
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
                  <BillingInfoCardAdd
                    customerId ={selectedCustomer ? selectedCustomer.id :0}
                    customerFullname = {selectedCustomer ? selectedCustomer.fullName : ""}
                    accountNum = {selectedCustomer ? selectedCustomer.accountNo : ""}
                    meterNum = {selectedCustomer ? selectedCustomer.meterNo : ""}
                    meterId = {selectedCustomer ? selectedCustomer.meterId : ""}
                  />
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
                        <BillingInfoCardAdd
                          customerId ={selectedCustomer ? selectedCustomer.id :0}
                          customerFullname = {selectedCustomer ? selectedCustomer.fullName : ""}
                          accountNum = {selectedCustomer ? selectedCustomer.accountNo : ""}
                          meterNum = {selectedCustomer ? selectedCustomer.meterNo : ""}
                          meterId = {selectedCustomer ? selectedCustomer.meterId : ""}
                        />
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

export default AddBilling;