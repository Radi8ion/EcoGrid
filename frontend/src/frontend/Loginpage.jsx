import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import { handlesuccess } from "../../utils";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [onboardingStep, setOnboardingStep] = useState(0);
    const [profileData, setProfileData] = useState({
        location: "",
        energyUsage: "",
        hasSolarPanels: null
    });

    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const api = axios.create({
        baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
        withCredentials: true
    });
    const handleDetectLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    try {
                        // Use OpenStreetMap's Nominatim API for reverse geocoding
                        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                        const data = await response.json();

                        if (data.display_name) {
                            setProfileData({ ...profileData, location: data.display_name });
                        } else {
                            alert("Unable to retrieve location name.");
                        }
                    } catch (error) {
                        alert("Failed to fetch location data.");
                    }
                },
                (error) => {
                    alert("Geolocation access denied. Please enter location manually.");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };


    const loginUser = async (email, password) => {
        try {
            const response = await api.post("/login", { email, password });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || "Login failed. Try again.";
        }
    };

    // Inside your LoginPage component, update the handleSubmit function:
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!email || !password) {
            setError("Please fill in all fields.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await loginUser(email, password);

            if (rememberMe) {
                localStorage.setItem('authToken', response.token);
            } else {
                sessionStorage.setItem('authToken', response.token);
            }

            // Set authentication state


            // Check if it's a new user (show onboarding)
            if (response.isNewUser) {
                setShowOnboarding(true); // This will show the onboarding flow
                // Navigate to the onboarding steps
            } else {
                setIsAuthenticated(true);
                handlesuccess("Logged in Successfully")
                navigate('/dashboard'); // Navigate to dashboard if not new
            }
        } catch (err) {
            console.log(err);
            setError("Failed to login. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    // Add the missing handleOnboardingNext function
    const handleOnboardingNext = () => {
        if (onboardingStep === 2) {
            handleOnboardingComplete();
        } else {
            setOnboardingStep(onboardingStep + 1);
        }
    };
    const handleOnboardingComplete = async () => {
        try {
            setIsLoading(true);
            const authToken = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

            await api.post("/user/profile", profileData, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            // Once onboarding is complete, navigate to the dashboard
            setShowOnboarding(false);
            setIsAuthenticated(true);
            handlesuccess("Logged in Successfully")
            navigate('/dashboard');  // Redirect to dashboard
        } catch (err) {
            console.log(err);
            setError("Failed to save profile data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };


    const handleOnboardingBack = () => {
        setOnboardingStep(onboardingStep - 1);
    };

    const renderOnboardingContent = () => {
        switch (onboardingStep) {
            case 0:
                return (
                    <>
                        <h2 className="text-2xl font-bold text-green-700 mb-6">Welcome to EcoGrid!</h2>
                        <p className="text-gray-600 mb-6">Let's set up your profile to get the most out of your sustainable energy journey.</p>
                        <motion.button
                            onClick={() => setOnboardingStep(1)}
                            className="w-full bg-green-700 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-800 transition duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Get Started
                        </motion.button>
                    </>
                );
            case 1:
                return (
                    <>
                        <h2 className="text-2xl font-bold text-green-700 mb-6">Your Location</h2>
                        <p className="text-gray-600 mb-4">This helps us provide local energy insights and solar potential.</p>

                        <div className="mb-6">
                            <label htmlFor="location" className="block text-gray-700 font-medium mb-2">Your Location</label>
                            <motion.input
                                type="text"
                                id="location"
                                value={profileData.location}
                                onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                placeholder="City, State/Province, Country"
                                whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(0, 128, 0, 0.2)" }}
                            />
                        </div>

                        <motion.button
                            onClick={handleDetectLocation}
                            className="w-full px-6 py-2 mb-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Use My Location
                        </motion.button>

                        <div className="flex justify-between">
                            <motion.button
                                onClick={handleOnboardingBack}
                                className="px-6 py-2 border border-green-500 text-green-600 rounded-lg font-medium hover:bg-green-50 transition duration-200"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Back
                            </motion.button>
                            <motion.button
                                onClick={handleOnboardingNext}
                                className="px-6 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition duration-200"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={!profileData.location}
                            >
                                Next
                            </motion.button>
                        </div>
                    </>

                );
            case 2:
                return (
                    <>
                        <h2 className="text-2xl font-bold text-green-700 mb-6">Energy Profile</h2>
                        <div className="mb-6">
                            <label htmlFor="energyUsage" className="block text-gray-700 font-medium mb-2">Estimated Monthly Energy Usage (kWh)</label>
                            <motion.input
                                type="number"
                                id="energyUsage"
                                value={profileData.energyUsage}
                                onChange={(e) => setProfileData({ ...profileData, energyUsage: e.target.value })}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                placeholder="500"
                                whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(0, 128, 0, 0.2)" }}
                            />
                        </div>
                        <div className="mb-6">
                            <p className="block text-gray-700 font-medium mb-2">Do you have solar panels installed?</p>
                            <div className="flex space-x-4">
                                <motion.button
                                    onClick={() => setProfileData({ ...profileData, hasSolarPanels: true })}
                                    className={`px-6 py-2 rounded-lg font-medium transition duration-200 ${profileData.hasSolarPanels === true
                                            ? "bg-green-700 text-white"
                                            : "border border-green-500 text-green-600 hover:bg-green-50"
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Yes
                                </motion.button>
                                <motion.button
                                    onClick={() => setProfileData({ ...profileData, hasSolarPanels: false })}
                                    className={`px-6 py-2 rounded-lg font-medium transition duration-200 ${profileData.hasSolarPanels === false
                                            ? "bg-green-700 text-white"
                                            : "border border-green-500 text-green-600 hover:bg-green-50"
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    No
                                </motion.button>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <motion.button
                                onClick={handleOnboardingBack}
                                className="px-6 py-2 border border-green-500 text-green-600 rounded-lg font-medium hover:bg-green-50 transition duration-200"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Back
                            </motion.button>
                            <motion.button
                                onClick={handleOnboardingNext}
                                className="px-6 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition duration-200"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={!profileData.energyUsage || profileData.hasSolarPanels === null}
                            >
                                Complete Setup
                            </motion.button>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-200 to-green-500 flex items-center justify-center p-4">
            {/* Animated background elements */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-2xl opacity-30"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        zIndex: 0
                    }}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{
                        opacity: [0, 0.3, 0],
                        y: ["0vh", "100vh"],
                        x: i % 2 === 0 ? [0, 50] : [0, -50],
                        rotate: i % 2 === 0 ? 360 : -360
                    }}
                    transition={{
                        duration: 15 + i * 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {i % 3 === 0 ? "🍃" : i % 3 === 1 ? "⚡" : "🌱"}
                </motion.div>
            ))}

            {/* Sun element */}
            <div className="absolute top-10 right-10 z-0">
                <motion.div
                    className="w-20 h-20 rounded-full bg-yellow-400"
                    animate={{
                        boxShadow: [
                            "0 0 10px 5px rgba(255, 236, 25, 0.4)",
                            "0 0 20px 10px rgba(255, 236, 25, 0.6)",
                            "0 0 10px 5px rgba(255, 236, 25, 0.4)"
                        ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Login card or Onboarding */}
            <motion.div
                className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {!showOnboarding ? (
                    <>
                        <div className="text-center mb-8">
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h1 className="text-4xl font-bold text-green-700">EcoGrid</h1>
                                <p className="text-gray-600 mt-2">Welcome back to sustainable energy</p>
                            </motion.div>
                        </div>

                        {error && (
                            <motion.div
                                className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg text-sm"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                                <motion.input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                    placeholder="your@email.com"
                                    whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(0, 128, 0, 0.2)" }}
                                />
                            </div>

                            <div className="mb-6">
                                <div className="flex justify-between mb-2">
                                    <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
                                    <Link to="/forgot-password" className="text-green-600 hover:text-green-800 text-sm transition duration-200">
                                        Forgot Password?
                                    </Link>
                                </div>
                                <motion.input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                    placeholder="••••••••"
                                    whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(0, 128, 0, 0.2)" }}
                                />
                            </div>

                            <div className="mb-6 flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember" className="ml-2 block text-gray-700">
                                    Remember me
                                </label>
                            </div>

                            <motion.button
                                type="submit"
                                className="w-full bg-green-700 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-800 transition duration-200 flex items-center justify-center"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <motion.div
                                        className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    />
                                ) : "Sign In"}
                            </motion.button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Don't have an account?{" "}
                                <a href="/register" className="text-green-600 hover:text-green-800 font-medium transition duration-200">
                                    Create one now
                                </a>
                            </p>
                        </div>
                    </>
                ) : (
                    <div>
                        {renderOnboardingContent()}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default LoginPage;