import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await login(email, password);

            navigate("/");

        } catch (error) {

            console.log(error);

        }
    };
    useEffect(() => {
        document.title = "Login - Pet Heaven";
    }, []);

    return (
        <div className="fade-in max-w-md mx-auto px-4 sm:px-6 py-16">
            <div className="bg-white rounded-2xl shadow-card shadow-xl p-8 sm:p-10 border border-gray-100">

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
                    <p className="text-gray-500 text-sm mt-1">Log in to your account</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">

                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg text-sm"
                            />
                        </div>

                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg text-sm"
                            />
                        </div>

                    </div>

                    <div className="flex justify-end mt-4 mb-6">
                        <Link to="/forgot-password" className="text-sm text-brand-700 hover:text-brand-800 font-medium">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-brand-700 hover:bg-brand-800 text-white font-semibold py-3 rounded-lg transition shadow-sm cursor-pointer"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-brand-700 font-semibold hover:underline">
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Login;