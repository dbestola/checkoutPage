import React from 'react';
import { FaCcMastercard, FaCcVisa, FaCcPaypal } from 'react-icons/fa'; // Import payment icons
import './footer.css';
import LOGO from '../../assets/gcPhoto.jpg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <img src={LOGO} alt="GC Multifacet Group Logo" className="footer-logo" />
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className="footer-links">
          <h3>Customer Service</h3>
          <ul>
            <li>Shipping & Returns</li>
            <li>Payment Options</li>
            <li>Order Tracking</li>
            <li>Support</li>
          </ul>
        </div>
        <div className="footer-payment">
          <h3>We Accept</h3>
          <div className="payment-logos">
            <FaCcMastercard className="payment-icon" title="MasterCard" />
            <FaCcVisa className="payment-icon" title="Visa" />
            <FaCcPaypal className="payment-icon" title="PayPal" />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 GC Multifacet Group | NAGIDA Foods. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
