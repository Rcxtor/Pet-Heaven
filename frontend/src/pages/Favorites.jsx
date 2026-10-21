import { useEffect, useState } from "react";
import { getFavorites } from "../services/petService";
import PetCard from "../components/PetCard";
import Loading from "../components/Loading";
import BackButton from "../components/BackButton";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Favorites() {
    const { token, loading: authLoading } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "Favorites - PetHeaven";
        if (authLoading) return;
        
        if (!token) {
            setFavorites([]);
            setLoading(false);
            return;
        }

        let cancelled = false;

        const fetchFavorites = async () => {
            setLoading(true);
            setError("");

            try {
                const data = await getFavorites();
                console.log("Favorites API response:", data);

                if (!cancelled) {
                    // The API returns favorite records, each containing a pet.
                    setFavorites(data.map((favorite) => favorite.pet).filter(Boolean));
                }
            } catch (err) {
                console.error("Failed to load favorites:", err);

                if (!cancelled) {
                    setError(
                        err.response?.data?.message ||
                        "Failed to load your favorite pets. Please try again."
                    );
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchFavorites();

        return () => {
            cancelled = true;
        };
    }, [token, authLoading]);

    if (authLoading || loading) {
        return <Loading />;
    }

    if (!token) {
        return (
            <div className="fade-in max-w-md mx-auto px-4 sm:px-6 py-16">
                <div className="bg-white rounded-2xl shadow-card p-8 sm:p-10 border border-gray-100 text-center">
                    <div className="w-14 h-14 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-7 h-7 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">My Favorite Pets</h1>
                    <p className="text-gray-500 text-sm mt-1 mb-6">
                        Please log in to view your favorite pets.
                    </p>
                    <Link
                        to="/login"
                        className="block w-full bg-brand-700 hover:bg-brand-800 text-white font-semibold py-3 rounded-lg transition shadow-sm"
                    >
                        Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="fade-in max-w-6xl mx-auto px-4 sm:px-6 py-10">

            <BackButton to="/pets" label="Back to Browse" />

            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Favorite Pets</h1>
                <p className="text-gray-500 mt-1">Pets you have saved for later</p>
            </div>

            {error ? (
                <p className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
                    {error}
                </p>
            ) : favorites.length === 0 ? (
                <div className="text-center py-16">
                    <div className="w-14 h-14 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-7 h-7 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <p className="text-gray-400 text-lg mb-6">
                        You haven't added any pets to your favorites yet.
                    </p>
                    <Link
                        to="/pets"
                        className="inline-block bg-brand-700 hover:bg-brand-800 text-white font-semibold px-8 py-3 rounded-lg transition shadow-sm"
                    >
                        Browse Pets
                    </Link>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((pet) => (
                        <PetCard key={pet.id} pet={pet} />
                    ))}
                </div>
            )}
        </div>
    );
}