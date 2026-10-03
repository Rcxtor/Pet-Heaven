import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getReceivedAdoptionRequest, selectAdoptionRequest, declineAdoptionRequest, cancelAdoptionSelection,completeAdoption,} from "../services/adoptionService";

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
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    if (!request) {
        return <p>Adoption request not found.</p>;
    }

    return (

        <div>
            <button type="button" onClick={() => navigate("/received-adoptions")}> ← Back </button>

            <h1> Adoption Request </h1>

            <h2>Pet Information</h2>

            <p>Pet Name: {request.pet.name}</p>
            <p>Pet Location: {request.pet.location}</p>
            <p>Current Pet Status: {request.status} </p>


            <h2>Applicant</h2>

            <p>Name: {request.user.name}</p>
            <p>Location: {request.user.city}</p>
            <p>Pet Experience: {request.exp}</p>
            <p>Reason: {request.reason}</p>


            {request.status === "Selected" && (
                <div>
                    <h2>Applicant Contact </h2>

                    <p>Email: {request.user.email}</p>
                    <p>Phone: {request.user.phone}</p>
                </div>

            )}

            <h2> Actions </h2>

            {request.status === "Pending" && (
                <div>
                    <button type="button"onClick={async () => {
                            try {
                                await selectAdoptionRequest(
                                    request.id
                                );
                                await loadRequest();
                            } catch (error) {
                                alert(
                                    error.response?.data?.message ||
                                    "Failed to select applicant."
                                );
                            }
                        }}>
                        Select Applicant
                    </button>


                    <button type="button" onClick={async () => {
                            try {
                                await declineAdoptionRequest(
                                    request.id
                                );
                                await loadRequest();
                            } catch (error) {
                                alert(
                                    error.response?.data?.message ||
                                    "Failed to decline request."
                                );
                            }
                        }}>
                        Decline
                    </button>
                </div>
            )}


            {request.status === "Selected" && (
                <div> 
                    <button type="button" onClick={async () => {
                            try {
                                await cancelAdoptionSelection(
                                    request.id
                                );
                                await loadRequest();
                            } catch (error) {
                                alert(
                                    error.response?.data?.message ||
                                    "Failed to cancel selection."
                                );
                            }
                        }}>
                        Cancel Selection
                    </button>


                    <button type="button" onClick={async () => {
                            const confirmed = window.confirm(
                                "Are you sure the adoption has been completed?"
                            );
                            if (!confirmed) {
                                return;
                            }
                            try {
                                await completeAdoption(
                                    request.id
                                );
                                await loadRequest();
                            } catch (error) {

                                alert(
                                    error.response?.data?.message ||
                                    "Failed to complete adoption."
                                );
                            }
                        }}>
                        Complete Adoption
                    </button>
                </div>
            )}
        </div>
    );
}


export default AdoptionRequestDetails;