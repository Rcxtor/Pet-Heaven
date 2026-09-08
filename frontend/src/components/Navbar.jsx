import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { user, logout } = useAuth();
    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/pets", label: "Browse Pets" },
        { path: "/addPet", label: "Post Pet" },
    ];


    return (
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* LOGO LEFT */}
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold text-indigo-600">
                            Pet Heaven
                        </Link>
                    </div>

                    {/* Right Part */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                <span>
                                    Welcome, {user.name}
                                </span>

                                <button className="cursor-pointer " onClick={logout}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    Login
                                </Link>

                                <Link to="/register">
                                    Register
                                </Link>
                            </>
                        )}
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    location.pathname === link.path
                                        ? "bg-indigo-50 text-indigo-600"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;