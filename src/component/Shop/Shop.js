import React, { useState, useEffect } from 'react';

import './Shop.css';
import Product from '../Product/Product';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [category,setCategory] = useState("Dinner");
    const [cart,setCart] = useState([]);
    const items = fakeData.filter(product => product.category === category);

    //Category Handle
    const handleCategory = (e) => {
        let clickedCat = e.target.innerText;
        setCategory(clickedCat);
    }
    //cart
    useEffect(()=> {
        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart);
        const previousCart = productKey.map(pdKey => {
            const product = fakeData.find(product => product.key === pdKey);
            product.quantity = savedCart[pdKey];
            return product;
        })
       setCart(previousCart);
        
    },[])

    return (
        <div>
            <div className="banner-section">
                <h1>Best food waiting for your belly</h1>
            </div>
            <div className="categories">
                <a onClick={handleCategory}>Breakfast</a>
                <a onClick={handleCategory}>Dinner</a>
                <a onClick={handleCategory}>Lunch</a>
            </div>
            <div>
            {
                items.map(product => <Product handleCategory={handleCategory} key={product.key} product={product}></Product>)
            }
            </div>
            <div className="wrapper">
                <Link className="checkout-link" to="/shipment">
                    <button className={cart.length === 0 ? 'disabled' : 'active'} disabled={cart.length === 0 ? 'disabled' : ''}>Checkout Your Food</button>
                </Link>
            </div>
        </div>
    );
};

export default Shop;