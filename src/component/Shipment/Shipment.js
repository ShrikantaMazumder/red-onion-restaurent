import React, { useState, useEffect } from 'react';
import './Shipment.css'
import {loadStripe} from '@stripe/stripe-js';
import {
  Elements,
} from '@stripe/react-stripe-js';
import Cart from '../Cart/Cart';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/userAuth';
import { useForm } from 'react-hook-form';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const Shipment = () => {
    const [shipInfo,setShipInfo] = useState(null);
    const [orderId,setOrderId] = useState(null);
    const auth = useAuth();
    const stripePromise = loadStripe('pk_test_pO5hGePb6m1AUqxRUpOS3oqD00dBLzVK36');
    const { register, handleSubmit, errors } = useForm()
    const onSubmit = data => {
      setShipInfo(data);
    }
    //Cart Total transaction
    const [cart,setCart] = useState([]);
    const totalPrice = cart.reduce((total,product) => total + (product.price * product.quantity),0);
    const tax = 5;
    const deliveryCharge = 2;
    const grandTotal = (totalPrice + tax + deliveryCharge);
    const totalItems = cart.length;

    //cart
    useEffect(()=> {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://secret-earth-29040.herokuapp.com/get-cart-product',{
            method: "POST",
            body: JSON.stringify(productKeys),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res => res.json())
        .then(data => {
            const cartProducts = productKeys.map(key => {
                const product = data.find(product => product.key === key);
                product.quantity = savedCart[key];
                return product;
            })
            setCart(cartProducts);
        })
        
    },[])

    //Place order
    const handlePlaceOrder = (payment) => {
        const orderDetails = {
            email:auth.user.email,
            cart: cart,
            shipment: shipInfo,
            payment: payment,
        }
        fetch('https://secret-earth-29040.herokuapp.com/place-order',{
            method: "POST",
            body: JSON.stringify(orderDetails),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res => res.json())
        .then(order => {
            setOrderId(order._id)
            processOrder();
        })
        
    }
    
    
    return (
        <div className="container shipment-section">
            <div className="row">
                    <div style={{display: shipInfo && 'none'}} className="col-md-8 shipment">
                        <h2>Shipping Details</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} />
                        {errors.name && <span>This field is required</span>}
                        <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} />
                        {errors.email && <span>This field is required</span>}
                        <input name="address1" ref={register({ required: true })} placeholder="Address 1" />
                        {errors.address1 && <span>This field is required</span>}
                        <input name="address2" ref={register({ required: true })} placeholder="Address 2"/>
                        {errors.address2 && <span>This field is required</span>}
                        <input name="country" ref={register({ required: true })} placeholder="Country"/>
                        {errors.country && <span>This field is required</span>}
                        <input name="city" ref={register({ required: true })} placeholder="City"/>
                        {errors.city && <span>This field is required</span>}
                        <input name="zipcode" ref={register({ required: true })} placeholder="Zip Code"/>
                        {errors.zipcode && <span>This field is required</span>}
                        <button type="submit" className="submit-button">Save & Continue</button>
                        </form>
                    </div>
                <div style={{display: shipInfo? 'block' : 'none'}} className="col-md-8 shipment">
                    <h2>Payment Details</h2>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm handlePlaceOrder={handlePlaceOrder}></CheckoutForm>
                    </Elements>
                    {
                        orderId && <div>
                            <h3>Thank you for shopping with us.</h3>
                            <p>Your id is: {orderId}</p>
                        </div>
                    }
                </div>
                <div className="col-md-4">
                    <div>
                        <p>From <strong>Gulshan Plaza Restaura GPR</strong></p>
                        <small>Arriving in 20-30 min</small>
                        <p>107 Rd no 8</p>
                    </div>
                    <div>
                        {cart.map(cart => <Cart key={cart.key} cart={cart}></Cart>)}
                    </div>
                    <div className="cart-transaction">
                        <div className="left">
                            <p>Subtotal - {totalItems} item(s)</p>
                            <p>Tax:</p>
                            <p>Delivery Fee:</p>
                            <p><strong>Total:</strong></p>
                        </div>
                        <div className="right">
                            <p>${totalPrice}</p>
                            <p>${tax}</p>
                            <p>${deliveryCharge}</p>
                            <p><strong>${grandTotal}</strong></p>
                        </div>
                    </div>
                    <Link to="/place-order"><button className="place-order">Check Location</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Shipment;