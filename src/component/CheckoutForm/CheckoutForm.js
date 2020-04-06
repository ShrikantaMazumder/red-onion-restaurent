import React from 'react'
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import './CheckoutForm.css';
import { useState } from 'react';
const CheckoutForm = (props) => {
    const [paymentError,setPaymentError] = useState(null);
    const [paymentSuccess,setPaymentSuccess] = useState(null);
    const stripe = useStripe();
    const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if (error) {
        setPaymentError(error.message);
        setPaymentSuccess(null)
    }else{
        setPaymentSuccess(paymentMethod);
        const payment = {id:paymentMethod.id,last4:paymentMethod.card.last4}
        props.handlePlaceOrder(payment);
        setPaymentError(null);
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit} className="payment">
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
            {
                paymentError && <p style={{color:'red'}}>{paymentError}</p>
            }
            {
                paymentSuccess && <p style={{color:"green"}}>Payment Completed.</p>
            }
        </form>
    </div>
  );
};

export default CheckoutForm;