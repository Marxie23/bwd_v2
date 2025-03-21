import React, { useEffect, useState } from "react";
import {Box,TextField,Typography,IconButton,Grid,Paper, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMeter } from "../../../actions/meter";
import MeterReadingCardAdd from "../../../component/Input/MeterReadingCardAdd";

const AddMeterReading = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [transformedMeters, setTransformedMeters] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMeters, setFilteredMeters] = useState([]);
  const [selectedMeter, setSelectedMeter] = useState(null);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  
  useEffect(() => {
    const fetchMeters = async () => {
      try {
        const result = await dispatch(getMeter());
        const meters = result.meters
        const mappedMeter = meters.map((meter, index) => ({
          id: meter.meter_meterID,
          meterNo: meter.meter_meterNo,
          customerId: meter.customer_customerID,
          fullName: meter.customer_fullName ?  meter.customer_fullName : "NONE",
          accountNo: meter.customer_accountNumber ? meter.customer_accountNumber : "NONE",
          address: meter.customer_address ? meter.customer_address : "NONE",
          status: meter.status == 1 ? 'Active' : 'Inactive'
        }));
        setFilteredMeters(mappedMeter)
        setTransformedMeters(mappedMeter)
      } catch (error) {
        console.log(error);
      }
    };
    fetchMeters();
  }, [update,dispatch]);

  const columns = [
    { field: "meterNo", headerName: "Meter Number", flex: 0.7 },
    { field: "fullName", headerName: "Owner", flex: 1.5 },
    { field: "accountNo", headerName: "Account Number", flex: 1 },
    { field: "address", headerName: "Address", flex: 1.8 },
    { field: "status", headerName: "Status", flex: 0.5 }
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query) {
      const filtered = transformedMeters.filter((meter) =>
        meter.fullName.toLowerCase().includes(query) ||
        meter.meterNo.toLowerCase().includes(query)
      );
      setFilteredMeters(filtered);
    } else {
      setFilteredMeters(transformedMeters);
    }
  };

  const handleCellClick = (params) => {
    // console.log("Cell clicked:", params);
    // alert(`Cell clicked: Row ID = ${params.id}, Field = ${params.field}`);
    const meter = transformedMeters.find((meter) => meter.id === params.id)
    if(meter){
      setSelectedMeter(meter)
    }
    handleClickOpen()
  };

  return (
    <Box sx={{ padding: 1, mt: 1 }}>
        <Box sx={{display:'flex', alignItems:'center'}}>
            <IconButton onClick={() => navigate(-1)} color="primary" sx={{ fontWeight:'30px'}}>
                <ArrowBackIcon fontSize="30px" />
            </IconButton>
            <Typography variant="h4">
                Add Meter Reading
            </Typography>
        </Box>
      <Grid container>
        <Grid item xs={12} lg={6} sx={{display:'flex', justifyContent:'center'}}>
          <TextField
            label="Search Meter No or Name"
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
            rows={filteredMeters}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 20]}
            disableSelectionOnClick
            sx={{height:'80vh'}}
            onCellClick={handleCellClick}
          />
          </Grid>
          <Grid item lg={6} sx={{display:{lg:'unset', xs:'none'} }}>
            <Box component={Paper} sx={{mr:1, ml:1, p:1}}>
              <MeterReadingCardAdd
                meterId={selectedMeter ? selectedMeter.id : 0}
                customerId={selectedMeter ? selectedMeter.customerId : 0}
                accountNum={selectedMeter ? selectedMeter.accountNo : ""}
                customerFullname={selectedMeter ? selectedMeter.fullName : ""}
                meterNum={selectedMeter ? selectedMeter.meterNo : ""}
                setUpdate={setUpdate}
                setOpen={setOpen}
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
                    <MeterReadingCardAdd
                      meterId={selectedMeter ? selectedMeter.id : 0}
                      customerId={selectedMeter ? selectedMeter.customerId : 0}
                      accountNum={selectedMeter ? selectedMeter.accountNo : ""}
                      customerFullname={selectedMeter ? selectedMeter.fullName : ""}
                      meterNum={selectedMeter ? selectedMeter.meterNo : ""}
                      setUpdate={setUpdate}
                      setOpen={setOpen}
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

export default AddMeterReading;
