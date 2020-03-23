import React, { useState, useEffect } from 'react';

import './Shop.css';
import Product from '../Product/Product';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/userAuth';

const Shop = () => {
    const [category,setCategory] = useState("Dinner");
    const [selectCat,setSelectCat] = useState("Dinner");
    const [cart,setCart] = useState([]);
    const items = fakeData.filter(product => product.category === category);
    

    //Category Handle
    const handleCategory = (e) => {
        let clickedCat = e.target.innerText;
        setCategory(clickedCat);
        setSelectCat(clickedCat);
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
                <Link style={{textDecoration: 'none',fontWeight:'bold'}} onClick={handleCategory} className={selectCat === "Breakfast" ? "active-link" : ''}>Breakfast</Link>
                <Link style={{textDecoration: 'none',fontWeight:'bold'}} onClick={handleCategory} className={category === "Dinner" ? "active-link" : ''}>Dinner</Link>
                <Link style={{textDecoration: 'none',fontWeight:'bold'}} onClick={handleCategory} className={category === "Lunch" ? "active-link" : ''}>Lunch</Link>
            </div>
            <div>
            {
                items.map(product => <Product handleCategory={handleCategory} key={product.key} product={product}></Product>)
            }
            </div>
            <div className="wrapper">
                <Link className="checkout-link" to="/shipment">
                    <button className={cart.length === 0 ? 'button-disabled' : 'button-active'} disabled={cart.length === 0 ? 'disabled' : ''}>Checkout Your Food</button>
                </Link>
            </div>
        </div>
    );
};

export default Shop;