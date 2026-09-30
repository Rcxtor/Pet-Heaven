import { useEffect, useState } from "react";
import { getReceivedAdoptionRequests,approveAdoptionRequest, declineAdoptionRequest } from "../services/adoptionService";

function ReceivedAdoptions() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
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

    const handleApprove = async (id) => {
        try {
            await approveAdoptionRequest(id);

            alert("Adoption request approved.");

            loadRequests();
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to approve adoption request."
            );
        }
    };

    const handleDecline = async (id) => {
        try {
            await declineAdoptionRequest(id);

            alert("Adoption request declined.");

            loadRequests();
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to decline adoption request."
            );
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Received Adoption Requests</h1>

            {requests.length === 0 ? (
                <p>No adoption requests received.</p>
            ) : (
                requests.map((request) => (
                    <div key={request.id}>

                        <h2>
                            Pet: {request.pet.name}
                        </h2>

                        <p>
                            Location: {request.pet.location}
                        </p>

                        <h3>Applicant</h3>

                        <p>
                            Name: {request.name}
                        </p>

                        <p>
                            Email: {request.email}
                        </p>

                        <p>
                            Phone: {request.phone}
                        </p>

                        <p>
                            Address: {request.address}
                        </p>

                        <p>
                            Pet Experience: {request.exp}
                        </p>

                        <p>
                            Reason: {request.reason}
                        </p>

                        <p>
                            Status: {request.status}
                        </p>
<br />
                        {request.status === "Pending" && (
                            <div>
                                <button
                                    type="button"
                                    onClick={() => handleApprove(request.id)}
                                >
                                    Approve
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleDecline(request.id)}
                                >
                                    Decline
                                </button>
                            </div>
                        )}
<br />
                        <p>
                            Adoption ID: {request.id}
                        </p>

                        <p>
                            Submitted:{" "}
                            {new Date(
                                request.created_at
                            ).toLocaleDateString()}
                        </p>

                    </div>
                ))
            )}
        </div>
    );
}

export default ReceivedAdoptions;