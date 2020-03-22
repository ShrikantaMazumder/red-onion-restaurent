import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Header.css';
import logo from '../../Images/logo2.png'

const Header = () => {
    return (
        <div className="container d-flex justify-content-between">
            <img src={logo} alt=""/>
            <div className="header-right">
                <a href="/cart"><FontAwesomeIcon icon={faShoppingCart} /></a>
                <a>Log in</a>
                <a>Signup</a>
            </div>
        </div>
    );
};

export default Header;