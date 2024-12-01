import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import Login from './components/Login';
import Payment from './components/Payment';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login/:panel" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/payment" element={<Payment />} />
            </Routes>
        </Router>
    );
};

export default App;
