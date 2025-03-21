import {
  Badge,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPaidBilling } from '../../../actions/billing';

const BillingHistory = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [billings, setBillings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) return;

    const getBillings = async () => {
      try {
        const result = await dispatch(getAllPaidBilling(currentUser.customerID, currentUser.id));
        if (result.status) {
          setBillings(
            result.billingInfo.map((billing) => ({
              id: billing.billing_BillingID,
              customerName: billing.customer_Name,
              accountNo: billing.customer_AccountNumber,
              meterNo: billing.meter_MeterNumber,
              readingDate: new Date(billing.reading_ReadingDate).toLocaleDateString(),
              consumption: billing.reading_Consumption,
              amountDue: billing.billing_AmountDue,
              amountAfterDue: billing.billing_AmountAfterDue,
              status: billing.billing_PaymentStatus,
            }))
          );
        } else {
          setBillings([]);
        }
      } catch (error) {
        setError('Failed to fetch billing history. Please try again later.');
      }
    };

    getBillings();
  }, [dispatch, currentUser]);

  // Filter billings based on search term
  const filteredBillings = billings.filter((billing) =>
    billing.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    billing.accountNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="md">
      <Card sx={{ marginTop: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: 3, minHeight: '80vh' }}>
        <CardHeader
          title={
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h5">Billing History</Typography>
              <TextField
                label="Search by Name or Account No."
                variant="outlined"
                size="small"
                sx={{ width: 300 }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Box>
          }
        />
        <CardContent>
          {error ? (
            <Typography variant="body1" color="error" align="center">
              {error}
            </Typography>
          ) : (
            <>
              <Table sx={{ minWidth: 650 }} aria-label="billing history table">
                <TableHead>
                  <TableRow>
                    <TableCell>Meter No</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Reading Date</TableCell>
                    <TableCell>Consumption</TableCell>
                    <TableCell>Amount Due</TableCell>
                    <TableCell>Amount After Due</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredBillings.length > 0 ? (
                    filteredBillings.map((billing) => (
                      <TableRow key={billing.id}>
                        <TableCell>{billing.meterNo}</TableCell>
                        <TableCell>{billing.customerName}</TableCell>
                        <TableCell>{billing.readingDate}</TableCell>
                        <TableCell>{billing.consumption}</TableCell>
                        <TableCell>{billing.amountDue}</TableCell>
                        <TableCell>{billing.amountAfterDue}</TableCell>
                        <TableCell>
                          {/* <Badge
                            color={billing.status === 'Paid' ? 'success' : 'error'}
                            variant="dot"
                          />{' '} */}
                          {billing.status}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <Typography variant="body1" color="textSecondary">
                          No matching records found.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default BillingHistory;
