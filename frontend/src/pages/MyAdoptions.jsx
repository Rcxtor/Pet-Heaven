import { useEffect, useState } from "react";
import { getMyAdoptionRequests, cancelAdoptionRequest } from "../services/adoptionService";

function MyAdoptions() {
    const [adoptions, setAdoptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
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
        return <p>Loading...</p>;
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
        <div>
            <h1>My Adoption Requests</h1>

            {adoptions.length === 0 ? (
                <p>You haven't submitted any adoption requests yet.</p>
            ) : (
                adoptions.map((adoption) => (
                    <div key={adoption.id}>
                        <h2>{adoption.pet.name}</h2>
                        <h2>{adoption.pet.location}</h2>

                        <p>
                            Status: {adoption.status}
                        </p>
                        <p>
                            Adoption ID: {adoption.id}
                        </p>

                        <p>
                            Submitted:{" "}
                            {new Date(
                                adoption.created_at
                            ).toLocaleDateString()}
                        </p>
                            
                        {adoption.status === 'Pending' && (<button type="button" onClick={() => handleDelete(adoption.id)}>
                                                                Delete Request
                                                            </button>)}<br/><br/>
                                                            
                    </div>
                ))
            )}
        </div>
    );
}

export default MyAdoptions;