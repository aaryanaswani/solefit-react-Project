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
import Register from './components/Register';
import ContactSection from './components/Contact_Page';
import AdminRegister from './components/AdminRegister';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import AboutUs from './components/AboutUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import ManageRequests from './components/manage-requests';


const ADMIN_ROUTES = ['/admin', '/manage-customers', '/manage-orders', '/manage-products', '/manage-requests'];

const AppRoutes = () => {
    const location = useLocation();
    const isAdminRoute = ADMIN_ROUTES.some((route) => location.pathname.startsWith(route));
    const isLoginPage = location.pathname.includes('/login');
    const isLandingPage = location.pathname === '/';

    return (
        <div>
            {/* Render Navbar conditionally */}
            {!isLoginPage && !isLandingPage && (isAdminRoute ? <AdminNavbar /> : <Navbar />)}

            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login/:panel" element={<Login />} />
                <Route path="/adminregister" element={<AdminRegister />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/manage-customers" element={<ManageCustomers />} />
                <Route path="/manage-orders" element={<ManageOrders />} />
                <Route path="/manage-products" element={<ManageProducts />} />
                <Route path="/manage-requests" element ={<ManageRequests />}/>
                <Route path="/home" element={<Home />} />
                <Route path="/About-Us" element={<AboutUs/>}/>
                <Route path="/contact-us" element={<ContactSection />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/OrderConfirmation" element={<OrderConfirmation />} />
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy />}/>
                <Route path="/payment" element={<Payment />} />
                {/* 404 Route */}
                <Route path="*" element={<h1>404 - Page Not Found</h1>} />
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
