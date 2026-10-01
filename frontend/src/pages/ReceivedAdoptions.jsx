import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReceivedAdoptionRequests } from "../services/adoptionService";

function ReceivedAdoptions() {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();


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


    if (loading) {
        return <p>Loading adoption requests...</p>;
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
                            {request.pet.name}
                        </h2>

                        <p>
                            Applicant: {request.name}
                        </p>

                        <p>
                            Status: {request.status}
                        </p>

                        <p>
                            Submitted:{" "}
                            {new Date(
                                request.created_at
                            ).toLocaleDateString()}
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    `/received-adoptions/${request.id}`
                                )
                            }
                        >
                            View Request
                        </button>

                    </div>

                ))

            )}

        </div>
    );
}

export default ReceivedAdoptions;