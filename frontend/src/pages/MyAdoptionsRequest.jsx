import { useEffect, useState } from "react";
import { getMyAdoptionRequests, cancelAdoptionRequest } from "../services/adoptionService";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/imageUrl";
import BackButton from "../components/BackButton";

function MyAdoptions({ embedded = false }) {
    const [adoptions, setAdoptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "Request Send - PetHeaven";
        loadAdoptions();
    }, []);

    const loadAdoptions = async () => {
        try {
            const data = await getMyAdoptionRequests();

            setAdoptions(data.adoption_requests);
        } catch (error) {
            console.error(error);
            setError("Failed to load adoption requests.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const handleDelete = async (id) => {
        try {
            await cancelAdoptionRequest(id);

            setAdoptions(
                adoptions.filter((adoption) => adoption.id !== id)
            );

            alert("Adoption request deleted successfully.");
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to delete adoption request."
            );
        }
    };

    return (
        <div className="fade-in max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {!embedded && (
            <>
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">My Adoption Requests</h1>
                    <p className="text-gray-500 text-sm mt-1">Track the requests you've sent</p>
                </div>
                <BackButton/>
                </>
            )}
            {adoptions.length === 0 ? (
                <p className="text-center py-16 text-gray-400 text-lg">
                    You haven't submitted any adoption requests yet.
                </p>
            ) : (
                <div className="space-y-4">
                    {adoptions.map((adoption) => (
                        <div key={adoption.id} className="bg-white rounded-xl border shadow-lg border-gray-100 p-5 shadow-soft hover:shadow-card transition">
                            {/* Top row */}
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    {/* Circle pet image */}
                                    <Link to={`/pet/${adoption.pet.id}`} className="shrink-0">
                                        {adoption.pet.images?.length > 0 ? (
                                            <img
                                                src={getImageUrl(adoption.pet.images[0].image_path)}
                                                alt={adoption.pet.name}
                                                className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                                                No image
                                            </div>
                                        )}
                                    </Link>

                                    <div>
                                        <p className="font-bold text-gray-900">{adoption.pet.name}</p>
                                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {adoption.pet.location}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Submitted on {new Date(adoption.created_at).toLocaleDateString()} · ID #{adoption.id}
                                        </p>
                                        <Link
                                            to={`/pet/${adoption.pet.id}`}
                                            className="inline-block text-xs text-brand-700 font-medium mt-2 hover:underline"
                                        >
                                            View pet details →
                                        </Link>
                                    </div>
                                </div>

                                <span
                                    className={`text-xs font-semibold px-3 py-1.5 rounded-full shrink-0 ${
                                        adoption.status === "Selected"
                                            ? "bg-green-100 text-green-700"
                                            : adoption.status === "Pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : adoption.status === "Completed"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-600"
                                    }`}
                                >
                                    {adoption.status}
                                </span>
                            </div>

                            {/* Owner contact (only when selected) */}
                            {adoption.status === "Selected" && (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">Owner contact</p>
                                    <div className="bg-brand-50 rounded-lg p-4 space-y-1 text-sm text-gray-700">
                                        <p><span className="text-gray-500">Name:</span> {adoption.pet.user.name}</p>
                                        <p><span className="text-gray-500">Phone:</span> {adoption.pet.user.phone}</p>
                                        <p><span className="text-gray-500">Email:</span> {adoption.pet.user.email}</p>
                                    </div>
                                </div>
                            )}

                            {/* Delete (only when pending) */}
                            {adoption.status === "Pending" && (
                                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(adoption.id)}
                                        className="border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 text-sm font-semibold px-4 py-2 rounded-lg transition cursor-pointer"
                                    >
                                        Delete Request
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyAdoptions;