import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements } from '@stripe/react-stripe-js';
import { ElementsConsumer,useStripe, useElements } from '@stripe/react-stripe-js';
import { CardElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken,shippingData, backStep, onCaptureCheckout, nextStep }) => {

      const handleSubmit = async (event,elements,stripe) => {
              event.preventDefault();

              if(!stripe || !elements) return;
              
              const CardElement = elements.getElements(CardElement);

              const { error, paymentMethod} = await stripe.createPaymentMethod({type: 'card',card: CardElement});

              if(error){
                console.log(error);
              }else{
                  const orderData = {
                    line_items: checkoutToken.line_items,
                    customer: { firstname: shippingData.firstname, lastname: shippingData.lastname, email: shippingData.email},
                    shipping: { name: 'Primary', street: shippingData.address1,town_city: shippingData.city, postal_zip_code: shippingData.zip},
                    payment: {
                      gateway: 'stripe',
                      stripe: {
                        payment_method_id: paymentMethod.id
                      }
                    }
                  }

                  onCaptureCheckout(checkoutToken.id, orderData);

                  nextStep();
              }

      }
       
      

  return (
    <>
      <Review checkoutToken={checkoutToken}/>
      <Divider />
      <Typography variant='h6' gutterBottom style={{margin: '20px 0'}}>Payment method</Typography>
      {/* <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({stripe, elements})=>(
                 <form onSubmit={(e)=> handleSubmit(e,elements,stripe)}>
                  <CardElements/>
                  <br/> <br/>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <Button variant='outlined' onClick={backStep}>Back</Button>
                      <Button type='submit' variant='contained' disabled={!stripe} color="primary">Pay {checkoutToken.subtotal.formatted_with_symbol}</Button>
                  </div>
                 </form>
            )}
          </ElementsConsumer>
      </Elements> */}
       <br/> <br/>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <Button variant='outlined' onClick={backStep}>Back</Button>
                      <Button type='submit' variant='contained' color="primary" onClick={handleSubmit}>Pay {checkoutToken.subtotal.formatted_with_symbol}</Button>
                  </div>
    </>
  )
}

export default PaymentForm