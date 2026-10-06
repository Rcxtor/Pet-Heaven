import { useEffect, useState } from "react";
import { getUserPets } from "../services/petService";
import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/imageUrl";
import Loading from "../components/Loading";
import PetCard from "../components/PetCard";

export default function MyPets(){
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const petsPerPage = 9;
    const totalPages = Math.ceil(pets.length / petsPerPage);
    const startIndex = (currentPage - 1) * petsPerPage;
    const currentPets = pets.slice( startIndex, startIndex + petsPerPage);
    const pageBtn ="min-w-10 h-10 px-3 rounded-lg border-2 border-gray-200 text-gray-700 font-semibold text-sm transition cursor-pointer hover:border-brand-700 hover:text-brand-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-700";


    useEffect(() => {

        document.title = "My Pets- PetHeaven";
        async function fetchPets() {
            try {
                const data = await getUserPets();

                setPets(data);

            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false);
            }
        }

        fetchPets();

    }, []);

        if (loading) {
        return <Loading/>;
    }
    return(
        <div className="fade-in max-w-6xl mx-auto px-4 sm:px-6 py-10">

            <div className="mb-8 flex items-center justify-between ">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        My Pets
                    </h1>
                    <p className="text-gray-500 text-sm pt-1">Manage your listed pets</p>
                </div>
                <Link
                    to="/add-pet"
                    className="hidden sm:flex items-center gap-1.5 bg-brand-700 hover:bg-brand-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition shadow-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Pet
                </Link>
            </div>

            {pets.length === 0 ? (
                <p>No pets available.</p>
            ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPets.map((pet) => (
                    <PetCard key={pet.id} pet={pet} imageUrl={pet.images && pet.images.length > 0 ? getImageUrl(pet.images[0].image_path): null}/>
                ))}
            </div>
            )}
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
        </div>   
    )
}