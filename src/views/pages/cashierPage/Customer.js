import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, TextField, Grid, Dialog, DialogContent, DialogActions, Button, IconButton } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from "react-router-dom";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import CustomerInfoCard from "../../../component/CustomerIonfoCard";
import CustomerCardAdd from "../../../component/Input/CustomerCardAdd";
import { useDispatch, useSelector } from "react-redux";
import { getCustomer } from "../../../actions/customer";

const Customer = () => {

      const navigate = useNavigate();
      const dispatch = useDispatch();
      const theme = useTheme();
      const isXs = useMediaQuery(theme.breakpoints.down('xs'));
      const { user: currentUser } = useSelector((state) => state.auth);
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
            const result = await dispatch(getCustomer(currentUser.id));
            const customers = result.customers
            const mappedCustomer = customers.map(customers => {
              const meter = customers.Meters
              return {
                id: customers.CustomerID,
                accountNo: customers.AccountNum,
                fullName: `${customers.Firstname} ${customers.Middlename} ${customers.Lastname}`,
                meterNo: meter.length > 0 ? meter[0].MeterNumber : "------",
                installedDate: meter.length > 0 && meter[0].InstallationDate !== null ? new Date(meter[0].InstallationDate).toLocaleDateString() : "------",
                address: customers.Address,
                status: customers.Status == 1 ? 'Active' : 'Inactive'
              }
            })
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
      const handleAddNewOpen = () => {
        setOpenAddNew(true);
      };
      const handleAddNewClose = () => {
        setOpenAddNew(false);
      };

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
        const query = event.target.value;
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
  
  return (
    <Box sx={{ padding: 1, mt: 1 }}>
      <Typography variant="h4" gutterBottom>
        Customer
      </Typography>
      <Grid container>
        <Grid item xs={12} lg={6} sx={{display:'flex', justifyContent:'center'}}>
          <TextField
            label="Search Customer"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearch}
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{display:'flex', justifyItems:'center'}}>
            <IconButton onClick={handleAddNewOpen} sx={{height:'50px', width:'50px',}}>
              <AddCircleOutlinedIcon sx={{fontSize:'30px', color:'#013195'}}/>
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      {/* Table for Customer List */}
      <Grid container>
        <Grid item xs={12} lg={6} component={Paper}>
          <DataGrid
            rows={filteredCustomers}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 20]}
            disableSelectionOnClick
            sx={{height:'80vh'}}
            onCellClick={handleCellClick}
          />
        </Grid>
        <Grid item lg={6} sx={{display:{lg:'unset', xs:'none'} }}>
          <Box component={Paper} sx={{mr:1, ml:1, p:2}}>
            <CustomerInfoCard
              id={selectedCustomer ? selectedCustomer.id : 0}
              accountN={selectedCustomer ? selectedCustomer.accountNo : ""}
              fullName={selectedCustomer ? selectedCustomer.fullName : ""}
              meterNo={selectedCustomer ? selectedCustomer.meterNo : ""}
              address={selectedCustomer ? selectedCustomer.address : ""}
              status={selectedCustomer ? selectedCustomer.status : ""}
              installedDate={selectedCustomer ? selectedCustomer.installedDate : ""}
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
                  <Box component={Paper} sx={{ mr: 1, ml: 1, p: 1, display:{lg:'none', xs:'unset'}}}>
                    <CustomerInfoCard
                      id={selectedCustomer ? selectedCustomer.id : 0}
                      accountN={selectedCustomer ? selectedCustomer.accountNo : ""}
                      fullName={selectedCustomer ? selectedCustomer.fullName : ""}
                      meterNo={selectedCustomer ? selectedCustomer.meterNo : ""}
                      address={selectedCustomer ? selectedCustomer.address : ""}
                      status={selectedCustomer ? selectedCustomer.status : ""}
                      installedDate={selectedCustomer ? selectedCustomer.installedDate : ""}
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
          <React.Fragment>
            <Dialog
              fullScreen={fullScreen}
              open={openAddNew}
              onClose={handleAddNewClose}
            >
              <DialogContent>
                <Grid item xs={12} lg={12}>
                  <Box component={Paper} sx={{ mr: 1, ml: 1, p: 2}}>
                    <CustomerCardAdd setUpdate={setUpdate} setOpenAddNew={setOpenAddNew}/>
                  </Box>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleAddNewClose}>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
      </Grid>
    </Box>
  );
};

export default Customer;
