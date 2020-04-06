import React, { useState, useEffect } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import { getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/userAuth';

const Shop = () => {
    const [products,setProducts] = useState([]);
    const [cart,setCart] = useState([]);
    const [category,setCategory] = useState("Dinner");
    const [selectCat,setSelectCat] = useState("Dinner");
    console.log(cart)
    
    
    const items = products.filter(product => product.category === category);
    

    //Get all products from database
    useEffect(()=>{
        fetch('https://secret-earth-29040.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data));

        //Cart length
        const cartItem = getDatabaseCart()
        const newCart = Object.entries(cartItem);
        setCart(newCart);
    },[])

    //Category Handle
    const handleCategory = (e) => {
        let clickedCat = e.target.innerText;
        setCategory(clickedCat);
        setSelectCat(clickedCat);
    }
    

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
                    <button className={cart.length ===0 ? 'button-disabled' : 'button-active'} disabled={cart.length === 0 ? 'disabled' : ''}>Checkout Your Food</button>
                </Link>
            </div>
        </div>
    );
};

export default Shop;