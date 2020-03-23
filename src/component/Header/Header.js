import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Header.css';
import logo from '../../Images/logo2.png'
import { useAuth } from '../Login/userAuth';

const Header = () => {
    const auth = useAuth();
    console.log(auth);
    //Handle Signout
    const handleSignOut = () => {
        auth.signOut();
    }
    
    return (
        <div className="container d-flex justify-content-between">
            <a href="/"><img src={logo} alt=""/></a>
            <div className="header-right">
                <a href="/cart"><FontAwesomeIcon icon={faShoppingCart} />(0)</a>
                {
                    auth.user ? <span>{auth.user.name} <button onClick={handleSignOut}>Signout</button></span>
                    :
                    <span>
                        <a href="/login">Log in</a>
                    </span>
                }
            </div>
        </div>
    );
};

export default Header;