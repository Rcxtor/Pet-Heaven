import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdoptionHistory } from "../services/adoptionService";
import Loading from "./Loading";
import { getImageUrl } from "../utils/imageUrl";

function RehomedPets() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getAdoptionHistory("rehomed");
            setHistory(data.history);
        } catch (error) {
            console.error(error);
            setError("Failed to load rehomed pets.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="py-10">
                <p className="text-center text-red-500">
                    {error}
                </p>
            </div>
        );
    }

    if (history.length === 0) {
        return (
            <p className="text-center py-16 text-gray-400 text-lg">
                You haven't rehomed any pets yet.
            </p>
        );
    }

    return (
        <div className="space-y-4">
            {history.map((item) => (
                <div
                    key={item.id}
                    className="bg-white rounded-xl border shadow-lg border-gray-100 p-5 shadow-soft hover:shadow-card transition"
                >
                    {/* Pet Information */}
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Link
                                to={`/pet/${item.pet.id}`}
                                className="shrink-0"
                            >
                                {item.pet.images?.length > 0 ? (
                                    <img
                                        src={getImageUrl(
                                            item.pet.images[0].image_path
                                        )}
                                        alt={item.pet.name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                                        No image
                                    </div>
                                )}
                            </Link>

                            <div>
                                <p className="font-bold text-gray-900">
                                    {item.pet.name}
                                </p>

                                <p className="text-sm text-gray-500 mt-0.5">
                                    {item.pet.species}
                                    {item.pet.breed
                                        ? ` · ${item.pet.breed}`
                                        : ""}
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                    Rehomed on{" "}
                                    {new Date(
                                        item.adoption_date
                                    ).toLocaleDateString()}
                                </p>

                                <Link
                                    to={`/pet/${item.pet.id}`}
                                    className="inline-block text-xs text-brand-700 font-medium mt-2 hover:underline"
                                >
                                    View pet details →
                                </Link>
                            </div>
                        </div>

                        <span className="text-xs font-semibold px-3 py-1.5 rounded-full shrink-0 bg-green-100 text-green-700">
                            Completed
                        </span>
                    </div>

                    {/* New Owner */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-sm font-semibold text-gray-900 mb-2">
                            Adopted by
                        </p>

                        <div className="bg-brand-50 rounded-lg p-4 space-y-1 text-sm text-gray-700">
                            <p>
                                <span className="text-gray-500">
                                    Name:
                                </span>{" "}
                                {item.adopter?.name}
                            </p>

                            <p>
                                <span className="text-gray-500">
                                    Email:
                                </span>{" "}
                                {item.adopter?.email}
                            </p>

                            <p>
                                <span className="text-gray-500">
                                    Phone:
                                </span>{" "}
                                {item.adopter?.phone ||
                                    "Not available"}
                            </p>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                        <Link
                            to={`/adoption-history/${item.id}`}
                            className="text-sm font-semibold text-brand-700 hover:underline"
                        >
                            View adoption details →
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RehomedPets;

