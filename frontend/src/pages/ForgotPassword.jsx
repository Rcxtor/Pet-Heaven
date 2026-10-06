import { useState,useEffect } from "react";
import { forgotPassword } from "../services/userService";
import { Link } from "react-router-dom";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            const data = await forgotPassword(email);

            setMessage(data.message);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        }
    };
    useEffect(() => {
        document.title = "Foeget Password - PetHeaven";
    }, []);
    return (
        <div className="fade-in max-w-md mx-auto px-4 sm:px-6 py-16">
            <div className="bg-white rounded-2xl shadow-xl shadow-card p-8 sm:p-10 border border-gray-100">

                <div className="text-center mb-8">
                    <div className="w-14 h-14 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-7 h-7 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Forgot Password?</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Enter your email and we'll send you a link to reset your password.
                    </p>
                </div>

                {message && (
                    <p className="mb-4 rounded-lg bg-brand-50 border border-brand-200 text-brand-800 text-sm px-4 py-3">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-brand-700 hover:bg-brand-800 text-white font-semibold py-3 rounded-lg mt-5 transition shadow-sm cursor-pointer"
                    >
                        Send Reset Link
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    <Link to="/login" className="text-brand-700 font-medium hover:underline">
                        ← Back to login
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default ForgotPassword;