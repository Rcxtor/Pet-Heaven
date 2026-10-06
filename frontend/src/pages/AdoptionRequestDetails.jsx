import { useEffect, useState } from "react";
import Loading from "../components/Loading"
import { getReceivedAdoptionRequest, selectAdoptionRequest, declineAdoptionRequest, cancelAdoptionSelection,completeAdoption,} from "../services/adoptionService";
import BackButton from "../components/BackButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getImageUrl } from "../utils/imageUrl";

function AdoptionRequestDetails() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadRequest();
    }, [id]);


    const loadRequest = async () => {

        try {
            const data = await getReceivedAdoptionRequest(id);
            setRequest(data.adoption_request);
        } catch (error) {
            console.error(error);
            setError("Failed to load adoption request.");
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
    if (!request) {
        return <p>Adoption request not found.</p>;
    }

    return (

        <div className="fade-in max-w-4xl mx-auto px-4 sm:px-6 py-10">

            <BackButton to="/received-adoptions" label="Back to Requests" />

            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Adoption Request</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Review the applicant and decide what happens next
                    </p>
                </div>
                <span
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                        request.status === "Selected"
                            ? "bg-green-100 text-green-700"
                            : request.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : request.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                    }`}
                >
                    {request.status}
                </span>
            </div>

            <div className="space-y-6">

                {/* Pet + Applicant */}
                <div className="grid md:grid-cols-2 gap-6">

                    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-soft">
                        <div className="flex items-center gap-3 mb-4">
                            {request.pet.images && request.pet.images.length > 0 ? (
                                <img
                                    src={getImageUrl(request.pet.images[0].image_path)}
                                    alt={request.pet.name}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-100" />
                            )}
                            <h2 className="font-bold text-gray-900">Pet Information</h2>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div>
                                <p className="text-xs text-gray-400">Name</p>
                                <p className="font-medium text-gray-800">{request.pet.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Location</p>
                                <p className="font-medium text-gray-800">{request.pet.location}</p>
                            </div>
                        </div>

                        <Link
                            to={`/pet/${request.pet.id}`}
                            className="inline-block text-sm text-brand-700 font-medium mt-4 hover:underline"
                        >
                            View pet details →
                        </Link>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-soft">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold">
                                {request.user.name.charAt(0).toUpperCase()}
                            </div>
                            <h2 className="font-bold text-gray-900">Applicant</h2>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div>
                                <p className="text-xs text-gray-400">Name</p>
                                <p className="font-medium text-gray-800">{request.user.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Location</p>
                                <p className="font-medium text-gray-800">{request.user.city}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Pet experience</p>
                                <p className="font-medium text-gray-800 capitalize">{request.exp}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reason */}
                <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-soft">
                    <h2 className="font-bold text-gray-900 mb-3">Why they want to adopt</h2>
                    <p className="text-gray-600 leading-relaxed text-sm">{request.reason}</p>
                </div>

                {/* Contact (only when selected) */}
                {request.status === "Selected" && (
                    <div className="bg-brand-50 rounded-xl border border-brand-200 p-6">
                        <h2 className="font-bold text-brand-800 mb-3">Applicant Contact</h2>
                        <div className="space-y-1 text-sm text-gray-700">
                            <p><span className="text-gray-500">Email:</span> {request.user.email}</p>
                            <p><span className="text-gray-500">Phone:</span> {request.user.phone}</p>
                        </div>
                    </div>
                )}

                {/* Actions */}
                {(request.status === "Pending" || request.status === "Selected") && (
                    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-soft">
                        <h2 className="font-bold text-gray-900 mb-4">Actions</h2>

                        {request.status === "Pending" && (
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    type="button"
                                    className="bg-brand-700 hover:bg-brand-800 text-white font-semibold px-6 py-3 rounded-lg transition shadow-sm cursor-pointer"
                                    onClick={async () => {
                                        try {
                                            await selectAdoptionRequest(request.id);
                                            await loadRequest();
                                        } catch (error) {
                                            alert(error.response?.data?.message || "Failed to select applicant.");
                                        }
                                    }}
                                >
                                    Select Applicant
                                </button>

                                <button
                                    type="button"
                                    className="border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-semibold px-6 py-3 rounded-lg transition cursor-pointer"
                                    onClick={async () => {
                                        try {
                                            await declineAdoptionRequest(request.id);
                                            await loadRequest();
                                        } catch (error) {
                                            alert(error.response?.data?.message || "Failed to decline request.");
                                        }
                                    }}
                                >
                                    Decline
                                </button>
                            </div>
                        )}

                        {request.status === "Selected" && (
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    type="button"
                                    className="bg-brand-700 hover:bg-brand-800 text-white font-semibold px-6 py-3 rounded-lg transition shadow-sm cursor-pointer"
                                    onClick={async () => {
                                        const confirmed = window.confirm(
                                            "Are you sure the adoption has been completed?"
                                        );
                                        if (!confirmed) {
                                            return;
                                        }
                                        try {
                                            await completeAdoption(request.id);
                                            await loadRequest();
                                        } catch (error) {
                                            alert(error.response?.data?.message || "Failed to complete adoption.");
                                        }
                                    }}
                                >
                                    Complete Adoption
                                </button>

                                <button
                                    type="button"
                                    className="border-2 border-gray-200 hover:border-brand-700 text-gray-700 hover:text-brand-700 font-semibold px-6 py-3 rounded-lg transition cursor-pointer"
                                    onClick={async () => {
                                        try {
                                            await cancelAdoptionSelection(request.id);
                                            await loadRequest();
                                        } catch (error) {
                                            alert(error.response?.data?.message || "Failed to cancel selection.");
                                        }
                                    }}
                                >
                                    Cancel Selection
                                </button>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}


export default AdoptionRequestDetails;