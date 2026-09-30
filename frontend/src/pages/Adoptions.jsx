import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createAdoptionRequest } from "../services/adoptionService";

function AdoptionForm() {
    const { petId } = useParams();
    const navigate = useNavigate();
    console.log(petId);
    const [formData, setFormData] = useState({
        exp: "",
        email: "",
        name: "",
        phone: "",
        address: "",
        reason: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await createAdoptionRequest({
                pet_id: petId,
                ...formData,
            });

            console.log(data);

            alert("Adoption request submitted successfully!");
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to submit adoption request."
            );
        }
        navigate(`/pet/${petId}`);
    };

    return (
        <div>
            <h1>Adoption Form</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Do you have experience with pets?
                </label>

                <select
                    name="exp"
                    value={formData.exp}
                    onChange={handleChange}
                >
                    <option value="">Select an option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>

                <br />

                <label>
                    Name
                </label>

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <br />

                <label>
                    Email
                </label>

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <br />


                <label>
                    Phone
                </label>

                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
                <br />


                <label>
                    Address
                </label>

                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />

                <br />

                <label>
                    Why do you want to adopt this pet?
                </label>
                <br />

                <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                />
                <br />

                <button type="submit">
                    Submit Adoption Request
                </button>
            </form>
        </div>
    );
}

export default AdoptionForm;