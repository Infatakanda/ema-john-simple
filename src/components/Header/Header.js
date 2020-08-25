import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav className="header-nav">
                <a href="/shop">Shop</a>
                <a href="/reeviw">Order Reviwe</a>
                <a href="/manage">Manage Order</a>
            </nav>
        </div>
    );
};

export default Header;