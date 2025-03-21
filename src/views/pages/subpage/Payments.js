import React, { useState } from "react";
import { Button, Typography, Box, CircularProgress, IconButton, Snackbar, Alert } from "@mui/material";
import { Buffer } from 'buffer';
import { useDispatch, useSelector } from "react-redux";
import { updateBilling } from "../../../actions/billing";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import transactionService from "../../../services/transaction.service";

const Payments = ({id, paymentType, amount, description, setCheckout, setIsUpdated }) => {
  const [payProcess, setPayProcess] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const dispatch = useDispatch()
  const { user: currentUser } = useSelector((state) => state.auth);

  //const publicKey = "pk_test_EWrKQeDVnzDkQNoANAGXsBsK";
  //const secrectKey = "sk_test_LwgWLWWUgVrpqKwCxFH5vznZ";
  const secrectKey = "sk_test_zjSSfbbFqzEy7MifqC3PQXP3";
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const createSource = async () => {
    setPaymentStatus("Creating Source...");
    setLoading(true);

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(secrectKey).toString("base64")}`,
      },
      body: JSON.stringify({
        data: {
          attributes: {
            amount: amount * 100,
            description: description,
            type: paymentType.toLowerCase(), // 'paymaya' or 'gcash'
            currency: "PHP",
          },
        },
      }),
    };
    return fetch("https://api.paymongo.com/v1/links", options)
      .then((response) => response.json())
      .then((response) => response)
      .catch((err) => {
        console.error(err);
        setPaymentStatus("Error creating source.");
      });
  };

  // Function to Listen to the Source in the Frontend
  const listenToPayment = async (sourceId) => {
    let attempts = 5;
    while (attempts > 0) {
      setPaymentStatus(`Listening for payment updates...`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (attempts === 1) {
        const sourceData = await fetch(`https://api.paymongo.com/v1/links/${sourceId}`, {
          headers: {
            Authorization: `Basic ${Buffer.from(secrectKey).toString("base64")}`,
          },
        })
          .then((response) => response.json())
          .then((response) => response.data);
        if (sourceData.attributes.status === "failed") {
          setPaymentStatus("Payment Failed.");
          setMessage("Payment Failed.");
          setSeverity("error");
          setOpenSnackbar(true);
          return;
        } else if (sourceData.attributes.status === "paid") {

          const result = await dispatch(updateBilling(id,capitalizeFirstLetter(sourceData.attributes.status),currentUser.id))
          console.log(result)
          console.log(sourceData)
          const status = capitalizeFirstLetter(sourceData.attributes.status);
          const paymentMethod = sourceData.attributes.payments[0].data.attributes.source.type;
          const amountPaid = sourceData.attributes.amount / 100;
          const transactionDate = new Date();
          const userId = currentUser.id
          const customerId = currentUser.customerID

          const transactionResult = await transactionService.createTransaction(customerId, amountPaid, paymentMethod,status,userId,userId)
          console.log(transactionResult)

          setPaymentStatus("Payment Successful!");
          setMessage("Payment Successful!");
          setSeverity("success");
          setOpenSnackbar(true);
          setIsUpdated(true)
          setCheckout(false)
          return;
        } else {
          attempts = 5;
          setPayProcess(sourceData.attributes.status);
        }
      }
      attempts--;
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const source = await createSource();
    if (source?.data?.attributes?.checkout_url) {
      window.open(source.data.attributes.checkout_url, "_blank");
      listenToPayment(source.data.id);
    } else {
      setPaymentStatus("Failed to create a payment source.");
    }
  };
  const handleSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 3 }}>

            <Snackbar
              sx={{ display: { xs: "none", md: "block" } }}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              open={openSnackbar}
              autoHideDuration={4000}
              onClose={handleSnackbar}
            >
              <Alert onClose={handleSnackbar} severity={severity}>
                {message}
              </Alert>
            </Snackbar>
            <Snackbar
              sx={{ display: { xs: "block", md: "none" } }}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              open={openSnackbar}
              autoHideDuration={4000}
              onClose={handleSnackbar}
            >
              <Alert onClose={handleSnackbar} severity={severity}>
                {message}
              </Alert>
            </Snackbar>
      <IconButton onClick={() => {setCheckout(false)}}>
          <ArrowBackIcon />
      </IconButton>
      <form onSubmit={onSubmit}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : `Pay now`}
        </Button>

        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
          {paymentStatus}
        </Typography>

        {/* <Typography variant="body2" color="textSecondary">
          {payProcess}
        </Typography> */}
      </form>
    </Box>
  );
};

export default Payments;
