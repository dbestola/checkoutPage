import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CheckoutForm from './Components/CheckoutForm';
import OrderConfirmation from './Components/OrderConfirmation';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CheckoutForm />} />
        <Route path="/OrderConfirmation" element={<OrderConfirmation />} />
      </Routes>
    </Router>
  );
};

export default App;
