import { Badge, Box, Card, CardContent, CardHeader, Container, IconButton, List, ListItem, ListItemIcon, ListItemText, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { deleteNotificationById, getNotificationByUserId, updateNotificationById } from '../../../actions/notifications';
import { useDispatch, useSelector } from 'react-redux';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCustomerBilling } from '../../../actions/billing';

const BillingHistory = () => {

    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const [billings, setBillings] = useState([]);
    useEffect(() => {
        const getBillings = async () => {
            try{
              // const result = await billingService.getCustomerBilling(currentUser.customerID,currentUser.id)
              // console.log(result)
                 const result = await dispatch(getCustomerBilling(currentUser.customerID,currentUser.id))
                const billing = result.billingInfo
                const isTrue = result.status
                if(isTrue){
                    const mappedBillings = billing.map((billing,index)=> ({
                         id: billing.billing_BillingID,
                         accountNo: billing.customer_AccountNumber,
                         meterNo: billing.meter_MeterNumber,
                         readingDate: billing.reading_ReadingDate,
                         consumption: billing.reading_Consumption,
                         amountDue: billing.billing_AmountDue,
                         amountAfterDue: billing.billing_AmountAfterDue,
                         status: billing.billing_PaymentStatus,
                         paymentType: billing.billing_PaymentType,
                    }));
                    setBillings(mappedBillings)
                }else{
                  setBillings([])
                }
            } catch(error){
                console.log(error)
            }
        }
        getBillings()
    },[])

    //const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  return (
    <Container maxWidth= "md">
      <Card sx={{ marginTop: "2rem", backgroundColor: "white", borderRadius: "8px", boxShadow: 3, minHeight:'80vh' }}>
        <CardHeader
          title={
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h5">Billing History</Typography>
              {/* <Badge badgeContent={unreadCount} color="primary">
                <NotificationsIcon />
              </Badge> */}
            </Box>
          }
        />
        <CardContent>
        <Table sx={{ minWidth: 650 }} aria-label="billing history table">
          <TableHead>
            <TableRow>
              <TableCell>Meter No</TableCell>
              <TableCell>Reading Date</TableCell>
              <TableCell>Consumption</TableCell>
              <TableCell>Amount Due</TableCell>
              <TableCell>Amount After Due</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {billings.map((billing) => (
              <TableRow key={billing.accountNo}>
                <TableCell>{billing.meterNo}</TableCell>
                <TableCell>{billing.readingDate}</TableCell>
                <TableCell>{billing.consumption}</TableCell>
                <TableCell>{billing.amountDue}</TableCell>
                <TableCell>{billing.amountAfterDue}</TableCell>
                <TableCell>{billing.status}</TableCell>
                <TableCell>{billing.paymentType?.toUpperCase()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
          {billings.length === 0 && (
            <Typography variant="body1" color="textSecondary" align="center">
              No recent billing to display.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  )
}

export default BillingHistory
