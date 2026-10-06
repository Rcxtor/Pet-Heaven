import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addPet } from "../services/petService";
import BackButton from "../components/BackButton";

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

    // Multiple images
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "Post A Pet - PetHeaven";

        return () => {
            imagePreviews.forEach((preview) => {
                URL.revokeObjectURL(preview);
            });
        };
    }, []);

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        if (selectedFiles.length === 0) {
            return;
        }

        setError("");

        // Maximum 4 images total
        if (images.length + selectedFiles.length > 4) {
            setError("You can upload a maximum of 4 images.");
            e.target.value = "";
            return;
        }

        const validFiles = [];

        for (const file of selectedFiles) {

            // Check image type
            if (!file.type.startsWith("image/")) {
                setError("Please select only image files.");
                continue;
            }

            // Maximum 5MB per image
            if (file.size > 5 * 1024 * 1024) {
                setError(`${file.name} is larger than 5MB.`);
                continue;
            }

            validFiles.push(file);
        }

        if (validFiles.length === 0) {
            e.target.value = "";
            return;
        }

        // Create previews
        const newPreviews = validFiles.map((file) =>
            URL.createObjectURL(file)
        );

        setImages((prev) => [...prev, ...validFiles]);
        setImagePreviews((prev) => [...prev, ...newPreviews]);

        // Allows selecting the same file again later
        e.target.value = "";
    };

    const handleRemoveImage = (index) => {
        // Remove preview URL from memory
        URL.revokeObjectURL(imagePreviews[index]);

        setImages((prev) =>
            prev.filter((_, imageIndex) => imageIndex !== index)
        );

        setImagePreviews((prev) =>
            prev.filter((_, imageIndex) => imageIndex !== index)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        // Require at least one image
        if (images.length === 0) {
            setError("Please upload at least one image.");
            return;
        }

        setLoading(true);

        const formData = new FormData();

        formData.append("name", name);
        formData.append("species", species);
        formData.append("breed", breed);
        formData.append("location", location);
        formData.append("age", age);
        formData.append("size", size);
        formData.append("gender", gender);
        formData.append("description", description);

        // Add all images
        images.forEach((image) => {
            formData.append("images[]", image);
        });

        try {
            const data = await addPet(formData, token);

            console.log(data);

            navigate(`/pet/${data.pet.id}`);

        } catch (error) {
            console.error(error);

            if (error?.message) {
                setError(error.message);
            } else if (error?.errors) {
                const firstError = Object.values(error.errors)[0];

                if (Array.isArray(firstError)) {
                    setError(firstError[0]);
                } else {
                    setError("Something went wrong. Please check your information.");
                }
            } else {
                setError("Failed to add pet. Please try again.");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fade-in max-w-xl mx-auto px-4 sm:px-6 py-10">

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">
                    Add a Pet
                </h1>

                <p className="text-gray-500 text-sm mt-1">
                    Help us find a loving home for your pet
                </p>
            </div>

            <BackButton />

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-xl shadow-card border border-gray-100 p-6 sm:p-8 space-y-5"
            >

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
                        {error}
                    </div>
                )}

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Name
                    </label>

                    <input
                        type="text"
                        placeholder="e.g. Buddy"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                        required
                    />
                </div>

                {/* Species + Breed */}
                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Species
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. Dog"
                            value={species}
                            onChange={(e) => setSpecies(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Breed
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. Golden Retriever"
                            value={breed}
                            onChange={(e) => setBreed(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                    </div>

                </div>

                {/* Age + Size */}
                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Age
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. 2 years"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Size
                        </label>

                        <select
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                            required
                        >
                            <option value="">Select size</option>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </div>

                </div>

                {/* Gender + Location */}
                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Gender
                        </label>

                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                            required
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Location
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. Dhaka"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                            required
                        />
                    </div>

                </div>

                {/* Images */}
                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-sm font-medium text-gray-700">
                            Pet Images
                        </label>

                        <span className="text-xs text-gray-400">
                            {images.length}/4
                        </span>
                    </div>

                    {/* Image previews */}
                    {images.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 mb-3">

                            {images.map((image, index) => (
                                <div
                                    key={`${image.name}-${index}`}
                                    className="relative group"
                                >
                                    <img
                                        src={imagePreviews[index]}
                                        alt={`Pet preview ${index + 1}`}
                                        className="w-full h-40 object-cover rounded-lg border border-gray-200"
                                    />

                                    {/* First image indicator */}
                                    {index === 0 && (
                                        <span className="absolute top-2 left-2 bg-brand-700 text-white text-xs px-2 py-1 rounded-md">
                                            Main image
                                        </span>
                                    )}

                                    {/* Remove button */}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-2 right-2 bg-white text-red-500 rounded-full w-7 h-7 shadow flex items-center justify-center hover:bg-red-50 cursor-pointer"
                                        title="Remove image"
                                    >
                                        ×
                                    </button>

                                    <p className="text-xs text-gray-500 mt-1 truncate">
                                        {image.name}
                                    </p>
                                </div>
                            ))}

                        </div>
                    )}

                    {/* Upload area */}
                    {images.length < 4 && (
                        <label className="block border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-brand-500 transition cursor-pointer">

                            <svg
                                className="w-8 h-8 text-gray-400 mx-auto mb-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2 2z"
                                />
                            </svg>

                            <p className="text-sm text-gray-500">
                                {images.length === 0
                                    ? "Click to upload pet images"
                                    : "Click to add more images"}
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                                Up to 4 images · 5MB each
                            </p>

                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                                multiple
                                onChange={handleImageChange}
                                className="hidden"
                            />

                        </label>
                    )}

                    {images.length === 4 && (
                        <p className="text-xs text-gray-400 mt-2">
                            You have reached the maximum of 4 images.
                        </p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Description
                    </label>

                    <textarea
                        rows="4"
                        placeholder="Tell us more about your pet..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-brand-700 hover:bg-brand-800 text-white font-semibold py-3 rounded-lg transition shadow-sm ${
                        loading
                            ? "opacity-60 cursor-not-allowed"
                            : "cursor-pointer"
                    }`}
                >
                    {loading ? "Adding Pet..." : "Add Pet"}
                </button>

            </form>
        </div>
    );
}

export default AddPet;