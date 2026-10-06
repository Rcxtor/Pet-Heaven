import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPet } from "../services/petService";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { checkAdoptionProfile } from "../services/adoptionService";
import BackButton from "../components/BackButton";
import { getImageUrl } from "../utils/imageUrl";
import Loading from "../components/Loading"

function ViewPet() {
    const { id } = useParams();
    const { user } = useAuth();

    const navigate = useNavigate();

    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);

    // Currently selected image
    const [selectedImage, setSelectedImage] = useState(0);

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

                // Start with the first image
                setSelectedImage(0);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchPet();
    }, [id]);

    useEffect(() => {
        if (pet?.name) {
            document.title = `${pet.name} - PetHeaven`;
        }
    }, [pet]);

    if (loading) {
        return <Loading />;
    }

    if (!pet) {
        return <p>Pet not found.</p>;
    }

    const images = pet.images || [];

    return (
        <div className="fade-in max-w-6xl mx-auto px-4 sm:px-6 py-10">

            <BackButton label="Back" />

            <div className="grid lg:grid-cols-2 gap-10">

                {/* Images */}
                <div>

                    {images.length > 0 ? (
                        <>
                            {/* Main Image */}
                            <div className="relative">
                                <img
                                    src={getImageUrl(
                                        images[selectedImage]?.image_path
                                    )}
                                    alt={`${pet.name} ${selectedImage + 1}`}
                                    className="w-full rounded-2xl object-cover  aspect-[4/5] shadow-md"
                                />

                                {/* Image counter */}
                                {images.length > 1 && (
                                    <span className="absolute bottom-3 right-3  bg-black/60 text-white text-xs px-3 py-1.5 rounded-full">
                                        {selectedImage + 1} / {images.length}
                                    </span>
                                )}
                            </div>

                            {/* Thumbnails */}
                            {images.length > 1 && (
                                <div className="grid  grid-cols-4 gap-3 mt-3">

                                    {images.map((image, index) => (
                                        <button
                                            key={image.id}
                                            type="button"
                                            onClick={() => setSelectedImage(index)}
                                            className={`rounded-lg overflow-hidden border-2  transition cursor-pointer ${
                                                selectedImage === index
                                                    ? "border-brand-700"
                                                    : "border-transparent hover:border-green-600"
                                            }`}
                                        >
                                            <img
                                                src={getImageUrl(
                                                    image.image_path
                                                )}
                                                alt={`${pet.name} thumbnail ${index + 1}`}
                                                className="w-full h-20 object-cover"
                                            />
                                        </button>
                                    ))}

                                </div>
                            )}
                        </>
                    ) : pet.image ? (


                        <img
                            src={getImageUrl(pet.image)}
                            alt={pet.name}
                            className="w-full rounded-2xl object-cover aspect-[4/5] shadow-md"
                        />

                    ) : (
                        <div className="w-full rounded-2xl aspect-[4/5] bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                            No image
                        </div>
                    )}

                </div>

                {/* Info */}
                <div className=" shadow-md px-6 rounded-2xl py-2">

                    <div className="flex  items-start justify-between gap-4">

                        <h1 className="text-4xl font-extrabold text-gray-900">
                            {pet.name}
                        </h1>

                        {pet.status === "adopted" && (
                            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-green-100 text-green-700">
                                Adopted
                            </span>
                        )}

                    </div>

                    <div className="flex flex-wrap gap-3 mt-4">

                        <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg font-medium capitalize">
                            {pet.species}
                        </span>

                        <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg font-medium">
                            🏷️ {pet.breed}
                        </span>

                        <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg font-medium">
                            ⏱ {pet.age}
                        </span>

                        <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg font-medium capitalize">
                            📏 {pet.size}
                        </span>

                        <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg font-medium capitalize">
                            {pet.gender}
                        </span>

                        <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg font-medium">
                            📍 {pet.location}
                        </span>

                    </div>

                    <div className="mt-8">

                        <h2 className="text-lg font-bold text-gray-900 mb-3">
                            About
                        </h2>

                        <p className="text-gray-600 leading-relaxed">
                            {pet.description}
                        </p>

                    </div>

                    {/* Owner */}
                    {user && user.id === pet.user_id && pet.status !== "adopted" && (
                        <Link to={`/pet/${pet.id}/edit`} className="inline-block mt-8 border-2 border-gray-200 hover:border-brand-700 text-gray-700 hover:text-brand-700 font-semibold px-8 py-3 rounded-lg transition">
                            Edit Pet
                        </Link>
                    )}

                    {/* Adoption */}
                    {user && user.id !== pet.user_id && pet.status === "available" && (
                        <button type="button" onClick={handleApply}
                            className="mt-8 w-full sm:w-auto bg-brand-700 hover:bg-brand-800 text-white font-semibold px-10 py-3.5 rounded-lg transition shadow-md hover:shadow-lg cursor-pointer"
                        >
                            Apply For Adoption
                        </button>
                    )}
                    {/* Guest */}
                    { !user &&(
                        <Link to={`/login`} 
                            className="inline-block mt-8 w-full sm:w-auto bg-brand-700 hover:bg-brand-800 text-white font-semibold px-10 py-3.5 rounded-lg transition shadow-md hover:shadow-lg cursor-pointer"
                        >
                            Apply For Adoption
                        </Link>
                    )}
                </div>

            </div>
        </div>
    );
}

export default ViewPet;