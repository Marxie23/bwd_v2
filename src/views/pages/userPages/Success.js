import React, { useEffect, useState } from "react";
import {Box,TextField,Typography,Grid,Paper, Button, Dialog, DialogContent, DialogActions, Snackbar, Alert} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import BillingCardUser from "../../../component/BillingCardUser";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getCustomerBillingByDate} from "../../../actions/billing"

const Success = () => {

    const navigate = useNavigate();
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
    const isMobile = window.innerWidth < 768;

    useEffect(() => {
      const today = new Date();
      const formattedMonthYear = formatMonthYear(today);
      setCurrentMonthYear(formattedMonthYear);
    }, []);

    useEffect(() => {
      const fetchBilling = async () => {
        try{
          console.log(currentUser.customerID)
          const result = await dispatch(getCustomerBillingByDate(year,month,currentUser.customerID,currentUser.id));
          const billing = result.billingInfo
          const msg = result.message
          const isTrue = result.status
          console.log(result)
          if(isTrue){
            const mappedBilling = billing.map((bill,index) => ({
              id: bill.billing_BillingID,
              billDate: bill.billing_BillingID,
              billDueDate: bill.billing_DueDate,
              billAmountDue: bill.billing_AmountDue,
              billAmountAfterDue: bill.billing_AmountAfterDue,
              billStatus: bill.billing_PaymentStatus,
              billAmountPaid: bill.billing_AmountPaid,
              customerName: bill.customer_Name,
              customerAcctNumber: bill.customer_AccountNumber,
              meterNumber: bill.meter_MeterNumber,
              readingDate: bill.reading_ReadingDate,
              readingPeriodStart: bill.reading_PeriodStart,
              readingPeriodEnd: bill.reading_PeriodEnd,
              readingPeriod: `${bill.reading_PeriodStart} - ${bill.reading_PeriodEnd}`,
              readingConsumption: bill.reading_Consumption,
              readingPresent: bill.reading_PresentReading,
              readingPrevious: bill.reading_PreviousReading
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
      setCurrentMonthYear(e.target.value);
    };

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const handleSearch = (event) => {
      const query = event.target.value.toLowerCase();
      setSearchQuery(query);
      if (query) {
        const filtered = transformedBillings.filter((bill) =>
          bill.customerName.toLowerCase().includes(query) ||
          bill.meterNumber.toLowerCase().includes(query)
        );
        setFilteredBillings(filtered);
      } else {
        setFilteredBillings(transformedBillings);
      }
    };

    const columns = [
      ...(isMobile ? []
                   : [{ field: "customerName", headerName: "Customer", flex: 1.8 },
                    { field: "meterNumber", headerName: "Meter Number", flex: 1 },]
      ),
      { field: "readingPeriod", headerName: "Period", flex: 1 },
      { field: "readingConsumption", headerName: "Consumption", flex: 0.8 },
      { field: "billAmountDue", headerName: "Amount Due", flex: 0.8 },
      { field: "billStatus", headerName: "Status", flex: 0.5 }
      // {
      //   field: "actions",
      //   headerName: "Actions",
      //   flex: 0.5,
      //   sortable: false,
      //   renderCell: (params) => (
      //     <IconButton onClick={() => handleEdit(params.row.id)}>
      //       <EditIcon />
      //     </IconButton>
      //   ),
      // },
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
  return (
    <Box sx={{ padding: 1, mt: 1 }}>
        <Typography>Payment Success</Typography>
    </Box>
  );
};

export default Success;
