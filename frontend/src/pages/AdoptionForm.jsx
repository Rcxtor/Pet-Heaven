import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createAdoptionRequest } from "../services/adoptionService";
import BackButton from "../components/BackButton";

function AdoptionForm() {
    const { petId } = useParams();
    const navigate = useNavigate();
    console.log(petId);
    const [formData, setFormData] = useState({
        exp: "",
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
    useEffect(() => {
            document.title = "Adoption Form - PetHeaven";
        }, []);
    return (
        <div className="fade-in  max-w-xl mx-auto px-4 sm:px-6 py-10">

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Adoption Form</h1>
                <p className="text-gray-500 text-sm mt-1">Tell us a little about yourself</p>
            </div>
            <BackButton/>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card shadow-md border border-gray-100 p-6 sm:p-8 space-y-5">

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Do you have experience with pets?
                    </label>
                    <select
                        name="exp"
                        value={formData.exp}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-white cursor-pointer"
                    >
                        <option value="">Select an option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Why do you want to adopt this pet?
                    </label>
                    <textarea
                        name="reason"
                        rows="4"
                        placeholder="Tell us why you'd be a great match..."
                        value={formData.reason}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm resize-none"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-brand-700 hover:bg-brand-800 text-white font-semibold py-3 rounded-lg transition shadow-sm cursor-pointer"
                >
                    Submit Adoption Request
                </button>

            </form>
        </div>
    );
}

export default AdoptionForm;