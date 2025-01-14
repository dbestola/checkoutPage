import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import Preloader from "./Preloader";

const CheckoutForm = () => {
  const [isLoading, setIsLoading] = useState(true); // Initially show preloader
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate(); // React Router navigate hook


  const paystackPublicKey = import.meta.env.VITE_URL;

  const generateTransactionReference = () => {
    const timestamp = new Date().getTime(); // Current timestamp in milliseconds
    const randomNumber = Math.floor(Math.random() * 1000000); // Random number between 0 and 999999
    return `TX-${timestamp}-${randomNumber}`;
  }

    // Show preloader for a few seconds when page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide preloader after 3 seconds
    }, 3000); // Set the time for preloader visibility (3 seconds)

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  // Function to handle Paystack payment initiation
  const handlePaystackPayment = (event) => {
    event.preventDefault();
    setIsProcessing(true); // Show preloader when payment starts

    // Getting form data so that i can pass this info to Paystack as metadata
    const form = event.target;
    const customerName = form.name.value;
    const customerEmail = form.email.value;
    const customerPhone = form.phone.value;
    const customerAmount = 10000; // Amount in kobo/cents, can be updated as needed
    const customerReference = generateTransactionReference();

    // Initialize the Paystack payment
    const handler = window.PaystackPop.setup({
      key: paystackPublicKey,
      email: customerEmail,
      amount: customerAmount,
      currency: 'NGN',
      ref: customerReference,
      metadata: {
        custom_fields: [
          {
            display_name: "Customer Name",
            variable_name: "customer_name",
            value: customerName
          },
          {
            display_name: "Phone Number",
            variable_name: "customer_phone",
            value: customerPhone
          }
        ]
      },
      callback: function (response) {
        // Handle the callback, e.g., you can send `response` to your backend
        console.log(response);
        alert("Payment successful! Reference: " + response.reference);

        // Save the order after successful payment
        const orderDetails = {
          orderId: Date.now(), // Unique order ID
          customerName: customerName,
          customerEmail: customerEmail,
          customerPhone: customerPhone,
          paymentMethod: 'Card',
          transactionReference: response.reference
        };
        saveOrderLocally(orderDetails);
        localStorage.setItem('currentOrderId', orderDetails.orderId); // Save current order ID

        
        // Using React Router to redirect to the order confirmation page
        navigate('/OrderConfirmation'); 

      },
      onClose: function () {
        alert("Payment was not completed.");
        setIsProcessing(false);
      },
    });

    // Open the Paystack popup
    handler.openIframe();
  };


  // fuction that create orders and save orders to local storage
  const saveOrderLocally = (orderDetails) => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(orderDetails);
    localStorage.setItem('orders', JSON.stringify(orders));
  }

   // If the page is still loading, show the preloader
   if (isLoading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-100 z-50">
        <Preloader />
      </div>
    );
  }
  
  return (

    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4" style={{marginTop:'100px'}}>
        Checkout Details
      </h1>
      <form id="form" onSubmit={handlePaystackPayment} className="w-full max-w-[600px]  bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Recipient Name</label>
          <input type="text" id="name" placeholder="Recipient name" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input type="text" id="address" placeholder="Line 1" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input type="text" id="city" placeholder="City" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
        </div>

        <div className="mb-4">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
          <input type="text" id="state" placeholder="State" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
        </div>

        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
          <select id="country" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md">
            <option value="" disabled selected>Select Country</option>
            <option>DRC</option>
            <option>Nigeria</option>
            <option>Ghana</option>
            <option>Togo</option>
            <option>Mali</option>
            <option>South Africa</option>
            <option>Uganda</option>
            <option>Malawi</option>
            <option>Senegal</option>
            <option>Cote d'Ivoire</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input type="text" id="phone" placeholder="Phone" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
        </div>

        <div className="mb-4">
          <label htmlFor="altPhone" className="block text-sm font-medium text-gray-700">Alt Phone/Whatsapp</label>
          <input type="text" id="altPhone" placeholder="Alternate Phone/Whatsapp" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" id="email" placeholder="Email address" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
        </div>

        <button
          type="submit"
          id="submit-hover"
          disabled={isProcessing}
          className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          {isProcessing ? (
                    <div className="flex justify-center items-center">
                      <Loader className="h-4 w-4 text-primary-foreground animate-spin" />
                    </div>
                  ) : "Proceed to Checkout"}
        </button>
      </form>
    </div>


  );
};

export default CheckoutForm;
