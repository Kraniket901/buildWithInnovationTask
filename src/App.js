import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import { ToastContainer} from 'react-toastify';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import CartPage from './components/CartPage';

function App() {
  const isLoggedIn = localStorage.getItem('token');
  return (
    <CartProvider>
    <BrowserRouter>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/cart' element={<CartPage/>}/>
      </Routes>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
