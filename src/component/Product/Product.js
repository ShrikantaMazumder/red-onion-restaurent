import React from 'react';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {key,title,image,price,short_description} = props.product;
    return (
        <div className="container">
            <div className="product">
                <img src={image} alt=""/>
                <h6><Link to={`/product/${key}`}>{title}</Link></h6>
                <p className="short-desc">{short_description}</p>
                <p className="price"><strong>${price}</strong></p>
            </div>
        </div>
    );
};

export default Product;