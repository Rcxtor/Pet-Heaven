import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";

function Navbar() {

    const { user, logout } = useAuth();
    const location = useLocation();   
    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/pets", label: "Browse Pets" },
        { path: "/add-pet", label: "Post Pet" },
    ];


    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        // <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        //     <div className="max-w-5xl mx-auto px-4">
        //         <div className="flex justify-between h-16">
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* LOGO LEFT */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <img src={logo} alt="Pet Heaven Logo" className="h-8 w-8 object-contain" />
                            <h1 className="text-xl font-bold text-brand-700"><span className="text-dark">Pet</span>Heaven</h1>
                        </Link>
                    </div>

                    {/* Middle Part */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`relative text-sm font-medium transition-colors
                                    after:absolute after:left-0 after:-bottom-1 after:h-0.5
                                    after:bg-brand-600 after:transition-all after:duration-[250ms]
                                    ${
                                        location.pathname === link.path
                                            ? "text-brand-700 after:w-full"
                                            : "text-gray-600 hover:text-brand-700 after:w-0 hover:after:w-full"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Part */}
                    <div className="hidden md:flex items-center gap-5">
                        {user ? (
                            <>
                            {/* <Link to="/favorites" className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition" >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </Link> */}
                            <span className="hidden lg:block text-sm text-brand-600">
                                Welcome, <span className="font-bold text-brand-600">{user.name.split(" ")[0].charAt(0).toUpperCase() + user.name.split(" ")[0].slice(1)}</span>
                            </span>
                            <div className="relative" ref={dropdownRef}>
                                <button onClick={() => setOpen(!open)} className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-sm hover:ring-2 hover:ring-brand-200 transition cursor-pointer">
                                    {user.name.charAt(0).toUpperCase()}
                                </button>

                                {open && (
                                    <div className="absolute right-0 top-12 w-48 bg-white rounded-xl border border-gray-100 shadow-lg py-2 z-50">
                                        <Link to="/dashboard" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            Dashboard
                                        </Link>
                                        <Link to="/my-pets" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            My Pets
                                        </Link>
                                        <Link to="/adoption-requests" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            Adoption Requests
                                        </Link>
                                        <Link to="/profile" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            Edit Profile
                                        </Link>
                                        <hr className="my-1 border-gray-100" />
                                        <button
                                            onClick={() => {
                                                setOpen(false);
                                                logout();
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                                            >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                            
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-brand-700">
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-brand-700 hover:bg-brand-800 text-white text-sm font-semibold px-5 py-2 rounded-lg transition shadow-sm hover:shadow-md"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;