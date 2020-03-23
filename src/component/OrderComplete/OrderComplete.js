import React from 'react';
import './OrderComplete.css';
import map from '../../Images/map.png'
import deliverMan from '../../Images/Group 1151.png'

const OrderComplete = () => {
    return (
        <div className="order-complete d-flex">
            <div className="col-md-8">
                <div className="order-left">
                    <img src={map} alt=""/>
                </div>
            </div>
            <div className="col-md-4">
                <div className="order-right">
                    <img src={deliverMan} alt=""/>
                    <p className="mt-3">Your Location</p>
                    <small>107 RD no 8</small>
                    <p>Shop Location</p>
                    <small>Gulshan Plaza Restaura GPR</small><br/>
                    <h3>9:30</h3>
                    <small>Estimated Delivery Time</small>
                    <button className="contact">Contact</button>
                </div>
            </div>
        </div>
    );
};

export default OrderComplete;