import { useEffect, useState } from "react";
import AdoptedPets from "../components/AdoptedPets";
import RehomedPets from "../components/RehomedPets";
import BackButton from "../components/BackButton";

function AdoptionHistory({ embedded = false }) {
    const [type, setType] = useState("adopted");

    useEffect(() => {
        document.title = "Adoption History - PetHeaven";
    }, []);

    return (
        <div className="fade-in max-w-4xl mx-auto px-4 sm:px-6 py-10">

            {/* Page Header */}
            {!embedded && (
                <>
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Adoption History
                        </h1>

                        <p className="text-gray-500 text-sm mt-1">
                            Keep track of completed adoptions
                        </p>
                    </div>

                    <BackButton />
                </>
            )}

            {/* Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                <button
                    type="button"
                    onClick={() => setType("adopted")}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition cursor-pointer ${
                        type === "adopted"
                            ? "bg-white text-green-700 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    Adopted Pets
                </button>

                <button
                    type="button"
                    onClick={() => setType("rehomed")}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition cursor-pointer ${
                        type === "rehomed"
                            ? "bg-white text-green-700 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    Rehomed Pets
                </button>
            </div>

            {/* Content */}
            {type === "adopted" ? (
                <AdoptedPets />
            ) : (
                <RehomedPets />
            )}
        </div>
    );
}

export default AdoptionHistory;

