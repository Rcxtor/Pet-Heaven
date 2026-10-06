import { useEffect } from "react";
import { Link } from "react-router-dom";

function NotFound() {
    useEffect(() => {
        document.title = "Page Not Found - PetHeaven";
    }, []);

    return (
        <div className="fade-in max-w-6xl mx-auto px-4 sm:px-6 py-20">
            <div className="flex flex-col items-center text-center">
                <div className="text-7xl mb-6">🐾</div>

                <h1 className="text-6xl font-extrabold text-brand-700">404</h1>

                <h2 className="text-2xl font-bold text-gray-900 mt-4">
                    Page not found
                </h2>

                <p className="text-gray-600 leading-relaxed mt-3 max-w-md">
                    Looks like this page wandered off. It may have been moved,
                    or the link might be wrong.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <Link
                        to="/"
                        className="bg-brand-700 hover:bg-brand-800 text-white font-semibold px-8 py-3 rounded-lg transition shadow-md hover:shadow-lg"
                    >
                        Go Home
                    </Link>
                    <Link
                        to="/pets"
                        className="border-2 border-gray-200 hover:border-brand-700 text-gray-700 hover:text-brand-700 font-semibold px-8 py-3 rounded-lg transition"
                    >
                        Browse Pets
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;