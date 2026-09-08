import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPet } from "../services/petService";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function ViewPet() {
    const { id } = useParams();
    const { user } = useAuth();

    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);

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
            {user && user.id === pet.user_id && (
                <Link to={`/pet/${pet.id}/edit`}>
                    <button>Edit Pet</button>
                </Link>
            )}
        </div>
    );
}

export default ViewPet;