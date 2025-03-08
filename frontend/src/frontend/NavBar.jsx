import { useState, useEffect, useContext, Fragment } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
    X,
    Menu,
    Leaf,
    BarChart3,
    LayoutDashboard,
    ShoppingBag,
    ChevronDown,
    LogOut,
    UserCircle,
    DollarSign,
    FileText,
} from "lucide-react"
import { AuthContext } from "../Context/AuthContext"
import { Menu as HeadlessMenu, Transition } from "@headlessui/react"
import { handlesuccess } from "../../utils"

const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    // Use the AuthContext instead of local state
    const { isAuthenticated, setIsAuthenticated, user } = useContext(AuthContext)

    // Check scroll position to change navbar style
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [location.pathname])

    // Handle logout directly in navbar when needed
    const handleLogout = () => {
        // Clear authentication token from storage
        localStorage.removeItem("authToken")
        sessionStorage.removeItem("authToken")

        // Remove auth cookie if it exists
        document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

        // Update authentication state
        setIsAuthenticated(false)
        handlesuccess("Logged out Successfully")
        // Redirect to home page after logout
        navigate("/")
    }

    // Navigation items with icons
    const navItems = [
        { name: "About", path: "/about", icon: <Leaf className="w-5 h-5" /> },
        { name: "Analytics", path: "/forecast", icon: <BarChart3 className="w-5 h-5" /> },
        ...(isAuthenticated
            ? [{ name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> }]
            : []),
        { name: "Marketplace", path: "/marketplace", icon: <ShoppingBag className="w-5 h-5" /> },
        { name: "Blog", path: "/blog", icon: <FileText className="w-5 h-5" /> },
        { name: "Pricing", path: "/pricing", icon: <DollarSign className="w-5 h-5" /> },
    ]


    return (
        <motion.nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? "bg-gradient-to-r from-green-800 to-green-700 text-white py-2 shadow-lg backdrop-blur-sm"
                    : "bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white py-3"
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo with animation */}
                <Link to="/" className="z-10">
                    <motion.div
                        className="flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <motion.div
                            className="w-10 h-10 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-md"
                            animate={{
                                rotate: [0, 5, 0, -5, 0],
                                boxShadow: ["0 4px 6px rgba(0,0,0,0.1)", "0 6px 8px rgba(0,0,0,0.2)", "0 4px 6px rgba(0,0,0,0.1)"],
                            }}
                            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        >
                            <span className="text-green-800 text-xl font-bold">⚡</span>
                        </motion.div>
                        <h1
                            className="text-3xl font-extrabold tracking-wide"
                            onClick={() => {
                                navigate("/")
                            }}
                        >
                            Eco<span className="text-yellow-300 drop-shadow-sm">Grid</span>
                        </h1>
                    </motion.div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-2">
                    <ul className="flex space-x-1">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <Link to={item.path}>
                                    <motion.div
                                        className={`px-4 py-2 rounded-lg text-base font-medium flex items-center gap-2 ${location.pathname === item.path
                                                ? "bg-green-800/70 text-white shadow-inner"
                                                : "text-white hover:bg-white/10"
                                            }`}
                                        whileHover={{
                                            scale: 1.05,
                                            backgroundColor: location.pathname === item.path ? "" : "rgba(255, 255, 255, 0.15)",
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {item.icon}
                                        {item.name}
                                    </motion.div>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Auth Buttons */}
                    <div className="ml-6 flex space-x-3">
                        {!isAuthenticated ? (
                            <>
                                <Link to="/login">
                                    <motion.button
                                        className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-green-900 font-bold rounded-lg shadow-md"
                                        whileHover={{
                                            scale: 1.05,
                                            y: -2,
                                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Login
                                    </motion.button>
                                </Link>
                                <Link to="/register">
                                    <motion.button
                                        className="px-5 py-2 bg-white/90 hover:bg-white text-green-700 font-bold rounded-lg shadow-md border border-green-100/20"
                                        whileHover={{
                                            scale: 1.05,
                                            y: -2,
                                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Register
                                    </motion.button>
                                </Link>
                            </>
                        ) : (
                            <HeadlessMenu as="div" className="relative">
                                <HeadlessMenu.Button className="flex items-center space-x-2 bg-green-800/60 hover:bg-green-800/80 px-4 py-2 rounded-lg transition-all duration-200 border border-green-700/50">
                                    <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold">
                                        {user?.user.name ? user.user.name.charAt(0).toUpperCase() : "G"}
                                    </div>
                                    <span className="text-white font-medium">{user?.user.name || "Guest"}</span>
                                    <ChevronDown size={16} className="text-white/70" />
                                </HeadlessMenu.Button>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <HeadlessMenu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 z-10 border border-gray-100">
                                        <div className="px-4 py-2 border-b border-gray-100">
                                            <p className="text-sm text-gray-500">Signed in as</p>
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {user?.user.email || "guest@example.com"}
                                            </p>
                                        </div>

                                        <HeadlessMenu.Item>
                                            {({ active }) => (
                                                <Link
                                                    to="/profile"
                                                    className={`${active ? "bg-gray-50" : ""
                                                        } flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700`}
                                                >
                                                    <UserCircle size={18} className="text-green-600" />
                                                    Profile
                                                </Link>
                                            )}
                                        </HeadlessMenu.Item>
                                        <HeadlessMenu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={handleLogout}
                                                    className={`${active ? "bg-gray-50" : ""
                                                        } flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600`}
                                                >
                                                    <LogOut size={18} />
                                                    Logout
                                                </button>
                                            )}
                                        </HeadlessMenu.Item>
                                    </HeadlessMenu.Items>
                                </Transition>
                            </HeadlessMenu>
                        )}
                    </div>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden flex items-center">
                    <motion.button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-green-800/30 rounded-lg"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="md:hidden overflow-hidden"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-4 pt-2 pb-5 bg-gradient-to-b from-green-700 to-green-800 shadow-inner">
                            <ul className="space-y-2 pt-2">
                                {navItems.map((item) => (
                                    <li key={item.name}>
                                        <Link to={item.path}>
                                            <motion.div
                                                className={`flex items-center gap-3 px-4 py-3 rounded-lg ${location.pathname === item.path ? "bg-green-600/50 text-white" : "text-white"
                                                    }`}
                                                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                {item.icon}
                                                {item.name}
                                            </motion.div>
                                        </Link>
                                    </li>
                                ))}

                                {/* Mobile Auth Buttons */}
                                <div className="mt-4 grid grid-cols-2 gap-3 pt-2 border-t border-green-600/50">
                                    {!isAuthenticated ? (
                                        <>
                                            <Link to="/login" className="col-span-1">
                                                <motion.div
                                                    className="py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-900 font-bold rounded-lg text-center shadow-md"
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Login
                                                </motion.div>
                                            </Link>
                                            <Link to="/register" className="col-span-1">
                                                <motion.div
                                                    className="py-3 bg-white text-green-700 font-bold rounded-lg text-center shadow-md"
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Register
                                                </motion.div>
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/profile" className="col-span-1">
                                                <motion.div
                                                    className="py-3 bg-green-600/50 text-white font-medium rounded-lg text-center flex items-center justify-center gap-2"
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <UserCircle size={18} />
                                                    Profile
                                                </motion.div>
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="col-span-1 py-3 bg-red-500/80 text-white font-medium rounded-lg text-center flex items-center justify-center gap-2"
                                            >
                                                <LogOut size={18} />
                                                Logout
                                            </button>
                                        </>
                                    )}
                                </div>
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

export default NavBar
