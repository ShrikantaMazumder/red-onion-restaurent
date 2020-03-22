import React, { useState } from 'react';

import './Shop.css';
import Product from '../Product/Product';
import fakeData from '../../fakeData';

const Shop = () => {
    const [category,setCategory] = useState("Dinner")
    const items = fakeData.filter(product => product.category === category);
    const handleCategory = (e) => {
    let clickedCat = e.target.innerText;
    setCategory(clickedCat);
  }
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
            {
        items.map(product => <Product handleCategory={handleCategory} key={product.key} product={product}></Product>)
      }
        </div>
    );
};

export default Shop;