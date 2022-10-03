import React, {useState, useEffect} from 'react';
import { InputLabel ,Select, MenuItem,Button,Grid, Typography} from '@material-ui/core';
import {useForm, FormProvider} from 'react-hook-form';
import FormInput from './Checkout/CustomTextField';
import { Link } from 'react-router-dom';
import { commerce } from '../../lib/commerce';

const AddressForm = ({checkoutToken, next}) => {
    
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');

    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
   
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    
   
    const fetchShippingCountries = async (checkoutTokenId) => {
       const response = await commerce.services.localeListShippingCountries(checkoutTokenId);
       console.log(response)
       setShippingCountries(response.countries)
    }
    const methods = useForm();

 useEffect(() => {
    fetchShippingCountries(checkoutToken);
 }, []);
 
  return (
    <>
      <Typography variant='h6' gutterBottom>Shipping Address</Typography>
      <FormProvider {...methods}>
             <form onSubmit={methods.handleSubmit(data=> next({...data}))}>
                  <Grid container spacing={3}>
                         <FormInput required name="firstname" label='First Name'/>
                         <FormInput required name="lastname" label='Last Name'/>
                         <FormInput required name="address1" label='Address'/>
                         <FormInput required name="email" label='Email'/>
                         <FormInput required name="city" label='City'/>
                         <FormInput required name="zip" label='ZIP / Postal code'/>
                         {/* <Grid item xs={12} sm={6}>
                              <InputLabel>Shipping Country</InputLabel>
                              <Select value={''} fullWidth onChange={''}>
                                 <MenuItem key={''} value={''}>Select Me</MenuItem>
                              </Select>
                         </Grid>
                         <Grid item xs={12} sm={6}>
                              <InputLabel>Shipping Subdivision</InputLabel>
                              <Select value={''} fullWidth onChange={''}>
                                 <MenuItem key={''} value={''}>Select Me</MenuItem>
                              </Select>
                         </Grid>
                         <Grid item xs={12} sm={6}>
                              <InputLabel>Shipping Options</InputLabel>
                              <Select value={''} fullWidth onChange={''}>
                                 <MenuItem key={''} value={''}>Select Me</MenuItem>
                              </Select>
                         </Grid> */}
                         <br/>
                         <div style={{display:'flex', justifyContent: 'space-between'}}>
                                <Button component={Link} to="/cart" variant='outline'>Back to Cart</Button>
                                <Button type="submit" variant='contained' color="primary">Next</Button>
                         </div>
                  </Grid>
             </form>
      </FormProvider>
    </>
  )
}

export default AddressForm