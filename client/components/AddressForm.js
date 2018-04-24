import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default function AddressForm  (props)  {
console.log('rendering form')
    return (
        
        <div className="address-form">
        <form onSubmit={()=>{}} name={name}>
            <div>
                <label htmlFor="address"><small>Address</small></label>
                <input name="address" type="text" placeholder="Address" />
            </div>
            <div>
                <label htmlFor="city"><small>City</small></label>
                <input name="city" type="text" placeholder="City"/>
            </div>
            <div>
                <label htmlFor="state"><small>State/Zip</small></label>
                <input name="state" type="text" placeholder="State"/>
                <input name="zip" type="text" placeholder="Zipcode"/>
            </div>
            <div>
            <label htmlFor="country"><small>Country</small></label>
                <input name="country" type="text" placeholder="Country"/>
            </div>
            <div>
                <button type="submit">Submit </button>
            </div>

        </form>
      </div>
        
    )
}



// export const ShippingAddress = connect(mapShipping, mapDispatch)(AuthForm)
// export const BillingAddress = connect(mapBilling, mapDispatch)(AuthForm)
