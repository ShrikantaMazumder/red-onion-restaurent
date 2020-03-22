import React, { useState } from 'react';
import './ProductDetail.css';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';

const ProductDetail = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    const [quantity,setQuantity] = useState(1)
    console.log(quantity);
    //Quantity Increment Function
    const incrementQuantity = (e) => {
        const currentValue = parseInt(document.getElementById('inputValue').value);
        const newValue = currentValue + 1;
        document.getElementById('inputValue').value = newValue;
        setQuantity(newValue);
    }
    //Quantity Decrement Function
    const decrementQuantity = e => {
        const currentValue = parseInt(document.getElementById('inputValue').value);
        const newValue = currentValue - 1;
        document.getElementById('inputValue').value = newValue;
        setQuantity(newValue);
    }
    return (
        <div className="container product-detail">
            <div className="col-md-6 details">
            <h2>{product.title}</h2>
            <small>Category: {product.category}</small>
            <p className="text-muted mt-5 mb-5">{product.description}</p>
            <div className="d-flex align-items-center">
                <h4><strong>${product.price}</strong></h4>
                <div className="quantity">
                    <button onClick={decrementQuantity} className="btn" disabled={quantity ===0 ? 'disabled' : ''} id="decrement">-</button>
                    <input type="text" id="inputValue" defaultValue="1"/>
                    <button onClick={incrementQuantity} className="btn" id="increment">+</button>

                </div>
            </div>
            </div>
            <div className="col-md-6">
                <img src={product.image} alt=""/>
            </div>
        </div>
    );
};

export default ProductDetail;