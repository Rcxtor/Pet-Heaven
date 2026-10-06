import { useState,useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (password !== passwordConfirmation) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/reset-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        token,
                        email,
                        password,
                        password_confirmation: passwordConfirmation,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw data;
            }

            setMessage(data.message);

            setPassword("");
            setPasswordConfirmation("");

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {
            setError(
                error.message || "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
            document.title = "Reset Password - PetHeaven";
        }, []);
    return (
        <div className="fade-in max-w-md mx-auto px-4 sm:px-6 py-16">
            <div className="bg-white rounded-2xl shadow-card shadow-xl p-8 sm:p-10 border border-gray-100">

                <div className="text-center mb-8">
                    <div className="w-14 h-14 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-7 h-7 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Reset Your Password</h1>
                    <p className="text-gray-500 text-sm mt-1">Enter your new password below.</p>
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
                    <div className="space-y-4">

                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <input
                                type="password"
                                placeholder="New password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg text-sm"
                            />
                        </div>

                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <input
                                type="password"
                                placeholder="Confirm password"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                required
                                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg text-sm"
                            />
                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-700 hover:bg-brand-800 text-white font-semibold py-3 rounded-lg mt-6 transition shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;