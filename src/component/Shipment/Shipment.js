import React, { useState, useEffect } from 'react';
import './Shipment.css'
import ShipmentDetail from './ShipmentDetail';
import Cart from '../Cart/Cart';
import { getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import { Link } from 'react-router-dom';

const Shipment = () => {
    const [cart,setCart] = useState([]);
    const totalPrice = cart.reduce((total,product) => total + (product.price * product.quantity),0);
    const tax = 5;
    const deliveryCharge = 2;
    const grandTotal = (totalPrice + tax + deliveryCharge);
    const totalItems = cart.length;

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        })
        setCart(cartProducts);
    } ,[]);
    
    
    return (
        <div className="container shipment-section">
            <div className="row">
                <ShipmentDetail></ShipmentDetail>
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
                    <Link to="/place-order"><button className="place-order">Place Order</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Shipment;