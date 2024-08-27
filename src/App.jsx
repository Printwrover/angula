import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./App.css"; // Your local CSS styles
import TopbarStart from "./Components/Home/TopbarStart";
import Navbar from "./Components/Home/Navbar";
import AboutStart from "./Components/Home/AboutStart";
import ServiceStart from "./Components/Home/ServiceStart";
import DestinationStart from "./Components/Home/DestinationStart";
import ProcessStart from "./Components/Home/ProcessStart";
import TeamStart from "./Components/Home/TeamStart";
import TestimonialStart from "./Components/Home/TestimonialStart";
import FooterStart from "./Components/Home/FooterStart";
import ContactStart from "./Components/Home/ContactStart";
import Cart from "./Components/Home/Cart";
import Products from "./Pages/Products";
import Detail from "./Pages/Detail";
import Register from "./Components/Home/Register";
import Login from "./Components/Home/Login";

function Home() {
  return (
    <>
      <AboutStart />
      <ServiceStart />
      <DestinationStart />
      <ContactStart />
      <ProcessStart />
      <TeamStart />
      <TestimonialStart />
    </>
  );
}

function Contact() {
  return (
    <>
      <h1>Contact Us</h1>
      <p>This is the contact page content.</p>
      <FooterStart />
    </>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <TopbarStart />
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contactStart" element={<ContactStart />} />
        <Route path="/login" element={!isLoggedIn ? <Login onLogin={() => setIsLoggedIn(true)} /> : <Navigate to="/" />} />
      </Routes>
      <FooterStart />
    </Router>
  );
}

export default App;
