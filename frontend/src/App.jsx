import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./frontend/HomePage";
import LoginPage from "./frontend/Loginpage";
import RegisterPage from "./frontend/RegisterPage";
import Dashboard from "./frontend/Dashboard";
import AboutUs from "./frontend/AboutUs";
import RefreshHandler from "./RefreshHandler";
import Blog from "./frontend/Blog"
import { AuthContext } from "./Context/AuthContext";
import EnergyDemandForecast from "./frontend/Forecasting";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MarketplacePage from "./frontend/Marketplace";
import Profile from "./frontend/Profile";
import ForgotPasswordPage from "./frontend/Forgotpassword";
import PricingPage from "./frontend/Pricingpage";
import { handlesuccess, intermediate } from "../utils";
// Protected Route component


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, setisAuthenticated } = useContext(AuthContext)
  useEffect(() => {
    // You can add token validation logic here if needed
    // This could involve checking if the token is expired or making a validation request to your backend

    // Simulating token validation check
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }


  const PrivateRoute = ({ element }) => {
    if (!isAuthenticated) {
      intermediate("Pls Login to access the page"); // Display the intermediate message
      return <Navigate to="/" />; // Redirect to home page
    }

    return element; // Render the protected element if authenticated
  };



  return (
    <>

      <Router>
        <ToastContainer />
        <RefreshHandler />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path="/forecast" element={<PrivateRoute element={<EnergyDemandForecast />} />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          {/* Catch-all route for non-existent paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;