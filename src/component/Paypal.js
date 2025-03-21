import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';

export default function Paypal() {
  const paypal = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AQuZgIR8CDeSsxGSNfNzqAb26WiprKfzfSTGcnGY_S8vP78WtszfqA3kPEIreUnztmz_4zpBInPaGuAr&currency=USD';
    script.async = true;
    script.onload = () => {
      // Ensure `paypal.current` refers to a valid DOM element
      if (paypal.current) {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                intent: 'CAPTURE',
                purchase_units: [
                  {
                    description: 'Billing for the month of hdh',
                    amount: {
                      currency_code: 'USD',
                      value: '400.00', // Use `value` instead of `values`
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              // const order = await actions.order.capture();
              // console.log(order);
              try {
                const order = await actions.order.capture();
                console.log(order);
              } catch (error) {
                console.log('Error capturing the order:', error);
                alert('Error capturing the order. Please try again.');
              }
            },
            onError: (err) => {
              console.log(err);
            },
            onCancel: (msg) => {
              console.log(msg);
            },
          })
          .render(paypal.current); // Render PayPal button into the DOM element
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      {/* This div is where PayPal button will be rendered */}
      <div ref={paypal}></div>
    </div>
  );
}
