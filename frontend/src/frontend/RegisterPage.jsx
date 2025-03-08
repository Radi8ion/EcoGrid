import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// Configure axios
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
    withCredentials: true
});

// Authentication service
const authService = {
    register: async (email, password, name, userType) => {
        const response = await api.post("/register", { email, password, name, userType });
        return response.data;
    }
};

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userType, setUserType] = useState(""); // New state for user type
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    // Form validation states
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordMessage, setPasswordMessage] = useState("");
    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: "" // New form error for user type
    });

    // Check password strength
    useEffect(() => {
        if (!password) {
            setPasswordStrength(0);
            setPasswordMessage("");
            return;
        }

        let strength = 0;
        let message = "";

        // Length check
        if (password.length >= 8) strength += 1;

        // Character variety checks
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;

        // Set messages based on strength
        if (strength < 2) {
            message = "Very weak";
        } else if (strength < 3) {
            message = "Weak";
        } else if (strength < 4) {
            message = "Moderate";
        } else if (strength < 5) {
            message = "Strong";
        } else {
            message = "Very strong";
        }

        setPasswordStrength(strength);
        setPasswordMessage(message);
    }, [password]);

    // Validate form
    const validateForm = () => {
        let valid = true;
        const errors = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            userType: "" // Add validation for user type
        };

        // Name validation
        if (!name.trim()) {
            errors.name = "Name is required";
            valid = false;
        }

        // Email validation
        if (!email) {
            errors.email = "Email is required";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email address is invalid";
            valid = false;
        }

        // Password validation
        if (!password) {
            errors.password = "Password is required";
            valid = false;
        } else if (password.length < 8) {
            errors.password = "Password must be at least 8 characters";
            valid = false;
        } else if (passwordStrength < 3) {
            errors.password = "Please use a stronger password";
            valid = false;
        }

        // Confirm password validation
        if (password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
            valid = false;
        }

        // User type validation
        if (!userType) {
            errors.userType = "Please select a user type";
            valid = false;
        }

        setFormErrors(errors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Validate form before submission
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // Call to backend register API with user type
            await authService.register(email, password, name, userType);

            // Show success message
            setSuccess("Registration successful! Redirecting to login...");

            // Redirect to login after short delay
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            console.error("Registration Error:", err);
            setError(
                err.response?.data?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setIsLoading(false);
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

            {/* Registration card */}
            <motion.div
                className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative z-10 mt-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl font-bold text-green-700">Create Account</h1>
                        <p className="text-gray-600 mt-2">Join the sustainable energy revolution</p>
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

                {success && (
                    <motion.div
                        className="mb-6 p-3 bg-green-100 text-green-700 rounded-lg text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {success}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Name field */}
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                        <motion.input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className={`w-full px-4 py-3 rounded-lg border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                            placeholder="John Doe"
                            whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(0, 128, 0, 0.2)" }}
                        />
                        {formErrors.name && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                        )}
                    </div>

                    {/* Email field */}
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                        <motion.input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={`w-full px-4 py-3 rounded-lg border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                            placeholder="your@email.com"
                            whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(0, 128, 0, 0.2)" }}
                        />
                        {formErrors.email && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                        )}
                    </div>

                    {/* User Type field */}
                    <div className="mb-6">
                        <label htmlFor="userType" className="block text-gray-700 font-medium mb-2">User Type</label>
                        <motion.select
                            id="userType"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            required
                            className={`w-full px-4 py-3 rounded-lg border ${formErrors.userType ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                            whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(0, 128, 0, 0.2)" }}
                        >
                            <option value="" disabled>Select your user type</option>
                            <option value="prosumer">Prosumer</option>
                            <option value="consumer">Consumer</option>
                            <option value="utility">Utility</option>
                        </motion.select>
                        {formErrors.userType && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.userType}</p>
                        )}
                    </div>

                    {/* Password field */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                        <motion.input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={`w-full px-4 py-3 rounded-lg border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                            placeholder="••••••••"
                            whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(0, 128, 0, 0.2)" }}
                        />
                        {formErrors.password && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                        )}

                        {/* Password strength meter */}
                        {password && (
                            <div className="mt-2">
                                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                        className={`h-full ${passwordStrength <= 1 ? 'bg-red-500' :
                                                passwordStrength <= 2 ? 'bg-orange-500' :
                                                    passwordStrength <= 3 ? 'bg-yellow-500' :
                                                        passwordStrength <= 4 ? 'bg-green-500' :
                                                            'bg-green-700'
                                            }`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                                <p className={`text-xs mt-1 ${passwordStrength <= 1 ? 'text-red-500' :
                                        passwordStrength <= 2 ? 'text-orange-500' :
                                            passwordStrength <= 3 ? 'text-yellow-600' :
                                                'text-green-600'
                                    }`}>
                                    {passwordMessage}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password field */}
                    <div className="mb-8">
                        <label htmlFor="confirm-password" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                        <motion.input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className={`w-full px-4 py-3 rounded-lg border ${formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                            placeholder="••••••••"
                            whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(0, 128, 0, 0.2)" }}
                        />
                        {formErrors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
                        )}
                    </div>

                    {/* Submit button */}
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
                        ) : "Create Account"}
                    </motion.button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-green-600 hover:text-green-800 font-medium transition duration-200">
                            Sign in
                        </Link>
                    </p>
                </div>

                {/* Terms & Privacy notice */}
                <div className="mt-6 text-center text-xs text-gray-500">
                    <p>
                        By creating an account, you agree to our{" "}
                        <a href="/terms" className="text-green-600 hover:text-green-800">Terms of Service</a>
                        {" "}and{" "}
                        <a href="/privacy" className="text-green-600 hover:text-green-800">Privacy Policy</a>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default RegisterPage;