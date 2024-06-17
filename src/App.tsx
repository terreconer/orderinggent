import { Routes, Route } from 'react-router-dom';
import './App.css';
import { OrderPage } from './Pages/OrderPage';
import { OrderPageDetails } from './Pages/OrderPageDetails';
import { Navigation } from './Molecules';

function App() {
  return (
    <div className="App w-full h-full flex flex-col">
      <Navigation />
      <Routes>
        <Route path="/" element={<OrderPage />} />
        <Route path="/orders/:orderId" element={<OrderPageDetails />} />
      </Routes>
    </div>
  );
}

export default App;
