import { useEffect, useState } from "react";
import { getallPet } from "../services/petService";
import { getImageUrl } from "../utils/imageUrl";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import PetCard from "../components/PetCard";

const selectClass ="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 bg-white capitalize focus:outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700";

const pageBtn ="min-w-10 h-10 px-3 rounded-lg border-2 border-gray-200 text-gray-700 font-semibold text-sm transition cursor-pointer hover:border-brand-700 hover:text-brand-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-700";

function ageInYears(age) {
    if (age === null || age === undefined || age === "") {
        return null;
    }

    const ageText = age.toString().toLowerCase().trim();
    const value = parseFloat(ageText);

    if (Number.isNaN(value)) {
        return null;
    }

    // Convert months to years
    if (ageText.includes("month")) {
        return value / 12;
    }

    // Number only or years
    return value;
}

function Pets() {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [search, setSearch] = useState("");
    const [species, setSpecies] = useState("all");
    const [size, setSize] = useState("all");
    const [age, setAge] = useState("all");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);

    const petsPerPage = 9;

    // Fetch pets
    useEffect(() => {

        document.title = "Browse Pets - PetHeaven";
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

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [search, species, size, age]);

    // Get unique species
    const speciesOptions = [
        ...new Set(
            pets
                .map((pet) => pet.species)
                .filter(Boolean)
        ),
    ];

    // Filter pets
    const filteredPets = pets.filter((pet) => {

        // Search by name
        const matchesName = pet.name
            ?.toLowerCase()
            .includes(search.toLowerCase());

        // Species
        const matchesSpecies =
            species === "all" ||
            pet.species?.toLowerCase() === species.toLowerCase();

        // Size
        const matchesSize =
            size === "all" ||
            pet.size?.toLowerCase() === size.toLowerCase();

        // Age
        const petAge = ageInYears(pet.age);

        let matchesAge = true;

        switch (age) {
            case "under1":
                matchesAge =
                    petAge !== null &&
                    petAge < 1;
                break;

            case "1":
                matchesAge =
                    petAge !== null &&
                    petAge >= 1 &&
                    petAge < 2;
                break;

            case "2":
                matchesAge =
                    petAge !== null &&
                    petAge >= 2 &&
                    petAge < 3;
                break;

            case "3":
                matchesAge =
                    petAge !== null &&
                    petAge >= 3 &&
                    petAge < 4;
                break;

            case "4":
                matchesAge =
                    petAge !== null &&
                    petAge >= 4 &&
                    petAge < 5;
                break;

            case "5plus":
                matchesAge =
                    petAge !== null &&
                    petAge >= 5;
                break;

            default:
                matchesAge = true;
        }

        return (
            matchesName &&
            matchesSpecies &&
            matchesSize &&
            matchesAge
        );
    });

    // Pagination
    const totalPages = Math.ceil(
        filteredPets.length / petsPerPage
    );

    const startIndex =
        (currentPage - 1) * petsPerPage;

    const currentPets = filteredPets.slice(
        startIndex,
        startIndex + petsPerPage
    );

    // Clear filters
    function clearFilters() {
        setSearch("");
        setSpecies("all");
        setSize("all");
        setAge("all");
    }

    if (loading) {
        return <Loading message="Loading pets..." />;
    }

    return (
        <div className="fade-in max-w-6xl mx-auto px-4 sm:px-6 py-10">

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Available Pets
                </h1>
                <p className="text-gray-600 mt-2">
                    {filteredPets.length}{" "}
                    {filteredPets.length === 1 ? "pet" : "pets"} looking for a home
                </p>
            </div>

            {/* Search + filters */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-8 space-y-4">

                <input type="text" placeholder="Search by pet name..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700"/>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

                    <select value={species} onChange={(e) => setSpecies(e.target.value)} className={selectClass}>
                        <option value="all">All Species</option>
                        {speciesOptions.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <select value={size} onChange={(e) => setSize(e.target.value)} className={selectClass}>
                        <option value="all">All Sizes</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>

                    <select value={age} onChange={(e) => setAge(e.target.value)} className={selectClass}>
                        <option value="all">All Ages</option>
                        <option value="under1">Less than 1 year</option>
                        <option value="1">1 year</option>
                        <option value="2">2 years</option>
                        <option value="3">3 years</option>
                        <option value="4">4 years</option>
                        <option value="5plus">5 years+</option>
                    </select>

                    <button type="button" onClick={clearFilters} className="border-2 border-gray-200 hover:border-brand-700 text-gray-700 hover:text-brand-700 font-semibold px-6 py-2.5 rounded-lg transition">
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Results */}
            {filteredPets.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">🐾</div>
                    <p className="text-lg font-bold text-gray-900">
                        No pets match your filters
                    </p>
                    <p className="text-gray-600 mt-1">
                        Try changing or clearing your filters.
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentPets.map((pet) => (
                            <PetCard key={pet.id} pet={pet} imageUrl={pet.images && pet.images.length > 0 ? getImageUrl(pet.images[0].image_path): null}/>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
                            <button
                                onClick={() => setCurrentPage((prev) => prev - 1)}
                                disabled={currentPage === 1}
                                className={pageBtn}
                            >
                                Previous
                            </button>

                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={
                                        currentPage === index + 1
                                            ? "min-w-10 h-10 px-3 rounded-lg bg-brand-700 text-white font-semibold text-sm shadow-md cursor-pointer"
                                            : pageBtn
                                    }
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                                disabled={currentPage === totalPages}
                                className={pageBtn}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Pets;
