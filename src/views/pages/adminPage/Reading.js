import React, { useEffect, useState } from "react";
import {Box, TextField, Typography, IconButton, Grid, Paper, Button, Dialog, DialogContent, DialogActions, Snackbar, Alert} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MeterReadingCard from "../../../component/MeterReadingCard";
import { getMeterReadingByDate } from "../../../actions/meterReading";
import MeterReadingCardEdit from "../../../component/Input/MeterReadingCardEdit";

const Reading = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { user: currentUser } = useSelector((state) => state.auth);
  const [transformedMeters, setTransformedMeters] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMeters, setFilteredMeters] = useState([]);
  const [selectedMeter, setSelectedMeter] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentMonthYear, setCurrentMonthYear] = useState("");
  const [year, setYear] = useState("")
  const [month, setMonth] = useState("")

  const [isEdit, setIsEdit] = useState(false)

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState("")
  const handleSnackbar = () => {
    setOpenSnackbar(false)
  }
  
  useEffect(() => {
    const fetchMeterReading = async () => {
      setFilteredMeters([])
      setTransformedMeters([]);
      try {
        const result = await dispatch(getMeterReadingByDate(year, month,currentUser.id));
        const meterReadings = result.readings
        const msg = result.message
        const isTrue = result.status
        if(isTrue){
          const mappedMeter = meterReadings.map((meter, index) => ({
            id: meter.meter_meterID,
            meterNo: meter.meter_meterNo,
            fullName: meter.customer_fullName ? meter.customer_fullName : "NONE",
            accountNo: meter.customer_accountNumber ? meter.customer_accountNumber : "NONE",
            address: meter.customer_address ? meter.customer_address : "NONE",
            status: meter.status == 1 ? 'Active' : 'Inactive'
          }));
          setFilteredMeters(mappedMeter)
          setTransformedMeters(mappedMeter);
          return;
        }else{
          setMessage(msg)
          setSeverity("error")
          setOpenSnackbar(true)
        }
      } catch (error) {
        console.log(error);
      }
    };
    if(currentMonthYear !== ""){
      fetchMeterReading();
    }
  }, [currentMonthYear,currentUser,dispatch,month,year]);

  const columns = [
    { field: "meterNo", headerName: "Meter Number", flex: 0.7 },
    { field: "fullName", headerName: "Owner", flex: 1.5 },
    { field: "accountNo", headerName: "Account Number", flex: 1 },
    { field: "address", headerName: "Address", flex: 1.8 },
    { field: "status", headerName: "Status", flex: 0.5 }
  ];

  useEffect(() => {
    const today = new Date();
    const formattedMonthYear = formatMonthYear(today);
    setCurrentMonthYear(formattedMonthYear);
    const [yyyy, mm] = formattedMonthYear.split("-");
    setYear(yyyy)
    setMonth(mm)
  }, []);

  const formatMonthYear = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}`;
  };

  const handleMonthYearChange = (e) => {
    setCurrentMonthYear(e.target.value);
    const formattedMonthYear = e.target.value;
    const [yyyy, mm] = formattedMonthYear.split("-");
    setYear(yyyy)
    setMonth(mm)
  };

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
    const meter = transformedMeters.find((meter) => meter.id === params.id)
    if(meter){
      setSelectedMeter(meter)
    }
    handleClickOpen()
  };

  return (
    <Box sx={{ padding: 1, mt: 1 }}>
      <Snackbar sx={{ display: { xs: 'none', md: 'block' } }} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={openSnackbar} autoHideDuration={4000} onClose={handleSnackbar} >
        <Alert onClose={handleSnackbar} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <Snackbar sx={{ display: { xs: 'block', md: 'none' } }} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openSnackbar} autoHideDuration={4000} onClose={handleSnackbar} >
        <Alert onClose={handleSnackbar} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <Typography variant="h4" gutterBottom>
        Reading
      </Typography>
      <Grid container>
        <Grid item xs={12} lg={6} columnGap={1} sx={{display:'flex', justifyContent:'center'}}>
          <TextField
            label="Search Meter No or Name"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearch}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Select Reading Month"
            type="month"
            value={currentMonthYear}
            onChange={handleMonthYearChange}
            InputLabelProps={{ shrink: true }}
            sx={{ fontWeight: "600", width: "30%" }}
          />
          <Box sx={{display:'flex', justifyItems:'center'}}>
            <IconButton onClick={() => navigate('/meterReading/add')} sx={{height:'50px', width:'50px',}}>
              <AddCircleOutlinedIcon sx={{fontSize:'30px', color:'#013195'}}/>
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Grid container>
          <Grid item xs={12} lg={6} component={Paper}>
            <DataGrid
            rows={filteredMeters}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            sx={{height:'80vh'}}
            onCellClick={handleCellClick}
          />
          </Grid>
          <Grid item lg={6} sx={{display:{lg:'unset', xs:'none'} }}>
            <Box component={Paper} sx={{mr:1, ml:1, p:2}}>
              {isEdit ? (
                <MeterReadingCardEdit
                  id={selectedMeter ? selectedMeter.id : 0}
                  accountN={selectedMeter ? selectedMeter.accountNo : ""}
                  fullName={selectedMeter ? selectedMeter.fullName : ""}
                  meterNo={selectedMeter ? selectedMeter.meterNo : ""}
                  address={selectedMeter ? selectedMeter.address : ""}
                  status={selectedMeter ? selectedMeter.status : ""}
                  currentMonthYear={selectedMeter ? currentMonthYear : ""}
                  setIsEdit={setIsEdit}
                />
              ):(
                <MeterReadingCard
                  id={selectedMeter ? selectedMeter.id : 0}
                  accountN={selectedMeter ? selectedMeter.accountNo : ""}
                  fullName={selectedMeter ? selectedMeter.fullName : ""}
                  meterNo={selectedMeter ? selectedMeter.meterNo : ""}
                  address={selectedMeter ? selectedMeter.address : ""}
                  status={selectedMeter ? selectedMeter.status : ""}
                  currentMonthYear={selectedMeter ? currentMonthYear : ""}
                  setIsEdit={setIsEdit}
                />
              )}
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
                  {isEdit ? (
                    <MeterReadingCardEdit
                      id={selectedMeter ? selectedMeter.id : 0}
                      accountN={selectedMeter ? selectedMeter.accountNo : ""}
                      fullName={selectedMeter ? selectedMeter.fullName : ""}
                      meterNo={selectedMeter ? selectedMeter.meterNo : ""}
                      address={selectedMeter ? selectedMeter.address : ""}
                      status={selectedMeter ? selectedMeter.status : ""}
                      currentMonthYear={selectedMeter ? currentMonthYear : ""}
                      setIsEdit={setIsEdit}
                    />
                  ):(
                    <MeterReadingCard
                      id={selectedMeter ? selectedMeter.id : 0}
                      accountN={selectedMeter ? selectedMeter.accountNo : ""}
                      fullName={selectedMeter ? selectedMeter.fullName : ""}
                      meterNo={selectedMeter ? selectedMeter.meterNo : ""}
                      address={selectedMeter ? selectedMeter.address : ""}
                      status={selectedMeter ? selectedMeter.status : ""}
                      currentMonthYear={selectedMeter ? currentMonthYear : ""}
                      setIsEdit={setIsEdit}
                    />
                  )}
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

export default Reading;
