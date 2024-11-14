import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from './components/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import OurStore from './pages/OurStore';
import Blogs from './pages/Blogs';
import CompareProduct from './pages/CompareProduct';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import SingleBlog from './pages/SingleBlog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import TermsAndCondition from './pages/TermsAndCondition';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { PrivateRoutes } from './routing/PrivateRoutes';
import { OpenRoutes } from './routing/OpenRoutes';
import Orders from './pages/Orders';
import Profile from './pages/Profile';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element= {<Home/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="contact" element={<Contact/>}/>
          <Route path="product" element={<OurStore/>}/>
          <Route path="product/:id" element={<SingleProduct/>}/>
          <Route path="blogs" element={<Blogs/>}/>
          <Route path="blog/:id" element={<SingleBlog/>}/>
          <Route path="cart" element={<Cart/>}/>
          <Route path="my-orders" element={<Orders/>}/>
          <Route path="my-profile" element={<Profile/>}/>
          <Route path="checkout" element={<Checkout/>}/>
          <Route path="compare-product" element={<CompareProduct/>}/>
          <Route path="wishlist" element={<Wishlist/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="forgot-password" element={<ForgotPassword/>}/>
          <Route path="signup" element={<SignUp/>}/>
          <Route path="reset-password/:token" element={<ResetPassword/>}/>
          <Route path="privacy-policy" element={<PrivacyPolicy/>}/>
          <Route path="refund-policy" element={<RefundPolicy/>}/>
          <Route path="shipping-policy" element={<ShippingPolicy/>}/>
          <Route path="term-and-condition" element={<TermsAndCondition/>}/>
        </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
