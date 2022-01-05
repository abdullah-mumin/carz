import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAuth from '../hooks/useAuth';


const CheckoutForm = ({ payment }) => {
   const { price, _id } = payment;
   //--getting user information---
   const { user } = useAuth();
   const stripe = useStripe();
   const elements = useElements();
   // console.log(singleProperty)

   // error
   const [error, setError] = useState('');
   const [success, setSuccess] = useState('');
   const [processing, setProcessing] = useState(false);
   // console.log(process, error, success)
   // ----set client payment state-----
   const [clientSecret, setClientSecret] = useState('');

   // payment fetch-------
   useEffect(() => {
      fetch('https://radiant-ravine-14055.herokuapp.com/create-payment-intent', {
         method: 'POST',
         headers: {
            'content-type': 'application/json'
         },
         // eslint-disable-next-line no-undef
         body: JSON.stringify({ price })
      })
         .then(res => res.json())
         .then(data => {
            // console.log(data)
            setClientSecret(data.clientSecret)
         })
   }, [price])

   // handle submit
   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!stripe || !elements) {
         return;
      }
      const card = elements.getElement(CardElement);
      if (card === null) {
         return;
      }
      setProcessing(true);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
         type: 'card',
         card
      })
      if (error) {
         console.log(error)
         setError(error.message)
         setSuccess('')
      }
      else {
         setError('');
         console.log(paymentMethod)
      }

      // ------payment intent----
      // payment intent
      const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
         clientSecret,
         {
            payment_method: {
               card: card,
               billing_details: {
                  name: user?.displayName,
                  email: user?.email,
               },
            },
         },
      );

      if (intentError) {
         setError(intentError.message)
         setSuccess('')
      }
      else {
         setError('');
         setSuccess('Your payment processed successfully !');
         console.log(paymentIntent)
         setProcessing(false);

         // payment data  save to the database
         const payment = {
            amount: paymentIntent.amount,
            created: paymentIntent.created,
            last4: paymentMethod.card.last4,
            transaction: paymentIntent.client_secret.slice('_secret')[0]
         }
         const url = `https://radiant-ravine-14055.herokuapp.com/orders/${_id}`;
         fetch(url, {
            method: 'PUT',
            headers: {
               'content-type': 'application/json'
            },
            body: JSON.stringify(payment)
         })
            .then(res => res.json())
            .then(data => console.log(data));
      }
   }
   return (
      <>
         <form onSubmit={handleSubmit}>
            <CardElement
               options={{
                  style: {
                     base: {
                        fontSize: '20px',
                        color: 'rgb(240, 22, 149)',
                        '::placeholder': {
                           color: '#aab7c4',
                        },
                     },
                     invalid: {
                        color: '#9e2146',
                     },
                  },
               }}
            />
            {processing ? <h1>Processing...</h1> : <button className="btn-submit" type="submit" disabled={!stripe || success}>
               Pay ${price}
            </button>}
            {/* rgb(240, 22, 149) */}
         </form>
         {
            error && <h4 style={{ color: 'red', fontWeight: '500', marginTop: '30px' }}>{error}</h4>
         }
         {
            success && <h4 style={{ color: 'green', fontWeight: '500', marginTop: '30px' }}>{success}</h4>
         }
      </>
   );
};

export default CheckoutForm;