import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPet } from "../services/petService";

function AddPet() {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [breed, setBreed] = useState("");
    const [location, setLocation] = useState("");
    const [age, setAge] = useState("");
    const [size, setSize] = useState("");
    const [gender, setGender] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", name);
        formData.append("species", species);
        formData.append("breed", breed);
        formData.append("location", location);
        formData.append("age", age);
        formData.append("size", size);
        formData.append("gender", gender);
        formData.append("description", description);

        if (image) {
            formData.append("image", image);
        }

        try {
            const data = await addPet(formData, token);

            console.log(data);

            navigate(`/pet/${data.pet.id}`);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Add a Pet</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Pet Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Species"
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Breed"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />

                <br /><br />

                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />

                <br /><br />

                <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                >
                    <option value="">Select Size</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>

                <br /><br />

                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <br /><br />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <br /><br />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />

                <br /><br />

                <button type="submit">
                    Add Pet
                </button>

            </form>
        </div>
    );
}

export default AddPet;