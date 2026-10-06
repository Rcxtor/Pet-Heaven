import { Link } from "react-router-dom";

function PetCard({ pet, imageUrl }) {
    const emoji =
        pet.species?.toLowerCase() === "dog" ? "🐶" :
        pet.species?.toLowerCase() === "cat" ? "🐱" :
        pet.species?.toLowerCase() === "bird" ? "🕊️" :
        pet.species?.toLowerCase() === "fish" ? "🐟" :
        pet.species?.toLowerCase() === "rabbit" ? "🐰" :
        pet.species?.toLowerCase() === "hamster" ? "🐹" : "🐾";

    return (
        <div className="relative bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
            <Link to={`/pet/${pet.id}`} className="block">

                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                    {imageUrl ? (
                        <img src={imageUrl} alt={pet.name} className="w-full h-full object-cover"/>
                    ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                            No image
                        </div>
                    )}

                    {pet.status === "adopted" && (
                        <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                            Adopted
                        </span>
                    )}
                </div>

                {/* Info */}
                <div className="p-5">
                    <div className="flex items-start justify-between mb-1">
                        <h3 className="text-lg font-bold text-gray-900">{pet.name}</h3>
                        <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full capitalize">
                            {emoji} {pet.species}
                        </span>
                    </div>

                    <p className="text-sm text-gray-500 mb-1">{pet.breed || "Not specified"}</p>

                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-2">
                        <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {pet.age} {Number(pet.age) === 1 ? "year" : "years"}
                        </span>
                        <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {pet.location || "Not specified"}
                        </span>
                        <span className="flex items-center gap-1">
                            📏 {pet.size.charAt(0).toUpperCase() + pet.size.slice(1) || "Not specified"}
                        </span>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <span className="text-xs text-brand-700 font-medium hover:underline">View details →</span>
                    </div>
                </div>
            </Link>

            {/* Dummy heart button */}
            <button
                type="button"
                aria-label="Add to favorites"
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:scale-110 transition cursor-pointer"
            >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>
        </div>
    );
}

export default PetCard;