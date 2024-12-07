import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import Login from './components/Login';
import Payment from './components/Payment';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard';
import AdminNavbar from './components/AdminNavbar';

const AppRoutes = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    const isLoginPage = location.pathname.includes('/login');


    return (
        <div>
            {!isLoginPage && (isAdminRoute ? <AdminNavbar /> : <Navbar />)}
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
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
};

export default App;