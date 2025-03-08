import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../Context/AuthContext";
import NavBar from "./NavBar";
import { Edit, Save, User, MapPin, Zap, SunIcon, X, Loader2, Mail, UserCheck, Wallet, ExternalLink, Calendar, ChevronRight, Shield, BadgeCheck } from 'lucide-react';
import { handleerror, handlesuccess } from "../../utils";
import axios from "axios";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        location: "",
        energyUsage: 0,
        hasSolarPanels: false,
        email: "",
        userType: "",
        walletAddress: ""
    });

    const [walletAddress, setWalletAddress] = useState("");
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [userDisconnected, setUserDisconnected] = useState(false);
    const [activeTab, setActiveTab] = useState("profile"); // New state for tabs

    const api = axios.create({
        baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
        withCredentials: true
    });

    // Fetch user profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
                const response = await api.get(`/user/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log(response.data);

                const data = await response.data;
                setProfile(data);
                setFormData({
                    location: data.location || "",
                    energyUsage: data.energyUsage || 0,
                    hasSolarPanels: data.hasSolarPanels || false,
                    email: user?.user?.email || "",
                    userType: user?.user?.userType || "consumer",
                    walletAddress: data.walletAddress || ""
                });

                // Set wallet address from profile if exists
                if (data.walletAddress) {
                    setWalletAddress(data.walletAddress);
                    setIsWalletConnected(true);
                }
            } catch (err) {
                setError(err.message);
                handleerror(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (user?.user?._id) {
            fetchProfile();
        }
    }, [user]);

    // Check if wallet is already connected on component mount
    useEffect(() => {
        const checkWalletConnection = async () => {
            // Check if user has explicitly disconnected
            const hasDisconnected = localStorage.getItem("walletDisconnected") === "true";

            // If user explicitly disconnected, don't auto-connect
            if (hasDisconnected) {
                setUserDisconnected(true);
                setIsWalletConnected(false);
                setWalletAddress("");
                return;
            }

            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    if (accounts.length > 0) {
                        setWalletAddress(accounts[0]);
                        setIsWalletConnected(true);

                        // Update form data if profile exists
                        if (profile && (!profile.walletAddress || profile.walletAddress !== accounts[0])) {
                            setFormData(prev => ({
                                ...prev,
                                walletAddress: accounts[0]
                            }));
                        }
                    }
                } catch (error) {
                    console.error("Error checking wallet connection:", error);
                }
            }
        };

        checkWalletConnection();
    }, [profile]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

            const response = await api.put(`/user/profile`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response);
            const updatedProfile = response.data;
            setProfile(updatedProfile);
            setIsEditing(false);
            handlesuccess("Profile updated successfully");
        } catch (err) {
            console.log(err);
            handleerror(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Connect to Metamask wallet
    const connectWallet = async () => {
        if (!window.ethereum) {
            handleerror("Metamask not detected! Please install Metamask extension.");
            return;
        }

        setIsConnecting(true);

        try {
            // Clear the disconnected flag when connecting
            localStorage.removeItem("walletDisconnected");
            setUserDisconnected(false);

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setWalletAddress(accounts[0]);
            setIsWalletConnected(true);

            // Update form data
            setFormData(prev => ({
                ...prev,
                walletAddress: accounts[0]
            }));

            handlesuccess("Wallet connected successfully!");

            // Save wallet address to profile
            const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
            await api.put(`/user/profile`, { walletAddress: accounts[0] }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error("Error connecting wallet:", error);
            handleerror("Failed to connect wallet. Please try again.");
        } finally {
            setIsConnecting(false);
        }
    };

    // Disconnect wallet
    const disconnectWallet = async () => {
        try {
            // Set disconnected flag in localStorage
            localStorage.setItem("walletDisconnected", "true");
            setUserDisconnected(true);

            setWalletAddress("");
            setIsWalletConnected(false);

            // Update form data
            setFormData(prev => ({
                ...prev,
                walletAddress: ""
            }));

            // Save empty wallet address to profile
            const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
            await api.put(`/user/profile`, { walletAddress: "" }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            handlesuccess("Wallet disconnected successfully!");
        } catch (error) {
            console.error("Error disconnecting wallet:", error);
            handleerror("Failed to disconnect wallet. Please try again.");
        }
    };

    // Animation variants
    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        exit: { opacity: 0, y: 20, transition: { duration: 0.3 } }
    };

    const cardVariants = {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } }
    };

    const tabVariants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: 10, transition: { duration: 0.2 } }
    };

    // User type to badge color mapping
    const userTypeBadge = {
        prosumer: "bg-gradient-to-r from-yellow-400 to-green-400 text-green-900",
        consumer: "bg-gradient-to-r from-blue-400 to-cyan-400 text-blue-900",
        utility: "bg-gradient-to-r from-purple-400 to-indigo-400 text-purple-900"
    };

    if (loading && !profile) {
        return (
            <>
                <NavBar />
                <div className="min-h-screen pt-24 bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                                <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-white rounded-full flex items-center justify-center shadow-md">
                                <User className="h-4 w-4 text-green-600" />
                            </div>
                        </div>
                        <p className="mt-4 text-green-700 font-medium">Loading your profile...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <NavBar />
            <motion.div
                className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 pt-24 pb-16 px-4"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100"
                        variants={cardVariants}
                    >
                        {/* Profile Header */}
                        <div className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 p-8 text-white relative overflow-hidden">
                            {/* Background pattern */}
                            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <defs>
                                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                                        </pattern>
                                    </defs>
                                    <rect width="100" height="100" fill="url(#grid)" />
                                </svg>
                            </div>

                            {/* Decorative circles */}
                            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-green-400 opacity-20"></div>
                            <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-emerald-300 opacity-20"></div>

                            <div className="relative z-10 flex flex-col md:flex-row md:items-center">
                                <div className="bg-white p-1.5 rounded-full mb-4 md:mb-0 md:mr-6 shadow-lg">
                                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-full h-24 w-24 flex items-center justify-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent_70%)]"></div>
                                        <User size={48} className="text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold tracking-tight">{user?.user?.name || "User"}</h1>
                                    <p className="text-green-100 flex items-center">
                                        <Mail className="h-4 w-4 mr-2" />
                                        {user?.user?.email}
                                    </p>

                                    <div className="flex mt-3 items-center flex-wrap gap-2">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${userTypeBadge[user?.user?.userType] || "bg-gray-200 text-gray-800"} flex items-center`}>
                                            <BadgeCheck className="h-4 w-4 mr-1" />
                                            {user?.user?.userType?.charAt(0).toUpperCase() + user?.user?.userType?.slice(1) || "User"}
                                        </span>

                                        {!user?.user?.onboardingCompleted && (
                                            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium shadow-sm flex items-center">
                                                <Shield className="h-4 w-4 mr-1" />
                                                Complete Onboarding
                                            </span>
                                        )}

                                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium shadow-sm flex items-center">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            {user?.user?.createdAt
                                                ? new Date(user.user.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short'
                                                })
                                                : "Unknown"}
                                        </span>
                                    </div>
                                </div>

                                {!isEditing ? (
                                    <motion.button
                                        onClick={() => setIsEditing(true)}
                                        className="mt-4 md:mt-0 px-4 py-2 bg-white text-green-700 rounded-lg flex items-center font-medium shadow-lg hover:bg-green-50 transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Edit size={18} className="mr-2" />
                                        Edit Profile
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        onClick={() => setIsEditing(false)}
                                        className="mt-4 md:mt-0 px-4 py-2 bg-red-50 text-red-600 rounded-lg flex items-center font-medium shadow-lg hover:bg-red-100 transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <X size={18} className="mr-2" />
                                        Cancel
                                    </motion.button>
                                )}
                            </div>
                        </div>

                        {/* Tab Navigation */}
                        <div className="border-b border-green-100">
                            <div className="flex space-x-1 px-6">
                                <button
                                    onClick={() => setActiveTab("profile")}
                                    className={`py-4 px-4 font-medium text-sm transition-colors relative ${activeTab === "profile" ? "text-green-700" : "text-gray-500 hover:text-green-600"
                                        }`}
                                >
                                    Profile Information
                                    {activeTab === "profile" && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"
                                            layoutId="activeTab"
                                        />
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab("wallet")}
                                    className={`py-4 px-4 font-medium text-sm transition-colors relative ${activeTab === "wallet" ? "text-green-700" : "text-gray-500 hover:text-green-600"
                                        }`}
                                >
                                    Wallet
                                    {activeTab === "wallet" && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"
                                            layoutId="activeTab"
                                        />
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab("energy")}
                                    className={`py-4 px-4 font-medium text-sm transition-colors relative ${activeTab === "energy" ? "text-green-700" : "text-gray-500 hover:text-green-600"
                                        }`}
                                >
                                    Energy Statistics
                                    {activeTab === "energy" && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"
                                            layoutId="activeTab"
                                        />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Profile Content */}
                        <div className="p-8">
                            {!isEditing ? (
                                <AnimatePresence mode="wait">
                                    {activeTab === "profile" && (
                                        <motion.div
                                            key="profile"
                                            variants={tabVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            className="space-y-8"
                                        >
                                            {/* Profile Info Section */}
                                            <section>
                                                <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                                                    <UserCheck className="mr-3 h-6 w-6 text-green-600" />
                                                    Profile Information
                                                </h2>
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                                                        <div className="flex items-start">
                                                            <div className="bg-white p-2 rounded-lg shadow-sm mr-4">
                                                                <UserCheck className="text-green-600 h-6 w-6" />
                                                            </div>
                                                            <div>
                                                                <h3 className="text-green-700 font-medium">User Type</h3>
                                                                <p className="text-xl mt-1 text-gray-800 font-semibold">
                                                                    {user?.user?.userType?.charAt(0).toUpperCase() + user?.user?.userType?.slice(1) || "Consumer"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                                                        <div className="flex items-start">
                                                            <div className="bg-white p-2 rounded-lg shadow-sm mr-4">
                                                                <Mail className="text-green-600 h-6 w-6" />
                                                            </div>
                                                            <div>
                                                                <h3 className="text-green-700 font-medium">Email</h3>
                                                                <p className="text-xl mt-1 text-gray-800 font-semibold">{user?.user?.email || "No email provided"}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                                                        <div className="flex items-start">
                                                            <div className="bg-white p-2 rounded-lg shadow-sm mr-4">
                                                                <MapPin className="text-green-600 h-6 w-6" />
                                                            </div>
                                                            <div>
                                                                <h3 className="text-green-700 font-medium">Location</h3>
                                                                <p className="text-xl mt-1 text-gray-800 font-semibold">{profile?.location || "Not specified"}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                                                        <div className="flex items-start">
                                                            <div className="bg-white p-2 rounded-lg shadow-sm mr-4">
                                                                <Zap className="text-green-600 h-6 w-6" />
                                                            </div>
                                                            <div>
                                                                <h3 className="text-green-700 font-medium">Energy Usage</h3>
                                                                <p className="text-xl mt-1 text-gray-800 font-semibold">{profile?.energyUsage || "0"} kWh/month</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                                                        <div className="flex items-start">
                                                            <div className="bg-white p-2 rounded-lg shadow-sm mr-4">
                                                                <SunIcon className="text-green-600 h-6 w-6" />
                                                            </div>
                                                            <div>
                                                                <h3 className="text-green-700 font-medium">Solar Panels</h3>
                                                                <div className="flex items-center mt-1">
                                                                    <span className={`inline-block w-3 h-3 rounded-full mr-2 ${profile?.hasSolarPanels ? "bg-green-500" : "bg-gray-300"}`}></span>
                                                                    <p className="text-xl text-gray-800 font-semibold">{profile?.hasSolarPanels ? "Yes" : "No"}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                                                        <div className="flex items-start">
                                                            <div className="bg-white p-2 rounded-lg shadow-sm mr-4">
                                                                <Calendar className="text-green-600 h-6 w-6" />
                                                            </div>
                                                            <div>
                                                                <h3 className="text-green-700 font-medium">Member Since</h3>
                                                                <p className="text-xl mt-1 text-gray-800 font-semibold">
                                                                    {user?.user?.createdAt
                                                                        ? new Date(user.user.createdAt).toLocaleDateString('en-US', {
                                                                            year: 'numeric',
                                                                            month: 'long',
                                                                            day: 'numeric'
                                                                        })
                                                                        : "Unknown"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </motion.div>
                                    )}

                                    {activeTab === "wallet" && (
                                        <motion.div
                                            key="wallet"
                                            variants={tabVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                        >
                                            {/* Wallet Section */}
                                            <section>
                                                <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                                                    <Wallet className="mr-3 h-6 w-6 text-green-600" />
                                                    Metamask Wallet
                                                </h2>
                                                <div className="bg-gradient-to-br from-white to-green-50 p-8 rounded-xl border border-green-100 shadow-sm">
                                                    {isWalletConnected ? (
                                                        <div className="space-y-6">
                                                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                                                <div className="bg-gradient-to-br from-orange-100 to-amber-100 p-4 rounded-xl shadow-sm">
                                                                    <Wallet className="h-12 w-12 text-orange-500" />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <h3 className="text-xl font-bold text-green-800 mb-1">Connected Wallet</h3>
                                                                    <div className="bg-white p-3 rounded-lg border border-green-100 shadow-inner">
                                                                        <p className="text-sm text-gray-600 font-mono break-all">{walletAddress}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                <a
                                                                    href={`https://amoy.polygonscan.com/address/${walletAddress}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                                                                >
                                                                    View on Polygonscan <ExternalLink className="h-4 w-4" />
                                                                </a>

                                                                <motion.button
                                                                    onClick={disconnectWallet}
                                                                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg flex items-center font-medium shadow-sm hover:bg-red-100 transition-colors"
                                                                    whileHover={{ scale: 1.02 }}
                                                                    whileTap={{ scale: 0.98 }}
                                                                >
                                                                    <X size={18} className="mr-2" />
                                                                    Disconnect Wallet
                                                                </motion.button>
                                                            </div>

                                                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-blue-800 text-sm">
                                                                <p className="flex items-start">
                                                                    <Shield className="h-5 w-5 mr-2 mt-0.5 text-blue-500" />
                                                                    Your wallet is securely connected to our platform. You can now participate in energy trading and transactions on the blockchain.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-6">
                                                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                                                <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-xl shadow-sm">
                                                                    <Wallet className="h-12 w-12 text-gray-400" />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <h3 className="text-xl font-bold text-gray-800 mb-2">No Wallet Connected</h3>
                                                                    <p className="text-gray-600">Connect your Metamask wallet to participate in energy trading on the blockchain.</p>
                                                                </div>
                                                            </div>

                                                            <motion.button
                                                                onClick={connectWallet}
                                                                disabled={isConnecting}
                                                                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-lg flex items-center justify-center font-medium shadow-md hover:shadow-lg transition-shadow"
                                                                whileHover={{ scale: 1.02, boxShadow: "0px 8px 20px rgba(255,150,0,0.2)" }}
                                                                whileTap={{ scale: 0.98 }}
                                                            >
                                                                {isConnecting ? (
                                                                    <>
                                                                        <Loader2 size={20} className="mr-2 animate-spin" />
                                                                        Connecting...
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Wallet size={20} className="mr-2" />
                                                                        Connect Metamask
                                                                    </>
                                                                )}
                                                            </motion.button>

                                                            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 text-amber-800 text-sm">
                                                                <p className="flex items-start">
                                                                    <Shield className="h-5 w-5 mr-2 mt-0.5 text-amber-500" />
                                                                    Connecting your wallet enables you to participate in energy trading, earn rewards, and manage your energy assets on the blockchain.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </section>
                                        </motion.div>
                                    )}

                                    {activeTab === "energy" && (
                                        <motion.div
                                            key="energy"
                                            variants={tabVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                        >
                                            {/* Energy Statistics Section */}
                                            <section>
                                                <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                                                    <Zap className="mr-3 h-6 w-6 text-green-600" />
                                                    Energy Statistics
                                                </h2>
                                                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-8 rounded-xl border border-yellow-100 shadow-sm">
                                                    <div className="text-center space-y-4">
                                                        <div className="inline-block bg-white p-4 rounded-full shadow-sm">
                                                            <Zap className="h-12 w-12 text-yellow-500" />
                                                        </div>
                                                        <h3 className="text-xl font-bold text-amber-800">Energy Statistics Coming Soon</h3>
                                                        <p className="text-amber-700 max-w-lg mx-auto">
                                                            We're working on bringing you detailed energy consumption analytics, production metrics, and trading history. Stay tuned for updates!
                                                        </p>

                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                                            <div className="bg-white rounded-lg p-4 shadow-sm border border-yellow-100">
                                                                <h4 className="font-medium text-yellow-800">Consumption</h4>
                                                                <p className="text-2xl font-bold text-gray-800 mt-2">{profile?.energyUsage || "0"} kWh</p>
                                                                <p className="text-xs text-gray-500 mt-1">Monthly average</p>
                                                            </div>

                                                            <div className="bg-white rounded-lg p-4 shadow-sm border border-yellow-100">
                                                                <h4 className="font-medium text-yellow-800">Production</h4>
                                                                <p className="text-2xl font-bold text-gray-800 mt-2">
                                                                    {profile?.hasSolarPanels ? "Active" : "Inactive"}
                                                                </p>
                                                                <p className="text-xs text-gray-500 mt-1">Solar panel status</p>
                                                            </div>

                                                            <div className="bg-white rounded-lg p-4 shadow-sm border border-yellow-100">
                                                                <h4 className="font-medium text-yellow-800">Transactions</h4>
                                                                <p className="text-2xl font-bold text-gray-800 mt-2">0</p>
                                                                <p className="text-xs text-gray-500 mt-1">Energy trades this month</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                                        <Edit className="mr-3 h-6 w-6 text-green-600" />
                                        Edit Profile
                                    </h2>

                                    <div className="space-y-5">
                                        <div className="bg-green-50/50 p-6 rounded-xl border border-green-100">
                                            <label htmlFor="email" className="block text-green-700 font-medium mb-2 flex items-center">
                                                <Mail className="h-4 w-4 mr-2" />
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none transition-all bg-white shadow-sm"
                                                placeholder="Enter your email"
                                            />
                                        </div>

                                        <div className="bg-green-50/50 p-6 rounded-xl border border-green-100">
                                            <label htmlFor="userType" className="block text-green-700 font-medium mb-2 flex items-center">
                                                <UserCheck className="h-4 w-4 mr-2" />
                                                User Type
                                            </label>
                                            <select
                                                id="userType"
                                                name="userType"
                                                value={formData.userType}
                                                onChange={handleChange}
                                                className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none transition-all bg-white shadow-sm"
                                            >
                                                <option value="consumer">Consumer</option>
                                                <option value="prosumer">Prosumer</option>
                                                <option value="utility">Utility</option>
                                            </select>
                                        </div>

                                        <div className="bg-green-50/50 p-6 rounded-xl border border-green-100">
                                            <label htmlFor="location" className="block text-green-700 font-medium mb-2 flex items-center">
                                                <MapPin className="h-4 w-4 mr-2" />
                                                Location
                                            </label>
                                            <input
                                                type="text"
                                                id="location"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none transition-all bg-white shadow-sm"
                                                placeholder="Enter your location"
                                            />
                                        </div>

                                        <div className="bg-green-50/50 p-6 rounded-xl border border-green-100">
                                            <label htmlFor="energyUsage" className="block text-green-700 font-medium mb-2 flex items-center">
                                                <Zap className="h-4 w-4 mr-2" />
                                                Energy Usage (kWh/month)
                                            </label>
                                            <input
                                                type="number"
                                                id="energyUsage"
                                                name="energyUsage"
                                                value={formData.energyUsage}
                                                onChange={handleChange}
                                                className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none transition-all bg-white shadow-sm"
                                                placeholder="0"
                                                min="0"
                                            />
                                        </div>

                                        <div className="bg-green-50/50 p-6 rounded-xl border border-green-100">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="hasSolarPanels"
                                                    name="hasSolarPanels"
                                                    checked={formData.hasSolarPanels}
                                                    onChange={handleChange}
                                                    className="h-5 w-5 text-green-600 focus:ring-green-500 border-green-300 rounded"
                                                />
                                                <label htmlFor="hasSolarPanels" className="ml-2 block text-green-700 font-medium flex items-center">
                                                    <SunIcon className="h-4 w-4 mr-2" />
                                                    I have solar panels installed
                                                </label>
                                            </div>
                                        </div>

                                        {/* Wallet Address (read-only in edit form) */}
                                        {walletAddress && (
                                            <div className="bg-green-50/50 p-6 rounded-xl border border-green-100">
                                                <label className="block text-green-700 font-medium mb-2 flex items-center">
                                                    <Wallet className="h-4 w-4 mr-2" />
                                                    Connected Wallet
                                                </label>
                                                <div className="flex items-center">
                                                    <input
                                                        type="text"
                                                        value={walletAddress}
                                                        readOnly
                                                        className="w-full p-3 border border-green-200 rounded-lg bg-gray-50 text-gray-500 font-mono text-sm"
                                                    />
                                                </div>
                                                <p className="text-xs text-gray-500 mt-2 flex items-center">
                                                    <Shield className="h-3 w-3 mr-1" />
                                                    To change your wallet, disconnect and connect a different wallet from the profile page.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 mt-8">
                                        <motion.button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium shadow-sm hover:bg-gray-50 transition-colors"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Cancel
                                        </motion.button>

                                        <motion.button
                                            type="submit"
                                            className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-medium flex items-center justify-center shadow-md shadow-green-200 hover:shadow-lg hover:shadow-green-200 transition-shadow"
                                            whileHover={{ scale: 1.02, boxShadow: "0px 8px 20px rgba(0,128,0,0.2)" }}
                                            whileTap={{ scale: 0.98 }}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="mr-2 h-5 w-5" />
                                                    Save Changes
                                                </>
                                            )}
                                        </motion.button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
};

export default Profile;