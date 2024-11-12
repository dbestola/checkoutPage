import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderConfirmation.css'; 
import LOGO from '../assets/gcPhoto.jpg';

const OrderConfirmation = () => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const currentOrderId = localStorage.getItem('currentOrderId');
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const currentOrder = orders.find(order => order.orderId == currentOrderId);

        if (currentOrder) {
            let message = 'Order placed successfully! ';
            if (currentOrder.paymentMethod === 'Card') {
                message += 'Payment completed successfully!';
            } else if (currentOrder.paymentMethod === 'Pay on Delivery') {
                message += 'You will pay on delivery.';
            }
            setConfirmationMessage(message);
            setOrderDetails(currentOrder);
        } else {
            setConfirmationMessage('No order found.');
        }

        // Handle ribbon effect
        const ribbonContainer = document.getElementById('ribbon-container');
        const createRibbon = () => {
            const ribbon = document.createElement('div');
            ribbon.classList.add('ribbon');

            const shapes = ['circle', 'square', 'rectangle', 'triangle'];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            ribbon.classList.add(shape);

            ribbon.style.backgroundColor = getRandomColor();

            if (shape === 'triangle') {
                ribbon.style.borderBottomColor = getRandomColor();
            }

            ribbon.style.width = `${Math.random() * 10 + 5}px`;
            ribbon.style.height = `${Math.random() * 10 + 5}px`;
            ribbon.style.left = `${Math.random() * 100}vw`;
            ribbon.style.top = `${Math.random() * -10}vh`;
            ribbon.style.animationDuration = `${Math.random() * 1.5 + 1.5}s`;
            ribbon.style.opacity = Math.random();

            ribbonContainer.appendChild(ribbon);

            setTimeout(() => {
                ribbon.remove();
            }, 3000);
        };

        const interval = setInterval(() => {
            for (let i = 0; i < 10; i++) {
                createRibbon();
            }
        }, 300);

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const handlePrint = () => {
        window.print();
    };

    const handleContinueShopping = () => {
        navigate('/'); 
    };

    return (
        <div className='section'>
            <div className="ribbon-container" id="ribbon-container"></div>

            <div className="receipt">
                <div className="logo">
                    <img src={LOGO} alt="Logo" width="60px" />
                    <span>GC Multifacet Group | NAGIDA Foods</span>
                </div>

                <div id="confirmation-message">{confirmationMessage}</div>
                {orderDetails && (
                    <div id="confirmation-details">
                        <p>Name: {orderDetails.customerName}</p>
                        <p>Order-Id: {orderDetails.orderId}</p>
                        <p>Email: {orderDetails.customerEmail}</p>
                        <p>Phone No: {orderDetails.customerPhone}</p>
                        {orderDetails.paymentMethod === 'Card' && (
                            <p>Transaction Reference: {orderDetails.transactionReference}</p>
                        )}
                    </div>
                )}

                <h3 className="alertMessage">
                    Important Notice: <br />
                    kindly keep record of your receipt.
                </h3>
            </div>

            <div className="button-container">
                <button className="print" id="print-button" onClick={handlePrint}>
                    Print Order
                </button>
                <div className="continue-shopping">
                    <button onClick={handleContinueShopping}>Continue Shopping</button>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
