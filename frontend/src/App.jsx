// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { CartProvider } from './context/CartContext';
// import Login from './components/Login';
// import Home from './components/Home';
// import Products from './components/Products';
// import Cart from './components/Cart';
// import Payment from './components/Payment';

// const App = () => {
//     return (
//         <CartProvider>
//             <Router>
//                 <Routes>
//                     <Route path="/" element={<Home />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/products" element={<Products />} />
//                     <Route path="/cart" element={<Cart />} />
//                     <Route path="/payment" element={<Payment />} />
//                 </Routes>
//             </Router>
//         </CartProvider>
//     );
// };

//export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import Login from './components/Login';
import Payment from './components/Payment';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/payment" element={<Payment />} />
            </Routes>
        </Router>
    );
};

export default App;
