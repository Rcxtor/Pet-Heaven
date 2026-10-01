import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPet } from "../services/petService";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { checkAdoptionProfile } from "../services/adoptionService";

function ViewPet() {
    const { id } = useParams();
    const { user } = useAuth();

    const navigate = useNavigate();
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleApply = async () => {
        try {
            await checkAdoptionProfile();

            navigate(`/pet/${pet.id}/adoption-form`);

        } catch (error) {
            if (error.response?.status === 422) {
                navigate("/profile", {
                    state: {
                        message: "Please fill up all the information.",
                        returnTo: `/pet/${pet.id}`
                    }
                });

                return;
            }

            alert("Something went wrong. Please try again.");
        }
    };

    useEffect(() => {
        async function fetchPet() {
            try {
                const data = await getPet(id);

                setPet(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchPet();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!pet) {
        return <p>Pet not found.</p>;
    }

    return (
        <div>
            <h1>{pet.name}</h1>

            {pet.image && (
                <img
                    src={`http://127.0.0.1:8000${pet.image}`}
                    alt={pet.name}
                    width="300"
                />
            )}

            <p><strong>Species:</strong> {pet.species}</p>

            <p><strong>Breed:</strong> {pet.breed}</p>

            <p><strong>Age:</strong> {pet.age}</p>

            <p><strong>Size:</strong> {pet.size}</p>

            <p><strong>Gender:</strong> {pet.gender}</p>

            <p><strong>Location:</strong> {pet.location}</p>

            <p><strong>Description:</strong> {pet.description}</p>

            {/* Show only to the user who created the pet */}
            {user && user.id === pet.user_id && pet.status !== "adopted" && (
                <Link to={`/pet/${pet.id}/edit`}>
                    <button>Edit Pet</button>
                </Link>
            )}

            <br />
            {user && user.id !== pet.user_id && pet.status === "available" && (
            <button type="button"onClick={handleApply}>
                Apply For Adoption
            </button>
            )}
        </div>
    );
}

export default ViewPet;