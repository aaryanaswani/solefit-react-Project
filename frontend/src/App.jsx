import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/authcontext'; // Import AuthProvider
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import Login from './components/Login';
import Payment from './components/Payment';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard';
import AdminNavbar from './components/AdminNavbar';
import ManageCustomers from './components/manage-customers';
import ManageOrders from './components/manage-orders';
import ManageProducts from './components/manage-products';


const AppRoutes = () => {
    const location = useLocation();
    const adminRoutes = ['/admin', '/manage-customers', '/manage-orders', '/manage-products'];
    const isAdminRoute = adminRoutes.some((route) => location.pathname.startsWith(route));
    const isLoginPage = location.pathname.includes('/login');

    return (
        <div>
            {!isLoginPage && (isAdminRoute ? <AdminNavbar /> : <Navbar />)}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login/:panel" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/manage-customers" element={<ManageCustomers />} />
                <Route path="/manage-orders" element={<ManageOrders />} />
                <Route path="/manage-products" element={<ManageProducts />} />
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/payment" element={<Payment />} />
            </Routes>
        </div>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
};

export default App;
