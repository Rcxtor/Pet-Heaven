import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {getPet,updatePet,deletePet,addPetImages,deletePetImage,} from "../services/petService";
import { useAuth } from "../context/AuthContext";
import BackButton from "../components/BackButton";
import Loading from "../components/Loading";

function EditPet() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

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

    // Existing images from database
    const [images, setImages] = useState([]);

    // New images selected by the user
    const [newImages, setNewImages] = useState([]);

    // Preview URLs for new images
    const [newImagePreviews, setNewImagePreviews] = useState([]);


    useEffect(() => {
        document.title = "Edit Pet - PetHeaven";

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

                // Existing images
                setImages(pet.images || []);

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


    function getImageUrl(path) {
        if (!path) return "";

        if (path.startsWith("http")) {
            return path;
        }

        return `http://127.0.0.1:8000${path}`;
    }


    // Select new images
    function handleImageChange(e) {
        const selectedFiles = Array.from(e.target.files || []);

        if (selectedFiles.length === 0) {
            return;
        }

        const totalImages =
            images.length +
            newImages.length +
            selectedFiles.length;

        if (totalImages > 4) {
            alert("A pet can have a maximum of 4 images.");
            e.target.value = "";
            return;
        }

        // Validate files
        for (const file of selectedFiles) {
            if (!file.type.startsWith("image/")) {
                alert("Please select image files only.");
                e.target.value = "";
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                alert("Each image must be smaller than 5MB.");
                e.target.value = "";
                return;
            }
        }

        const previews = selectedFiles.map((file) =>
            URL.createObjectURL(file)
        );

        setNewImages((prev) => [...prev, ...selectedFiles]);
        setNewImagePreviews((prev) => [...prev, ...previews]);

        e.target.value = "";
    }


    // Remove a newly selected image before uploading
    function handleRemoveNewImage(index) {
        URL.revokeObjectURL(newImagePreviews[index]);

        setNewImages((prev) =>
            prev.filter((_, i) => i !== index)
        );

        setNewImagePreviews((prev) =>
            prev.filter((_, i) => i !== index)
        );
    }


    // Remove existing image from database
    async function handleRemoveExistingImage(imageId) {
        const confirmation = window.confirm(
            "Are you sure you want to remove this image?"
        );

        if (!confirmation) {
            return;
        }

        try {
            await deletePetImage(id, imageId);

            setImages((prev) =>
                prev.filter((image) => image.id !== imageId)
            );

        } catch (error) {
            console.log(error);

            alert(
                error?.response?.data?.message ||
                "Failed to remove image."
            );
        }
    }


    async function handleSubmit(e) {
        e.preventDefault();

        setSaving(true);

        try {
            // 1. Update pet information
            await updatePet(id, formData);

            // 2. Upload new images if there are any
            if (newImages.length > 0) {
                const imageFormData = new FormData();

                newImages.forEach((image) => {
                    imageFormData.append("images[]", image);
                });

                await addPetImages(id, imageFormData);
            }

            alert("Pet updated successfully!");

            navigate(`/pet/${id}`);

        } catch (error) {
            console.log(error);

            alert(
                error?.response?.data?.message ||
                "Failed to update pet."
            );

        } finally {
            setSaving(false);
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

            navigate(-2); //need to fix

        } catch (error) {
            console.log(error);
            alert("Failed to delete pet.");
        }
    }


    if (loading) {
            return <Loading/>;
    }


    return (
        <div className="fade-in max-w-xl mx-auto px-4 sm:px-6 py-10">

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">
                    Edit Pet
                </h1>

                <p className="text-gray-500 text-sm mt-1">
                    Update your pet's information
                </p>
            </div>

            <BackButton />

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-xl shadow-card border border-gray-100 p-6 sm:p-8 space-y-5"
            >

                {/* NAME */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm"
                    />
                </div>


                {/* SPECIES / BREED */}
                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Species
                        </label>

                        <input
                            type="text"
                            name="species"
                            value={formData.species}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Breed
                        </label>

                        <input
                            type="text"
                            name="breed"
                            value={formData.breed}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm"
                        />
                    </div>

                </div>


                {/* AGE / SIZE */}
                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Age
                        </label>

                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Size
                        </label>

                        <select
                            name="size"
                            value={formData.size}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-white cursor-pointer"
                        >
                            <option value="">
                                Select size
                            </option>

                            <option value="small">
                                Small
                            </option>

                            <option value="medium">
                                Medium
                            </option>

                            <option value="large">
                                Large
                            </option>
                        </select>
                    </div>

                </div>


                {/* GENDER / LOCATION */}
                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Gender
                        </label>

                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-white cursor-pointer"
                        >
                            <option value="">
                                Select gender
                            </option>

                            <option value="male">
                                Male
                            </option>

                            <option value="female">
                                Female
                            </option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Location
                        </label>

                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm"
                        />
                    </div>

                </div>


                {/* DESCRIPTION */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Description
                    </label>

                    <textarea
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm resize-none"
                    />
                </div>


                {/* EXISTING IMAGES */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Images
                    </label>

                    {images.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3">

                            {images.map((image, index) => (
                                <div
                                    key={image.id}
                                    className="relative"
                                >
                                    <img
                                        src={getImageUrl(image.image_path)}
                                        alt={`${formData.name} ${index + 1}`}
                                        className="w-full h-40 object-cover rounded-xl border border-gray-200"
                                    />

                                    {index === 0 && (
                                        <span className="absolute top-2 left-2 bg-white/90 text-xs font-semibold px-2 py-1 rounded-md">
                                            Main image
                                        </span>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveExistingImage(
                                                image.id
                                            )
                                        }
                                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition cursor-pointer"
                                        title="Remove image"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}

                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">
                            No images uploaded.
                        </p>
                    )}
                </div>


                {/* ADD NEW IMAGES */}
                {images.length + newImages.length < 4 && (
                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Add Images
                        </label>

                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-brand-500 hover:bg-gray-50 transition">

                            <svg
                                className="w-8 h-8 text-gray-400 mb-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>

                            <span className="text-sm text-gray-500">
                                Add more images
                            </span>

                            <span className="text-xs text-gray-400 mt-1">
                                JPG, PNG, GIF or WEBP • Max 5MB each
                            </span>

                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="hidden"
                            />

                        </label>

                    </div>
                )}


                {/* NEW IMAGE PREVIEWS */}
                {newImages.length > 0 && (
                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Images
                        </label>

                        <div className="grid grid-cols-2 gap-3">

                            {newImages.map((image, index) => (
                                <div
                                    key={`${image.name}-${index}`}
                                    className="relative"
                                >

                                    <img
                                        src={newImagePreviews[index]}
                                        alt={image.name}
                                        className="w-full h-40 object-cover rounded-xl border border-gray-200"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveNewImage(index)
                                        }
                                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition cursor-pointer"
                                        title="Remove image"
                                    >
                                        ×
                                    </button>

                                </div>
                            ))}

                        </div>

                    </div>
                )}


                {/* UPDATE BUTTON */}
                <button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-brand-700 hover:bg-brand-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition shadow-sm cursor-pointer"
                >
                    {saving ? "Updating..." : "Update Pet"}
                </button>

            </form>


            {/* DELETE PET */}
            <button
                type="button"
                onClick={handleDelete}
                className="w-full mt-4 border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-semibold py-3 rounded-lg transition cursor-pointer"
            >
                Delete Pet
            </button>

        </div>
    );
}

export default EditPet;