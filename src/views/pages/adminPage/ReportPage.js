import React, { useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Select, MenuItem, InputLabel, FormControl, Grid, Button } from "@mui/material";

// Sample data for customer billing reports
const sampleReports = [
  {
    accountNo: "123456789",
    fullName: "Marxie Mukim",
    address: "MSU Compound, Bongao, Tawi-Tawi",
    previousReading: 120,
    presentReading: 150,
    consumption: 30,
    month: "January 2024",
    amountToPay: 100,
  },
  {
    accountNo: "987654321",
    fullName: "Lita Gomez",
    address: "Tawi-Tawi, Philippines",
    previousReading: 180,
    presentReading: 200,
    consumption: 20,
    month: "February 2024",
    amountToPay: 80,
  },
  {
    accountNo: "456789123",
    fullName: "John Doe",
    address: "Manila, Philippines",
    previousReading: 200,
    presentReading: 230,
    consumption: 30,
    month: "March 2024",
    amountToPay: 90,
  },
  // Add more report data as needed
];

const ReportPage = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedMonth, setSelectedMonth] = useState(""); // State for selected month
  const [filteredReports, setFilteredReports] = useState(sampleReports); // State for filtered reports

  // Handle search functionality
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = sampleReports.filter((report) => {
      return (
        report.accountNo.includes(query) ||
        report.fullName.toLowerCase().includes(query.toLowerCase()) ||
        report.address.toLowerCase().includes(query.toLowerCase())
      );
    });

    setFilteredReports(filtered);
  };

  // Handle month selection
  const handleMonthChange = (event) => {
    const selected = event.target.value;
    setSelectedMonth(selected);

    const filtered = sampleReports.filter((report) => {
      return selected ? report.month === selected : true;
    });

    setFilteredReports(filtered);
  };

  // Handle printing the report
  const handlePrint = () => {
    window.print(); // This will open the print dialog
  };

  return (
    <Box sx={{ padding: 2, display: "flex", flexDirection: "column", minHeight: "95vh" }}>
      <Typography variant="h4" gutterBottom>
        Customer Billing Report
      </Typography>

      {/* Search Bar and Month Selection */}
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Search Customer"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearch}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Month</InputLabel>
            <Select
              value={selectedMonth}
              onChange={handleMonthChange}
              label="Month"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="January 2024">January 2024</MenuItem>
              <MenuItem value="February 2024">February 2024</MenuItem>
              <MenuItem value="March 2024">March 2024</MenuItem>
              {/* Add more months as needed */}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Table for Billing Report */}
      <TableContainer component={Paper} sx={{ flexGrow: 1 }}>
        <Table sx={{ minWidth: 650 }} aria-label="billing report table">
          <TableHead>
            <TableRow>
              <TableCell>Account No</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Previous Reading</TableCell>
              <TableCell>Present Reading</TableCell>
              <TableCell>Consumption</TableCell>
              <TableCell>Month</TableCell>
              <TableCell>Amount to Pay</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.accountNo}>
                <TableCell>{report.accountNo}</TableCell>
                <TableCell>{report.fullName}</TableCell>
                <TableCell>{report.address}</TableCell>
                <TableCell>{report.previousReading}</TableCell>
                <TableCell>{report.presentReading}</TableCell>
                <TableCell>{report.consumption}</TableCell>
                <TableCell>{report.month}</TableCell>
                <TableCell>{report.amountToPay}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Print Button positioned at the bottom */}
      <Box sx={{ marginTop: 2, alignSelf: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrint}
        >
          Print Report
        </Button>
      </Box>
    </Box>
  );
};

export default ReportPage;
