import React, { useState } from 'react';
import './ProductDetail.css';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { addToDatabaseCart } from '../../utilities/databaseManager';

const ProductDetail = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    const [quantity,setQuantity] = useState(1)
    
   //cart
    // const [cart,setCart] = useState([]);
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
    

    //Handle Add to cart function
    const handleAddToCart = () =>{
        addToDatabaseCart(product.key,quantity)      
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
                    <button onClick={decrementQuantity} className="btn" disabled={quantity ===1 ? 'disabled' : ''} id="decrement">-</button>
                    <input type="text" id="inputValue" defaultValue="1"/>
                    <button onClick={incrementQuantity} className="btn" id="increment">+</button>
                </div>
            </div>
            <div className="cart-button">
                    <button onClick={handleAddToCart}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                        Add
                    </button>
                </div>
            </div>
            <div className="col-md-6">
                <img src={product.image} alt=""/>
            </div>
        </div>
    );
};

export default ProductDetail;