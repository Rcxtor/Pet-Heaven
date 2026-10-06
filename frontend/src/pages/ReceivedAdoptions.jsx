import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReceivedAdoptionRequests } from "../services/adoptionService";
import Loading from "../components/Loading";
import BackButton from "../components/BackButton";

function ReceivedAdoptions({ embedded = false }) {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Received Request - PetHeaven";
        loadRequests();
    }, []);

    const loadRequests = async () => {
        try {
            const data = await getReceivedAdoptionRequests();
            setRequests(data.adoption_requests);
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

    return (
        <div className="fade-in max-w-4xl mx-auto px-4 sm:px-6 py-10">
            {!embedded && (
                <>
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Received Adoption Requests</h1>
                        <p className="text-gray-500 text-sm mt-1">People who want to adopt your pets</p>
                    </div>
                    <BackButton to={`/dashboard`}/>
                </>
            )}
            {requests.length === 0 ? (
                <p className="text-center py-16 text-gray-400 text-lg">
                    No adoption requests received.
                </p>
            ) : (
                <div className="space-y-4">
                    {requests.map((request) => (
                        <div
                            key={request.id}
                            className="bg-white rounded-xl border shadow-md border-gray-100 p-5 shadow-soft hover:shadow-card transition flex items-center justify-between gap-4"
                        >
                            <div className="flex items-center gap-4">
                                {/* Applicant avatar */}
                                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold shrink-0">
                                    {request.user.name.charAt(0).toUpperCase()}
                                </div>

                                <div>
                                    <p className="font-bold text-gray-900">
                                        {request.user.name}
                                        <span className="font-normal text-gray-500"> wants to adopt </span>
                                        {request.pet.name}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Submitted on {new Date(request.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="text-right shrink-0">
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
                                <button
                                    type="button"
                                    onClick={() => navigate(`/received-adoptions/${request.id}`)}
                                    className="block ml-auto text-xs text-brand-700 font-medium mt-2 hover:underline cursor-pointer"
                                >
                                    View request →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ReceivedAdoptions;