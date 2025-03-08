"use client"

import { useState, useEffect, useContext } from "react"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import {
    BatteryChargingIcon,
    ZapIcon,
    ShoppingCartIcon,
    WalletIcon,
    EditIcon,
    TrendingUpIcon,
    BarChart3Icon,
    UserIcon,
    MapPinIcon,
    StarIcon,
    SunIcon,
    WindIcon,
} from "lucide-react"
import NavBar from "./NavBar"
import { AuthContext } from "../Context/AuthContext"

const Dashboard = () => {
    const [currentTime, setCurrentTime] = useState(new Date())
    const [energyData, setEnergyData] = useState([
        { timestamp: "14:57:00", "Energy Produced": 40, "Energy Consumed": 20 },
        { timestamp: "14:58:00", "Energy Produced": 35, "Energy Consumed": 25 },
        { timestamp: "14:59:00", "Energy Produced": 50, "Energy Consumed": 30 },
        { timestamp: "15:00:00", "Energy Produced": 45, "Energy Consumed": 35 },
        { timestamp: "15:01:00", "Energy Produced": 55, "Energy Consumed": 40 },
        { timestamp: "15:02:00", "Energy Produced": 38, "Energy Consumed": 28 },
    ])
    const { user } = useContext(AuthContext)
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    // Add random data point every 10 seconds
    useEffect(() => {
        const dataTimer = setInterval(() => {
            const lastTimestamp = energyData[energyData.length - 1].timestamp
            const [hours, minutes, seconds] = lastTimestamp.split(":").map(Number)

            let newSeconds = seconds + 10
            let newMinutes = minutes
            let newHours = hours

            if (newSeconds >= 60) {
                newSeconds = newSeconds % 60
                newMinutes += 1
            }

            if (newMinutes >= 60) {
                newMinutes = newMinutes % 60
                newHours += 1
            }

            if (newHours >= 24) {
                newHours = newHours % 24
            }

            const newTimestamp = `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}:${String(newSeconds).padStart(2, "0")}`

            const newProduced = Math.floor(Math.random() * 20) + 35
            const newConsumed = Math.floor(Math.random() * 15) + 20

            setEnergyData((prev) => {
                const newData = [
                    ...prev,
                    {
                        timestamp: newTimestamp,
                        "Energy Produced": newProduced,
                        "Energy Consumed": newConsumed,
                    },
                ]

                // Keep only the last 10 data points
                if (newData.length > 10) {
                    return newData.slice(newData.length - 10)
                }
                return newData
            })
        }, 10000)

        return () => clearInterval(dataTimer)
    }, [energyData])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    }

    return (
        <>
            <NavBar />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-100 min-h-screen p-4 md:p-6 font-sans pt-24 mt-20"
            >
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-between items-center mb-8 bg-white rounded-xl p-5 shadow-lg border border-emerald-100"
                >
                    <div className="flex items-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="bg-emerald-100 p-2 rounded-full mr-3"
                        >
                            <img src="/placeholder.svg?height=40&width=40" alt="Ecogrid Logo" className="w-10 h-10 rounded-full" />
                        </motion.div>
                        <div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                                EcoGrid
                            </span>
                            <p className="text-xs text-gray-500">Sustainable Energy Network</p>
                        </div>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center bg-emerald-50 px-4 py-2 rounded-lg shadow-sm"
                    >
                        <div className="mr-3 text-right">
                            <span className="text-sm text-gray-700 block">Welcome back,</span>
                            <span className="font-semibold text-emerald-700">{user?.user.name || demo_user}</span>
                        </div>
                        <div className="relative">
                            <img
                                src="/placeholder.svg?height=40&width=40"
                                alt="Profile"
                                className="w-10 h-10 rounded-full border-2 border-emerald-300"
                            />
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-4 gap-6"
                >
                    {/* Power Backup Settings */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow border border-emerald-100"
                    >
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="font-bold text-lg text-emerald-800 flex items-center">
                                <BatteryChargingIcon className="mr-2 text-emerald-600" size={20} />
                                Power Backup
                            </h2>
                            <motion.button
                                whileHover={{ scale: 1.1, backgroundColor: "#f0fdf4" }}
                                whileTap={{ scale: 0.9 }}
                                className="text-emerald-600 p-2 rounded-full hover:bg-emerald-50"
                            >
                                <EditIcon size={18} />
                            </motion.button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                {
                                    icon: <BatteryChargingIcon className="text-emerald-500" size={18} />,
                                    value: "1200 kWh",
                                    label: "Capacity",
                                    bgColor: "bg-emerald-50",
                                },
                                {
                                    icon: <ZapIcon className="text-amber-500" size={18} />,
                                    value: "530 kWh",
                                    label: "Sold",
                                    bgColor: "bg-amber-50",
                                },
                                {
                                    icon: <ShoppingCartIcon className="text-blue-500" size={18} />,
                                    value: "30 kWh",
                                    label: "Purchased",
                                    bgColor: "bg-blue-50",
                                },
                                {
                                    icon: <WalletIcon className="text-purple-500" size={18} />,
                                    value: "1000",
                                    label: "Wallet",
                                    bgColor: "bg-purple-50",
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={`flex items-center p-3 rounded-lg ${item.bgColor}`}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                >
                                    <div className="mr-3 p-2 rounded-full bg-white shadow-sm">{item.icon}</div>
                                    <div>
                                        <p className="font-bold text-gray-800">{item.value}</p>
                                        <p className="text-xs text-gray-500">{item.label}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Live Smart Meter Data */}
                    <motion.div
                        variants={itemVariants}
                        className="col-span-1 md:col-span-3 bg-white rounded-xl p-5 shadow-lg border border-emerald-100"
                    >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5">
                            <h2 className="font-bold text-lg text-emerald-800 flex items-center mb-2 sm:mb-0">
                                <BarChart3Icon className="mr-2 text-emerald-600" size={20} />
                                Live Smart Meter Data
                            </h2>
                            <div className="flex items-center">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                    }}
                                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                    className="w-3 h-3 rounded-full bg-emerald-500 mr-2"
                                ></motion.div>
                                <span className="text-sm text-gray-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                                    Live Updates: 10s
                                </span>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={energyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="timestamp" tick={{ fill: "#4b5563", fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} />
                                <YAxis tick={{ fill: "#4b5563", fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} unit=" kWh" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#ffffff",
                                        borderColor: "#10b981",
                                        borderRadius: "8px",
                                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                    }}
                                    labelStyle={{ fontWeight: "bold", color: "#065f46" }}
                                    formatter={(value) => `${value} kWh`} // Add unit to tooltip values
                                />

                                <Legend verticalAlign="top" height={36} wrapperStyle={{ paddingTop: "10px" }} />
                                <Line
                                    type="monotone"
                                    dataKey="Energy Produced"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4, stroke: "#ffffff" }}
                                    activeDot={{ r: 6, stroke: "#ffffff", strokeWidth: 2 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="Energy Consumed"
                                    stroke="#8b5cf6"
                                    strokeWidth={3}
                                    dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4, stroke: "#ffffff" }}
                                    activeDot={{ r: 6, stroke: "#ffffff", strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                        <div className="flex justify-center mt-4 space-x-6">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                                <span className="text-sm text-gray-600">Production</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                                <span className="text-sm text-gray-600">Consumption</span>
                            </div>
                            <div className="flex items-center">
                                <TrendingUpIcon size={16} className="text-emerald-600 mr-1" />
                                <span className="text-sm font-medium text-emerald-600">+15% Production</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Set Your Selling Price */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow border border-emerald-100"
                    >
                        <h2 className="font-bold text-lg text-emerald-800 flex items-center mb-5">
                            <ZapIcon className="mr-2 text-emerald-600" size={20} />
                            Energy Pricing
                        </h2>
                        <div className="space-y-5">
                            <motion.div
                                whileFocus={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="bg-emerald-50 p-4 rounded-lg"
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">Energy Token Value (NOK)</label>
                                <div className="relative">
                                    <input
                                        type="range"
                                        className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                        defaultValue={1.5}
                                        min={1}
                                        max={2}
                                        step={0.1}
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>1.0</span>
                                        <span>1.5</span>
                                        <span>2.0</span>
                                    </div>
                                </div>
                                <div className="text-center mt-2">
                                    <span className="text-lg font-bold text-emerald-700">1.5 NOK</span>
                                </div>
                            </motion.div>

                            <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price (tokens / kWh)</label>
                                <div className="flex mt-1">
                                    <input
                                        type="number"
                                        className="block w-full border border-emerald-200 rounded-l-lg px-3 py-2 focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 focus:outline-none"
                                        defaultValue={2}
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-emerald-600 text-white px-4 py-2 rounded-r-lg hover:bg-emerald-700 transition-colors font-medium"
                                    >
                                        Set Price
                                    </motion.button>
                                </div>
                            </motion.div>

                            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg">
                                <div className="text-sm space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Market Average:</span>
                                        <span className="font-medium">2 tokens/kWh</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Your Price:</span>
                                        <motion.span
                                            animate={{
                                                color: ["#047857", "#10b981", "#047857"],
                                            }}
                                            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                                            className="font-bold"
                                        >
                                            2 tokens/kWh
                                        </motion.span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Comparison:</span>
                                        <span className="font-medium text-emerald-600">+20% ↑</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* User Details */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow border border-emerald-100"
                    >
                        <h2 className="font-bold text-lg text-emerald-800 flex items-center mb-5">
                            <UserIcon className="mr-2 text-emerald-600" size={20} />
                            User Profile
                        </h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <motion.div whileHover={{ x: 5 }} className="flex items-center p-3 rounded-lg bg-emerald-50">
                                    <div className="p-2 bg-white rounded-full shadow-sm mr-3">
                                        <BarChart3Icon size={16} className="text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Smart Meter ID</p>
                                        <p className="font-medium">1234</p>
                                    </div>
                                </motion.div>

                                <motion.div whileHover={{ x: 5 }} className="flex items-center p-3 rounded-lg bg-blue-50">
                                    <div className="p-2 bg-white rounded-full shadow-sm mr-3">
                                        <MapPinIcon size={16} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Address</p>
                                        <p className="font-medium">4a Visalen, Hinna</p>
                                    </div>
                                </motion.div>

                                <motion.div whileHover={{ x: 5 }} className="flex items-center p-3 rounded-lg bg-amber-50">
                                    <div className="p-2 bg-white rounded-full shadow-sm mr-3">
                                        <StarIcon size={16} className="text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Rating</p>
                                        <div className="flex items-center">
                                            <p className="font-medium mr-2">3.5</p>
                                            <div className="flex">
                                                {[1, 2, 3].map((i) => (
                                                    <StarIcon key={i} size={12} className="text-amber-500 fill-amber-500" />
                                                ))}
                                                <StarIcon
                                                    size={12}
                                                    className="text-amber-500 fill-amber-500"
                                                    style={{ clipPath: "inset(0 50% 0 0)" }}
                                                />
                                                <StarIcon size={12} className="text-gray-300" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div whileHover={{ x: 5 }} className="flex items-center p-3 rounded-lg bg-purple-50">
                                    <div className="p-2 bg-white rounded-full shadow-sm mr-3 flex">
                                        <SunIcon size={16} className="text-amber-500" />
                                        <WindIcon size={16} className="text-blue-500 -ml-1" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Energy Source(s)</p>
                                        <p className="font-medium">Solar + Wind</p>
                                    </div>
                                </motion.div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <h3 className="font-semibold text-emerald-800 mb-3">Trade Statistics</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className="bg-gradient-to-br from-emerald-50 to-teal-50 p-3 rounded-lg text-center"
                                    >
                                        <p className="text-xs text-gray-600 mb-1">Your Buyers</p>
                                        <p className="font-bold text-2xl text-emerald-700">5</p>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-lg text-center"
                                    >
                                        <p className="text-xs text-gray-600 mb-1">Your Sellers</p>
                                        <p className="font-bold text-2xl text-indigo-700">2</p>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Footer Section */}
                <motion.footer
                    className="bg-gradient-to-r from-emerald-800 to-teal-700 text-white py-8 mt-10 rounded-xl shadow-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="text-center md:text-left mb-6 md:mb-0">
                                <h3 className="text-2xl font-bold">EcoGrid Dashboard</h3>
                                <p className="text-sm text-emerald-200 mt-2 max-w-md">
                                    Powering a Sustainable Future, One Grid at a Time. Join our community of energy producers and
                                    consumers.
                                </p>
                            </div>

                            <motion.div
                                className="flex space-x-6"
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                {[
                                    { icon: "📱", label: "Twitter" },
                                    { icon: "👥", label: "Facebook" },
                                    { icon: "📸", label: "Instagram" },
                                    { icon: "💼", label: "LinkedIn" },
                                ].map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href="#"
                                        className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition duration-300"
                                        whileHover={{ scale: 1.2, rotate: 10 }}
                                    >
                                        <span className="text-xl" aria-label={social.label}>
                                            {social.icon}
                                        </span>
                                    </motion.a>
                                ))}
                            </motion.div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-emerald-700/50 text-center">
                            <p className="text-sm text-emerald-300">&copy; 2025 EcoGrid. All Rights Reserved.</p>
                        </div>
                    </div>
                </motion.footer>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-xs text-gray-500 text-right mt-4 bg-white/50 inline-block ml-auto px-3 py-1 rounded-full"
                >
                    Last Updated: {currentTime.toLocaleString()}
                </motion.div>
            </motion.div>
        </>
    )
}

export default Dashboard
