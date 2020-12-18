import React, { useState } from 'react'
import CheckoutSteps from '../componenets/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';

export default function ShippingAddressScreen(props) {
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;

    if(!userInfo) {
        props.history.push('/signin');
    }
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveShippingAddress({fullName,address,city,postalCode,country}));
        props.history.push('/payment');
    }
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit = {submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor = "fullName">Full Name</label>
                    <input type="text" id="fullName" placeholder = "enter your full name" value={fullName} onChange = {(e) => setFullName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor = "address">Address</label>
                    <input type="text" id="address" placeholder = "enter your address" value={address} onChange = {(e) => setAddress(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor = "city">city</label>
                    <input type="text" id="city" placeholder = "enter your city" value={city} onChange = {(e) => setCity(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor = "postalCode">Postal Code</label>
                    <input type="text" id="postalCode" placeholder = "enter your postalCode" value={postalCode} onChange = {(e) => setPostalCode(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor = "country">country</label>
                    <input type="text" id="country" placeholder = "enter your country" value={country} onChange = {(e) => setCountry(e.target.value)} required />
                </div>
                <div>
                    <label />
                    <button className = "primary" type = "submit">Continue</button>
                </div>
            </form>
        </div>
    )
}
