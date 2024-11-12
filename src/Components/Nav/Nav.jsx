import React, { useState } from 'react';
import "./nav.css"
import { RxHamburgerMenu } from "react-icons/rx";
import { FiShoppingCart } from 'react-icons/fi';
import LOGO from '../../assets/gcPhoto.jpg';


const Nav = () => {

  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='nav-section'>

      <img src={LOGO} alt="Logo" width="100px" />
      <h1 className='coins'><span>GC Multifacet Group | NAGIDA Foods</span></h1>

      <nav>

      <ul className={menuOpen ? 'nav-links active' : 'nav-links'}>
          <li>Shop </li>
          <li>Home </li>
          <li>Login </li>
          <li>Register </li>
          <li className="cart"> 
            Cart <FiShoppingCart />
            <span className="cart-count">{cartCount}</span>
          </li>
        </ul>

      </nav>

      <div className='ham-bugger' onClick={() => setMenuOpen(!menuOpen)}>
        <RxHamburgerMenu className='ham-icon' />
      </div>
    </div>
  )
}

export default Nav