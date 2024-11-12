import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CheckoutForm from './Components/CheckoutForm';
import OrderConfirmation from './Components/OrderConfirmation';
import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer/Footer';

const App = () => {
  return (

    <>
    <Nav />
      <Router>
        <Routes>
          <Route path="/" element={<CheckoutForm />} />
          <Route path="/OrderConfirmation" element={<OrderConfirmation />} />
        </Routes>
      </Router>
      <Footer />
    </>

  );
};

export default App;
