import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const {title,image,price,quantity} = props.cart;
    return (
        <div className="cart d-flex">
            <img src={image} alt=""/>
            <div className="cart-detail">
                <p><strong>{title}</strong></p>
                <span style={{color:'red'}}><strong>${price}</strong></span><br/>
                <span>Quantity: {quantity}</span><br/>
                <small>Delivery Free</small>
            </div>
        </div>
    );
};

export default Cart;