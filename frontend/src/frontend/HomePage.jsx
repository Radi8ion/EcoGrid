import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
    ChevronRight,
    ChevronLeft,
    Sun,
    Wind,
    Zap,
    Home,
    BarChart3,
    Shield,
    ArrowRight,
    Twitter,
    Facebook,
    Instagram,
    Linkedin,
} from "lucide-react"
import NavBar from "./NavBar"

const LandingPage = () => {
    const [showCTA, setShowCTA] = useState(false)
    const [currentTestimonial, setCurrentTestimonial] = useState(0)
    const [isHovering, setIsHovering] = useState(Array(3).fill(false))
    const heroRef = useRef < HTMLDivElement > (null)

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    })

    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

    useEffect(() => {
        const timer = setTimeout(() => setShowCTA(true), 2000)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const testimonialInterval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
        }, 6000)
        return () => clearInterval(testimonialInterval)
    }, [])

    const testimonials = [
        {
            quote: "EcoGrid has reduced our energy costs by 35% while helping us go green.",
            author: "Sarah Johnson",
            title: "Community Solar Manager",
            avatar: "/placeholder.svg?height=60&width=60",
        },
        {
            quote: "The AI forecasting feature has revolutionized how we manage our microgrid.",
            author: "Michael Chen",
            title: "Energy Consultant",
            avatar: "/placeholder.svg?height=60&width=60",
        },
        {
            quote: "Seamless integration with our existing infrastructure. Worth every penny.",
            author: "Lisa Rodriguez",
            title: "Sustainability Director",
            avatar: "/placeholder.svg?height=60&width=60",
        },
    ]

    const features = [
        {
            title: "AI-Driven Forecasting",
            desc: "Predict energy demand efficiently using advanced neural networks and weather data.",
            icon: <BarChart3 className="w-8 h-8" />,
            color: "bg-purple-100 text-purple-600",
        },
        {
            title: "Blockchain-Based Trading",
            desc: "Enable secure P2P energy transactions with transparent ledger and smart contracts.",
            icon: <Shield className="w-8 h-8" />,
            color: "bg-blue-100 text-blue-600",
        },
        {
            title: "Smart Grid Optimization",
            desc: "Ensure optimal energy distribution with real-time monitoring and automated adjustments.",
            icon: <Zap className="w-8 h-8" />,
            color: "bg-green-100 text-green-600",
        },
    ]
    const handleHover = (index, isHovering) => {
        setIsHovering((prev) => {
            const newState = [...prev];
            newState[index] = isHovering;
            return newState;
        });
    }

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 text-gray-900 overflow-hidden relative">
            <NavBar />

            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Floating Leaves Animation */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-2xl"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{
                            opacity: [0, 0.7, 0.7, 0],
                            y: ["0vh", "25vh", "50vh", "100vh"],
                            x: i % 3 === 0 ? [0, 50, 0, -50] : i % 3 === 1 ? [0, -30, 30, 0] : [0, 20, -20, 40],
                            rotate: i % 2 === 0 ? 360 : -360,
                        }}
                        transition={{
                            duration: 8 + (i % 5) * 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            delay: i * 0.5,
                            times: [0, 0.2, 0.8, 1],
                        }}
                    >
                        {i % 4 === 0 ? "🍃" : i % 4 === 1 ? "🌱" : i % 4 === 2 ? "☘️" : "🌿"}
                    </motion.div>
                ))}

                {/* Enhanced Sun Rays Animation */}
                <div className="absolute top-20 right-20 z-0 opacity-70">
                    <motion.div
                        className="w-32 h-32 rounded-full bg-gradient-radial from-yellow-300 to-yellow-500"
                        animate={{
                            boxShadow: [
                                "0 0 30px 15px rgba(255, 236, 25, 0.3)",
                                "0 0 50px 25px rgba(255, 236, 25, 0.5)",
                                "0 0 30px 15px rgba(255, 236, 25, 0.3)",
                            ],
                        }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-gradient-to-b from-yellow-300 to-yellow-400 w-2 h-20 origin-bottom rounded-full"
                            style={{
                                top: "-20px",
                                left: "15px",
                                transformOrigin: "bottom center",
                                transform: `rotate(${i * 30}deg) translateY(-40px)`,
                            }}
                            animate={{
                                height: ["80px", "100px", "80px"],
                                opacity: [0.5, 0.8, 0.5],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.2,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Hero Section */}
            <motion.header
                ref={heroRef}
                className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
                style={{ opacity: heroOpacity, scale: heroScale }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-green-600/90 to-green-800/90 z-0" />

                <motion.div
                    className="relative z-10 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <motion.div
                        className="mb-6 inline-block"
                        animate={{
                            y: [0, -10, 0],
                            rotate: [0, 5, 0, -5, 0],
                        }}
                        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                        <div className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                            <Zap className="w-12 h-12 text-white" />
                        </div>
                    </motion.div>

                    <motion.h1
                        className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight"
                        animate={{
                            textShadow: [
                                "0 0 8px rgba(255,255,255,0.3)",
                                "0 0 16px rgba(255,255,255,0.6)",
                                "0 0 8px rgba(255,255,255,0.3)",
                            ],
                        }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-100 to-white">EcoGrid</span>
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-green-50 font-light max-w-2xl mx-auto mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        Revolutionizing renewable energy with smart grid technology for a sustainable future
                    </motion.p>

                    <AnimatePresence>
                        {showCTA && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center"
                            >
                                <motion.button
                                    className="px-8 py-4 bg-white text-green-700 rounded-full font-semibold text-lg shadow-lg flex items-center justify-center gap-2 group"
                                    whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255,255,255,0.4)" }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Get Started
                                    <motion.span
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                                    >
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </motion.span>
                                </motion.button>

                                <motion.button
                                    className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Learn More
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                    <motion.div
                        className="w-10 h-10 rounded-full border-2 border-white/50 flex items-center justify-center"
                        whileHover={{ scale: 1.2, borderColor: "rgba(255,255,255,0.8)" }}
                    >
                        <ChevronRight className="w-6 h-6 text-white/70 rotate-90" />
                    </motion.div>
                </motion.div>
            </motion.header>

            {/* Animated Energy Stats Counter */}
            <motion.section
                className="py-20 relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { value: "150+", label: "Communities Powered", icon: <Home className="w-6 h-6" /> },
                            { value: "30%", label: "Average Cost Reduction", icon: <BarChart3 className="w-6 h-6" /> },
                            { value: "45K", label: "Tons of CO₂ Saved", icon: <Wind className="w-6 h-6" /> },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-xl shadow-xl p-8 text-center transform hover:-translate-y-2 transition-transform duration-300"
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                    {stat.icon}
                                </div>
                                <h3 className="text-4xl font-bold text-green-700 mb-2">
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ duration: 1.5, delay: 0.5 }}
                                        viewport={{ once: true }}
                                    >
                                        {stat.value}
                                    </motion.span>
                                </h3>
                                <p className="text-gray-600">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* How EcoGrid Works */}
            <section className="py-20 bg-white relative z-10">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How EcoGrid Works</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our innovative platform connects renewable energy sources to consumers through smart technology
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {[
                            {
                                title: "Energy Production",
                                desc: "Solar, wind, and other renewable sources generate clean energy",
                                icon: <Sun className="w-10 h-10" />,
                                color: "bg-blue-50",
                                iconColor: "text-blue-500",
                            },
                            {
                                title: "AI Processing",
                                desc: "Smart algorithms optimize distribution and predict demand patterns",
                                icon: <BarChart3 className="w-10 h-10" />,
                                color: "bg-purple-50",
                                iconColor: "text-purple-500",
                            },
                            {
                                title: "Efficient Distribution",
                                desc: "Optimized delivery to homes and businesses when needed most",
                                icon: <Home className="w-10 h-10" />,
                                color: "bg-green-50",
                                iconColor: "text-green-500",
                            },
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                className="flex flex-col items-center text-center"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.3 }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                <motion.div
                                    className={`w-24 h-24 ${step.color} rounded-full flex items-center justify-center mb-6 relative`}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <motion.div
                                        className={`${step.iconColor}`}
                                        animate={index === 0 ? { rotate: 360 } : index === 1 ? { scale: [1, 1.2, 1] } : { y: [0, -5, 0] }}
                                        transition={{
                                            duration: index === 0 ? 20 : 2,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "linear",
                                        }}
                                    >
                                        {step.icon}
                                    </motion.div>

                                    <motion.div
                                        className="absolute inset-0 rounded-full border-4 border-dashed border-opacity-50"
                                        style={{ borderColor: index === 0 ? "#3b82f6" : index === 1 ? "#8b5cf6" : "#10b981" }}
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                    />
                                </motion.div>

                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-gray-600">{step.desc}</p>
                            </motion.div>
                        ))}

                        {/* Connection Lines */}
                        <div className="hidden md:block absolute top-1/3 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-blue-300 via-purple-300 to-green-300">
                            <motion.div
                                className="absolute top-0 left-0 h-full w-1/6 bg-white"
                                animate={{ x: ["0%", "500%", "0%"] }}
                                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Animated Solar Panels */}
            <section className="py-20 bg-gradient-to-b from-green-50 to-white relative z-10 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="order-2 lg:order-1"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Sustainable Energy for Everyone</h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Our platform makes renewable energy accessible, affordable, and efficient for communities of all sizes.
                                With EcoGrid, you can reduce your carbon footprint while saving on energy costs.
                            </p>

                            <ul className="space-y-4">
                                {[
                                    "Reduce energy costs by up to 35%",
                                    "Minimize environmental impact",
                                    "Support local renewable energy initiatives",
                                    "Gain real-time insights into energy usage",
                                ].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        className="flex items-start gap-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="mt-1 bg-green-100 rounded-full p-1 text-green-600">
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                        <span className="text-gray-700">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            <motion.button
                                className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Learn More About Our Impact
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </motion.div>

                        <motion.div
                            className="relative order-1 lg:order-2 h-80"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {/* Solar Panel Array */}
                            <div className="relative w-full h-full flex items-center justify-center">
                                {/* Sun */}
                                <motion.div
                                    className="absolute top-0 right-1/4 w-20 h-20 bg-gradient-radial from-yellow-300 to-yellow-500 rounded-full"
                                    animate={{
                                        boxShadow: [
                                            "0 0 20px 10px rgba(255, 236, 25, 0.4)",
                                            "0 0 40px 20px rgba(255, 236, 25, 0.6)",
                                            "0 0 20px 10px rgba(255, 236, 25, 0.4)",
                                        ],
                                    }}
                                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                                />

                                {/* Sun Rays */}
                                <motion.div
                                    className="absolute top-10 right-1/4 w-4 h-60 bg-yellow-200 opacity-20 rounded-full"
                                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                                    style={{ transformOrigin: "top center", transform: "rotate(20deg)" }}
                                />

                                {/* Solar Panel Group */}
                                <div className="relative">
                                    {[...Array(3)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute"
                                            style={{
                                                left: `${i * 120}px`,
                                                top: `${i * 10}px`,
                                                zIndex: 3 - i,
                                            }}
                                            initial={{ rotateX: 20 }}
                                            animate={{ rotateX: [20, 30, 20] }}
                                            transition={{
                                                duration: 8,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: "easeInOut",
                                                delay: i * 0.5,
                                            }}
                                        >
                                            {/* Panel Base */}
                                            <div className="w-4 h-20 bg-gray-700 rounded-sm mx-auto" />

                                            {/* Panel Mount */}
                                            <div className="w-80 h-4 bg-gray-800 -mt-1 rounded-sm" />

                                            {/* Solar Panel */}
                                            <div className="w-80 h-48 bg-blue-900 rounded-sm grid grid-cols-6 grid-rows-4 gap-0.5 p-1">
                                                {[...Array(24)].map((_, cellIndex) => (
                                                    <motion.div
                                                        key={cellIndex}
                                                        className="bg-blue-600"
                                                        animate={{
                                                            backgroundColor: ["#2563eb", "#60a5fa", "#2563eb"],
                                                        }}
                                                        transition={{
                                                            duration: 3,
                                                            delay: i * 0.2 + cellIndex * 0.05,
                                                            repeat: Number.POSITIVE_INFINITY,
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Ground */}
                                <div className="absolute bottom-0 w-full h-10 bg-gradient-to-r from-green-700 to-green-900 rounded-lg" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="py-20 bg-gradient-to-b from-white to-green-50 relative z-10">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Cutting-edge technology that makes energy management smarter and more sustainable
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                viewport={{ once: true, margin: "-100px" }}
                                whileHover={{
                                    y: -10,
                                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                }}
                                onHoverStart={() => handleHover(index, true)}
                                onHoverEnd={() => handleHover(index, false)}
                            >
                                <div className="h-2 bg-gradient-to-r from-green-400 to-green-600" />
                                <div className="p-8">
                                    <div className={`w-16 h-16 ${feature.color} rounded-lg flex items-center justify-center mb-6`}>
                                        <motion.div
                                            animate={
                                                isHovering[index] ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : { scale: 1, rotate: 0 }
                                            }
                                            transition={{ duration: 0.5 }}
                                        >
                                            {feature.icon}
                                        </motion.div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.desc}</p>

                                    <motion.div
                                        className="mt-6 flex items-center text-green-600 font-medium"
                                        animate={isHovering[index] ? { x: 5 } : { x: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <span>Learn more</span>
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-green-700 text-white relative z-10">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
                        <p className="text-xl text-green-100 max-w-3xl mx-auto">
                            Hear from organizations that have transformed their energy management with EcoGrid
                        </p>
                    </motion.div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="relative h-80 overflow-hidden">
                            <AnimatePresence mode="wait">
                                {testimonials.map(
                                    (testimonial, index) =>
                                        currentTestimonial === index && (
                                            <motion.div
                                                key={index}
                                                className="absolute w-full bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg"
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <div className="flex flex-col md:flex-row gap-6 items-center">
                                                    <div className="shrink-0">
                                                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-green-300">
                                                            <img
                                                                src={testimonial.avatar || "/placeholder.svg"}
                                                                alt={testimonial.author}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-xl italic mb-6">"{testimonial.quote}"</p>
                                                        <div>
                                                            <h4 className="font-bold text-lg">{testimonial.author}</h4>
                                                            <p className="text-green-200">{testimonial.title}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ),
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="flex justify-between items-center mt-8">
                            <motion.button
                                onClick={prevTestimonial}
                                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </motion.button>

                            <div className="flex space-x-2">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`w-3 h-3 rounded-full transition-colors ${currentTestimonial === index ? "bg-white" : "bg-white/30"
                                            }`}
                                        onClick={() => setCurrentTestimonial(index)}
                                    />
                                ))}
                            </div>

                            <motion.button
                                onClick={nextTestimonial}
                                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <ChevronRight className="w-6 h-6" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Footer */}
            <motion.footer
                className="py-20 bg-gradient-to-b from-green-800 to-green-900 text-white relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us in Building a Sustainable Future</h2>
                            <p className="text-xl text-green-100 mb-8">
                                Together, we can make a difference in energy sustainability while reducing costs and environmental
                                impact.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <motion.button
                                    className="px-8 py-4 bg-white text-green-900 rounded-lg font-semibold text-lg shadow-lg flex items-center justify-center gap-2 group"
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: "0px 0px 20px rgba(255,255,255,0.3)",
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Get Started
                                    <motion.span
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                                    >
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </motion.span>
                                </motion.button>

                                <motion.button
                                    className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Contact Sales
                                </motion.button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        >
                            <div>
                                <h3 className="text-xl font-bold mb-4">Resources</h3>
                                <ul className="space-y-3">
                                    {["Documentation", "Case Studies", "Blog", "Support"].map((item, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: i * 0.1 }}
                                            viewport={{ once: true }}
                                        >
                                            <a href="#" className="text-green-100 hover:text-white transition-colors">
                                                {item}
                                            </a>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4">Company</h3>
                                <ul className="space-y-3">
                                    {["About Us", "Careers", "Partners", "Contact"].map((item, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: i * 0.1 }}
                                            viewport={{ once: true }}
                                        >
                                            <a href="#" className="text-green-100 hover:text-white transition-colors">
                                                {item}
                                            </a>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-green-600">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="mb-6 md:mb-0">
                                <div className="flex items-center">
                                    <Zap className="w-6 h-6 mr-2" />
                                    <span className="text-2xl font-bold">EcoGrid</span>
                                </div>
                                <p className="mt-2 text-green-200">&copy; {new Date().getFullYear()} EcoGrid. All Rights Reserved.</p>
                            </div>

                            <div className="flex space-x-6">
                                {[
                                    { icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
                                    { icon: <Facebook className="w-5 h-5" />, label: "Facebook" },
                                    { icon: <Instagram className="w-5 h-5" />, label: "Instagram" },
                                    { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
                                ].map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href="#"
                                        className="text-green-200 hover:text-white transition-colors"
                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                        whileTap={{ scale: 0.9 }}
                                        aria-label={social.label}
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.footer>
        </div>
    )
}

export default LandingPage
