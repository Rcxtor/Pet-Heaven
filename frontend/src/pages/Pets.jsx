import { useEffect, useState } from "react";
import { getallPet } from "../services/petService";
import { Link } from "react-router-dom";

function Pets(){
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function fetchPets() {
            try {
                const data = await getallPet();

                setPets(data);

            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false);
            }
        }

        fetchPets();

    }, []);

     if (loading) {
        return <p>Loading pets...</p>;
    }

    return (
        <div>
            <h1>Available Pets</h1>

            {pets.length === 0 ? (
                <p>No pets available.</p>
            ) : (
                pets.map((pet) => (
                    <div key={pet.id}>

                        {pet.image && (
                            <img
                                src={`http://127.0.0.1:8000${pet.image}`}
                                alt={pet.name}
                                width="200"
                            />
                        )}

                        <h2>{pet.name}</h2>

                        <p>Species: {pet.species}</p>

                        <p>Breed: {pet.breed}</p>

                        <p>Age: {pet.age}</p>

                        <p>Location: {pet.location}</p>

                        <Link to={`/pet/${pet.id}`}>
                            View Details
                        </Link>

                        <br />
                        <br />
                    </div>
                ))
            )}
        </div>
    );
}

export default Pets;