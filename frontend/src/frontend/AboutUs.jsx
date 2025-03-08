import { motion } from 'framer-motion';
import NavBar from './NavBar';

export default function AboutUs() {
    return (
        <>
            <NavBar />
            <div className="font-sans bg-gradient-to-b from-white to-green-50 min-h-screen">
                <nav className="bg-white shadow-md">
                    {/* Add your navigation content here */}
                </nav>

                {/* Hero Section */}
                <header className="relative overflow-hidden bg-gradient-to-r from-green-900 to-green-800 text-white">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center mix-blend-overlay"></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10">
                        <div className="absolute top-0 right-0 w-full h-full opacity-10">
                            {/* Abstract grid pattern */}
                            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                                </pattern>
                                <rect width="100" height="100" fill="url(#grid)" />
                            </svg>
                        </div>

                        <div className="max-w-3xl">
                            <div className="inline-block px-4 py-1 rounded-full bg-green-700 bg-opacity-50 text-sm font-medium mb-6">
                                Pioneering Sustainable Energy
                            </div>

                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                                About <span className="text-green-300">EcoGrid</span>
                            </h1>

                            <p className="mt-6 text-xl md:text-2xl text-green-100 max-w-2xl leading-relaxed">
                                Empowering communities with decentralized, sustainable energy solutions that connect people and protect our planet.
                            </p>

                            <div className="mt-10">
                                <a
                                    href="#mission"
                                    className="flex items-center gap-2 text-green-300 hover:text-white transition-colors duration-300"
                                >
                                    <span>Discover our story</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-50 to-transparent"></div>
                </header>

                {/* Mission & Approach Section */}
                <section id="mission" className="max-w-7xl mx-auto py-20 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-white p-10 rounded-2xl shadow-xl border-l-8 border-green-500 hover:shadow-2xl transition-all duration-500 group">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-green-100 rounded-xl text-green-700 group-hover:bg-green-700 group-hover:text-white transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-green-900">Our Mission</h2>
                            </div>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                EcoGrid is committed to reshaping the future of energy by introducing decentralized smart grids, optimizing renewable energy consumption, and ensuring long-term sustainability for generations to come.
                            </p>
                            <p className="mt-4 text-gray-700 text-lg leading-relaxed">
                                We believe that access to clean, affordable energy is a fundamental right, and we're working to make that a reality for communities worldwide.
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-2xl shadow-xl border-l-8 border-green-500 hover:shadow-2xl transition-all duration-500 group">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-green-100 rounded-xl text-green-700 group-hover:bg-green-700 group-hover:text-white transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-green-900">Our Approach</h2>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-gray-700 text-lg">
                                    <span className="text-green-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M9 11 12 14 22 4" /></svg>
                                    </span>
                                    <span>AI-Driven Demand Forecasting</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-700 text-lg">
                                    <span className="text-green-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                    </span>
                                    <span>Blockchain-Based P2P Energy Trading</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-700 text-lg">
                                    <span className="text-green-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                                    </span>
                                    <span>Smart Grid Optimization</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-700 text-lg">
                                    <span className="text-green-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" /></svg>
                                    </span>
                                    <span>Scalable & Adaptable Solutions</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-700 text-lg">
                                    <span className="text-green-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                    </span>
                                    <span>Community-Centered Development</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="bg-green-900 py-16 text-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                            Our Impact <span className="text-green-300">in Numbers</span>
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div className="p-6 rounded-xl bg-green-800 bg-opacity-50">
                                <div className="text-4xl md:text-5xl font-bold text-green-300 mb-2">50+</div>
                                <div className="text-sm md:text-base text-green-100">Communities Served</div>
                            </div>
                            <div className="p-6 rounded-xl bg-green-800 bg-opacity-50">
                                <div className="text-4xl md:text-5xl font-bold text-green-300 mb-2">30%</div>
                                <div className="text-sm md:text-base text-green-100">Average Energy Savings</div>
                            </div>
                            <div className="p-6 rounded-xl bg-green-800 bg-opacity-50">
                                <div className="text-4xl md:text-5xl font-bold text-green-300 mb-2">15K</div>
                                <div className="text-sm md:text-base text-green-100">Tons of CO₂ Reduced</div>
                            </div>
                            <div className="p-6 rounded-xl bg-green-800 bg-opacity-50">
                                <div className="text-4xl md:text-5xl font-bold text-green-300 mb-2">24/7</div>
                                <div className="text-sm md:text-base text-green-100">Grid Monitoring</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-4">
                                Our Advantages
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-green-900">
                                Why Choose <span className="text-green-600">EcoGrid</span>?
                            </h2>
                            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                                We combine cutting-edge technology with environmental responsibility to deliver energy solutions that work for people and the planet.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <div className="p-4 bg-green-100 rounded-xl text-green-700 inline-block mb-6 group-hover:bg-green-700 group-hover:text-white transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                                </div>
                                <h3 className="text-2xl font-semibold text-green-900 mb-3">Efficiency</h3>
                                <p className="text-gray-600">Our smart grid technology optimizes energy distribution, reducing waste and lowering costs.</p>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <div className="p-4 bg-green-100 rounded-xl text-green-700 inline-block mb-6 group-hover:bg-green-700 group-hover:text-white transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                </div>
                                <h3 className="text-2xl font-semibold text-green-900 mb-3">Security</h3>
                                <p className="text-gray-600">Blockchain technology ensures secure, transparent transactions between energy producers and consumers.</p>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <div className="p-4 bg-green-100 rounded-xl text-green-700 inline-block mb-6 group-hover:bg-green-700 group-hover:text-white transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" /></svg>
                                </div>
                                <h3 className="text-2xl font-semibold text-green-900 mb-3">Scalability</h3>
                                <p className="text-gray-600">Our solutions grow with your community, from small neighborhoods to entire cities.</p>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <div className="p-4 bg-green-100 rounded-xl text-green-700 inline-block mb-6 group-hover:bg-green-700 group-hover:text-white transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M9 11 12 14 22 4" /></svg>
                                </div>
                                <h3 className="text-2xl font-semibold text-green-900 mb-3">Innovation</h3>
                                <p className="text-gray-600">Continuous research and development keeps our technology at the cutting edge of the energy sector.</p>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <div className="p-4 bg-green-100 rounded-xl text-green-700 inline-block mb-6 group-hover:bg-green-700 group-hover:text-white transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>
                                </div>
                                <h3 className="text-2xl font-semibold text-green-900 mb-3">Sustainability</h3>
                                <p className="text-gray-600">Every aspect of our operation is designed with environmental impact in mind.</p>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <div className="p-4 bg-green-100 rounded-xl text-green-700 inline-block mb-6 group-hover:bg-green-700 group-hover:text-white transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                </div>
                                <h3 className="text-2xl font-semibold text-green-900 mb-3">Community</h3>
                                <p className="text-gray-600">We build solutions that strengthen communities and promote energy independence.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="bg-green-50 py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-4">
                                Our People
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-green-900">
                                Meet the <span className="text-green-600">Team</span>
                            </h2>
                            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                                Passionate experts dedicated to revolutionizing the energy sector with sustainable solutions.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src="/placeholder.svg?height=400&width=400"
                                        alt="Alex Morgan"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-green-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-green-900">Alex Morgan</h3>
                                    <p className="text-green-600">Founder & CEO</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src="/placeholder.svg?height=400&width=400"
                                        alt="Jamie Chen"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-green-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-green-900">Jamie Chen</h3>
                                    <p className="text-green-600">CTO</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src="/placeholder.svg?height=400&width=400"
                                        alt="Sam Rodriguez"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-green-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-green-900">Sam Rodriguez</h3>
                                    <p className="text-green-600">Head of Research</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src="/placeholder.svg?height=400&width=400"
                                        alt="Taylor Kim"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-green-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-green-900">Taylor Kim</h3>
                                    <p className="text-green-600">Community Director</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Timeline Section */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-4">
                                Our Journey
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-green-900">
                                The <span className="text-green-600">EcoGrid</span> Story
                            </h2>
                            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                                From concept to reality, our path to revolutionizing energy distribution.
                            </p>
                        </div>

                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-200"></div>

                            <div className="space-y-12">
                                <div className="relative flex items-center flex-row-reverse">
                                    <div className="flex-1"></div>
                                    <div className="z-10 flex items-center justify-center w-12 h-12 bg-green-600 rounded-full shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                    </div>
                                    <div className="flex-1 p-6 bg-white rounded-xl shadow-lg text-right mr-6">
                                        <div className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-2">
                                            2018
                                        </div>
                                        <h3 className="text-xl font-semibold text-green-900 mb-2">The Beginning</h3>
                                        <p className="text-gray-600">EcoGrid was founded with a vision to democratize energy distribution.</p>
                                    </div>
                                </div>

                                <div className="relative flex items-center flex-row">
                                    <div className="flex-1"></div>
                                    <div className="z-10 flex items-center justify-center w-12 h-12 bg-green-600 rounded-full shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                    </div>
                                    <div className="flex-1 p-6 bg-white rounded-xl shadow-lg ml-6">
                                        <div className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-2">
                                            2019
                                        </div>
                                        <h3 className="text-xl font-semibold text-green-900 mb-2">First Prototype</h3>
                                        <p className="text-gray-600">Developed and tested our first smart grid prototype in a small community.</p>
                                    </div>
                                </div>

                                <div className="relative flex items-center flex-row-reverse">
                                    <div className="flex-1"></div>
                                    <div className="z-10 flex items-center justify-center w-12 h-12 bg-green-600 rounded-full shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                    </div>
                                    <div className="flex-1 p-6 bg-white rounded-xl shadow-lg text-right mr-6">
                                        <div className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-2">
                                            2020
                                        </div>
                                        <h3 className="text-xl font-semibold text-green-900 mb-2">Blockchain Integration</h3>
                                        <p className="text-gray-600">Integrated blockchain technology for secure peer-to-peer energy trading.</p>
                                    </div>
                                </div>

                                <div className="relative flex items-center flex-row">
                                    <div className="flex-1"></div>
                                    <div className="z-10 flex items-center justify-center w-12 h-12 bg-green-600 rounded-full shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                    </div>
                                    <div className="flex-1 p-6 bg-white rounded-xl shadow-lg ml-6">
                                        <div className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-2">
                                            2022
                                        </div>
                                        <h3 className="text-xl font-semibold text-green-900 mb-2">Global Expansion</h3>
                                        <p className="text-gray-600">Expanded operations to 10 countries across 3 continents.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action Footer */}
                <footer className="bg-gradient-to-r from-green-900 to-green-800 text-white py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl font-bold leading-tight">
                                    Join Us in Building a <span className="text-green-300">Sustainable Future</span>
                                </h2>
                                <p className="mt-4 text-lg text-green-100 max-w-lg">
                                    Together, we can transform how energy is produced, distributed, and consumed. Let's create a cleaner, more equitable world for generations to come.
                                </p>
                                <button className="mt-8 bg-white text-green-900 px-8 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-green-100 transition duration-300 flex items-center gap-2 group">
                                    <span>Get Started</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </button>
                            </div>

                            <div className="relative h-64 lg:h-auto rounded-xl overflow-hidden">
                                <img
                                    src="/placeholder.svg?height=600&width=800"
                                    alt="Sustainable energy"
                                    className="w-full h-full object-cover rounded-xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-green-900 to-transparent opacity-60"></div>
                                <div className="absolute bottom-0 left-0 p-6">
                                    <div className="text-2xl font-bold">100% Renewable</div>
                                    <div className="text-green-300">Our commitment to the planet</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 pt-8 border-t border-green-700 text-center text-green-300">
                            <p>© {new Date().getFullYear()} EcoGrid. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>

        </>
    );
}