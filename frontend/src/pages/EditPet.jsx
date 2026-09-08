import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPet, updatePet, deletePet } from "../services/petService";
import { useAuth } from "../context/AuthContext";

function EditPet() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        species: "",
        breed: "",
        age: "",
        size: "",
        gender: "",
        location: "",
        description: "",
    });


    useEffect(() => {
        async function fetchPet() {
            try {
                const pet = await getPet(id);

                // Check user
                if (!user || user.id !== pet.user_id) {
                    navigate("/pets");
                    return;
                }

                // Put existing pet data into the form
                setFormData({
                    name: pet.name || "",
                    species: pet.species || "",
                    breed: pet.breed || "",
                    age: pet.age || "",
                    size: pet.size || "",
                    gender: pet.gender || "",
                    location: pet.location || "",
                    description: pet.description || "",
                });

            } catch (error) {
                console.log(error);
                navigate("/pets");

            } finally {
                setLoading(false);
            }
        }

        if (user) {
            fetchPet();
        }

    }, [id, user, navigate]);


    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await updatePet(id, formData);

            alert("Pet updated successfully!");

            navigate(`/pet/${id}`);

        } catch (error) {
            console.log(error);
        }
    }

    async function handleDelete() {
        const confirmation = window.prompt(
            'Type "DELETE" to confirm deleting this pet:'
        );

        if (confirmation !== "DELETE") {
            alert("Pet was not deleted.");
            return;
        }

        try {
            await deletePet(id);

            alert("Pet deleted successfully!");

            navigate("/pets");

        } catch (error) {
            console.log(error);
            alert("Failed to delete pet.");
        }
    }

    if (loading) {
        return <p>Loading...</p>;
    }


    return (
        <div>
            <h1>Edit Pet</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Name</label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>


                <div>
                    <label>Species</label>

                    <input
                        type="text"
                        name="species"
                        value={formData.species}
                        onChange={handleChange}
                    />
                </div>


                <div>
                    <label>Breed</label>

                    <input
                        type="text"
                        name="breed"
                        value={formData.breed}
                        onChange={handleChange}
                    />
                </div>


                <div>
                    <label>Age</label>

                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </div>


                <div>
                    <label>Size</label>

                    <select
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                    >
                        <option value="">Select Size</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </div>


                <div>
                    <label>Gender</label>

                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>


                <div>
                    <label>Location</label>

                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>


                <div>
                    <label>Description</label>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>


                <button type="submit">
                    Update Pet
                </button>

            </form>

            <button type="button" onClick={handleDelete}>
                Delete Pet
            </button>
        </div>
    );
}

export default EditPet;