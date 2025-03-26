import React, { useEffect, useState } from "react";
import {Box,TextField,Typography,Grid,Paper, Button, Dialog, DialogContent, DialogActions, Snackbar, Alert, Menu, MenuItem} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import BillingInfoCardAdmin from "../../../component/Input/BillingInfoCardAdmin";
import { useDispatch, useSelector } from "react-redux";
import {getBillingByDate, getCustomerBillingByName} from "../../../actions/billing"

import jsPDF from "jspdf";
import "jspdf-autotable";
import BillingInfoCardAdminEdit from "../../../component/Input/BillingInfoCardAdminEdit";
import BillingHistory from "../adminPage/BillingHistory";


const Billing = () => {

    const dispatch = useDispatch();
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const [open, setOpen] = useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { user: currentUser } = useSelector((state) => state.auth);
    const [currentMonthYear, setCurrentMonthYear] = useState("");
    const [year, month] = currentMonthYear.split("-");
    const [transformedBillings, setTransformedBillings] = useState([])
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredBillings, setFilteredBillings] = useState([]);
    const [selectedBilling, setSelectedBilling] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState("")

    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
      const today = new Date();
      const formattedMonthYear = formatMonthYear(today);
      setCurrentMonthYear(formattedMonthYear);
    }, []);

    useEffect(() => {
      const fetchBilling = async () => {
        try{
          
          const result = await dispatch(getBillingByDate(year,month,currentUser.id));
          const billing = result.billingInfo
          const msg = result.message
          const isTrue = result.status
          if(isTrue){
            const mappedBilling = billing.map((bill,index) => ({
              id: bill.billing_BillingID,
              billDate: bill.billing_BillingID,
              billDueDate: bill.billing_DueDate,
              billAmountDue: bill.billing_AmountDue,
              billAmountAfterDue: bill.billing_AmountAfterDue,
              billStatus: bill.billing_PaymentStatus,
              billAmountPaid: bill.billing_AmountPaid,
              billCurrent: bill.billing_CurrentBill,
              billFCACharge: bill.billing_FCACharge,
              billPaymentDate: bill.billing_PaymentDate,
              billPaymentType: bill.billing_PaymentType,
              customerName: bill.customer_Name,
              customerAcctNumber: bill.customer_AccountNumber,
              meterNumber: bill.meter_MeterNumber,
              readingDate: bill.reading_ReadingDate,
              readingPeriodStart: bill.reading_PeriodStart,
              readingPeriodEnd: bill.reading_PeriodEnd,
              readingPeriod: `${bill.reading_PeriodStart} - ${bill.reading_PeriodEnd}`,
              readingConsumption: bill.reading_Consumption,
              readingPresent: bill.reading_PresentReading,
              readingPrevious: bill.reading_PreviousReading,
              readerName: bill.reading_ReaderName
            }));
            setFilteredBillings(mappedBilling);
            setTransformedBillings(mappedBilling);
            return;
          }
          else{
            setMessage(msg)
            setSeverity("error")
            setOpenSnackbar(true)
            setFilteredBillings([]);
            setTransformedBillings([]);
          }
        } catch (error){
          console.log(error)
        }
      }

      if(currentMonthYear !== ""){
        fetchBilling()
      }
    },[currentMonthYear]);
  
    const formatMonthYear = (date) => {
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${year}-${month}`;
    };
  
    const handleMonthYearChange = (e) => {
      setSelectedBilling(null)
      setCurrentMonthYear(e.target.value);
    };

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const handleSearch = async (event) => {
      const query = event.target.value.toLowerCase();
      setSelectedBilling(null)
      setSearchQuery(query);
      if (query) {

        const result = await dispatch(getCustomerBillingByName(query,currentUser.id));
        console.log(result)
        const billing = result.billingInfo
          const msg = result.message
          const isTrue = result.status
          console.log(billing)
          if(isTrue){
            const mappedBilling = billing.map((bill,index) => ({
              id: bill.billing_BillingID,
              billDate: bill.billing_BillingID,
              billDueDate: bill.billing_DueDate,
              billAmountDue: bill.billing_AmountDue,
              billAmountAfterDue: bill.billing_AmountAfterDue,
              billStatus: bill.billing_PaymentStatus,
              billAmountPaid: bill.billing_AmountPaid,
              billCurrent: bill.billing_CurrentBill,
              billFCACharge: bill.billing_FCACharge,
              billPaymentDate: bill.billing_PaymentDate,
              billPaymentType: bill.billing_PaymentType,
              customerName: bill.customer_Name,
              customerAcctNumber: bill.customer_AccountNumber,
              meterNumber: bill.meter_MeterNumber,
              readingDate: bill.reading_ReadingDate,
              readingPeriodStart: bill.reading_PeriodStart,
              readingPeriodEnd: bill.reading_PeriodEnd,
              readingPeriod: `${bill.reading_PeriodStart} - ${bill.reading_PeriodEnd}`,
              readingConsumption: bill.reading_Consumption,
              readingPresent: bill.reading_PresentReading,
              readingPrevious: bill.reading_PreviousReading,
              readerName: bill.reading_ReaderName
            }));
            setFilteredBillings(mappedBilling);
            setTransformedBillings(mappedBilling);
            return;
          }else{
            setMessage(msg)
            setSeverity("error")
            setOpenSnackbar(true)
            setFilteredBillings([]);
            setTransformedBillings([]);
          }
      } else {
        const result = await dispatch(getBillingByDate(year,month,currentUser.id));
          const billing = result.billingInfo
          const msg = result.message
          const isTrue = result.status
          console.log(billing)
          if(isTrue){
            const mappedBilling = billing.map((bill,index) => ({
              id: bill.billing_BillingID,
              billDate: bill.billing_BillingID,
              billDueDate: bill.billing_DueDate,
              billAmountDue: bill.billing_AmountDue,
              billAmountAfterDue: bill.billing_AmountAfterDue,
              billStatus: bill.billing_PaymentStatus,
              billAmountPaid: bill.billing_AmountPaid,
              billCurrent: bill.billing_CurrentBill,
              billFCACharge: bill.billing_FCACharge,
              billPaymentDate: bill.billing_PaymentDate,
              billPaymentType: bill.billing_PaymentType,
              customerName: bill.customer_Name,
              customerAcctNumber: bill.customer_AccountNumber,
              meterNumber: bill.meter_MeterNumber,
              readingDate: bill.reading_ReadingDate,
              readingPeriodStart: bill.reading_PeriodStart,
              readingPeriodEnd: bill.reading_PeriodEnd,
              readingPeriod: `${bill.reading_PeriodStart} - ${bill.reading_PeriodEnd}`,
              readingConsumption: bill.reading_Consumption,
              readingPresent: bill.reading_PresentReading,
              readingPrevious: bill.reading_PreviousReading,
              readerName: bill.reading_ReaderName
            }));
            setFilteredBillings(mappedBilling);
            setTransformedBillings(mappedBilling);
            return;
          }
          else{
            setMessage(msg)
            setSeverity("error")
            setOpenSnackbar(true)
            setFilteredBillings([]);
            setTransformedBillings([]);
          }
      }
    };

    const columns = [
      { field: "customerName", headerName: "Customer", flex: 1 },
      { field: "meterNumber", headerName: "Meter Number", flex: 1 },
      { field: "readingPeriod", headerName: "Period", flex: 1 },
      { field: "readingConsumption", headerName: "Consumption", flex: 0.8 },
      { field: "billAmountDue", headerName: "Amount Due", flex: 0.8 },
      { field: "billStatus", headerName: "Status", flex: 0.5 }
    ];
    const handleCellClick = (params) => {
      const billing = transformedBillings.find((bill) => bill.id === params.id)
      if(billing){
        setSelectedBilling(billing)
      }
      handleClickOpen()
    };

    const handleSnackbar = () => {
      setOpenSnackbar(false)
    }

    const formatMonthYears = (dateString) => {
      const [year, month] = dateString.split("-");
      const date = new Date(`${year}-${month}-01`);
      return `${new Intl.DateTimeFormat("en-US", { month: "long" }).format(date)} ${year}`;
    };

    const exportToPDF = () => {
      const doc = new jsPDF();
    
      doc.setFontSize(16);
      doc.text(`Billing Report`, 14, 10);
    
      const tableColumn = [
        "Customer Name",
        "Account Number",
        "Meter Number",
        "Billing Period",
        "Consumption",
        "Amount Due (PHP)",
        "Amount After Due (PHP)",
        "Payment Status",
        "Payment Date",
        "Payment Type"
      ];
    
      const tableRows = filteredBillings.map(bill => [
        bill.customerName,
        bill.customerAcctNumber,
        bill.meterNumber,
        bill.readingPeriod,
        bill.readingConsumption,
        "PHP " + Number(bill.billAmountDue).toFixed(2),
        "PHP " + Number(bill.billAmountAfterDue).toFixed(2),
        bill.billStatus,
        bill.billPaymentDate || "N/A",
        bill.billPaymentType || "N/A"
      ]);
    
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 20,
        theme: "striped",
      });
    
      doc.save("billing_report.pdf");
    };
    

    const [anchorEl, setAnchorEl] = useState(null);
    const opens = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleCloses = () => {
      setAnchorEl(null);
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
        Billing
      </Typography>
      <Grid container>
        <Grid item xs={12} lg={6} columnGap={1} sx={{display:'flex', justifyContent:'center'}}>
          <TextField
            label="Search by Customer or Meter"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearch}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Select Billing Month"
            type="month"
            value={currentMonthYear}
            onChange={handleMonthYearChange}
            InputLabelProps={{ shrink: true }}
            sx={{ fontWeight: "600", width: "30%" }}
          />
          <Box sx={{display:'flex', justifyItems:'center', height:'50px'}}>
          <Button variant="contained" color="primary" onClick={handleClick}>
              Export Data
            </Button>
            <Menu anchorEl={anchorEl} open={opens} onClose={handleCloses}>
              <MenuItem onClick={() => { exportToPDF(); handleClose(); }}>
                Export to PDF
              </MenuItem>
            </Menu>
          </Box>
        </Grid>
      </Grid>
      <Grid container>
          <Grid item xs={12} lg={6} component={Paper}>
            <DataGrid
            rows={filteredBillings}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 20]}
            disableSelectionOnClick
            sx={{height:'80vh'}}
            onCellClick={handleCellClick}
          />
          </Grid>
          <Grid item lg={6} sx={{display:{lg:'unset', xs:'none'} }}>
            <Box component={Paper} sx={{ mr: 1, ml: 1, p: 2 }}>
              {selectedBilling === null ? (
                // Display Billing History Page when no billing is selected
                <BillingHistory />
              ) : isEdit ? (
                <BillingInfoCardAdminEdit
                  id={selectedBilling?.id || 0}
                  customerName={selectedBilling?.customerName || ""}
                  accountNumber={selectedBilling?.customerAcctNumber || ""}
                  meterNumber={selectedBilling?.meterNumber || ""}
                  period={selectedBilling?.readingPeriod || ""}
                  dueDate={selectedBilling?.billDueDate || ""}
                  readingDate={selectedBilling?.readingDate || ""}
                  presentReading={selectedBilling?.readingPresent || ""}
                  previousReading={selectedBilling?.readingPrevious || ""}
                  consumption={selectedBilling?.readingConsumption || ""}
                  amountDue={selectedBilling?.billAmountDue || ""}
                  amountAfterDue={selectedBilling?.billAmountAfterDue || ""}
                  status={selectedBilling?.billStatus || ""}
                  setIsEdit={setIsEdit}
                  readerName={selectedBilling?.readerName || ""}
                  paymentDate={selectedBilling?.billPaymentDate || ""}
                  paymentType={selectedBilling?.billPaymentType || ""}
                  billFCACharge={selectedBilling?.billFCACharge || ""}
                  currentBill={selectedBilling?.billCurrent || ""}
                />
              ) : (
                <BillingInfoCardAdmin
                  id={selectedBilling?.id || 0}
                  customerName={selectedBilling?.customerName || ""}
                  accountNumber={selectedBilling?.customerAcctNumber || ""}
                  meterNumber={selectedBilling?.meterNumber || ""}
                  period={selectedBilling?.readingPeriod || ""}
                  dueDate={selectedBilling?.billDueDate || ""}
                  readingDate={selectedBilling?.readingDate || ""}
                  presentReading={selectedBilling?.readingPresent || ""}
                  previousReading={selectedBilling?.readingPrevious || ""}
                  consumption={selectedBilling?.readingConsumption || ""}
                  amountDue={selectedBilling?.billAmountDue || ""}
                  amountAfterDue={selectedBilling?.billAmountAfterDue || ""}
                  status={selectedBilling?.billStatus || ""}
                  setIsEdit={setIsEdit}
                  readerName={selectedBilling?.readerName || ""}
                  paymentDate={selectedBilling?.billPaymentDate || ""}
                  paymentType={selectedBilling?.billPaymentType || ""}
                  billFCACharge={selectedBilling?.billFCACharge || ""}
                  currentBill={selectedBilling?.billCurrent || ""}
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
                              <BillingInfoCardAdminEdit
                              id={selectedBilling ? selectedBilling.id: 0}
                              customerName ={selectedBilling ? selectedBilling.customerName: ""}
                              accountNumber={selectedBilling ? selectedBilling.customerAcctNumber: ""}
                              meterNumber={selectedBilling ? selectedBilling.meterNumber: ""}
                              period={selectedBilling ? selectedBilling.readingPeriod: ""}
                              dueDate ={selectedBilling ? selectedBilling.billDueDate: ""}
                              readingDate={selectedBilling ? selectedBilling.readingDate: ""}
                              presentReading={selectedBilling ? selectedBilling.readingPresent: ""}
                              previousReading={selectedBilling ? selectedBilling.readingPrevious: ""}
                              consumption={selectedBilling ? selectedBilling.readingConsumption: ""}
                              amountDue={selectedBilling ? selectedBilling.billAmountDue: ""}
                              amountAfterDue={selectedBilling ? selectedBilling.billAmountAfterDue: ""}
                              status={selectedBilling ? selectedBilling.billStatus: ""}
                              setIsEdit={setIsEdit}
                            />
              ):(
                <BillingInfoCardAdmin
                id={selectedBilling ? selectedBilling.id: 0}
                customerName ={selectedBilling ? selectedBilling.customerName: ""}
                accountNumber={selectedBilling ? selectedBilling.customerAcctNumber: ""}
                meterNumber={selectedBilling ? selectedBilling.meterNumber: ""}
                period={selectedBilling ? selectedBilling.readingPeriod: ""}
                dueDate ={selectedBilling ? selectedBilling.billDueDate: ""}
                readingDate={selectedBilling ? selectedBilling.readingDate: ""}
                presentReading={selectedBilling ? selectedBilling.readingPresent: ""}
                previousReading={selectedBilling ? selectedBilling.readingPrevious: ""}
                consumption={selectedBilling ? selectedBilling.readingConsumption: ""}
                amountDue={selectedBilling ? selectedBilling.billAmountDue: ""}
                amountAfterDue={selectedBilling ? selectedBilling.billAmountAfterDue: ""}
                status={selectedBilling ? selectedBilling.billStatus: ""}
                setIsEdit={setIsEdit}
                readerName={selectedBilling?.readerName || ""}
                paymentDate={selectedBilling?.billPaymentDate || ""}
                paymentType={selectedBilling?.billPaymentType || ""}
                billFCACharge={selectedBilling?.billFCACharge || ""}
                currentBill={selectedBilling?.billCurrent || ""}
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

export default Billing;
